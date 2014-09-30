///<reference path="../../../references.ts" />
module App {
    export module ME2 {
        export module Stages {
            export interface IOcculus {
                occulus_squadmate_1: KnockoutObservable<App.ME2.Teammate>;
                occulus_squadmate_2: KnockoutObservable<App.ME2.Teammate>;
                occulus_squadmate_1_candidates: KnockoutForcibleComputed<App.ME2.Teammate[]>;
                occulus_squadmate_2_candidates: KnockoutForcibleComputed<App.ME2.Teammate[]>;
            }

            export class Occulus extends UIStage implements IOcculus {
                public id: StageIDs = App.ME2.Stages.StageIDs.Occulus;
                public label: string = "Occulus";
                public occulus_squadmate_1: KnockoutObservable<App.ME2.Teammate>;
                public occulus_squadmate_2: KnockoutObservable<App.ME2.Teammate>;
                public occulus_squadmate_1_candidates: KnockoutForcibleComputed<App.ME2.Teammate[]>;
                public occulus_squadmate_2_candidates: KnockoutForcibleComputed<App.ME2.Teammate[]>;
                public teammate_fields: ITeammateField[] = [
                    {
                        name: "occulus_squadmate_1",
                        filter: UIStage.genericTeammateFieldFilter
                    },
                    {
                        name: "occulus_squadmate_2",
                        filter: UIStage.genericTeammateFieldFilter
                    }
                ];

                constructor (stager: App.ME2.Stages.Stager) {
                    super(stager);
                    this.bootstrapTeammateFields();
                }

                public evaluate () {
                    var dpt: App.ME2.Teammates;

                    // Assign roles
                    this.occulus_squadmate_1().addRole(App.ME2.TeammateRoles.OcculusSquadmate);
                    this.occulus_squadmate_2().addRole(App.ME2.TeammateRoles.OcculusSquadmate);

                    // Get candidates to die (that is, they were not Occulus Squadmates)
                    dpt = this.stager.app.state.teammates.withoutRole(App.ME2.TeammateRoles.OcculusSquadmate);

                    // Apply deaths
                    if (!this.stager.app.state.normandy.has_shielding()) {
                        dpt.alive().sortByShieldingDeathPriority().last().die(this.id, App.ME2.TeammateDeathCauses.ShieldingFailure);
                    }

                    if (!this.stager.app.state.normandy.has_armour()) {
                        dpt.alive().sortByArmourDeathPriority().last().die(this.id, App.ME2.TeammateDeathCauses.ArmourFailure);
                    }

                    if (!this.stager.app.state.normandy.has_thanix_cannon()) {
                        dpt.alive().sortByCannonDeathPriority().last().die(this.id, App.ME2.TeammateDeathCauses.CannonFailure);
                    }
                }
            }
        }
    }
}