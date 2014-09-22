///<reference path="../../../../references.ts" />
module App {
    export module ME2 {
        export module Stages {
            export module UI {
                export interface IBoss {
                    boss_squadmate_1: KnockoutObservable<App.ME2.Teammate>;
                    boss_squadmate_2: KnockoutObservable<App.ME2.Teammate>;
                    boss_squadmate_1_candidates: KnockoutForcibleComputed<App.ME2.Teammate[]>;
                    boss_squadmate_2_candidates: KnockoutForcibleComputed<App.ME2.Teammate[]>;
                }

                export class Boss extends Stage implements IBoss {
                    public id: string = StageIDs[StageIDs.Boss];
                    public label: string = "Boss";

                    public boss_squadmate_1: KnockoutObservable<App.ME2.Teammate>;
                    public boss_squadmate_2: KnockoutObservable<App.ME2.Teammate>;
                    public boss_squadmate_1_candidates: KnockoutForcibleComputed<App.ME2.Teammate[]>;
                    public boss_squadmate_2_candidates: KnockoutForcibleComputed<App.ME2.Teammate[]>;
                    public teammate_fields: ITeammateFields = {
                        "boss_squadmate_1": Stage.genericTeammateFieldFilter,
                        "boss_squadmate_2": Stage.genericTeammateFieldFilter
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