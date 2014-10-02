///<reference path="../../../references.ts" />
module App {
    export module ME2 {
        export module Stages {
            export interface IOcculus {
            }

            export class Occulus extends Stage implements IOcculus {
                public id: StageIDs = App.ME2.Stages.StageIDs.Occulus;
                public label: string = "Occulus";

                constructor (stager: App.ME2.Stages.Stager) {
                    super(stager);
                    //this.bootstrapTeammateFields();
                    this.configureFields([
                        {
                            name: "occulus_squadmate_1",
                            filter: App.ME2.Stages.Stage.genericTeammateFieldFilter
                        },
                        {
                            name: "occulus_squadmate_2",
                            filter: App.ME2.Stages.Stage.genericTeammateFieldFilter
                        }
                    ]);
                }

                public evaluate () {
                    var dpt: App.ME2.Teammates;

                    this.getFieldValue("occulus_squadmate_1").addRole(App.ME2.TeammateRoles.OcculusSquadmate);
                    this.getFieldValue("occulus_squadmate_2").addRole(App.ME2.TeammateRoles.OcculusSquadmate);

                    // Get candidates to die (that is, they were not Occulus Squadmates)
                    dpt = this.stager.app.state.teammates().whoAreRecruited().withoutRole(App.ME2.TeammateRoles.OcculusSquadmate);

                    // Apply deaths
                    if (!this.stager.app.state.normandy.has_shielding()) {
                        dpt.whoAreAlive().sortByShieldingDeathPriority().last().die(this.id, App.ME2.TeammateDeathCauses.ShieldingFailure);
                    }

                    if (!this.stager.app.state.normandy.has_armour()) {
                        dpt.whoAreAlive().sortByArmourDeathPriority().last().die(this.id, App.ME2.TeammateDeathCauses.ArmourFailure);
                    }

                    if (!this.stager.app.state.normandy.has_thanix_cannon()) {
                        dpt.whoAreAlive().sortByCannonDeathPriority().last().die(this.id, App.ME2.TeammateDeathCauses.CannonFailure);
                    }
                }
            }
        }
    }
}