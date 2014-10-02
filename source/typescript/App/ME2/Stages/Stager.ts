///<reference path="../../../references.ts" />
module App {
    export module ME2 {
        export module Stages {

            export interface IStager {
                app: App.Application;
            }

            export class Stager implements IStager {
                public app: App.Application;
                private stages: App.ME2.Stages.IStage[];
                private freezes: ISerialisationSerialised[];

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
                }

                public getStage (id: App.ME2.Stages.StageIDs): App.ME2.Stages.IStage {
                    return this.stages[id];
                }

                public previousStage () {
                    var current_stage: App.ME2.Stages.IStage;
                    current_stage = this.app.state.stage();
                    if (current_stage) {
                        this.app.serialisation.applyStateChanges(this.app.state, this.freezes[current_stage.id - 1]);

                        this.setStage(this.stages[current_stage.id - 1]);
                    }
                }

                public nextStage () {
                    var current_stage: App.ME2.Stages.IStage;

                    current_stage = this.app.state.stage();

                    if (current_stage) {
                        if (current_stage.isEvaluatable()) {

                            // Freeze the current state
                            this.freezes[current_stage.id] = this.app.serialisation.serialise(this.app.state);

                            current_stage.evaluate();

                            if (current_stage.id < this.stages.length - 1) {
                                this.setStage(this.stages[current_stage.id + 1]);
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
                    this.app.state.stage(stage);
                }
            }
        }
    }
}