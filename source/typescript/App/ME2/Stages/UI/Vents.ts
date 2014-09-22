///<reference path="../../../../references.ts" />
module App {
    export module ME2 {
        export module Stages {
            export module UI {
                export interface IVents {
                    vent_squadmate_1: KnockoutObservable<App.ME2.Teammate>;
                    vent_squadmate_1_candidates: KnockoutForcibleComputed<App.ME2.Teammate[]>;
                    vent_squadmate_2: KnockoutObservable<App.ME2.Teammate>;
                    vent_squadmate_2_candidates: KnockoutForcibleComputed<App.ME2.Teammate[]>;
                    vent_venter: KnockoutObservable<App.ME2.Teammate>;
                    vent_venter_candidates: KnockoutForcibleComputed<App.ME2.Teammate[]>;
                    vent_leader: KnockoutObservable<App.ME2.Teammate>;
                    vent_leader_candidates: KnockoutForcibleComputed<App.ME2.Teammate[]>;
                }

                export class Vents extends Stage implements IVents {
                    public id: string = StageIDs[StageIDs.Vents];
                    public label: string = "Vents";
                    public stage: App.ME2.Stages.Vents;

                    public vent_squadmate_1: KnockoutObservable<App.ME2.Teammate>;
                    public vent_squadmate_1_candidates: KnockoutForcibleComputed<App.ME2.Teammate[]>;
                    public vent_squadmate_2: KnockoutObservable<App.ME2.Teammate>;
                    public vent_squadmate_2_candidates: KnockoutForcibleComputed<App.ME2.Teammate[]>;
                    public vent_venter: KnockoutObservable<App.ME2.Teammate>;
                    public vent_venter_candidates: KnockoutForcibleComputed<App.ME2.Teammate[]>;
                    public vent_leader: KnockoutObservable<App.ME2.Teammate>;
                    public vent_leader_candidates: KnockoutForcibleComputed<App.ME2.Teammate[]>;
                    public teammate_fields: ITeammateFields = {
                        "vent_squadmate_1": Stage.genericTeammateFieldFilter,
                        "vent_squadmate_2": Stage.genericTeammateFieldFilter,
                        "vent_venter": (teammate: App.ME2.Teammate): boolean => {
                            return teammate.henchman.is_vent_candidate;
                        },
                        "vent_leader": (teammate: App.ME2.Teammate): boolean => {
                            return teammate.henchman.is_vent_leader_candidate;
                        }
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