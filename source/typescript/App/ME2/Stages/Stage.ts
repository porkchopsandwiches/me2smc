module App {
    export module ME2 {
        export module Stages {


            export interface IStage {
                evaluate: (teammates: App.ME2.Teammate[]) => App.ME2.Teammate[];
                setup: (teammates: App.ME2.Teammate[]) => void;
                isEvaluatable: () => boolean;
                stager: App.ME2.Stages.Stager;
                ui: App.ME2.Stages.UI.IStage;
                teammates: App.ME2.Teammate[];
            }

            export class Stage implements IStage {
                public stager: App.ME2.Stages.Stager;
                public ui: App.ME2.Stages.UI.IStage;
                public teammates: App.ME2.Teammate[];

                constructor () {
                }

                public setStager (stager: App.ME2.Stages.Stager): Stage {
                    this.stager = stager;
                    return this;
                }

                public evaluate (): App.ME2.Teammate[] {
                    return this.teammates;
                }

                public setup (teammates: App.ME2.Teammate[]): void {
                    this.teammates = teammates;
                    this.ui.setup();
                }

                public isEvaluatable (): boolean {
                    return true;
                }
            }
        }
    }
}