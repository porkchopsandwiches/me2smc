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
                    public teammate_fields: ITeammateField[] = [
                        {
                            name: "vent_squadmate_1",
                            filter: Stage.genericTeammateFieldFilter
                        },
                        {
                            name: "vent_squadmate_2",
                            filter: Stage.genericTeammateFieldFilter
                        },
                        {
                            name: "vent_venter",
                            filter: (teammate: App.ME2.Teammate): boolean => {
                                return !teammate.is_dead() && teammate.henchman.is_vent_candidate;
                            }
                        },
                        {
                            name: "vent_leader",
                            filter: (teammate: App.ME2.Teammate): boolean => {
                                return !teammate.is_dead() && teammate.henchman.is_leader_candidate;
                            }
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