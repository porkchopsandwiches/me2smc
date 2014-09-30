///<reference path="../../../references.ts" />
module App {
    export module ME2 {
        export module Stages {
            export interface ISetup {

            }

            export class Setup extends Stage implements ISetup {
                public id: StageIDs = App.ME2.Stages.StageIDs.Setup;
                public ui: App.ME2.Stages.UI.Setup;

                constructor (stager: App.ME2.Stages.Stager) {
                    super(stager);
                    this.ui = new App.ME2.Stages.UI.Setup(this);
                }

                public evaluate () {

                    // Limit teammates to those recruited
                    this.stager.app.state.teammates = this.stager.app.state.teammates.recruited();
                }

                public isEvaluatable (): boolean {
                    return this.ui.is_evaluatable();
                }
            }
        }
    }
}