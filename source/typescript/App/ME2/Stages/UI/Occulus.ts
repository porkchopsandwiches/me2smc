///<reference path="../../../../references.ts" />
module App {
    export module ME2 {
        export module Stages {
            export module UI {
                export interface IOcculus {
                    occulus_squadmate_1: KnockoutObservable<App.ME2.Teammate>;
                    occulus_squadmate_2: KnockoutObservable<App.ME2.Teammate>;
                    occulus_squadmate_1_candidates: KnockoutForcibleComputed<App.ME2.Teammate[]>;
                    occulus_squadmate_2_candidates: KnockoutForcibleComputed<App.ME2.Teammate[]>;
                }

                export class Occulus extends Stage implements IOcculus {
                    public id: string = StageIDs[StageIDs.Occulus];
                    public label: string = "Occulus";
                    public stage: App.ME2.Stages.Occulus;
                    public occulus_squadmate_1: KnockoutObservable<App.ME2.Teammate>;
                    public occulus_squadmate_2: KnockoutObservable<App.ME2.Teammate>;
                    public occulus_squadmate_1_candidates: KnockoutForcibleComputed<App.ME2.Teammate[]>;
                    public occulus_squadmate_2_candidates: KnockoutForcibleComputed<App.ME2.Teammate[]>;
                    //public teammate_fields: string[] = ["occulus_squadmate_1", "occulus_squadmate_2"];
                    public teammate_fields: ITeammateFields = {
                        "occulus_squadmate_1": Stage.genericTeammateFieldFilter,
                        "occulus_squadmate_2": Stage.genericTeammateFieldFilter
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