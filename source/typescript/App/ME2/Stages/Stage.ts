module App {
    export module ME2 {
        export module Stages {


            export interface IStage {
                evaluate (): void;
                setup (): void;
                isEvaluatable (): boolean;
                stager: App.ME2.Stages.Stager;
                ui: App.ME2.Stages.UI.IStage;
            }

            export class Stage implements IStage {
                public stager: App.ME2.Stages.Stager;
                public ui: App.ME2.Stages.UI.IStage;

                constructor (stager: App.ME2.Stages.Stager) {
                    this.stager = stager;
                }

                public setStager (stager: App.ME2.Stages.Stager): Stage {
                    this.stager = stager;
                    return this;
                }

                public evaluate (): void {
                }

                public setup (): void {
                    this.ui.setup();
                }

                public isEvaluatable (): boolean {
                    return false;
                }
            }
        }
    }
}