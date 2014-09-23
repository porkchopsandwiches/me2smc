///<reference path="../../../../references.ts" />
module App {
    export module ME2 {
        export module Stages {
            export module UI {
                export interface ISummary {
                    normandy: App.ME2.UI.Normandy;
                }

                export class Summary extends Stage implements ISummary {
                    public id: string = StageIDs[StageIDs.Summary];
                    public label: string = "Summary";
                    public teammates: App.ME2.UI.Teammate[];
                    public stage: App.ME2.Stages.Setup;
                    public normandy: App.ME2.UI.Normandy;

                    constructor (stage: App.ME2.Stages.IStage) {
                        super(stage);
                    }

                    public setup (): void {
                        this.bootstrapTeammates();
                    }

                    private bootstrapTeammates () {
                        this.teammates = _.map(this.stage.teammates, (teammate: App.ME2.Teammate) => {
                            return new App.ME2.UI.Teammate(teammate);
                        });

                        this.normandy = new App.ME2.UI.Normandy(this.stage.stager.app.normandy);
                    }
                }
            }
        }
    }
}