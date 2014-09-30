///<reference path="../../../references.ts" />
module App {
    export module ME2 {
        export module Stages {
            export interface ISummary {
                ui: App.ME2.Stages.UI.Summary;
            }

            export class Summary extends Stage implements ISummary {
                public id: StageIDs = App.ME2.Stages.StageIDs.Summary;
                public ui: App.ME2.Stages.UI.Summary;

                constructor (stager: App.ME2.Stages.Stager) {
                    super(stager);
                    this.ui = new App.ME2.Stages.UI.Summary(this);
                }
            }
        }
    }
}