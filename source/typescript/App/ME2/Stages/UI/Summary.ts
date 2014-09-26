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

                export enum SummaryCrewSurvivalOptions {
                    AllSurvived,
                    HalfSurvived,
                    AllDied
                }

                export class Summary extends Stage implements ISummary {
                    public id: StageIDs = StageIDs.Summary;
                    public label: string = "Summary";
                    public stage: App.ME2.Stages.Setup;
                    public shepard_lives: KnockoutObservable<boolean>;
                    public shepard_pulled_up_by: KnockoutObservable<App.ME2.Teammate>;
                    public defence_reporter: KnockoutObservable<App.ME2.Teammate>;
                    public keep_base_advocate: KnockoutObservable<App.ME2.Teammate>;
                    public destroy_base_advocate: KnockoutObservable<App.ME2.Teammate>;
                    public crew_survival: KnockoutObservable<SummaryCrewSurvivalOptions>;

                    constructor (stage: App.ME2.Stages.IStage) {
                        super(stage);
                        this.shepard_lives = ko.observable(undefined);
                        this.shepard_pulled_up_by = ko.observable(undefined);
                        this.defence_reporter = ko.observable(undefined);
                        this.keep_base_advocate = ko.observable(undefined);
                        this.destroy_base_advocate = ko.observable(undefined);
                        this.crew_survival = ko.observable(undefined);
                    }

                    private getLivingTeammates (): App.ME2.Teammates {
                        return this.stage.stager.teammates.alive();
                    }

                    private getShepardLives (): boolean {
                        return this.getLivingTeammates().length() > 1;
                    }

                    private getShepardCatcher (): App.ME2.Teammate {
                        var candidates: App.ME2.Teammates;
                        var score: number;

                        candidates = this.getLivingTeammates().sort((teammate: App.ME2.Teammate): number => {
                            score = teammate.henchman.cutscene_rescue_priority + (teammate.hasRole(App.ME2.TeammateRoles.BossSquadmate) ? 100 : 0);
                            return score;
                        });

                        return candidates.length() > 1 ? candidates.last() : undefined;
                    }

                    private getDefenceReporter (): App.ME2.Teammate {
                        return this.stage.stager.teammates.withRole(App.ME2.TeammateRoles.HeldTheLine).sortByDefenceReportPriority().last();
                    }

                    private getKeepBaseAdvocate (): App.ME2.Teammate {
                        return this.stage.stager.teammates.withRole(App.ME2.TeammateRoles.BossSquadmate).whoAdvocateKeepingTheBase().sortByKeepBasePriority().last();
                    }

                    private getDestroyBaseAdvocate (): App.ME2.Teammate {
                        return this.stage.stager.teammates.withRole(App.ME2.TeammateRoles.BossSquadmate).whoAdvocateDestroyingTheBase().sortByDestroyBasePriority().last();
                    }

                    private getCrewSurvival (): SummaryCrewSurvivalOptions {
                        switch (this.stage.stager.app.normandy.delay) {
                            case 0:
                                return SummaryCrewSurvivalOptions.AllSurvived;
                            case 1:
                                return SummaryCrewSurvivalOptions.HalfSurvived;
                            default:
                                return SummaryCrewSurvivalOptions.AllDied;
                        }
                    }

                    public setup (): void {
                        this.defence_reporter(this.getDefenceReporter());
                        this.shepard_lives(this.getShepardLives());
                        this.shepard_pulled_up_by(this.getShepardCatcher());
                        this.keep_base_advocate(this.getKeepBaseAdvocate());
                        this.destroy_base_advocate(this.getDestroyBaseAdvocate());
                        this.crew_survival(this.getCrewSurvival());
                    }
                }
            }
        }
    }
}