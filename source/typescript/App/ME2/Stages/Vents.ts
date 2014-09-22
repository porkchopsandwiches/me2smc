///<reference path="../../../references.ts" />
module App {
    export module ME2 {
        export module Stages {

            export interface IVents {
                vent_squadmate_1: App.ME2.Teammate;
                vent_squadmate_2: App.ME2.Teammate;
                vent_venter: App.ME2.Teammate;
                vent_leader: App.ME2.Teammate;
            }

            export class Vents extends Stage implements IVents {
                public vent_squadmate_1: App.ME2.Teammate;
                public vent_squadmate_2: App.ME2.Teammate;
                public vent_venter: App.ME2.Teammate;
                public vent_leader: App.ME2.Teammate;
                public ui: App.ME2.Stages.UI.Vents;

                constructor () {
                    super();
                    this.ui = new App.ME2.Stages.UI.Vents(this);
                }

                public evaluate (): App.ME2.Teammate[] {
                    this.vent_squadmate_1.addRole(App.ME2.TeammateRoles.VentsSquadmate);
                    this.vent_squadmate_2.addRole(App.ME2.TeammateRoles.VentsSquadmate);
                    this.vent_venter.addRole(App.ME2.TeammateRoles.VentsVenter);
                    this.vent_leader.addRole(App.ME2.TeammateRoles.VentsLeader);

                    if (this.vent_venter.henchman.is_tech_expert && this.vent_venter.is_loyal && this.vent_leader.henchman.is_leader && this.vent_leader.is_loyal) {
                        // Everyone lives
                    } else {
                        this.vent_venter.die(App.ME2.TeammateDeathCauses.Vents);
                    }

                    return this.teammates;
                }
            }
        }
    }
}