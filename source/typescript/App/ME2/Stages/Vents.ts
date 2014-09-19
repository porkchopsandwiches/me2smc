///<reference path="../../../references.ts" />
module App {
    export module ME2 {
        export module Stages {

            export interface IVents {
                vent_squadmate_1: App.ME2.Teammate;
                vent_squadmate_2: App.ME2.Teammate;
                vent_ventmate: App.ME2.Teammate;
                vent_leader: App.ME2.Teammate;
            }

            export class Vents extends SquadmatesStage implements IVents {
                public vent_squadmate_1: App.ME2.Teammate;
                public vent_squadmate_2: App.ME2.Teammate;
                public vent_ventmate: App.ME2.Teammate;
                public vent_leader: App.ME2.Teammate;
                public ui: App.ME2.Stages.UI.Vents;

                constructor () {
                    super();
                    this.ui = new App.ME2.Stages.UI.Vents(this);
                }

                public evaluate (): App.ME2.Teammate[] {
                    var death_pool: App.ME2.Teammate[];

                    // Temporary -- pre-select the
                    // @todo remove
                    //this.squadmate_1 = this.teammates[0];
                    //this.squadmate_2 = this.teammates[1];
                    //this.venter = this.teammates[2];
                    //this.leader = this.teammates[3];

                    //deathpool = _.without(teammates, this.squadmate_1, this.squadmate_2, this.venter);

                    if (this.vent_ventmate.henchman.is_tech_expert && this.vent_ventmate.is_loyal && this.vent_leader.henchman.is_leader && this.vent_leader.is_loyal) {
                        // Everyone lives
                    } else {
                        this.vent_ventmate.die(App.ME2.TeammateDeathCauses.Vents);
                    }

                    return this.teammates;
                }
            }
        }
    }
}