///<reference path="../../../../references.ts" />
module App {
    export module ME2 {
        export module Stages {
            export module UI {
                export interface ISquadmatesStage {
                }

                export class SquadmatesStage extends Stage implements ISquadmatesStage {
                    public stage: App.ME2.Stages.SquadmatesStage;





                    public setupSquadmates () {
                        /*
                        this.proxy<App.ME2.Teammate>("squadmate_1");
                        this.proxy<App.ME2.Teammate>("squadmate_2");

                        this.squadmate_1.subscribe(() => {
                            this.squadmate_2_candidates.evaluateImmediate();
                        });

                        this.squadmate_2.subscribe(() => {
                            this.squadmate_1_candidates.evaluateImmediate();
                        });

                        this.squadmate_1_candidates.evaluateImmediate();
                        this.squadmate_2_candidates.evaluateImmediate();
                        */
                    }
                }
            }
        }
    }
}