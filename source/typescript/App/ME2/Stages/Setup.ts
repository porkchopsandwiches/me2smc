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
                    this.teammates = _.map(this.stager.app.getHenchmen(), (henchman: App.ME2.Henchman): App.ME2.Teammate => {
                        return new App.ME2.Teammate(henchman, true, true, false);
                    });
                }

                public setup (teammates: App.ME2.Teammate[]): void {
                    //this.teammates = teammates;
                    this.bootstrapTeammates();
                    this.ui.setup();
                }

                public evaluate (): App.ME2.Teammate[] {
                    return this.teammates;
                    /*
                    var henchmen: App.ME2.Henchman[];
                    var teammates: App.ME2.Teammate[];
                    henchmen = this.stager.app.getHenchmen();

                    teammates = _.map(henchmen, (henchman: App.ME2.Henchman): App.ME2.Teammate => {
                        if (henchman.id !== App.ME2.HenchmanIDs.Morinth) {
                            return new App.ME2.Teammate(henchman, true, true, false);
                        }

                        return undefined;
                    });

                    teammates = _.filter(teammates, (v: any) => {
                        return !!v;
                    });

                    return teammates;
                    */
                }
            }
        }
    }
}