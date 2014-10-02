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
            /*
            normandy: ISerialisedNormandy;
            stage_id: App.ME2.Stages.StageIDs;
            teammates: ISerialisedTeammate[];
            */
        }

        /*
        Stage
            1 int(1)

        Normandy stores:
            3 flags
            1 int(2)
         */
        /*
        Each Teammate stores:
            - Henchman ID int(2)
            - 3 flags: Recruited, Loyal, Dead
            - int(1) Death Cause
            - int(1) Death Stage ID
            - 10 flags for roles
         */

        export class Serialisation implements ISerialisation {
            app: App.Application;

            constructor (app: App.Application) {
                this.app = app;
            }

            /// -------------------------------------------
            /// Utility methods
            /// -------------------------------------------

            private lpad (value: any, length: number = 2): string {
                var value_str: string;
                value_str = "" + value;
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

            // Length 7
            private serialiseTeammate (teammate: App.ME2.Teammate): ISerialisedTeammate {
                var elements: string[];
                var roles: number[];

                roles = teammate.roles.slice(0);
                if (teammate.is_recruited()) {
                    roles.push(10);
                }
                if (teammate.is_loyal()) {
                    roles.push(11);
                }
                if (teammate.is_dead()) {
                    roles.push(12);
                }

                elements = [
                    (<number> teammate.henchman.id).toString(16),
                    this.lpad((teammate.death_cause() === undefined ? 0 : teammate.death_cause() + 1).toString(16), 1),
                    this.lpad(teammate.death_stage_id() || 0, 1),
                    this.lpad(this.indexesToFlags(roles).toString(16), 4)
                ];

                return elements.join("");
            }

            private deserialiseTeammate (teammate: ISerialisedTeammate): App.ME2.Teammate {
                var henchman_id: number;
                var death_cause: App.ME2.TeammateDeathCauses;
                var death_stage_id: App.ME2.Stages.StageIDs;
                //var flags: number;
                var is_recruited: boolean;
                var is_loyal: boolean;
                var is_dead: boolean;
                var roles: App.ME2.TeammateRoles[];
                var deserialised: App.ME2.Teammate;

                henchman_id         = parseInt("0x" + teammate.substr(0, 1), 16);
                death_cause         = parseInt("0x" + teammate.substr(1, 1), 16);
                death_stage_id      = parseInt(teammate.substr(2, 1), 10) || undefined;
                roles               = this.flagsToIndexes(parseInt("0x" + teammate.substr(3), 16));

                is_recruited = _.indexOf(roles, 10) >= 0;
                is_loyal = _.indexOf(roles, 11) >= 0;
                is_dead = _.indexOf(roles, 12) >= 0;

                roles = _.without(roles, 10, 11, 12);

                deserialised = new App.ME2.Teammate(this.app.getHenchman(henchman_id), is_recruited, is_loyal, is_dead);
                if (is_dead) {
                    deserialised.die(death_stage_id, death_cause - 1);
                }
                deserialised.roles = roles;

                return deserialised;
            }

            /// -------------------------------------------
            /// Normandy
            /// -------------------------------------------

            // Length: 3
            private serialiseNormandy (normandy: App.ME2.Normandy): ISerialisedNormandy {
                var elements: string[];
                var flags: number;

                flags = 0 + (normandy.has_armour() ? 1 : 0) + (normandy.has_shielding() ? 2 : 0) + (normandy.has_thanix_cannon() ? 4 : 0);

                elements = [
                    this.lpad(normandy.delay(), 2),
                    this.lpad(flags, 1)
                ];

                return elements.join("");
            }

            private deserialiseNormandy (serialised: ISerialisedNormandy): App.ME2.Normandy {
                var flags: number;
                var has_armour: boolean;
                var has_shielding: boolean;
                var has_thanix_cannon: boolean;
                var delay: number;

                delay               = parseInt(serialised.substr(0, 2), 10);
                flags               = parseInt(serialised.substr(2), 10);
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
                    this.lpad(state.stage().id, 2),
                    this.serialiseNormandy(state.normandy),
                    _.map<App.ME2.Teammate, ISerialisedTeammate>(state.teammates().value(), (teammate: App.ME2.Teammate): ISerialisedTeammate => {
                        return this.serialiseTeammate(teammate);
                    }).join("")
                ];

                return elements.join("");
            }

            public deserialise (serialised: ISerialisationSerialised): App.ME2.State {
                var deserialised: App.ME2.State;

                deserialised = new App.ME2.State(this.app);
                deserialised.stage(this.app.stager.getStage(parseInt(serialised.substr(0, 2), 10)));
                deserialised.normandy = this.deserialiseNormandy(serialised.substr(2, 3));
                deserialised.teammates(new App.ME2.Teammates(_.map(serialised.substr(5).match(/.{7}/g), (serialised_teammate: ISerialisedTeammate): App.ME2.Teammate => {
                    return this.deserialiseTeammate(serialised_teammate);
                })));

                return deserialised;
            }

            public applySerialisedState (state: App.ME2.State, serialised: ISerialisationSerialised): void {
                var new_state = this.deserialise(serialised);


                state.normandy.delay(new_state.normandy.delay());
                state.normandy.has_armour(new_state.normandy.has_armour());
                state.normandy.has_shielding(new_state.normandy.has_shielding());
                state.normandy.has_thanix_cannon(new_state.normandy.has_thanix_cannon());

                var new_teammates: App.ME2.Teammates;
                new_teammates = new_state.teammates();

                state.teammates().each((teammate: App.ME2.Teammate, index: number): void => {
                    var new_teammate: App.ME2.Teammate;

                    new_teammate = new_teammates.findByHenchman(teammate.henchman);

                    teammate.is_recruited(new_teammate.is_recruited());
                    teammate.is_loyal(new_teammate.is_loyal());
                    teammate.is_dead(new_teammate.is_dead());
                    teammate.roles = new_teammate.roles;
                    teammate.death_cause = new_teammate.death_cause;
                    teammate.death_stage_id = new_teammate.death_stage_id;
                });

                state.stage(new_state.stage());
            }
        }
    }
}