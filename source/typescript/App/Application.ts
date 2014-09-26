///<reference path="../references.ts" />
module App {

    export class Application {

        public normandy: App.ME2.Normandy;
        private henchmen: App.ME2.Henchman[];
        public stager: App.ME2.Stages.Stager;
        public henchman: KnockoutObservable<App.ME2.Henchman>;

        constructor () {
            this.normandy = new App.ME2.Normandy(true, true, true);

            this.henchmen = [
                //                          ID                             Name                    Ess     HTL     HTLD    AD      SD      CD      LWD     CRP     DRP     KBP         DPB     Tech    Biotic      Leader      SLd     EC      VC      BC      LC
                new App.ME2.Henchman(this,  App.ME2.HenchmanIDs.Garrus,    "Garrus Vakarian",      true,   3,      5,      0,      8,      11,     10,     2,      11,     8,          0,      false,  false,      true,       false,  true,   true,   false,  true),
                new App.ME2.Henchman(this,  App.ME2.HenchmanIDs.Grunt,     "Grunt",                false,  3,      0,      0,      6,      9,      8,      4,      9,      12,         0,      false,  false,      false,      false,  true,   false,  false,  true),
                new App.ME2.Henchman(this,  App.ME2.HenchmanIDs.Jack,      "Jack",                 true,   0,      8,      12,     5,      8,      11,     1,      12,     0,          8,      false,  true,       false,      false,  true,   false,  true,   true),
                new App.ME2.Henchman(this,  App.ME2.HenchmanIDs.Jacob,     "Jacob Taylor",         true,   1,      6,      0,      0,      0,      6,      7,      8,      0,          10,     false,  false,      true,       false,  true,   true,   true,   true),
                new App.ME2.Henchman(this,  App.ME2.HenchmanIDs.Kasumi,    "Kasumi Goto",          false,  0,      9,      0,      12,     0,      3,      9,      4,      0,          9,      true,   false,      false,      false,  true,   true,   false,  true),
                new App.ME2.Henchman(this,  App.ME2.HenchmanIDs.Legion,    "Legion",               false,  1,      3,      0,      11,     0,      9,      3,      10,     9,          0,      true,   false,      false,      false,  true,   true,   false,  true),
                new App.ME2.Henchman(this,  App.ME2.HenchmanIDs.Miranda,   "Miranda Lawson",       true,   1,      7,      0,      0,      0,      -1,     11,     2,      13,         0,      false,  false,      true,       true,   false,  false,  true,   true),
                new App.ME2.Henchman(this,  App.ME2.HenchmanIDs.Mordin,    "Mordin Solus",         true,   0,      11,     0,      0,      0,      5,      6,      6,      10,         0,      false,  false,      false,      false,  true,   true,   false,  true),
                //new App.ME2.Henchman(this,  App.ME2.HenchmanIDs.Morinth,   "Morinth",            false,  1,      4,      0,      4,      7,      0,      5,      7,      0,          0,      false,  false,      false,      false,  true,   false,  true,   true),
                new App.ME2.Henchman(this,  App.ME2.HenchmanIDs.Samara,    "Samara",               false,  1,      4,      0,      4,      7,      7,      5,      7,      0,          12,     false,  true,       false,      false,  true,   false,  true,   true),
                new App.ME2.Henchman(this,  App.ME2.HenchmanIDs.Tali,      "Tali'zorah",           false,  0,      10,     0,      10,     0,      4,      8,      5,      0,          11,     true,   false,      false,      false,  true,   true,   false,  true),
                new App.ME2.Henchman(this,  App.ME2.HenchmanIDs.Thane,     "Thane",                false,  1,      2,      0,      9,      12,     12,     0,      13,     0,          13,     false,  false,      false,      false,  true,   true,   true,   true),
                new App.ME2.Henchman(this,  App.ME2.HenchmanIDs.Zaeed,     "Zaeed Masani",         false,  3,      1,      0,      7,      10,     2,      10,     3,      11,         0,      false,  false,      false,      false,  true,   false,  false,  true)
            ];

            this.henchman = ko.observable(undefined);


            this.stager = new App.ME2.Stages.Stager(this);
            this.stager.nextStage();
        }

        public getHenchmen (): App.ME2.Henchman[] {
            return this.henchmen;
        }

        public getHenchman (id: App.ME2.HenchmanIDs): App.ME2.Henchman {
            return _.find(this.henchmen, (henchman: App.ME2.Henchman): boolean => {
                return henchman.id === id;
            });
        }

        static formatTeammateRole (role: App.ME2.TeammateRoles): string {
            switch (role) {
                case App.ME2.TeammateRoles.OcculusSquadmate:
                    return "Occulus Squadmate";
                case App.ME2.TeammateRoles.VentsLeader:
                    return "Vents Leader";
                case App.ME2.TeammateRoles.VentsVenter:
                    return "Vents Tech Expert";
                case App.ME2.TeammateRoles.VentsSquadmate:
                    return "Vents Squadmate";
                case App.ME2.TeammateRoles.LongWalkBubbler:
                    return "Long Walk Biotic Expert";
                case App.ME2.TeammateRoles.LongWalkEscort:
                    return "Escort";
                case App.ME2.TeammateRoles.LongWalkLeader:
                    return "Long Walk Leader";
                case App.ME2.TeammateRoles.LongWalkSquadmate:
                    return "Long Walk Squadmate";
                case App.ME2.TeammateRoles.BossSquadmate:
                    return "Boss Squadmate";
                case App.ME2.TeammateRoles.HeldTheLine:
                    return "Held the line";
            }

            return App.ME2.TeammateRoles[role];
        }

        static formatYesNo (value: boolean): string {
            return value ? "Yes" : "No";
        }

        static formatRank (value: number): string {
            if (value !== undefined) {
                return "#" + (value + 1);
            } else {
                return "<span class=\"text-muted\">N/A</span>";
            }
        }

        static renderTeammateName (teammate: App.ME2.Teammate, highlight: boolean = false): string {
            if (teammate) {
                return teammate.henchman.name + (highlight ? " ✸" : "");
            } else {
                return "N/A";
            }
        }

        static renderTeammateNameVentVenter (teammate: App.ME2.Teammate): string {
            return Application.renderTeammateName(teammate, teammate.willBeEffectiveVentVenter());
        }

        static renderTeammateNameVentLeader (teammate: App.ME2.Teammate): string {
            return Application.renderTeammateName(teammate, teammate.willBeEffectiveVentLeader());
        }

        static renderTeammateNameLongWalkBubbler (teammate: App.ME2.Teammate): string {
            return Application.renderTeammateName(teammate, teammate.willBeEffectiveLongWalkBubbler());
        }

        static renderTeammateNameLongWalkLeader (teammate: App.ME2.Teammate): string {
            return Application.renderTeammateName(teammate, teammate.willBeEffectiveLongWalkLeader());
        }

        static renderTeammateNameLongWalkEscort (teammate: App.ME2.Teammate): string {
            return Application.renderTeammateName(teammate, teammate.willBeEffectiveLongWalkEscort());
        }

        static renderTeammateNameBossSquadmate (teammate: App.ME2.Teammate): string {
            return Application.renderTeammateName(teammate, teammate.willSurviveBeingBossSquadmate());
        }

        static renderTeammateNameKeepBaseAdvocate (teammate: App.ME2.Teammate): string {
            return Application.renderTeammateName(teammate) + (teammate.henchman.id === App.ME2.HenchmanIDs.Miranda ? " *" : "");
        }

        static formatTeammateDeathCause (death_cause: App.ME2.TeammateDeathCauses): string {
            switch (death_cause) {
                case App.ME2.TeammateDeathCauses.ArmourFailure:
                    return "Advanced Armour not acquired";
                case App.ME2.TeammateDeathCauses.ShieldingFailure:
                    return "Advanced Shielding not acquired";
                case App.ME2.TeammateDeathCauses.CannonFailure:
                    return "Thanix Cannon not acquired";
                case App.ME2.TeammateDeathCauses.VentsBadLeader:
                    return "Bad vents leader"; // Rocket to face
                case App.ME2.TeammateDeathCauses.VentsBadVenter:
                    return "Bad vents choice"; // Rocket to face
                case App.ME2.TeammateDeathCauses.Escort:
                    return "Disloyal escort";
                case App.ME2.TeammateDeathCauses.LongWalkBadBubbler:
                    return "Bad long walk bubbler"; // Eaten by bees
                case App.ME2.TeammateDeathCauses.LongWalkBadLeader:
                    return "Bad long walk leader"; // Gutshot
                case App.ME2.TeammateDeathCauses.Boss:
                    return "Disloyal Boss squadmate";
                case App.ME2.TeammateDeathCauses.HoldTheLine:
                    return "Failed to hold the line";
                default:
                    return App.ME2.TeammateDeathCauses[death_cause];
            }
        }

        static showArmourDeathRankPopover (henchman: App.ME2.Henchman, event?: Event): void {
            return Application.showRankPopover($(event.target), "Armour Deaths", henchman, henchman.getHenchmenSortedByArmourDeathPriority())
        }

        static showShieldingDeathRankPopover (henchman: App.ME2.Henchman, event?: Event): void {
            return Application.showRankPopover($(event.target), "Shielding Deaths", henchman, henchman.getHenchmenSortedByShieldingDeathPriority())
        }

        static showCannonDeathRankPopover (henchman: App.ME2.Henchman, event?: Event): void {
            return Application.showRankPopover($(event.target), "Cannon Deaths", henchman, henchman.getHenchmenSortedByCannonDeathPriority())
        }

        static showLongWalkDeathRankPopover (henchman: App.ME2.Henchman, event?: Event): void {
            return Application.showRankPopover($(event.target), "Long Walk Deaths", henchman, henchman.getHenchmenSortedByLongWalkDeathPriority())
        }

        static showHTMLDeathRankPopover (henchman: App.ME2.Henchman, event?: Event): void {
            return Application.showRankPopover($(event.target), "Hold the line Deaths", henchman, henchman.getHenchmenSortedByHTLDeathPriority())
        }

        static showDefenceReportRankPopover (henchman: App.ME2.Henchman, event?: Event): void {
            return Application.showRankPopover($(event.target), "Defence Reports", henchman, henchman.getHenchmenSortedByDefenceReportPriority())
        }

        static showKeepBaseAdvocateRankPopover (henchman: App.ME2.Henchman, event?: Event): void {
            return Application.showRankPopover($(event.target), "Keep Base Advocates", henchman, henchman.getHenchmenSortedByKeepBasePriority())
        }

        static showDestroyBaseAdvocateRankPopover (henchman: App.ME2.Henchman, event?: Event): void {
            return Application.showRankPopover($(event.target), "Destroy Base Advocates", henchman, henchman.getHenchmenSortedByDestroyBasePriority())
        }

        static showCutsceneRescueRankPopover (henchman: App.ME2.Henchman, event?: Event): void {
            return Application.showRankPopover($(event.target), "Catchs Shepard", henchman, henchman.getHenchmenSortedByCutsceneRescuePriority())
        }

        static showRankPopover ($target: JQuery, title: string, henchman: App.ME2.Henchman, list: App.ME2.Henchman[]): void {
            var $content: JQuery;
            $content = $("<ol />").addClass("rank-popover-list");
            _.each(list, (list_henchman: App.ME2.Henchman) => {
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
    }
}