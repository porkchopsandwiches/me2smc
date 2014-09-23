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
                    public id: string = StageIDs[StageIDs.LongWalk];
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

                    public teammate_fields: ITeammateFields = {
                        "long_walk_bubbler": (teammate: App.ME2.Teammate): boolean => {
                            return !teammate.is_dead && teammate.henchman.is_bubble_candidate;
                        },
                        "long_walk_leader": (teammate: App.ME2.Teammate): boolean => {
                            return !teammate.is_dead && teammate.henchman.is_long_walk_leader_candidate;
                        },
                        "long_walk_escort": (teammate: App.ME2.Teammate): boolean => {
                            return !teammate.is_dead && teammate.henchman.is_escort_candidate;
                        },
                        "long_walk_squadmate_1": Stage.genericTeammateFieldFilter,
                        "long_walk_squadmate_2": Stage.genericTeammateFieldFilter
                    }

                    constructor (stage: App.ME2.Stages.IStage) {
                        super(stage);
                        this.bootstrapTeammateFields();
                    }

                    public setup () {
                        this.setupTeammateFields();
                    }
                }
            }
        }
    }
}