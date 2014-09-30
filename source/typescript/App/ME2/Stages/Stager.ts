///<reference path="../../../references.ts" />
module App {
    export module ME2 {
        export module Stages {

            export interface IStager {
                app: App.Application;
                stages: App.ME2.Stages.IStage[];
                stage: KnockoutObservable<App.ME2.Stages.IStage>;
                teammates: KnockoutForcibleComputed<App.ME2.Teammate[]>;
            }

            export class Stager implements IStager {
                public app: App.Application;
                public stages: App.ME2.Stages.IStage[];
                private freezes: string[];
                public stage: KnockoutObservable<App.ME2.Stages.IStage>;
                public teammates: KnockoutForcibleComputed<App.ME2.Teammate[]>;

                constructor (app: App.Application) {
                    this.app = app;
                    this.freezes = [];
                    this.stage = ko.observable(undefined);

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
                    /*

                    this.stages = [
                        new App.ME2.Stages.Setup(this),
                        new App.ME2.Stages.Occulus(this),
                        new App.ME2.Stages.Vents(this),
                        new App.ME2.Stages.LongWalk(this),
                        new App.ME2.Stages.Boss(this),
                        new App.ME2.Stages.Summary(this)
                    ];
                    */

                    this.teammates = ko.forcibleComputed(() => {
                        return this.app.state.teammates.value();
                    });

                    // Track changes to the stage ID in the state
                    this.stage.subscribe((stage: App.ME2.Stages.IStage) => {
                        this.app.state.stage_id = stage.id;
                    });
                }

                public previousStage () {
                    var current_stage: App.ME2.Stages.IStage;
                    current_stage = this.stage();
                    if (current_stage) {
                        this.app.state = this.app.serialisation.deserialise(this.freezes[current_stage.id - 1]);
                        this.setStage(this.stages[current_stage.id - 1]);
                        this.teammates.evaluateImmediate();
                    }
                }

                public nextStage () {
                    var current_stage: App.ME2.Stages.IStage;

                    current_stage = this.stage();

                    if (current_stage) {
                        if (current_stage.isEvaluatable()) {

                            // Freeze the current state
                            this.freezes[current_stage.id] = this.app.serialisation.serialise(this.app.state);

                            this.stage().evaluate();
                            this.teammates.evaluateImmediate();

                            console.log(current_stage.id, this.stages[current_stage.id + 1]);

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
                    //this.stage = stage;
                    this.stage(stage);
                }
            }
        }
    }
}