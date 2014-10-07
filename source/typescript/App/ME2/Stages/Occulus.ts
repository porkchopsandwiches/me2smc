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
                            filter: App.ME2.Stages.Stage.genericTeammateFieldFilter,
                            role: App.ME2.TeammateRoles.OcculusSquadmate1
                        },
                        {
                            name: "occulus_squadmate_2",
                            filter: App.ME2.Stages.Stage.genericTeammateFieldFilter,
                            role: App.ME2.TeammateRoles.OcculusSquadmate2
                        }
                    ]);
                }

                public evaluate (): App.ME2.TeammateDeathList {
                    var dpt: App.ME2.Teammates;
                    var death_list: App.ME2.TeammateDeathList;

                    death_list = new App.ME2.TeammateDeathList;

                    // Get candidates to die (that is, they were not Occulus Squadmates)
                    dpt = this.stager.app.state.teammates().whoAreRecruited().withoutAnyOfTheseRoles(App.ME2.TeammateRoles.OcculusSquadmate1, App.ME2.TeammateRoles.OcculusSquadmate2);

                    // Apply deaths
                    if (!this.stager.app.state.normandy.has_shielding()) {
                        death_list.add({
                            teammate: dpt.whoAreAlive().sortByShieldingDeathPriority().last(),
                            death_cause: App.ME2.TeammateDeathCauses.ShieldingFailure,
                            death_stage_id: this.id
                        });

                        //dpt.whoAreAlive().sortByShieldingDeathPriority().last().die(this.id, App.ME2.TeammateDeathCauses.ShieldingFailure);
                    }

                    if (!this.stager.app.state.normandy.has_armour()) {
                        //dpt.whoAreAlive().sortByArmourDeathPriority().last().die(this.id, App.ME2.TeammateDeathCauses.ArmourFailure);
                        death_list.add({
                            teammate: dpt.whoAreAlive().sortByArmourDeathPriority().last(),
                            death_cause: App.ME2.TeammateDeathCauses.ArmourFailure,
                            death_stage_id: this.id
                        });
                    }

                    if (!this.stager.app.state.normandy.has_thanix_cannon()) {
                        //dpt.whoAreAlive().sortByCannonDeathPriority().last().die(this.id, App.ME2.TeammateDeathCauses.CannonFailure);
                        death_list.add({
                            teammate: dpt.whoAreAlive().sortByCannonDeathPriority().last(),
                            death_cause: App.ME2.TeammateDeathCauses.CannonFailure,
                            death_stage_id: this.id
                        });
                    }

                    return death_list;
                }
            }
        }
    }
}