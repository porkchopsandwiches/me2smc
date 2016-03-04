import { Stage } from "./Stage";
import { Stager } from "./Stager";
import { StageIDs, TeammateRoles, SummaryCrewSurvivalOptions, NormandyDelayOptions } from "../../constants";
import { Teammate } from "../Teammate";
import { Teammates } from "../Teammates";
import { TeammateDeathList } from "../TeammateDeathList";

export interface ISummary {
    shepard_lives: KnockoutObservable<boolean>;
    shepard_pulled_up_by: KnockoutObservable<Teammate>;
    defence_reporter: KnockoutObservable<Teammate>;
    keep_base_advocate: KnockoutObservable<Teammate>;
    destroy_base_advocate: KnockoutObservable<Teammate>;
}

export class Summary extends Stage implements ISummary {
    public id: StageIDs = StageIDs.Summary;
    public label: string = "Summary";
    public shepard_lives: KnockoutObservable<boolean>;
    public shepard_pulled_up_by: KnockoutObservable<Teammate>;
    public defence_reporter: KnockoutObservable<Teammate>;
    public keep_base_advocate: KnockoutObservable<Teammate>;
    public destroy_base_advocate: KnockoutObservable<Teammate>;
    public crew_survival: KnockoutObservable<SummaryCrewSurvivalOptions>;
    public htl_total: KnockoutObservable<number>;
    public htl_score: KnockoutObservable<string>;
    public htl_candidates_count: KnockoutObservable<number>;
    public htl_death_count: KnockoutObservable<number>;

    constructor (stager: Stager) {
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

    public evaluate (): TeammateDeathList {
        return new TeammateDeathList();
    }

    public setup (): void {
        const htl_teammates = this.stager.app.state.teammates().withRole(TeammateRoles.HeldTheLine);

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

    private getLivingTeammates (): Teammates {
        return this.stager.app.state.teammates().whoAreAlive().whoAreRecruited();
    }

    private getShepardLives (): boolean {
        return this.getLivingTeammates().length() > 1;
    }

    private getShepardCatcher (): Teammate {
        const candidates = this.getLivingTeammates().sort((teammate: Teammate): number => {
            let score = teammate.henchman.cutscene_rescue_priority + (teammate.hasAnyOfTheseRoles(TeammateRoles.BossSquadmate1, TeammateRoles.BossSquadmate2) ? 100 : 0);
            return score;
        });

        return candidates.length() > 1 ? candidates.last() : undefined;
    }

    private getDefenceReporter (): Teammate {
        return this.stager.app.state.teammates().withRole(TeammateRoles.HeldTheLine).sortByDefenceReportPriority().last();
    }

    private getKeepBaseAdvocate (): Teammate {
        return this.stager.app.state.teammates().withAnyOfTheseRoles(TeammateRoles.BossSquadmate1, TeammateRoles.BossSquadmate2).whoAdvocateKeepingTheBase().sortByKeepBasePriority().last();
    }

    private getDestroyBaseAdvocate (): Teammate {
        return this.stager.app.state.teammates().withAnyOfTheseRoles(TeammateRoles.BossSquadmate1, TeammateRoles.BossSquadmate2).whoAdvocateDestroyingTheBase().sortByDestroyBasePriority().last();
    }

    private getCrewSurvival (): SummaryCrewSurvivalOptions {

        // If no escort, they die regardless
        if (this.stager.app.state.teammates().withRole(TeammateRoles.LongWalkEscort).length() === 0) {
            return SummaryCrewSurvivalOptions.AllDied;
        }

        if (this.stager.app.state.normandy.delay() === NormandyDelayOptions.None) {
            return SummaryCrewSurvivalOptions.AllSurvived;
        } else if (this.stager.app.state.normandy.delay() === NormandyDelayOptions.Few) {
            return SummaryCrewSurvivalOptions.HalfSurvived;
        } else {
            return SummaryCrewSurvivalOptions.AllDied;
        }
    }
}
