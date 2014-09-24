///<reference path="../../../references.ts" />
module App {
    export module ME2 {
        export module Stages {
            export interface ISetup {

            }

            export class Setup extends Stage implements ISetup {
                public ui: App.ME2.Stages.UI.Setup;

                constructor () {
                    super();
                    this.ui = new App.ME2.Stages.UI.Setup(this);

                }

                private bootstrapTeammates (): void {
                    this.teammates = _.chain<App.ME2.Henchman>(this.stager.app.getHenchmen()).map<App.ME2.Teammate>((henchman: App.ME2.Henchman): App.ME2.Teammate => {
                        return new App.ME2.Teammate(henchman, henchman.is_essential, false, false);
                    }).sortBy((teammate: App.ME2.Teammate) => {
                        return teammate.henchman.name;
                    }).value();
                }

                public setup (teammates: App.ME2.Teammate[]): void {
                    //this.teammates = teammates;
                    this.bootstrapTeammates();
                    this.ui.setup();
                }

                public evaluate (): App.ME2.Teammate[] {
                    return _.filter(this.teammates, (teammate: App.ME2.Teammate): boolean => {
                        return teammate.is_recruited;
                    });
                }

                public isEvaluatable (): boolean {
                    return this.ui.is_evaluatable();
                }
            }
        }
    }
}