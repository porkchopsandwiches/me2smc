module App {
    export module ME2 {
        export module Stages {
            export interface ILongWalk {
                long_walk_squadmate_1: App.ME2.Teammate;
                long_walk_squadmate_2: App.ME2.Teammate;
                long_walk_escort: App.ME2.Teammate;
                long_walk_leader: App.ME2.Teammate;
                long_walk_bubbler: App.ME2.Teammate;
            }

            export class LongWalk extends Stage implements ILongWalk {
                public ui: App.ME2.Stages.UI.LongWalk;
                long_walk_squadmate_1: App.ME2.Teammate;
                long_walk_squadmate_2: App.ME2.Teammate;
                long_walk_escort: App.ME2.Teammate;
                long_walk_leader: App.ME2.Teammate;
                long_walk_bubbler: App.ME2.Teammate;

                constructor () {
                    super();
                    this.ui = new App.ME2.Stages.UI.LongWalk(this);
                }

                public evaluate (): App.ME2.Teammate[] {
                    this.long_walk_squadmate_1.addRole(App.ME2.TeammateRoles.LongWalkSquadmate);
                    this.long_walk_squadmate_2.addRole(App.ME2.TeammateRoles.LongWalkSquadmate);
                    this.long_walk_escort.addRole(App.ME2.TeammateRoles.LongWalkEscort);
                    this.long_walk_leader.addRole(App.ME2.TeammateRoles.LongWalkLeader);
                    this.long_walk_bubbler.addRole(App.ME2.TeammateRoles.LongWalkBubbler);

                    // If escort is not loyal, they will die
                    if (!this.long_walk_escort.is_loyal) {
                        this.long_walk_escort.die(App.ME2.TeammateDeathCauses.Escort);
                    }

                    // If bubbler is not an expert, or is not loyal, one of the squadmates dies
                    if (this.long_walk_bubbler.is_loyal && this.long_walk_bubbler.henchman.is_biotic_expert) {
                        // OK
                    } else {
                        if (this.long_walk_squadmate_1.henchman.long_walk_death_priority > this.long_walk_squadmate_2.henchman.long_walk_death_priority) {
                            this.long_walk_squadmate_1.die(App.ME2.TeammateDeathCauses.LongWalk);
                        } else {
                            this.long_walk_squadmate_2.die(App.ME2.TeammateDeathCauses.LongWalk);
                        }
                    }

                    if (this.long_walk_leader.henchman.is_long_walk_leader_candidate && (this.long_walk_leader.is_loyal || this.long_walk_leader.henchman.is_super_leader)) {
                        // Leader survives
                    } else {
                        this.long_walk_leader.die(App.ME2.TeammateDeathCauses.LongWalk);
                    }

                    return this.teammates;
                }
            }
        }
    }
}