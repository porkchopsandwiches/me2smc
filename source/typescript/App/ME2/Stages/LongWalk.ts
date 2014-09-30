module App {
    export module ME2 {
        export module Stages {
            export interface ILongWalk {
                long_walk_squadmate_1: KnockoutObservable<App.ME2.Teammate>;
                long_walk_squadmate_1_candidates: KnockoutForcibleComputed<App.ME2.Teammate[]>;
                long_walk_squadmate_2: KnockoutObservable<App.ME2.Teammate>;
                long_walk_squadmate_2_candidates: KnockoutForcibleComputed<App.ME2.Teammate[]>;
                long_walk_escort: KnockoutObservable<App.ME2.Teammate>;
                long_walk_escort_candidates: KnockoutForcibleComputed<App.ME2.Teammate[]>;
                long_walk_bubbler: KnockoutObservable<App.ME2.Teammate>;
                long_walk_bubbler_candidates: KnockoutForcibleComputed<App.ME2.Teammate[]>;
                long_walk_leader: KnockoutObservable<App.ME2.Teammate>;
                long_walk_leader_candidates: KnockoutForcibleComputed<App.ME2.Teammate[]>;
            }

            export class LongWalk extends UIStage implements ILongWalk {
                public id: StageIDs = App.ME2.Stages.StageIDs.LongWalk;
                public label: string = "Long Walk";
                public long_walk_squadmate_1: KnockoutObservable<App.ME2.Teammate>;
                public long_walk_squadmate_1_candidates: KnockoutForcibleComputed<App.ME2.Teammate[]>;
                public long_walk_squadmate_2: KnockoutObservable<App.ME2.Teammate>;
                public long_walk_squadmate_2_candidates: KnockoutForcibleComputed<App.ME2.Teammate[]>;
                public long_walk_escort: KnockoutObservable<App.ME2.Teammate>;
                public long_walk_escort_candidates: KnockoutForcibleComputed<App.ME2.Teammate[]>;
                public long_walk_bubbler: KnockoutObservable<App.ME2.Teammate>;
                public long_walk_bubbler_candidates: KnockoutForcibleComputed<App.ME2.Teammate[]>;
                public long_walk_leader: KnockoutObservable<App.ME2.Teammate>;
                public long_walk_leader_candidates: KnockoutForcibleComputed<App.ME2.Teammate[]>;

                public teammate_fields: ITeammateField[] = [
                    {
                        name: "long_walk_bubbler",
                        filter: (teammate: App.ME2.Teammate): boolean => {
                            return !teammate.is_dead() && teammate.henchman.is_bubble_candidate;
                        }
                    },
                    {
                        name: "long_walk_leader",
                        filter: (teammate: App.ME2.Teammate): boolean => {
                            return !teammate.is_dead() && teammate.henchman.is_leader_candidate;
                        }
                    },
                    {
                        name: "long_walk_escort",
                        filter: (teammate: App.ME2.Teammate, teammates: App.ME2.Teammates): boolean => {

                            // If there are only 4 living teammates, no one can be escort
                            if (teammates.alive().length() <= 4) {
                                return false;
                            }

                            return !teammate.is_dead() && teammate.henchman.is_escort_candidate;
                        },
                        optional: true
                    },
                    {
                        name: "long_walk_squadmate_1",
                        filter: UIStage.genericTeammateFieldFilter
                    },
                    {
                        name: "long_walk_squadmate_2",
                        filter: UIStage.genericTeammateFieldFilter
                    }
                ];

                constructor (stager: App.ME2.Stages.Stager) {
                    super(stager);
                    this.bootstrapTeammateFields();
                }

                public evaluate (): void {
                    this.long_walk_squadmate_1().addRole(App.ME2.TeammateRoles.LongWalkSquadmate);
                    this.long_walk_squadmate_2().addRole(App.ME2.TeammateRoles.LongWalkSquadmate);
                    this.long_walk_escort().addRole(App.ME2.TeammateRoles.LongWalkEscort);
                    this.long_walk_leader().addRole(App.ME2.TeammateRoles.LongWalkLeader);
                    this.long_walk_bubbler().addRole(App.ME2.TeammateRoles.LongWalkBubbler);

                    // If escort is not loyal, they will die
                    if (this.long_walk_escort().henchman.id !== undefined && !this.long_walk_escort().willBeEffectiveLongWalkEscort()) {
                        this.long_walk_escort().die(this.id, App.ME2.TeammateDeathCauses.Escort);
                    }

                    // If bubbler is not an expert, or is not loyal, one of the squadmates dies
                    if (!this.long_walk_bubbler().willBeEffectiveLongWalkBubbler()) {
                        this.stager.app.state.teammates.withRole(App.ME2.TeammateRoles.LongWalkSquadmate).sortByLongWalkDeathPriority().last().die(this.id, App.ME2.TeammateDeathCauses.LongWalkBadBubbler);
                    }

                    // If leader is not loyal and not
                    if (!this.long_walk_leader().willBeEffectiveLongWalkLeader()) {
                        this.long_walk_leader().die(this.id, App.ME2.TeammateDeathCauses.LongWalkBadLeader);
                    }
                }
            }
        }
    }
}