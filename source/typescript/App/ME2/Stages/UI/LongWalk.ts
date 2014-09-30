///<reference path="../../../../references.ts" />
module App {
    export module ME2 {
        export module Stages {
            export module UI {
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

                export class LongWalk extends Stage implements ILongWalk {
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
                            filter: Stage.genericTeammateFieldFilter
                        },
                        {
                            name: "long_walk_squadmate_2",
                            filter: Stage.genericTeammateFieldFilter
                        }
                    ];

                    constructor (stage: App.ME2.Stages.IStage) {
                        super(stage);
                        this.bootstrapTeammateFields();
                    }

                    public setup () {
                        this.setupTeammateFields();
                        this.linkIsEvaluatableToTeammateFields();
                    }
                }
            }
        }
    }
}