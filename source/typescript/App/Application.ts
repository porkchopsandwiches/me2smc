import { Henchman } from "./ME2/Henchman";
import { Stager } from "./ME2/Stages/Stager";
import { State } from "./ME2/State";
import { Serialisation } from "./ME2/Serialisation";
import { Teammate } from "./ME2/Teammate";
import { Logic } from "./ME2/Logic";
import { SummaryCrewSurvivalOptions, HenchmanIDs, TeammateDeathCauses, NormandyDelayOptions } from "./constants";

export class Application {
    public static ideal_symbol = "✭";
    public stager: Stager;
    public henchman: KnockoutObservable<Henchman>;
    public share: KnockoutObservable<string>;
    public state: State;
    public serialisation: Serialisation;
    private henchmen: Henchman[];
    private logic: Logic;

    public static renderYesNo (value: boolean): string {
        return value ? "Yes" : "No";
    }

    public static renderRank (value: number): string {
        if (value !== undefined) {
            return "#" + (value + 1);
        } else {
            return "<span class=\"text-muted\">N/A</span>";
        }
    }

    public static renderTeammateName (teammate: Teammate, highlight: boolean = false): string {
        if (teammate) {
            return teammate.henchman.name + (highlight ? " " + Application.ideal_symbol : "");
        } else {
            return "N/A";
        }
    }

    public static renderTeammateNameVentVenter (teammate: Teammate): string {
        return Application.renderTeammateName(teammate, teammate.willBeEffectiveVentVenter());
    }

    public static renderTeammateNameVentLeader (teammate: Teammate): string {
        return Application.renderTeammateName(teammate, teammate.willBeEffectiveVentLeader());
    }

    public static renderTeammateNameLongWalkBubbler (teammate: Teammate): string {
        return Application.renderTeammateName(teammate, teammate.willBeEffectiveLongWalkBubbler());
    }

    public static renderTeammateNameLongWalkLeader (teammate: Teammate): string {
        return Application.renderTeammateName(teammate, teammate.willBeEffectiveLongWalkLeader());
    }

    public static renderTeammateNameLongWalkEscort (teammate: Teammate): string {
        return Application.renderTeammateName(teammate, teammate.willBeEffectiveLongWalkEscort());
    }

    public static renderTeammateNameBossSquadmate (teammate: Teammate): string {
        return Application.renderTeammateName(teammate, teammate.willSurviveBeingBossSquadmate());
    }

    public static renderTeammateNameKeepBaseAdvocate (teammate: Teammate): string {
        return Application.renderTeammateName(teammate, teammate && teammate.henchman.id === HenchmanIDs.Miranda);
    }

    public static renderTeammateDeathCause (death_cause: TeammateDeathCauses): string {
        switch (death_cause) {
            case TeammateDeathCauses.ArmourFailure:
                return "Advanced Armour not acquired";
            case TeammateDeathCauses.ShieldingFailure:
                return "Advanced Shielding not acquired";
            case TeammateDeathCauses.CannonFailure:
                return "Thanix Cannon not acquired";
            case TeammateDeathCauses.VentsBadLeader:
                return "Bad vents leader"; // Rocket to face
            case TeammateDeathCauses.VentsBadVenter:
                return "Bad vents choice"; // Rocket to face
            case TeammateDeathCauses.Escort:
                return "Disloyal escort";
            case TeammateDeathCauses.LongWalkBadBubbler:
                return "Bad long walk bubbler"; // Eaten by bees
            case TeammateDeathCauses.LongWalkBadLeader:
                return "Bad long walk leader"; // Gutshot
            case TeammateDeathCauses.Boss:
                return "Disloyal Boss squadmate";
            case TeammateDeathCauses.HoldTheLine:
                return "Failed to hold the line";
            default:
                return TeammateDeathCauses[death_cause];
        }
    }

    public static renderCrewSurvival (crew_survival: SummaryCrewSurvivalOptions): string {
        switch (crew_survival) {
            case SummaryCrewSurvivalOptions.AllDied:
                return "All Died";
            case SummaryCrewSurvivalOptions.HalfSurvived:
                return "Half Survived";
            case SummaryCrewSurvivalOptions.AllSurvived:
                return "All Survived";
            default:
                return SummaryCrewSurvivalOptions[crew_survival];
        }
    }

    public static renderHTLScore (score: number): string {
        switch (score) {
            case 0:
                return "0";
            case 1:
                return "➊";
            case 2:
                return "➋";
            case 3:
                return "➌";
            case 4:
                return "➍";
            default:
                return score.toString(10);
        }

    }

    public static showArmourDeathRankPopover (henchman: Henchman, event?: Event): void {
        return Application.showRankPopover($(event.target), "Armour Deaths", henchman, henchman.getHenchmenSortedByArmourDeathPriority());
    }

    public static showShieldingDeathRankPopover (henchman: Henchman, event?: Event): void {
        return Application.showRankPopover($(event.target), "Shielding Deaths", henchman, henchman.getHenchmenSortedByShieldingDeathPriority());
    }

    public static showCannonDeathRankPopover (henchman: Henchman, event?: Event): void {
        return Application.showRankPopover($(event.target), "Cannon Deaths", henchman, henchman.getHenchmenSortedByCannonDeathPriority());
    }

    public static showLongWalkDeathRankPopover (henchman: Henchman, event?: Event): void {
        return Application.showRankPopover($(event.target), "Long Walk Deaths", henchman, henchman.getHenchmenSortedByLongWalkDeathPriority());
    }

    public static showHTMLDeathRankPopover (henchman: Henchman, event?: Event): void {
        return Application.showRankPopover($(event.target), "Hold the line Deaths", henchman, henchman.getHenchmenSortedByHTLDeathPriority());
    }

    public static showDefenceReportRankPopover (henchman: Henchman, event?: Event): void {
        return Application.showRankPopover($(event.target), "Defence Reports", henchman, henchman.getHenchmenSortedByDefenceReportPriority());
    }

    public static showKeepBaseAdvocateRankPopover (henchman: Henchman, event?: Event): void {
        return Application.showRankPopover($(event.target), "Keep Base Advocates", henchman, henchman.getHenchmenSortedByKeepBasePriority());
    }

    public static showDestroyBaseAdvocateRankPopover (henchman: Henchman, event?: Event): void {
        return Application.showRankPopover($(event.target), "Destroy Base Advocates", henchman, henchman.getHenchmenSortedByDestroyBasePriority());
    }

    public static showCutsceneRescueRankPopover (henchman: Henchman, event?: Event): void {
        return Application.showRankPopover($(event.target), "Catchs Shepard", henchman, henchman.getHenchmenSortedByCutsceneRescuePriority());
    }

    public static getDelayCandidates (): number[] {
        return [
            NormandyDelayOptions.None,
            NormandyDelayOptions.Few,
            NormandyDelayOptions.Many
        ];
    }

    public static renderDelayValue (value: NormandyDelayOptions): string {
        switch (value) {
            case NormandyDelayOptions.None:
                return "None";
            case NormandyDelayOptions.Few:
                return "1-3";
            case NormandyDelayOptions.Many:
                return "More than 3";
            default:
                return "" + value;
        }
    }

    public static showRankPopover ($target: JQuery, title: string, henchman: Henchman, list: Henchman[]): void {
        const $content = $("<ol />").addClass("rank-popover-list");
        _.each(list, (list_henchman: Henchman) => {
            $content.append(
                $("<li />")
                .append(list_henchman.name)
            );
        });

        $target.popover({
            trigger: "focus",
            title: title,
            html: true,
            content: $content
        })
        .on("hidden.bs.popover", () => {
            $target.popover("destroy");
        })
        .popover("show");
    }

    constructor () {
        this.henchmen = [
            //                  ID                     Name                    Ess     HTL     HTLD    AD      SD      CD      LWD     CRP     DRP     KBP         DPB     Tech    Biotic      Leader      SLd     EC      VC      BC      LC
            new Henchman(this,  HenchmanIDs.Garrus,    "Garrus Vakarian",      true,   3,      5,      0,      8,      11,     10,     2,      11,     8,          0,      false,  false,      true,       false,  true,   true,   false,  true),
            new Henchman(this,  HenchmanIDs.Grunt,     "Grunt",                false,  3,      0,      0,      6,      9,      8,      4,      9,      12,         0,      false,  false,      false,      false,  true,   false,  false,  true),
            new Henchman(this,  HenchmanIDs.Jack,      "Jack",                 true,   0,      8,      12,     5,      8,      11,     1,      12,     0,          8,      false,  true,       false,      false,  true,   false,  true,   true),
            new Henchman(this,  HenchmanIDs.Jacob,     "Jacob Taylor",         true,   1,      6,      0,      0,      0,      6,      7,      8,      0,          10,     false,  false,      true,       false,  true,   true,   true,   true),
            new Henchman(this,  HenchmanIDs.Kasumi,    "Kasumi Goto",          false,  0,      9,      0,      12,     0,      3,      9,      4,      0,          9,      true,   false,      false,      false,  true,   true,   false,  true),
            new Henchman(this,  HenchmanIDs.Legion,    "Legion",               false,  1,      3,      0,      11,     0,      9,      3,      10,     9,          0,      true,   false,      false,      false,  true,   true,   false,  true),
            new Henchman(this,  HenchmanIDs.Miranda,   "Miranda Lawson",       true,   1,      7,      0,      0,      0,      -1,     11,     2,      13,         0,      false,  false,      true,       true,   false,  false,  true,   true),
            new Henchman(this,  HenchmanIDs.Mordin,    "Mordin Solus",         true,   0,      11,     0,      0,      0,      5,      6,      6,      10,         0,      false,  false,      false,      false,  true,   true,   false,  true),
            //new Henchman(this,  HenchmanIDs.Morinth,   "Morinth",            false,  1,      4,      0,      4,      7,      0,      5,      7,      0,          0,      false,  false,      false,      false,  true,   false,  true,   true),
            new Henchman(this,  HenchmanIDs.Samara,    "Samara",               false,  1,      4,      0,      4,      7,      7,      5,      7,      0,          12,     false,  true,       false,      false,  true,   false,  true,   true),
            new Henchman(this,  HenchmanIDs.Tali,      "Tali'zorah",           false,  0,      10,     0,      10,     0,      4,      8,      5,      0,          11,     true,   false,      false,      false,  true,   true,   false,  true),
            new Henchman(this,  HenchmanIDs.Thane,     "Thane",                false,  1,      2,      0,      9,      12,     12,     0,      13,     0,          13,     false,  false,      false,      false,  true,   true,   true,   true),
            new Henchman(this,  HenchmanIDs.Zaeed,     "Zaeed Masani",         false,  3,      1,      0,      7,      10,     2,      10,     3,      11,         0,      false,  false,      false,      false,  true,   false,  false,  true)
        ];

        this.serialisation = new Serialisation(this);
        this.henchman = ko.observable<Henchman>(undefined);
        this.state = new State(this);
        this.share = ko.observable<string>(undefined);
        this.stager = new Stager(this);

        // If there is a request for a specific state
        if (window.location.search.length > 2) {
            this.state.applySerialisedState(window.location.search.substr(1));
        }

        this.logic = new Logic(this);
    }

    public getHenchmen (): Henchman[] {
        return this.henchmen;
    }

    public getHenchman (id: HenchmanIDs): Henchman {
        return _.find(this.henchmen, (henchman: Henchman): boolean => {
            return henchman.id === id;
        });
    }

    public predictedToBeDead (teammate: Teammate): boolean {
        if (this.state.stage().is_evaluatable()) {
            return !!this.state.stage().evaluate().find(teammate);
        }

        return false;
    }
}
