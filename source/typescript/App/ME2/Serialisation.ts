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

            private lpad (value: number, length: number = 2) {
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

            private serialiseRoles (roles: App.ME2.TeammateRoles[]): string {
                return this.lpad(this.indexesToFlags(roles), 4);
            }

            private deserialiseRoles (roles: string): App.ME2.TeammateRoles[] {
                return _.map<number, App.ME2.TeammateRoles>(this.flagsToIndexes(parseInt(roles, 10)), (index: number): App.ME2.TeammateRoles => {
                    return index;
                });
            }

            /// -------------------------------------------
            /// Teammates
            /// -------------------------------------------

            // Length 9
            private serialiseTeammate (teammate: App.ME2.Teammate): ISerialisedTeammate {
                var elements: string[];
                var flags: number;

                flags = 0 + (teammate.is_recruited() ? 1 : 0) + (teammate.is_loyal() ? 2 : 0) + (teammate.is_dead() ? 4 : 0);

                elements = [
                    this.lpad(teammate.henchman.id, 2),
                    this.lpad(teammate.death_cause || 0, 1),
                    this.lpad(teammate.death_stage_id || 0, 1),
                    this.lpad(flags, 1),
                    this.serialiseRoles(teammate.roles)
                ];

                return elements.join("");
            }

            private deserialiseTeammate (teammate: ISerialisedTeammate): App.ME2.Teammate {
                var henchman_id: number;
                var death_cause: App.ME2.TeammateDeathCauses;
                var death_stage_id: App.ME2.Stages.StageIDs;
                var flags: number;
                var is_recruited: boolean;
                var is_loyal: boolean;
                var is_dead: boolean;
                var roles: App.ME2.TeammateRoles[];
                var deserialised: App.ME2.Teammate;

                henchman_id     = parseInt(teammate.substr(0, 2), 10);
                death_cause     = parseInt(teammate.substr(2, 1), 10) || undefined;
                death_stage_id  = parseInt(teammate.substr(3, 1), 10) || undefined;
                flags           = parseInt(teammate.substr(4, 1), 10);
                is_recruited    = !!(flags & 1);
                is_loyal        = !!(flags & 2);
                is_dead         = !!(flags & 4);
                roles           = this.deserialiseRoles(teammate.substr(5));

                deserialised = new App.ME2.Teammate(this.app.getHenchman(henchman_id), is_loyal, is_recruited, is_dead);
                if (is_dead) {
                    deserialised.die(death_stage_id, death_cause);
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
                    this.lpad(state.stage_id, 2),
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
                deserialised.stage_id = parseInt(serialised.substr(0, 2), 10);
                deserialised.normandy = this.deserialiseNormandy(serialised.substr(2, 3));
                deserialised.teammates(new App.ME2.Teammates(_.map(serialised.substr(5).match(/.{9}/g), (serialised_teammate: ISerialisedTeammate): App.ME2.Teammate => {
                    return this.deserialiseTeammate(serialised_teammate);
                })));

                return deserialised;
            }

            public applyStateChanges (state: App.ME2.State, serialised: ISerialisationSerialised): void {
                var new_state = this.deserialise(serialised);

                state.stage_id = new_state.stage_id;
                state.normandy.delay(new_state.normandy.delay());
                state.normandy.has_armour(new_state.normandy.has_armour());
                state.normandy.has_shielding(new_state.normandy.has_shielding());
                state.normandy.has_thanix_cannon(new_state.normandy.has_thanix_cannon());
                state.teammates(new App.ME2.Teammates(new_state.teammates().value()));
            }
        }
    }
}