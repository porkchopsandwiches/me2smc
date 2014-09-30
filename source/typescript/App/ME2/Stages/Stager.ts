///<reference path="../../../references.ts" />
module App {
    export module ME2 {
        export module Stages {

            export interface IStager {
                app: App.Application;
                stages: App.ME2.Stages.IStage[];
                ui: App.ME2.Stages.UI.Stager;
            }

            export class Stager implements IStager {
                public app: App.Application;
                public stages: App.ME2.Stages.IStage[];
                public ui: App.ME2.Stages.UI.Stager;
                private stage: App.ME2.Stages.IStage;
                private freezes: string[];


                constructor (app: App.Application) {
                    this.app = app;
                    this.freezes = [];

                    this.stages = _.sortBy<App.ME2.Stages.IStage, App.ME2.Stages.StageIDs>([
                        new App.ME2.Stages.Setup(this),
                        new App.ME2.Stages.Occulus(this),
                        new App.ME2.Stages.Vents(this),
                        new App.ME2.Stages.LongWalk(this),
                        new App.ME2.Stages.Boss(this),
                        new App.ME2.Stages.Summary(this)
                    ], (stage: App.ME2.Stages.IStage): App.ME2.Stages.StageIDs => {
                        return stage.id;
                    });

                    this.ui = new App.ME2.Stages.UI.Stager(this);
                }

                private getIndexOfStage (stage: App.ME2.Stages.IStage): number {
                    return stage.id;
                    //return _.indexOf(this.stages, stage);
                }

                public previousStage () {
                    var index: number;
                    if (this.stage) {
                        index = this.getIndexOfStage(this.stage) - 1;
                        //this.app.state.teammates = new App.ME2.Teammates(this.defrost(this.freezes[index]));
                        this.app.state = this.app.serialisation.deserialise(this.freezes[index]);
                        this.setStage(this.stages[index]);
                        this.ui.teammates.evaluateImmediate();
                    }
                }

                public nextStage () {
                    var index: number;

                    if (this.stage) {
                        index = this.getIndexOfStage(this.stage);

                        if (this.stage.isEvaluatable()) {

                            // Freeze the current state
                            this.freezes[this.getIndexOfStage(this.stage)] = this.app.serialisation.serialise(this.app.state);

                            this.stage.evaluate();
                            this.ui.teammates.evaluateImmediate();

                            if (index < this.stages.length - 1) {
                                this.setStage(this.stages[this.getIndexOfStage(this.stage) + 1]);
                            }
                        } else {
                            throw new Error("Current Stage is not evaluatable.");
                        }
                    } else {
                        this.setStage(this.stages[0]);
                    }
                }

                private setStage (stage: App.ME2.Stages.IStage) {
                    stage.setup();
                    this.stage = stage;
                    this.ui.stage(stage);
                }
            }
        }
    }
}