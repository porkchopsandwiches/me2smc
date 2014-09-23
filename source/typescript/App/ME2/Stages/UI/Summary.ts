///<reference path="../../../../references.ts" />
module App {
    export module ME2 {
        export module Stages {
            export module UI {
                export interface ISummary {
                    shepard_lives: KnockoutObservable<boolean>;
                }

                export class Summary extends Stage implements ISummary {
                    public id: string = StageIDs[StageIDs.Summary];
                    public label: string = "Summary";
                    public stage: App.ME2.Stages.Setup;
                    public shepard_lives: KnockoutObservable<boolean>;

                    constructor (stage: App.ME2.Stages.IStage) {
                        super(stage);
                        this.shepard_lives = ko.observable(undefined);
                    }

                    public setup (): void {
                        var living_teammates: App.ME2.Teammate[];
                        living_teammates = _.filter(this.stage.teammates, (teammate: App.ME2.Teammate): boolean => {
                            return !teammate.is_dead;
                        });

                        this.shepard_lives(living_teammates.length > 1);
                    }
                }
            }
        }
    }
}