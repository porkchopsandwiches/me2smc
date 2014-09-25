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
                    if (!this.long_walk_escort.willBeEffectiveLongWalkEscort()) {
                        this.long_walk_escort.die(App.ME2.TeammateDeathCauses.Escort);
                    }

                    // If bubbler is not an expert, or is not loyal, one of the squadmates dies
                    if (!this.long_walk_bubbler.willBeEffectiveLongWalkBubbler()) {
                        (new App.ME2.Teammates(this.teammates)).withRole(App.ME2.TeammateRoles.LongWalkSquadmate).sortByLongWalkDeathPriority().last().die(App.ME2.TeammateDeathCauses.LongWalkBadBubbler);
                    }

                    // If leader is not loyal and not
                    if (!this.long_walk_leader.willBeEffectiveLongWalkLeader()) {
                        this.long_walk_leader.die(App.ME2.TeammateDeathCauses.LongWalkBadLeader);
                    }

                    return this.teammates;
                }

                public isEvaluatable (): boolean {
                    return !!this.long_walk_bubbler && !!this.long_walk_escort && !!this.long_walk_leader && !!this.long_walk_squadmate_1 && !!this.long_walk_squadmate_2;
                }
            }
        }
    }
}