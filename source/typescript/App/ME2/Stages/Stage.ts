module App {
    export module ME2 {
        export module Stages {

            export enum StageIDs {
                Setup,
                Occulus,
                Vents,
                LongWalk,
                Boss,
                Summary
            }

            export interface IStage {
                evaluate (): void;
                setup (): void;
                isEvaluatable (): boolean;
                stager: App.ME2.Stages.Stager;
                ui: App.ME2.Stages.UI.IStage;
                id: App.ME2.Stages.StageIDs;
            }

            export class Stage implements IStage {
                public stager: App.ME2.Stages.Stager;
                public ui: App.ME2.Stages.UI.IStage;
                public id: App.ME2.Stages.StageIDs;

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