///<reference path="../../references.ts" />
module App {
    export module ME2 {

        export interface ISerialisation {
            app: App.Application;

            serialise (state: App.ME2.State): ISerialisationSerialised;
            deserialise (state: ISerialisationSerialised): App.ME2.State;
        }

        interface ISerialisedNormandy extends String {
        }

        interface ISerialisedTeammate extends String {
        }

        export interface ISerialisationSerialised extends String {
        }

        enum SerialisedElements {
            All = 0,
            StageID = 1,
            NormandyDelay = 2,
            NormandyFlags = 3,
            Teammates = 4
        }

        enum SerialisedTeammateElements {
            All = 0,
            HenchmanID = 1,
            DeathCause = 2,
            DeathStageID = 3,
            Roles = 4
        }

        export class Serialisation implements ISerialisation {
            app: App.Application;

            constructor (app: App.Application) {
                this.app = app;
            }

            // Captures Henchman ID (1), Death Cause (1), Death Stage ID (1), Roles (5)
            static TeammateRegex: RegExp = /^([0-9a-f]{1})([0-9a-f]{1})([0-9a-f]{1})([0-9a-f]{5})$/;
            static TeammatesRegex: RegExp = /[0-9a-f]{8}/g;

            // Captures: StageID (1), Normandy Delay (2), Normandy Flags (1) ((Teammate Stuff) x 12)
            static SerialisedRegex: RegExp = /^([0-9a-f]{1})([0-9]{2})([0-9]{1})((?:[0-9a-f]{2}[0-9]{1}[0-9a-f]{5}){12})$/;

            /// -------------------------------------------
            /// Utility methods
            /// -------------------------------------------

            private lpad (value: string, length: number = 2): string {
                var value_str: string;
                value_str = value;
                return value_str.length >= length ? value_str : new Array(length - value_str.length + 1).join("0") + value_str;
            }

            private indexesToFlags (indexes: number[]): number {
                return _.reduce(indexes, (accumulator: number, index: number): number => {
                    return accumulator + Math.pow(2, index);
                }, 0);
            }

            private flagsToIndexes (flags: number): number[] {
                var indexes: number[];
                var index: number;
                var flag: number;
                indexes = [];
                index = 0;
                flag = 1;
                while (flag <= flags) {
                    if (flags & flag) {
                        indexes.push(index);
                    }

                    index++;
                    flag *= 2;
                }

                return indexes;
            }

            /// -------------------------------------------
            /// Teammates
            /// -------------------------------------------

            private getRoleCount (): number {
                return _.keys(App.ME2.TeammateRoles).length / 2;
            }

            // Length 8
            private serialiseTeammate (teammate: App.ME2.Teammate): ISerialisedTeammate {
                var elements: string[];
                var roles: number[];
                var role_offset: number;
                role_offset = this.getRoleCount();

                roles = teammate.roles().slice(0);
                if (teammate.is_recruited()) {
                    roles.push(role_offset + 1);
                }
                if (teammate.is_loyal()) {
                    roles.push(role_offset + 2);
                }
                if (teammate.is_dead()) {
                    roles.push(role_offset + 3);
                }

                elements = [
                    this.lpad((<number> teammate.henchman.id).toString(16), 1),
                    this.lpad((teammate.death_cause() === undefined ? 0 : teammate.death_cause() + 1).toString(16), 1),
                    this.lpad((teammate.death_stage_id() || 0).toString(16), 1),
                    this.lpad(this.indexesToFlags(roles).toString(16), 5)
                ];

                return elements.join("");
            }

            private deserialiseTeammate (serialised: ISerialisedTeammate): App.ME2.Teammate {
                var henchman_id: number;
                var death_cause: App.ME2.TeammateDeathCauses;
                var death_stage_id: App.ME2.Stages.StageIDs;
                var is_recruited: boolean;
                var is_loyal: boolean;
                var is_dead: boolean;
                var roles: App.ME2.TeammateRoles[];
                var deserialised: App.ME2.Teammate;
                var matches: string[];
                var role_offset: number;


                matches = serialised.match(App.ME2.Serialisation.TeammateRegex);

                henchman_id         = parseInt("0x" + matches[SerialisedTeammateElements.HenchmanID], 16);
                death_cause         = parseInt("0x" + matches[SerialisedTeammateElements.DeathCause], 16);
                death_stage_id      = parseInt("0x" + matches[SerialisedTeammateElements.DeathStageID], 16) || undefined;
                roles               = this.flagsToIndexes(parseInt("0x" + matches[SerialisedTeammateElements.Roles], 16));
                role_offset         = this.getRoleCount();

                is_recruited = _.indexOf(roles, role_offset + 1) >= 0;
                is_loyal = _.indexOf(roles, role_offset + 2) >= 0;
                is_dead = _.indexOf(roles, role_offset + 3) >= 0;

                roles = _.without(roles, role_offset + 1, role_offset + 2, role_offset + 3);

                deserialised = new App.ME2.Teammate(this.app.getHenchman(henchman_id), is_recruited, is_loyal, is_dead, roles);
                if (is_dead) {
                    deserialised.die(death_stage_id, death_cause - 1);
                }

                return deserialised;
            }

            /// -------------------------------------------
            /// Normandy
            /// -------------------------------------------

            private serialiseNormandy (normandy: App.ME2.Normandy): ISerialisedNormandy {
                var elements: string[];
                var flags: number;

                flags = 0 + (normandy.has_armour() ? 1 : 0) + (normandy.has_shielding() ? 2 : 0) + (normandy.has_thanix_cannon() ? 4 : 0);

                elements = [
                    this.lpad(normandy.delay().toString(10), 2),
                    this.lpad(flags.toString(10), 1)
                ];

                return elements.join("");
            }

            private deserialiseNormandyElements (serialised_delay: string, serialised_flags: string): App.ME2.Normandy {
                var flags: number;
                var has_armour: boolean;
                var has_shielding: boolean;
                var has_thanix_cannon: boolean;
                var delay: number;

                delay               = parseInt(serialised_delay, 10);
                flags               = parseInt(serialised_flags, 10);
                has_armour          = !!(flags & 1);
                has_shielding       = !!(flags & 2);
                has_thanix_cannon   = !!(flags & 4);

                return new App.ME2.Normandy(has_armour, has_shielding, has_thanix_cannon, delay);
            }

            /// -------------------------------------------
            /// Public interfaces
            /// -------------------------------------------

            public serialise (state: App.ME2.State): ISerialisationSerialised {

                var elements: any[];

                elements = [
                    this.lpad((<number>state.stage().id).toString(16), 1),
                    this.serialiseNormandy(state.normandy),
                    _.map<App.ME2.Teammate, ISerialisedTeammate>(state.teammates().value(), (teammate: App.ME2.Teammate): ISerialisedTeammate => {
                        return this.serialiseTeammate(teammate);
                    }).join("")
                ];

                return elements.join("");
            }

            public deserialise (serialised: ISerialisationSerialised): App.ME2.State {
                var deserialised: App.ME2.State;
                var matches: string[];

                matches = serialised.match(App.ME2.Serialisation.SerialisedRegex);
                if (matches) {

                    deserialised = new App.ME2.State(this.app);
                    deserialised.stage(this.app.stager.getStage(parseInt("0x" + matches[SerialisedElements.StageID], 16)));
                    deserialised.normandy = this.deserialiseNormandyElements(matches[SerialisedElements.NormandyDelay], matches[SerialisedElements.NormandyFlags]);
                    deserialised.teammates(new App.ME2.Teammates(_.map(matches[SerialisedElements.Teammates].match(App.ME2.Serialisation.TeammatesRegex), (serialised_teammate: ISerialisedTeammate): App.ME2.Teammate => {
                        return this.deserialiseTeammate(serialised_teammate);
                    })));

                    return deserialised;
                } else {
                    throw new Error("Serialised data was malformed.");
                }
            }

            public applySerialisedState (state: App.ME2.State, serialised: ISerialisationSerialised): void {
                var new_state = this.deserialise(serialised);


                state.normandy.delay(new_state.normandy.delay());
                state.normandy.has_armour(new_state.normandy.has_armour());
                state.normandy.has_shielding(new_state.normandy.has_shielding());
                state.normandy.has_thanix_cannon(new_state.normandy.has_thanix_cannon());

                var new_teammates: App.ME2.Teammates;
                new_teammates = new_state.teammates();

                state.teammates().each((teammate: App.ME2.Teammate): void => {
                    var new_teammate: App.ME2.Teammate;

                    new_teammate = new_teammates.findByHenchman(teammate.henchman);

                    teammate.is_recruited(new_teammate.is_recruited());
                    teammate.is_loyal(new_teammate.is_loyal());
                    teammate.is_dead(new_teammate.is_dead());
                    teammate.roles.removeAll();
                    _.each(new_teammate.roles(), (role: App.ME2.TeammateRoles): void => {
                        teammate.addRole(role);
                    })

                    //teammate.roles = new_teammate.roles;
                    teammate.death_cause = new_teammate.death_cause;
                    teammate.death_stage_id = new_teammate.death_stage_id;
                });

                state.stage(new_state.stage());
            }
        }
    }
}