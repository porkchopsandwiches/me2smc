///<reference path="../../references.ts" />
module App {
    export module ME2 {

        export interface ISerialisation {
            app: App.Application;

            serialise (state: App.ME2.State): string;
            deserialise (state: string): App.ME2.State;
        }

        interface ISerialisedNormandy {
            has_armour: boolean;
            has_shielding: boolean;
            has_thanix_cannon: boolean;
            delay: number;
        }

        interface ISerialisedTeammate {
            henchman_id: App.ME2.HenchmanIDs;
            is_loyal: boolean;
            is_recruited: boolean;
            is_dead: boolean;
            roles: App.ME2.TeammateRoles[];
            death_cause: App.ME2.TeammateDeathCauses;
            death_stage_id: App.ME2.Stages.StageIDs;
        }

        interface ISerialisationSerialised {
            normandy: ISerialisedNormandy;
            stage_id: App.ME2.Stages.StageIDs;
            teammates: ISerialisedTeammate[];
        }

        export class Serialisation implements ISerialisation {
            app: App.Application;

            constructor (app: App.Application) {
                this.app = app;
            }

            public serialise (state: App.ME2.State): string {
                var serialised: ISerialisationSerialised;

                serialised = {
                    stage_id: state.stage_id,
                    normandy: {
                        delay: state.normandy.delay(),
                        has_armour: state.normandy.has_armour(),
                        has_shielding: state.normandy.has_shielding(),
                        has_thanix_cannon: state.normandy.has_thanix_cannon()
                    },
                    teammates: _.map<App.ME2.Teammate, ISerialisedTeammate>(state.teammates.value(), (teammate: App.ME2.Teammate): ISerialisedTeammate => {
                        return {
                            henchman_id: teammate.henchman.id,
                            henchman_name: teammate.henchman.name,
                            is_loyal: teammate.is_loyal(),
                            is_recruited: teammate.is_recruited(),
                            is_dead: teammate.is_dead(),
                            death_cause: teammate.death_cause,
                            death_stage_id: teammate.death_stage_id,
                            roles: teammate.roles
                        };
                    })
                };

                return JSON.stringify(serialised);
            }

            public deserialise (state: string): App.ME2.State {
                var serialised: ISerialisationSerialised;
                var deserialised: App.ME2.State;

                serialised = JSON.parse(state);
                deserialised = new App.ME2.State(this.app);
                deserialised.stage_id = serialised.stage_id;

                // Defrost Normandy
                deserialised.normandy.delay(serialised.normandy.delay);
                deserialised.normandy.has_armour(serialised.normandy.has_armour);
                deserialised.normandy.has_shielding(serialised.normandy.has_shielding);
                deserialised.normandy.has_thanix_cannon(serialised.normandy.has_thanix_cannon);

                // Defrost teammates
                deserialised.teammates = new App.ME2.Teammates(_.map<ISerialisedTeammate, App.ME2.Teammate>(serialised.teammates, (serialised_teammate: ISerialisedTeammate): App.ME2.Teammate => {
                    var teammate: App.ME2.Teammate;
                    teammate = new App.ME2.Teammate(this.app.getHenchman(serialised_teammate.henchman_id), serialised_teammate.is_loyal, serialised_teammate.is_recruited, serialised_teammate.is_dead);
                    teammate.death_cause = serialised_teammate.death_cause;
                    teammate.death_stage_id = serialised_teammate.death_stage_id;
                    teammate.roles = serialised_teammate.roles;
                    return teammate;
                }));

                return deserialised;
            }
        }
    }
}