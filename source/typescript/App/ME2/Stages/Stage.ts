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
                id: App.ME2.Stages.StageIDs;
                label: string;
            }

            export class Stage implements IStage {
                public stager: App.ME2.Stages.Stager;
                public id: App.ME2.Stages.StageIDs;
                public label: string;

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
                }

                public isEvaluatable (): boolean {
                    return false;
                }
            }
        }
    }
}