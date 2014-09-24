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

                constructor () {
                    super();

                    this.ui = new App.ME2.Stages.UI.Occulus(this);
                }

                public evaluate (): App.ME2.Teammate[] {
                    var death_pool: App.ME2.Teammate[];
                    var shielding_death: App.ME2.Teammate;
                    var armour_death: App.ME2.Teammate;
                    var thanix_cannon_death: App.ME2.Teammate;

                    // Assign roles
                    this.occulus_squadmate_1.addRole(App.ME2.TeammateRoles.OcculusSquadmate);
                    this.occulus_squadmate_2.addRole(App.ME2.TeammateRoles.OcculusSquadmate);

                    // Get candidates for death
                    death_pool = _.filter(this.teammates, (teammate: App.ME2.Teammate): boolean => {
                        return !teammate.is_dead && !teammate.hasRole(App.ME2.TeammateRoles.OcculusSquadmate);
                    });

                    // Apply deaths
                    if (!this.stager.app.normandy.has_shielding) {
                        death_pool = _.sortBy(death_pool, (teammate: App.ME2.Teammate): number => {
                            return teammate.henchman.shielding_death_priority;
                        });
                        shielding_death = death_pool.pop();
                        shielding_death.die(App.ME2.TeammateDeathCauses.ShieldingFailure);
                    }

                    if (!this.stager.app.normandy.has_armour) {
                        death_pool = _.sortBy(death_pool, (teammate: App.ME2.Teammate): number => {
                            return teammate.henchman.armour_death_priority;
                        });
                        armour_death = death_pool.pop();
                        armour_death.die(App.ME2.TeammateDeathCauses.ArmourFailure);
                    }

                    if (!this.stager.app.normandy.has_thanix_cannon) {
                        death_pool = _.sortBy(death_pool, (teammate: App.ME2.Teammate): number => {
                            return teammate.henchman.cannon_death_priority;
                        });
                        thanix_cannon_death = death_pool.pop();
                        thanix_cannon_death.die(App.ME2.TeammateDeathCauses.CannonFailure);
                    }

                    return this.teammates;
                }

                public isEvaluatable (): boolean {
                    //return !!this.occulus_squadmate_1 && !!this.occulus_squadmate_2;
                    return this.ui.is_evaluatable();
                }
            }
        }
    }
}