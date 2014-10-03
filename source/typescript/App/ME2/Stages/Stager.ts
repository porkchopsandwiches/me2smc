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
                private initial_freeze: ISerialisationSerialised;
                public can_go_back: KnockoutObservable<boolean>;

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

                    this.app.state.stage.subscribe((stage: App.ME2.Stages.IStage) => {
                        stage.setup();
                    });

                    this.can_go_back = ko.observable<boolean>(false);

                    // Apply the first stage
                    this.app.state.stage(this.getStage(0));

                    // Freeze an initial state for resetting
                    this.initial_freeze = this.app.state.serialise();
                }

                public getStage (id: App.ME2.Stages.StageIDs): App.ME2.Stages.IStage {
                    return this.stages[id];
                }

                private freeze () {
                    this.freezes.push(this.app.state.serialise());
                    this.can_go_back(true);
                }

                public reset () {
                    this.app.state.applySerialisedState(this.initial_freeze);
                }

                public back () {
                    if (this.can_go_back()) {
                        this.app.state.applySerialisedState(this.freezes.pop());
                        this.can_go_back(!!this.freezes.length);
                    }
                }

                public next () {
                    var current_stage: App.ME2.Stages.IStage;

                    current_stage = this.app.state.stage();

                    if (current_stage.isEvaluatable()) {

                        // Freeze the current state
                        this.freeze();

                        current_stage.evaluate();

                        if (current_stage.id < this.stages.length - 1) {
                            this.app.state.stage(this.getStage(current_stage.id + 1));
                        }
                    }
                }
            }
        }
    }
}