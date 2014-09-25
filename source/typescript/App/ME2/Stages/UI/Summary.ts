///<reference path="../../../../references.ts" />
module App {
    export module ME2 {
        export module Stages {
            export module UI {
                export interface ISummary {
                    shepard_lives: KnockoutObservable<boolean>;
                    shepard_pulled_up_by: KnockoutObservable<App.ME2.Teammate>;
                    defence_reporter: KnockoutObservable<App.ME2.Teammate>;
                    keep_base_advocate: KnockoutObservable<App.ME2.Teammate>;
                    destroy_base_advocate: KnockoutObservable<App.ME2.Teammate>;
                }

                export class Summary extends Stage implements ISummary {
                    public id: string = StageIDs[StageIDs.Summary];
                    public label: string = "Summary";
                    public stage: App.ME2.Stages.Setup;
                    public shepard_lives: KnockoutObservable<boolean>;
                    public shepard_pulled_up_by: KnockoutObservable<App.ME2.Teammate>;
                    public defence_reporter: KnockoutObservable<App.ME2.Teammate>;
                    public keep_base_advocate: KnockoutObservable<App.ME2.Teammate>;
                    public destroy_base_advocate: KnockoutObservable<App.ME2.Teammate>;

                    constructor (stage: App.ME2.Stages.IStage) {
                        super(stage);
                        this.shepard_lives = ko.observable(undefined);
                        this.shepard_pulled_up_by = ko.observable(undefined);
                        this.defence_reporter = ko.observable(undefined);
                        this.keep_base_advocate = ko.observable(undefined);
                        this.destroy_base_advocate = ko.observable(undefined);
                    }

                    private getLivingTeammates (): App.ME2.Teammate[] {
                        return _.filter(this.stage.stager.teammates, (teammate: App.ME2.Teammate): boolean => {
                            return !teammate.is_dead;
                        });
                    }

                    private getShepardLives (): boolean {
                        return this.getLivingTeammates().length > 1;
                    }

                    private getShepardCatcher (): App.ME2.Teammate {
                        var living_teammates: App.ME2.Teammate[];
                        var score: number;
                        living_teammates = _.sortBy(this.getLivingTeammates(), (teammate: App.ME2.Teammate): number => {
                            score = teammate.henchman.cutscene_rescue_priority + (teammate.hasRole(App.ME2.TeammateRoles.BossSquadmate) ? 100 : 0);
                            return score;
                        });

                        return living_teammates.length > 1 ? living_teammates.pop() : undefined;
                    }

                    private getDefenceReporter (): App.ME2.Teammate {
                        return _.chain<App.ME2.Teammate>(this.stage.stager.teammates).filter((teammate: App.ME2.Teammate): boolean => {
                            return teammate.hasRole(App.ME2.TeammateRoles.HeldTheLine);
                        }).sortBy((teammate: App.ME2.Teammate): number => {
                            return teammate.henchman.defence_report_priority;
                        }).pop().value();
                    }

                    private getKeepBaseAdvocate (): App.ME2.Teammate {
                        return _.chain<App.ME2.Teammate>(this.stage.stager.teammates).filter((teammate: App.ME2.Teammate): boolean => {
                            return teammate.hasRole(App.ME2.TeammateRoles.BossSquadmate) && teammate.henchman.keep_base_priority > 0;
                        }).sortBy((teammate: App.ME2.Teammate): number => {
                            return teammate.henchman.keep_base_priority;
                        }).pop().value();
                    }

                    private getDestroyBaseAdvocate (): App.ME2.Teammate {
                        return _.chain<App.ME2.Teammate>(this.stage.stager.teammates).filter((teammate: App.ME2.Teammate): boolean => {
                            return teammate.hasRole(App.ME2.TeammateRoles.BossSquadmate) && teammate.henchman.destroy_base_priority > 0;
                        }).sortBy((teammate: App.ME2.Teammate): number => {
                            return teammate.henchman.destroy_base_priority;
                        }).pop().value();
                    }

                    public setup (): void {
                        this.defence_reporter(this.getDefenceReporter());
                        this.shepard_lives(this.getShepardLives());
                        this.shepard_pulled_up_by(this.getShepardCatcher());
                        this.keep_base_advocate(this.getKeepBaseAdvocate());
                        this.destroy_base_advocate(this.getDestroyBaseAdvocate());
                    }
                }
            }
        }
    }
}