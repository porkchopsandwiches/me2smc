import { Role, HenchmanIDs } from "../constants";
import { Logic } from "./Logic";

export class Teammate {

    // Derivatives
    public is_recruited: KnockoutObservable<boolean>;
    public is_loyal: KnockoutObservable<boolean>;
    public is_upgraded: KnockoutObservable<boolean>;
    public is_good_vent_specialist: KnockoutComputed<boolean>;
    public is_good_vent_fireteam_leader: KnockoutComputed<boolean>;
    public is_good_escort: KnockoutComputed<boolean>;
    public is_good_long_walk_specialist: KnockoutComputed<boolean>;
    public is_good_long_walk_fireteam_leader: KnockoutComputed<boolean>;
    public is_good_boss_squadmate: KnockoutComputed<boolean>;
    public hold_the_line_score: KnockoutComputed<number>;
    public survives: KnockoutComputed<boolean>;

    public armour_death_priority_rank: KnockoutComputed<number>;
    public shield_death_priority_rank: KnockoutComputed<number>;
    public weapon_death_priority_rank: KnockoutComputed<number>;
    public long_walk_death_priority_rank: KnockoutComputed<number>;
    public cutscene_rescue_priority_rank: KnockoutComputed<number>;
    public defence_report_priority_rank: KnockoutComputed<number>;
    public keep_base_priority_rank: KnockoutComputed<number>;
    public destroy_base_priority_rank: KnockoutComputed<number>;
    public hold_the_line_death_priority_rank: KnockoutComputed<number>;

    public roles: KnockoutObservableArray<Role>;

    constructor (
        private logic: Logic,
        public id: HenchmanIDs,
        public name: string,
        public is_essential: boolean,
        public hold_the_line_baseline_score: number,

        // Priorities
        public hold_the_line_death_priority: number,
        public armour_death_priority: number,
        public shield_death_priority: number,
        public weapon_death_priority: number,
        public long_walk_death_priority: number,
        public cutscene_rescue_priority: number,
        public defence_report_priority: number,
        public keep_base_priority: number,
        public destroy_base_priority: number,

        // Flags
        public is_vent_ideal_candidate: boolean,
        public is_bubble_ideal_candidate: boolean,
        public is_leader_ideal_candidate: boolean,
        public is_super_leader: boolean,
        public is_escort_candidate: boolean,
        public is_vent_candidate: boolean,
        public is_bubble_candidate: boolean,
        public is_leader_candidate: boolean,

        public upgrade_unlocks_armour: boolean,
        public upgrade_unlocks_shields: boolean,
        public upgrade_unlocks_weapon: boolean
    ) {
        this.is_recruited = ko.observable(this.is_essential);
        this.is_loyal = ko.observable(false);
        this.is_upgraded = ko.observable(false);

        this.is_recruited.subscribe((is_recruited: boolean): void => {
            if (!is_recruited) {
                if (this.is_essential) {
                    this.is_recruited(true);
                }

                this.is_loyal(false);
                this.is_upgraded(false);
            }
        });

        this.is_loyal.subscribe((is_loyal: boolean): void => {
            if (is_loyal) {
                if (!this.is_recruited()) {
                    this.is_loyal(false);
                }
            } else {
                this.is_upgraded(false);
            }
        });

        this.is_upgraded.subscribe((is_upgraded: boolean): void => {
            if (is_upgraded) {
                if (!this.is_loyal()) {
                    this.is_upgraded(false);
                }
            }
        });

        this.is_good_vent_specialist = ko.pureComputed((): boolean => {
            return this.is_loyal() && this.is_vent_ideal_candidate;
        });
        this.is_good_vent_fireteam_leader = ko.pureComputed((): boolean => {
            return this.is_loyal() && this.is_leader_ideal_candidate;
        });
        this.is_good_escort = ko.pureComputed((): boolean => {
            return this.is_loyal();
        });
        this.is_good_long_walk_specialist = ko.pureComputed((): boolean => {
            return this.is_loyal() && this.is_bubble_ideal_candidate;
        });
        this.is_good_long_walk_fireteam_leader = ko.pureComputed((): boolean => {
            return this.is_leader_ideal_candidate && (this.is_loyal() || this.is_super_leader);
        });
        this.is_good_boss_squadmate = ko.pureComputed((): boolean => {
            return this.is_loyal();
        });

        this.hold_the_line_score = ko.pureComputed((): number => {
            return this.hold_the_line_baseline_score + (this.is_loyal() ? 1 : 0);
        });

        this.roles = ko.observableArray([]);

        // Roles
        this
        .syncRoleToObservable(logic.approach_squadmate_1, Role.ApproachSquadmate1)
        .syncRoleToObservable(logic.approach_squadmate_2, Role.ApproachSquadmate2)
        .syncRoleToObservable(logic.approach_armour_death, Role.ApproachArmorDeath)
        .syncRoleToObservable(logic.approach_shields_death, Role.ApproachShieldsDeath)
        .syncRoleToObservable(logic.approach_weapon_death, Role.ApproachWeaponDeath)
        .syncRoleToObservable(logic.vents_specialist, Role.VentsSpecialist)
        .syncRoleToObservable(logic.vents_fireteam_leader, Role.VentsFireteamLeader)
        .syncRoleToObservable(logic.vents_squadmate_1, Role.VentsSquadmate1)
        .syncRoleToObservable(logic.vents_squadmate_2, Role.VentsSquadmate2)
        .syncRoleToObservable(logic.vents_death, Role.VentsDeath)
        .syncRoleToObservable(logic.long_walk_specialist, Role.LongWalkSpecialist)
        .syncRoleToObservable(logic.long_walk_fireteam_leader, Role.LongWalkFireteamLeader)
        .syncRoleToObservable(logic.long_walk_escort, Role.LongWalkEscort)
        .syncRoleToObservable(logic.long_walk_squadmate_1, Role.LongWalkSquadmate1)
        .syncRoleToObservable(logic.long_walk_squadmate_2, Role.LongWalkSquadmate2)
        .syncRoleToObservable(logic.long_walk_escort_death, Role.LongWalkEscortDeath)
        .syncRoleToObservable(logic.long_walk_squadmate_death, Role.LongWalkSquadmateDeath)
        .syncRoleToObservable(logic.long_walk_fireteam_leader_death, Role.LongWalkFireteamLeaderDeath)
        .syncRoleToObservable(logic.boss_squadmate_1, Role.BossSquadmate1)
        .syncRoleToObservable(logic.boss_squadmate_2, Role.BossSquadmate2)
        .syncRoleToObservableSet(logic.boss_squadmate_deaths, Role.BossSquadmateDeath)
        .syncRoleToObservableSet(logic.boss_hold_the_line_candidates, Role.BossHoldingTheLine)
        .syncRoleToObservableSet(logic.boss_hold_the_line_deaths, Role.BossHoldingTheLineDeath);

        this.survives = ko.pureComputed((): boolean => {
            const candidates = logic.boss_survivors();
            if (candidates) {
                return _.contains(candidates, this);
            }
        });

        this.armour_death_priority_rank = this.deriveRank("armour_death_priority");
        this.shield_death_priority_rank = this.deriveRank("shield_death_priority");
        this.weapon_death_priority_rank = this.deriveRank("weapon_death_priority");
        this.long_walk_death_priority_rank = this.deriveRank("long_walk_death_priority");
        this.cutscene_rescue_priority_rank = this.deriveRank("cutscene_rescue_priority");
        this.defence_report_priority_rank = this.deriveRank("defence_report_priority");
        this.keep_base_priority_rank = this.deriveRank("keep_base_priority");
        this.destroy_base_priority_rank = this.deriveRank("destroy_base_priority");
        this.hold_the_line_death_priority_rank = this.deriveRank("hold_the_line_death_priority");
    }

    public hasRole (role: Role): boolean {
        return this.roles.indexOf(role) > -1;
    }

    private deriveRank (field: string): KnockoutComputed<number> {
        return ko.pureComputed((): number => {
            const pool = this.logic.pool();
            return this[field] > 0 ? (pool.length - _.indexOf<Teammate>(_.sortBy(pool, field), this)) : undefined;
        });
    }

    private switchRole (role: Role, condition: boolean): void {
        if (!condition) {
            this.roles.remove(role);
        } else if (!this.hasRole(role)) {
            this.roles.push(role);
        }
    }

    private syncRoleToObservable (observable: KnockoutObservable<Teammate>, role: Role): Teammate {
        observable.subscribe((teammate: Teammate): void => {
            return this.switchRole(role, teammate && (teammate.id === this.id));
        });
        return this;
    }

    private syncRoleToObservableSet (observable: KnockoutObservable<Teammate[]>, role: Role): Teammate {
        observable.subscribe((teammates: Teammate[]): void => {
            return this.switchRole(role, _.contains(teammates, this));
        });
        return this;
    }
}
