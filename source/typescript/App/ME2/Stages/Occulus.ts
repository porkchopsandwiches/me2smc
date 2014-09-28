///<reference path="../../../references.ts" />
module App {
    export module ME2 {
        export module Stages {
            export interface IOcculus {
                occulus_squadmate_1: App.ME2.Teammate;
                occulus_squadmate_2: App.ME2.Teammate;
            }

            export class Occulus extends Stage implements IOcculus {
                public ui: App.ME2.Stages.UI.Occulus;
                public occulus_squadmate_1: App.ME2.Teammate;
                public occulus_squadmate_2: App.ME2.Teammate;

                constructor (stager: App.ME2.Stages.Stager) {
                    super(stager);
                    this.ui = new App.ME2.Stages.UI.Occulus(this);
                }

                public evaluate () {
                    var dpt: App.ME2.Teammates;

                    // Assign roles
                    this.occulus_squadmate_1.addRole(App.ME2.TeammateRoles.OcculusSquadmate);
                    this.occulus_squadmate_2.addRole(App.ME2.TeammateRoles.OcculusSquadmate);

                    // Get candidates to die (that is, they were not Occulus Squadmates)
                    dpt = this.stager.teammates.withoutRole(App.ME2.TeammateRoles.OcculusSquadmate);

                    // Apply deaths
                    if (!this.stager.app.normandy.has_shielding) {
                        dpt.alive().sortByShieldingDeathPriority().last().die(this.ui.id, App.ME2.TeammateDeathCauses.ShieldingFailure);
                    }

                    if (!this.stager.app.normandy.has_armour) {
                        dpt.alive().sortByArmourDeathPriority().last().die(this.ui.id, App.ME2.TeammateDeathCauses.ArmourFailure);
                    }

                    if (!this.stager.app.normandy.has_thanix_cannon) {
                        console.log("no thanix channon");
                        console.log("killing", dpt.alive().sortByCannonDeathPriority().last());
                        dpt.alive().sortByCannonDeathPriority().last().die(this.ui.id, App.ME2.TeammateDeathCauses.CannonFailure);
                    }
                }

                public isEvaluatable (): boolean {
                    return this.ui.is_evaluatable();
                }
            }
        }
    }
}