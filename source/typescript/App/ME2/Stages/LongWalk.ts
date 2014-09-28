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

                constructor (stager: App.ME2.Stages.Stager) {
                    super(stager);
                    this.ui = new App.ME2.Stages.UI.LongWalk(this);
                }

                public evaluate (): void {
                    this.long_walk_squadmate_1.addRole(App.ME2.TeammateRoles.LongWalkSquadmate);
                    this.long_walk_squadmate_2.addRole(App.ME2.TeammateRoles.LongWalkSquadmate);
                    this.long_walk_escort.addRole(App.ME2.TeammateRoles.LongWalkEscort);
                    this.long_walk_leader.addRole(App.ME2.TeammateRoles.LongWalkLeader);
                    this.long_walk_bubbler.addRole(App.ME2.TeammateRoles.LongWalkBubbler);

                    // If escort is not loyal, they will die
                    if (this.long_walk_escort.henchman.id !== undefined && !this.long_walk_escort.willBeEffectiveLongWalkEscort()) {
                        this.long_walk_escort.die(App.ME2.TeammateDeathCauses.Escort);
                    }

                    // If bubbler is not an expert, or is not loyal, one of the squadmates dies
                    if (!this.long_walk_bubbler.willBeEffectiveLongWalkBubbler()) {
                        this.stager.teammates.withRole(App.ME2.TeammateRoles.LongWalkSquadmate).sortByLongWalkDeathPriority().last().die(App.ME2.TeammateDeathCauses.LongWalkBadBubbler);
                    }

                    // If leader is not loyal and not
                    if (!this.long_walk_leader.willBeEffectiveLongWalkLeader()) {
                        this.long_walk_leader.die(App.ME2.TeammateDeathCauses.LongWalkBadLeader);
                    }
                }

                public isEvaluatable (): boolean {
                    return this.ui.is_evaluatable();
                }
            }
        }
    }
}