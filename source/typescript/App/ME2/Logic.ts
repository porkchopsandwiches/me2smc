import { Application } from "../Application";
import { HenchmanIDs } from "../constants";

export enum Role {
    ApproachSquadmate1,
    ApproachSquadmate2,
    ApproachShieldsDeath,
    ApproachArmorDeath,
    ApproachWeaponDeath,
    VentsSquadmate1,
    VentsSquadmate2,
    VentsSpecialist,
    VentsFireteamLeader,
    VentsDeath,
    LongWalkSpecialist,
    LongWalkFireteamLeader,
    LongWalkEscort,
    LongWalkSquadmate1,
    LongWalkSquadmate2,
    LongWalkSquadmateDeath,
    LongWalkEscortDeath,
    LongWalkFireteamLeaderDeath,
    BossSquadmate1,
    BossSquadmate2,
    BossHoldingTheLine,
    BossSquadmateDeath,
    BossHoldingTheLineDeath
}

export class Teammate {

    // Derivatives
    public is_recruited: KnockoutObservable<boolean>;
    public is_loyal: KnockoutObservable<boolean>;
    public is_good_vent_specialist: KnockoutComputed<boolean>;
    public is_good_vent_fireteam_leader: KnockoutComputed<boolean>;
    public is_good_escort: KnockoutComputed<boolean>;
    public is_good_long_walk_specialist: KnockoutComputed<boolean>;
    public is_good_long_walk_fireteam_leader: KnockoutComputed<boolean>;
    public is_good_boss_squadmate: KnockoutComputed<boolean>;
    public hold_the_line_score: KnockoutComputed<number>;

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
        public is_leader_candidate: boolean
    ) {
        this.is_recruited = ko.observable(this.is_essential);
        this.is_loyal = ko.observable(false);

        this.is_recruited.subscribe((is_recruited: boolean): void => {
            if (!is_recruited) {
                if (this.is_essential) {
                    this.is_recruited(true);
                }

                this.is_loyal(false);
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
    }

    private switchRole (role: Role, condition: boolean): void {
        if (!condition) {
            this.roles.remove(role);
        } else if (!this.hasRole(role)) {
            this.roles.push(role);
        }
        console.log("switch role", this.name, Role[role], condition, this.roles());
    }

    // private syncRole (role: Role, candidate: Teammate): void {
    //     return this.switchRole(role, candidate && (candidate.id === this.id));
    // }

    private syncRoleToObservable (observable: KnockoutObservable<Teammate>, role: Role): Teammate {
        observable.subscribe((teammate: Teammate): void => {
            return this.switchRole(role, teammate && (teammate.id === this.id));
        });
        return this;
    }

    private syncRoleToObservableSet (observable: KnockoutObservable<Teammate[]>, role: Role): Teammate {
        observable.subscribe((teammates: Teammate[]): void => {
            return this.switchRole(role, _.contains(teammates, this));
            //this.syncRole(role, teammate);
        });
        return this;
    }

    private hasRole (role: Role): boolean {
        return this.roles.indexOf(role) > -1;
    }

    // private removeRole (role: Role): void {
    //     this.roles.remove(role);
    // }
}

export class Logic {
    public pool: KnockoutObservableArray<Teammate>;

    // Prep properties
    public normandy_has_armour: KnockoutObservable<boolean>;
    public normandy_has_shields: KnockoutObservable<boolean>;
    public normandy_has_weapon: KnockoutObservable<boolean>;
    public mission_delay: KnockoutObservable<number>;
    public recruited: KnockoutComputed<Teammate[]>;
    public all_recruited: KnockoutComputed<boolean>;
    public all_loyal: KnockoutComputed<boolean>;

    // Approach
    public approach_squadmate_pool_1: KnockoutComputed<Teammate[]>;
    public approach_squadmate_pool_2: KnockoutComputed<Teammate[]>;
    public approach_squadmate_1: KnockoutObservable<Teammate>;
    public approach_squadmate_2: KnockoutObservable<Teammate>;
    public approach_evaluatable: KnockoutComputed<boolean>;
    public approach_shields_death: KnockoutComputed<Teammate>;
    public approach_armour_death: KnockoutComputed<Teammate>;
    public approach_weapon_death: KnockoutComputed<Teammate>;
    public approach_survivors: KnockoutComputed<Teammate[]>;

    // Vents
    public vents_specialist_pool: KnockoutComputed<Teammate[]>;
    public vents_specialist: KnockoutObservable<Teammate>;
    public vents_fireteam_leader_pool: KnockoutComputed<Teammate[]>;
    public vents_fireteam_leader: KnockoutObservable<Teammate>;
    public vents_squadmate_pool_1: KnockoutComputed<Teammate[]>;
    public vents_squadmate_pool_2: KnockoutComputed<Teammate[]>;
    public vents_squadmate_1: KnockoutObservable<Teammate>;
    public vents_squadmate_2: KnockoutObservable<Teammate>;
    public vents_evaluatable: KnockoutComputed<boolean>;
    public vents_death: KnockoutComputed<Teammate>;
    public vents_survivors: KnockoutComputed<Teammate[]>;

    // Long Walk
    public long_walk_specialist_pool: KnockoutComputed<Teammate[]>;
    public long_walk_specialist: KnockoutObservable<Teammate>;
    public long_walk_fireteam_leader_pool: KnockoutComputed<Teammate[]>;
    public long_walk_fireteam_leader: KnockoutObservable<Teammate>;
    public long_walk_escort_pool: KnockoutComputed<Teammate[]>;
    public long_walk_escort: KnockoutObservable<Teammate>;
    public long_walk_squadmate_pool_1: KnockoutComputed<Teammate[]>;
    public long_walk_squadmate_pool_2: KnockoutComputed<Teammate[]>;
    public long_walk_squadmate_1: KnockoutObservable<Teammate>;
    public long_walk_squadmate_2: KnockoutObservable<Teammate>;
    public long_walk_evaluatable: KnockoutComputed<boolean>;
    public long_walk_escort_death: KnockoutComputed<Teammate>;
    public long_walk_squadmate_death: KnockoutComputed<Teammate>;
    public long_walk_fireteam_leader_death: KnockoutComputed<Teammate>;
    public long_walk_survivors: KnockoutComputed<Teammate[]>;

    // Boss
    public boss_squadmate_pool_1: KnockoutComputed<Teammate[]>;
    public boss_squadmate_pool_2: KnockoutComputed<Teammate[]>;
    public boss_squadmate_1: KnockoutObservable<Teammate>;
    public boss_squadmate_2: KnockoutObservable<Teammate>;
    public boss_evaluatable: KnockoutComputed<boolean>;
    public boss_squadmate_deaths: KnockoutComputed<Teammate[]>;
    public boss_hold_the_line_candidates: KnockoutComputed<Teammate[]>;
    public boss_hold_the_line_total: KnockoutComputed<number>;
    public boss_hold_the_line_rating: KnockoutComputed<number>;
    public boss_hold_the_line_death_count: KnockoutComputed<number>;
    public boss_hold_the_line_deaths: KnockoutComputed<Teammate[]>;
    public boss_survivors: KnockoutComputed<Teammate[]>;

    constructor (app: Application) {

        // Prep
        this.normandy_has_armour = ko.observable(true);
        this.normandy_has_shields = ko.observable(true);
        this.normandy_has_weapon = ko.observable(true);
        this.mission_delay = ko.observable(undefined);
        this.pool = ko.observableArray([]);

        this.recruited = ko.pureComputed((): Teammate[] => {
            return _.filter(this.pool(), (teammate: Teammate): boolean => {
                return teammate.is_recruited();
            });
        });

        this.all_recruited = ko.pureComputed({
            read: (): boolean => {
                return _.all(this.pool(), (teammate: Teammate): boolean => {
                    return teammate.is_recruited();
                });
            },
            write: (all_recruited: boolean): void => {
                _.each(this.pool(), (teammate: Teammate): void => {
                    teammate.is_recruited(all_recruited);
                });
            }
        });
        this.all_loyal = ko.pureComputed({
            read: (): boolean => {
                return _.all(this.pool(), (teammate: Teammate): boolean => {
                    return teammate.is_loyal();
                });
            },
            write: (all_loyal: boolean): void => {
                _.each(this.pool(), (teammate: Teammate): void => {
                    teammate.is_loyal(all_loyal);
                });
            }
        });

        // Approach
        this.approach_squadmate_1 = ko.observable(undefined);
        this.approach_squadmate_2 = ko.observable(undefined);
        this.approach_squadmate_pool_1 = ko.pureComputed((): Teammate[] => {
            return _.without(this.recruited(), this.approach_squadmate_2());
        });
        this.approach_squadmate_pool_2 = ko.pureComputed((): Teammate[] => {
            return _.without(this.recruited(), this.approach_squadmate_1());
        });
        this.bindToPool(this.approach_squadmate_1, this.approach_squadmate_pool_1);
        this.bindToPool(this.approach_squadmate_2, this.approach_squadmate_pool_2);
        this.approach_evaluatable = ko.pureComputed((): boolean => {
            return !!(this.approach_squadmate_1() && this.approach_squadmate_2() && this.normandy_has_armour() !== undefined && this.normandy_has_weapon() !== undefined && this.normandy_has_shields() !== undefined);
        });
        this.approach_shields_death = ko.pureComputed((): Teammate => {
            if (this.approach_evaluatable() && !this.normandy_has_shields()) {
                const candidates = _.chain<Teammate>(this.recruited()).without(this.approach_squadmate_1(), this.approach_squadmate_2()).filter("shield_death_priority").sortBy("shield_death_priority").value();
                return _.last(candidates);
            }
        });
        this.approach_armour_death = ko.pureComputed((): Teammate => {
            if (this.approach_evaluatable() && !this.normandy_has_armour()) {
                const candidates = _.chain<Teammate>(this.recruited()).without(this.approach_squadmate_1(), this.approach_squadmate_2(), this.approach_shields_death()).filter("armour_death_priority").sortBy("armour_death_priority").value();
                return _.last(candidates);
            }
        });
        this.approach_weapon_death = ko.pureComputed((): Teammate => {
            if (this.approach_evaluatable() && !this.normandy_has_weapon()) {
                const candidates = _.chain<Teammate>(this.recruited()).without(this.approach_squadmate_1(), this.approach_squadmate_2(), this.approach_shields_death(), this.approach_armour_death()).filter("weapon_death_priority").sortBy("weapon_death_priority").value();
                return _.last(candidates);
            }
        });
        this.approach_survivors = ko.pureComputed((): Teammate[] => {
            if (this.approach_evaluatable()) {
                return _.without(this.recruited(), this.approach_shields_death(), this.approach_armour_death(), this.approach_weapon_death());
            }
        });

        // Vents
        this.vents_specialist = ko.observable(undefined);
        this.vents_fireteam_leader = ko.observable(undefined);
        this.vents_squadmate_1 = ko.observable(undefined);
        this.vents_squadmate_2 = ko.observable(undefined);
        this.vents_specialist_pool = ko.pureComputed((): Teammate[] => {
            const candidates = this.approach_survivors();
            if (candidates) {
                return _.without<Teammate>(_.filter(candidates, "is_vent_candidate"), this.vents_fireteam_leader(), this.vents_squadmate_1(), this.vents_squadmate_2());
            }
        });
        this.vents_fireteam_leader_pool = ko.pureComputed((): Teammate[] => {
            const candidates = this.approach_survivors();
            if (candidates) {
                return _.without<Teammate>(_.filter(candidates, "is_leader_candidate"), this.vents_specialist(), this.vents_squadmate_1(), this.vents_squadmate_2());
            }
        });
        this.vents_squadmate_pool_1 = ko.pureComputed((): Teammate[] => {
            const candidates = this.approach_survivors();
            if (candidates) {
                return _.without<Teammate>(candidates, this.vents_specialist(), this.vents_fireteam_leader(), this.vents_squadmate_2());
            }
        });
        this.vents_squadmate_pool_2 = ko.pureComputed((): Teammate[] => {
            const candidates = this.approach_survivors();
            if (candidates) {
                return _.without<Teammate>(candidates, this.vents_specialist(), this.vents_fireteam_leader(), this.vents_squadmate_1());
            }
        });
        this.bindToPool(this.vents_specialist, this.vents_specialist_pool);
        this.bindToPool(this.vents_fireteam_leader, this.vents_fireteam_leader_pool);
        this.bindToPool(this.vents_squadmate_1, this.vents_squadmate_pool_1);
        this.bindToPool(this.vents_squadmate_2, this.vents_squadmate_pool_2);
        this.vents_evaluatable = ko.pureComputed((): boolean => {
            return !!(this.vents_specialist() && this.vents_fireteam_leader() && this.vents_squadmate_1() && this.vents_squadmate_2());
        });
        this.vents_death = ko.pureComputed((): Teammate => {
            if (this.vents_evaluatable()) {
                const specialist = this.vents_specialist();
                const leader = this.vents_fireteam_leader();
                if (!specialist.is_good_vent_specialist() || !leader.is_good_vent_fireteam_leader()) {
                    return specialist;
                }
            }
        });
        this.vents_survivors = ko.pureComputed((): Teammate[] => {
            if (this.vents_evaluatable()) {
                return _.without(this.approach_survivors(), this.vents_death());
            }
        });

        // Long Walk
        this.long_walk_specialist = ko.observable(undefined);
        this.long_walk_fireteam_leader = ko.observable(undefined);
        this.long_walk_escort = ko.observable(undefined);
        this.long_walk_squadmate_1 = ko.observable(undefined);
        this.long_walk_squadmate_2 = ko.observable(undefined);
        this.long_walk_specialist_pool = ko.pureComputed((): Teammate[] => {
            const candidates = this.vents_survivors();
            if (candidates) {
                return _.without<Teammate>(_.filter(candidates, "is_bubble_candidate"), this.long_walk_fireteam_leader(), this.long_walk_escort(), this.long_walk_squadmate_1(), this.long_walk_squadmate_2());
            }
        });
        this.long_walk_fireteam_leader_pool = ko.pureComputed((): Teammate[] => {
            const candidates = this.vents_survivors();
            if (candidates) {
                return _.without<Teammate>(_.filter(candidates, "is_leader_candidate"), this.long_walk_specialist(), this.long_walk_escort(), this.long_walk_squadmate_1(), this.long_walk_squadmate_2());
            }
        });
        this.long_walk_escort_pool = ko.pureComputed((): Teammate[] => {
            const candidates = this.vents_survivors();
            if (candidates) {
                return _.without<Teammate>(_.filter(candidates, "is_escort_candidate"), this.long_walk_specialist(), this.long_walk_fireteam_leader(), this.long_walk_squadmate_1(), this.long_walk_squadmate_2());
            }
        });
        this.long_walk_squadmate_pool_1 = ko.pureComputed((): Teammate[] => {
            const candidates = this.vents_survivors();
            if (candidates) {
                return _.without<Teammate>(candidates, this.long_walk_specialist(), this.long_walk_fireteam_leader(), this.long_walk_escort(), this.long_walk_squadmate_2());
            }
        });
        this.long_walk_squadmate_pool_2 = ko.pureComputed((): Teammate[] => {
            const candidates = this.vents_survivors();
            if (candidates) {
                return _.without<Teammate>(candidates, this.long_walk_specialist(), this.long_walk_fireteam_leader(), this.long_walk_escort(), this.long_walk_squadmate_1());
            }
        });
        this.bindToPool(this.long_walk_specialist, this.long_walk_specialist_pool);
        this.bindToPool(this.long_walk_fireteam_leader, this.long_walk_fireteam_leader_pool);
        this.bindToPool(this.long_walk_escort, this.long_walk_escort_pool);
        this.bindToPool(this.long_walk_squadmate_1, this.long_walk_squadmate_pool_1);
        this.bindToPool(this.long_walk_squadmate_2, this.long_walk_squadmate_pool_2);
        this.long_walk_evaluatable = ko.pureComputed((): boolean => {
            return !!(this.long_walk_specialist() && this.long_walk_fireteam_leader() && this.long_walk_squadmate_1() && this.long_walk_squadmate_2());
        });
        this.long_walk_escort_death = ko.pureComputed((): Teammate => {
            if (this.long_walk_evaluatable()) {
                const escort = this.long_walk_escort();
                if (escort && !escort.is_good_escort()) {
                    return escort;
                }
            }
        });
        this.long_walk_squadmate_death = ko.pureComputed((): Teammate => {
            if (this.long_walk_evaluatable()) {
                const specialist = this.long_walk_specialist();
                const squadmate_1 = this.long_walk_squadmate_1();
                const squadmate_2 = this.long_walk_squadmate_2();
                if (!specialist.is_good_long_walk_specialist()) {
                    const candidates = _.sortBy([squadmate_1, squadmate_2], "long_walk_death_priority");
                    return _.last(candidates);
                }
            }
        });
        this.long_walk_fireteam_leader_death = ko.pureComputed((): Teammate => {
            if (this.long_walk_evaluatable()) {
                const leader = this.long_walk_fireteam_leader();
                if (!leader.is_good_long_walk_fireteam_leader()) {
                    return leader;
                }
            }
        });
        this.long_walk_survivors = ko.pureComputed((): Teammate[] => {
            const candidates = this.vents_survivors();
            if (this.long_walk_evaluatable()) {
                return _.without(candidates, this.long_walk_escort_death(), this.long_walk_squadmate_death(), this.long_walk_escort_death());
            }
        });

        // Boss
        this.boss_squadmate_1 = ko.observable(undefined);
        this.boss_squadmate_2 = ko.observable(undefined);
        this.boss_squadmate_pool_1 = ko.pureComputed((): Teammate[] => {
            const candidates = this.long_walk_survivors();
            if (candidates) {
                return _.without<Teammate>(candidates, this.long_walk_escort(), this.boss_squadmate_2());
            }
        });
        this.boss_squadmate_pool_2 = ko.pureComputed((): Teammate[] => {
            const candidates = this.long_walk_survivors();
            if (candidates) {
                return _.without<Teammate>(candidates, this.long_walk_escort(), this.boss_squadmate_1());
            }
        });
        this.bindToPool(this.boss_squadmate_1, this.boss_squadmate_pool_1);
        this.bindToPool(this.boss_squadmate_2, this.boss_squadmate_pool_2);
        this.boss_evaluatable = ko.pureComputed((): boolean => {
            return !!(this.boss_squadmate_1() && this.boss_squadmate_2());
        });
        this.boss_squadmate_deaths = ko.pureComputed((): Teammate[] => {
            if (this.boss_evaluatable()) {
                const deaths: Teammate[] = [];
                const squadmate_1 = this.boss_squadmate_1();
                const squadmate_2 = this.boss_squadmate_2();
                if (!squadmate_1.is_good_boss_squadmate()) {
                    deaths.push(squadmate_1);
                }
                if (!squadmate_2.is_good_boss_squadmate()) {
                    deaths.push(squadmate_2);
                }
                return deaths;
            }
        });
        this.boss_hold_the_line_candidates = ko.pureComputed((): Teammate[] => {
            const candidates = this.long_walk_survivors();
            if (this.boss_evaluatable()) {
                return _.without(candidates, this.long_walk_escort(), this.boss_squadmate_1(), this.boss_squadmate_2());
            }
        });
        this.boss_hold_the_line_total = ko.pureComputed((): number => {
            const candidates = this.boss_hold_the_line_candidates();
            if (candidates) {
                return _.sum(_.map<Teammate, number>(candidates, (teammate: Teammate): number => { return teammate.hold_the_line_score(); }));
            }
        });
        this.boss_hold_the_line_rating = ko.pureComputed((): number => {
            const candidates = this.boss_hold_the_line_candidates();
            const total = this.boss_hold_the_line_total();
            if (candidates) {
                return total / candidates.length;
            }
        });
        this.boss_hold_the_line_death_count = ko.pureComputed((): number => {
            const rating = this.boss_hold_the_line_rating();
            const candidates = this.boss_hold_the_line_candidates();
            if (rating !== undefined) {
                if (rating < 2.0) {
                    if (candidates.length >= 5) {
                        if (rating >= 1.5) {
                            return 1;
                        } else if (rating >= 0.5) {
                            return 2;
                        } else {
                            return 3;
                        }
                    } else if (candidates.length === 4) {
                        if (rating >= 1.0) {
                            return 1;
                        } else if (rating >= 0.5) {
                            return 2;
                        } else if (rating > 0) {
                            return 3;
                        } else {
                            return 4;
                        }
                    } else if (candidates.length === 3) {
                        if (rating >= 1) {
                            return 1;
                        } else if (rating > 0) {
                            return 2;
                        } else {
                            return 3;
                        }
                    } else if (candidates.length === 2) {
                        if (rating > 0) {
                            return 1;
                        } else {
                            return 2;
                        }
                    } else {
                        return 1;
                    }
                } else {
                    return 0;
                }
            }
        });
        this.boss_hold_the_line_deaths = ko.pureComputed((): Teammate[] => {
            const death_count = this.boss_hold_the_line_death_count();
            const candidates = this.boss_hold_the_line_candidates();
            if (death_count !== undefined) {
                if (death_count === 0) {
                    return [];
                } else {
                    return _.sortBy(candidates, "hold_the_line_death_priority").slice(-death_count);
                }
            }
        });
        this.boss_survivors = ko.pureComputed((): Teammate[] => {
            const candidates = this.long_walk_survivors();
            if (this.boss_evaluatable()) {
                return _.without(candidates, ...this.boss_hold_the_line_deaths(), ...this.boss_squadmate_deaths());
            }
        });

        this.pool([
            //                 ID                     Name                    Ess     HTL     HTLD    AD      SD      WD      LWD     CRP     DRP     KBP         DPB     Tech    Biotic      Leader      SLd     EC      VC      BC      LC
            new Teammate(this, HenchmanIDs.Garrus,    "Garrus Vakarian",      true,   3,      5,      0,      8,      11,     10,     2,      11,     8,          0,      false,  false,      true,       false,  true,   true,   false,  true),
            new Teammate(this, HenchmanIDs.Grunt,     "Grunt",                false,  3,      0,      0,      6,      9,      8,      4,      9,      12,         0,      false,  false,      false,      false,  true,   false,  false,  true),
            new Teammate(this, HenchmanIDs.Jack,      "Jack",                 true,   0,      8,      12,     5,      8,      11,     1,      12,     0,          8,      false,  true,       false,      false,  true,   false,  true,   true),
            new Teammate(this, HenchmanIDs.Jacob,     "Jacob Taylor",         true,   1,      6,      0,      0,      0,      6,      7,      8,      0,          10,     false,  false,      true,       false,  true,   true,   true,   true),
            new Teammate(this, HenchmanIDs.Kasumi,    "Kasumi Goto",          false,  0,      9,      0,      12,     0,      3,      9,      4,      0,          9,      true,   false,      false,      false,  true,   true,   false,  true),
            new Teammate(this, HenchmanIDs.Legion,    "Legion",               false,  1,      3,      0,      11,     0,      9,      3,      10,     9,          0,      true,   false,      false,      false,  true,   true,   false,  true),
            new Teammate(this, HenchmanIDs.Miranda,   "Miranda Lawson",       true,   1,      7,      0,      0,      0,      -1,     11,     2,      13,         0,      false,  false,      true,       true,   false,  false,  true,   true),
            new Teammate(this, HenchmanIDs.Mordin,    "Mordin Solus",         true,   0,      11,     0,      0,      0,      5,      6,      6,      10,         0,      false,  false,      false,      false,  true,   true,   false,  true),
            //new Teammate(HenchmanIDs.Morinth,   "Morinth",            false,  1,      4,      0,      4,      7,      0,      5,      7,      0,          0,      false,  false,      false,      false,  true,   false,  true,   true),
            new Teammate(this, HenchmanIDs.Samara,    "Samara",               false,  1,      4,      0,      4,      7,      7,      5,      7,      0,          12,     false,  true,       false,      false,  true,   false,  true,   true),
            new Teammate(this, HenchmanIDs.Tali,      "Tali'zorah",           false,  0,      10,     0,      10,     0,      4,      8,      5,      0,          11,     true,   false,      false,      false,  true,   true,   false,  true),
            new Teammate(this, HenchmanIDs.Thane,     "Thane",                false,  1,      2,      0,      9,      12,     12,     0,      13,     0,          13,     false,  false,      false,      false,  true,   true,   true,   true),
            new Teammate(this, HenchmanIDs.Zaeed,     "Zaeed Masani",         false,  3,      1,      0,      7,      10,     2,      10,     3,      11,         0,      false,  false,      false,      false,  true,   false,  false,  true)
        ]);
    }

    private bindToPool (observable: KnockoutObservable<Teammate>, pool: KnockoutComputed<Teammate[]>): void {

        // When the pool changes, ensure that the selected observable's value (if set) is still present in the new pool
        pool.subscribe((candidates: Teammate[]): void => {
            const teammate = observable();

            // If candidate pool is not valid, nor is the observable
            if (!candidates) {
                observable(undefined);

            // If pool IS valid, but does not contain the observable, observable is not valid
            } else if (teammate && !_.contains(candidates, teammate)) {
                observable(undefined);
            }
        });
    }
}
