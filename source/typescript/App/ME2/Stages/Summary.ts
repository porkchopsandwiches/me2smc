///<reference path="../../../references.ts" />
module App {
    export module ME2 {
        export module Stages {
            export interface ISummary {
                ui: App.ME2.Stages.UI.Summary;
            }

            export class Summary extends Stage implements ISummary {
                public ui: App.ME2.Stages.UI.Summary;

                constructor () {
                    super();
                    this.ui = new App.ME2.Stages.UI.Summary(this);
                }

                public setup (teammates: App.ME2.Teammate[]): void {
                    this.teammates = teammates;
                    this.ui.setup();
                }

                public evaluate (): App.ME2.Teammate[] {
                    return this.teammates;
                }
            }
        }
    }
}