///<reference path="../../../references.ts" />
module App {
    export module ME2 {
        export module Stages {
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
                public id: StageIDs = App.ME2.Stages.StageIDs.Summary;
                public label: string = "Summary";
                public shepard_lives: KnockoutObservable<boolean>;
                public shepard_pulled_up_by: KnockoutObservable<App.ME2.Teammate>;
                public defence_reporter: KnockoutObservable<App.ME2.Teammate>;
                public keep_base_advocate: KnockoutObservable<App.ME2.Teammate>;
                public destroy_base_advocate: KnockoutObservable<App.ME2.Teammate>;
                public crew_survival: KnockoutObservable<SummaryCrewSurvivalOptions>;
                public htl_total: KnockoutObservable<number>;
                public htl_score: KnockoutObservable<string>;
                public htl_candidates_count: KnockoutObservable<number>;
                public htl_death_count: KnockoutObservable<number>;

                constructor (stager: App.ME2.Stages.Stager) {
                    super(stager);
                    this.shepard_lives = ko.observable(undefined);
                    this.shepard_pulled_up_by = ko.observable(undefined);
                    this.defence_reporter = ko.observable(undefined);
                    this.keep_base_advocate = ko.observable(undefined);
                    this.destroy_base_advocate = ko.observable(undefined);
                    this.crew_survival = ko.observable(undefined);
                    this.is_evaluatable = ko.observable(false);
                    this.htl_total = ko.observable<number>(undefined);
                    this.htl_score = ko.observable<string>(undefined);
                    this.htl_candidates_count = ko.observable<number>(undefined);
                    this.htl_death_count = ko.observable<number>(undefined);
                }

                private getLivingTeammates (): App.ME2.Teammates {
                    return this.stager.app.state.teammates().whoAreAlive().whoAreRecruited();
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
                    return this.stager.app.state.teammates().withRole(App.ME2.TeammateRoles.HeldTheLine).sortByDefenceReportPriority().last();
                }

                private getKeepBaseAdvocate (): App.ME2.Teammate {
                    return this.stager.app.state.teammates().withRole(App.ME2.TeammateRoles.BossSquadmate).whoAdvocateKeepingTheBase().sortByKeepBasePriority().last();
                }

                private getDestroyBaseAdvocate (): App.ME2.Teammate {
                    return this.stager.app.state.teammates().withRole(App.ME2.TeammateRoles.BossSquadmate).whoAdvocateDestroyingTheBase().sortByDestroyBasePriority().last();
                }

                private getCrewSurvival (): SummaryCrewSurvivalOptions {

                    // If no escort, they die regardless
                    if (this.stager.app.state.teammates().withRole(App.ME2.TeammateRoles.LongWalkEscort).length() === 0) {
                        return SummaryCrewSurvivalOptions.AllDied;
                    }

                    if (this.stager.app.state.normandy.delay() === 0) {
                        return SummaryCrewSurvivalOptions.AllSurvived;
                    } else if (this.stager.app.state.normandy.delay() <= 3) {
                        return SummaryCrewSurvivalOptions.HalfSurvived;
                    } else {
                        return SummaryCrewSurvivalOptions.AllDied;
                    }
                }

                public setup (): void {
                    var htl_teammates: App.ME2.Teammates;

                    htl_teammates = this.stager.app.state.teammates().withRole(App.ME2.TeammateRoles.HeldTheLine);

                    this.defence_reporter(this.getDefenceReporter());
                    this.shepard_lives(this.getShepardLives());
                    this.shepard_pulled_up_by(this.getShepardCatcher());
                    this.keep_base_advocate(this.getKeepBaseAdvocate());
                    this.destroy_base_advocate(this.getDestroyBaseAdvocate());
                    this.crew_survival(this.getCrewSurvival());

                    this.htl_total(htl_teammates.getHoldTheLineTotal());
                    this.htl_score(htl_teammates.getHoldTheLineScore().toFixed(2));
                    this.htl_candidates_count(htl_teammates.length());
                    this.htl_death_count(htl_teammates.getHoldTheLineDeathCount());
                }
            }
        }
    }
}