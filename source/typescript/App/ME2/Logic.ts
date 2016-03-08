import { Application } from "../Application";
import { HenchmanIDs, NormandyDelayOptions } from "../constants";
import { Teammate } from "./Teammate";

export class Logic {
    public pool: KnockoutObservableArray<Teammate>;

    // Prep properties
    public normandy_has_armour: KnockoutComputed<boolean>;
    public normandy_has_shields: KnockoutComputed<boolean>;
    public normandy_has_weapon: KnockoutComputed<boolean>;
    public mission_delay: KnockoutComputed<number>;
    public recruited: KnockoutComputed<Teammate[]>;
    public loyal: KnockoutComputed<Teammate[]>;
    public upgraded: KnockoutComputed<Teammate[]>;
    public all_recruited: KnockoutComputed<boolean>;
    public all_loyal: KnockoutComputed<boolean>;
    public all_upgraded: KnockoutComputed<boolean>;

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

    // Summary
    public summary_defence_reporter: KnockoutComputed<Teammate>;
    public summary_advocates_keeping_base: KnockoutComputed<Teammate>;
    public summary_advocates_destroying_base: KnockoutComputed<Teammate>;
    public summary_shepard_lives: KnockoutComputed<boolean>;
    public summary_catches_shepard: KnockoutComputed<Teammate>;

    // Serialisation
    public serialised: KnockoutComputed<string>;

    // Backing variables
    private _mission_delay: number;

    constructor (app: Application) {

        // Prep
        this.normandy_has_armour = ko.pureComputed({
            read: (): boolean => {
                return _.find(this.pool(), "upgrade_unlocks_armour").is_upgraded();
            },
            write: (has_armour: boolean): void => {
                _.find(this.pool(), "upgrade_unlocks_armour").is_upgraded(has_armour);
            }
        });
        this.normandy_has_shields = ko.pureComputed({
            read: (): boolean => {
                return _.find(this.pool(), "upgrade_unlocks_shields").is_upgraded();
            },
            write: (has_shields: boolean): void => {
                _.find(this.pool(), "upgrade_unlocks_shields").is_upgraded(has_shields);
            }
        });
        this.normandy_has_weapon = ko.pureComputed({
            read: (): boolean => {
                return _.find(this.pool(), "upgrade_unlocks_weapon").is_upgraded();
            },
            write: (has_weapon: boolean): void => {
                _.find(this.pool(), "upgrade_unlocks_weapon").is_upgraded(has_weapon);
            }
        });
        this.mission_delay = ko.pureComputed({
            read: (): number => {
                return this._mission_delay;
            },
            write: (mission_delay: number): void => {
                if (mission_delay >= NormandyDelayOptions.None && mission_delay <= NormandyDelayOptions.Many) {
                    this._mission_delay = mission_delay;
                }
            }
        });
        this.pool = ko.observableArray([]);

        this.recruited = ko.pureComputed((): Teammate[] => {
            return _.filter(this.pool(), (teammate: Teammate): boolean => {
                return teammate.is_recruited();
            });
        });
        this.loyal = ko.pureComputed((): Teammate[] => {
            return _.filter(this.pool(), (teammate: Teammate): boolean => {
                return teammate.is_loyal();
            });
        });
        this.upgraded = ko.pureComputed((): Teammate[] => {
            return _.filter(this.pool(), (teammate: Teammate): boolean => {
                return teammate.is_upgraded();
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
                return _.all(this.recruited(), (teammate: Teammate): boolean => {
                    return teammate.is_loyal();
                });
            },
            write: (all_loyal: boolean): void => {
                _.each(this.recruited(), (teammate: Teammate): void => {
                    teammate.is_loyal(all_loyal);
                });
            }
        });
        this.all_upgraded = ko.pureComputed({
            read: (): boolean => {
                return _.all(this.loyal(), (teammate: Teammate): boolean => {
                    return teammate.is_upgraded();
                });
            },
            write: (all_upgraded: boolean): void => {
                _.each(this.loyal(), (teammate: Teammate): void => {
                    teammate.is_upgraded(all_upgraded);
                });
            }
        });

        // Approach
        this.approach_squadmate_1 = ko.observable(undefined);
        this.approach_squadmate_2 = ko.observable(undefined);
        this.approach_squadmate_pool_1 = ko.pureComputed((): Teammate[] => {
            const candidates = this.recruited();
            if (candidates.length >= 8) {
                return _.without(candidates, this.approach_squadmate_2());
            }
        });
        this.approach_squadmate_pool_2 = ko.pureComputed((): Teammate[] => {
            const candidates = this.recruited();
            if (candidates.length >= 8) {
                return _.without(candidates, this.approach_squadmate_1());
            }
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

                    // Even if they are a bad leader, they will survive if:
                    // a) They are alone &
                    // b) A squadmate died
                    const long_walk_fireteam_followers = _.without(this.vents_survivors(), this.long_walk_fireteam_leader(), this.long_walk_escort(), this.long_walk_specialist(), this.long_walk_squadmate_1(), this.long_walk_squadmate_2());
                    if (long_walk_fireteam_followers.length === 0 && !!this.long_walk_squadmate_death()) {
                        return undefined;
                    }

                    return leader;
                }
            }
        });
        this.long_walk_survivors = ko.pureComputed((): Teammate[] => {
            const candidates = this.vents_survivors();
            if (this.long_walk_evaluatable()) {
                return _.without(candidates, this.long_walk_escort_death(), this.long_walk_squadmate_death(), this.long_walk_fireteam_leader_death());
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
                if (candidates.length > 0) {
                    return total / candidates.length;
                } else {
                    return 0;
                }
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
                    return _.sortBy(candidates, (teammate: Teammate): number => {
                        return teammate.hold_the_line_death_priority + (!teammate.is_loyal() ? 100 : 0); // Unloyal team members are prioritised over loyal ones
                    }).slice(-death_count);

                    //return _.sortBy(candidates, "hold_the_line_death_priority").slice(-death_count);
                }
            }
        });
        this.boss_survivors = ko.pureComputed((): Teammate[] => {
            const candidates = this.long_walk_survivors();
            if (this.boss_evaluatable()) {
                return _.without(candidates, ...this.boss_hold_the_line_deaths(), ...this.boss_squadmate_deaths());
            }
        });

        this.summary_defence_reporter = ko.pureComputed((): Teammate => {
            const candidates = this.boss_hold_the_line_candidates();
            if (candidates) {
                //const candidates = _.sortBy([squadmate_1, squadmate_2], "long_walk_death_priority");
                return _.last(_.sortBy(candidates, "defence_report_priority"));
            }
        });

        this.summary_advocates_keeping_base = ko.pureComputed((): Teammate => {
            const s1 = this.boss_squadmate_1();
            const s2 = this.boss_squadmate_2();
            if (s1 && s2) {
                return _.last(_.sortBy([s1, s2], "keep_base_priority"));
            }
        });

        this.summary_advocates_destroying_base = ko.pureComputed((): Teammate => {
            const s1 = this.boss_squadmate_1();
            const s2 = this.boss_squadmate_2();
            if (s1 && s2) {
                return _.last(_.sortBy([s1, s2], "destroy_base_priority"));
            }
        });

        this.summary_shepard_lives = ko.pureComputed((): boolean => {
            return this.boss_survivors().length >= 2;
        });

        this.summary_catches_shepard = ko.pureComputed((): Teammate => {
            let candidates = this.boss_survivors();
            const s1 = this.boss_squadmate_1();
            const s2 = this.boss_squadmate_2();
            const shepard_lives = this.summary_shepard_lives();
            if (shepard_lives && candidates && candidates.length) {
                candidates = _.sortBy(candidates, (teammate: Teammate): number => {
                    const was_squadmate = teammate === s1 || teammate === s2;
                    return teammate.cutscene_rescue_priority + (was_squadmate ? 100 : 0);
                });
                return _.last(candidates);
            }
        });

        this.pool([
            //                 ID                     Name                    Ess     HTL     HTLD    AD      SD      WD      LWD     CRP     DRP     KBP         DPB     Tech    Biotic      Leader      SLd     EC      VC      BC      LC    Armour   Shield  Weapon
            new Teammate(this, HenchmanIDs.Garrus,    "Garrus Vakarian",      true,   3,      5,      0,      8,      11,     10,     3,      11,     8,          0,      false,  false,      true,       false,  true,   true,   false,  true, false,   false,  true),
            new Teammate(this, HenchmanIDs.Grunt,     "Grunt",                false,  3,      0,      0,      6,      9,      8,      5,      9,      12,         0,      false,  false,      false,      false,  true,   false,  false,  true, false,   false,  false),
            new Teammate(this, HenchmanIDs.Jack,      "Jack",                 true,   0,      8,      12,     5,      8,      11,     2,      12,     0,          8,      false,  true,       false,      false,  true,   false,  true,   true, false,   false,  false),
            new Teammate(this, HenchmanIDs.Jacob,     "Jacob Taylor",         true,   1,      6,      0,      0,      0,      6,      8,      8,      0,          10,     false,  false,      true,       false,  true,   true,   true,   true, true,    false,  false),
            new Teammate(this, HenchmanIDs.Kasumi,    "Kasumi Goto",          false,  0,      9,      0,      12,     0,      3,      10,     4,      0,          9,      true,   false,      false,      false,  true,   true,   false,  true, false,   false,  false),
            new Teammate(this, HenchmanIDs.Legion,    "Legion",               false,  1,      3,      0,      11,     0,      9,      4,      10,     9,          0,      true,   false,      false,      false,  true,   true,   false,  true, false,   false,  false),
            new Teammate(this, HenchmanIDs.Miranda,   "Miranda Lawson",       true,   1,      7,      0,      0,      0,      -1,     12,     2,      13,         0,      false,  false,      true,       true,   false,  false,  true,   true, false,   false,  false),
            new Teammate(this, HenchmanIDs.Mordin,    "Mordin Solus",         true,   0,      11,     0,      0,      0,      5,      7,      6,      10,         0,      false,  false,      false,      false,  true,   true,   false,  true, false,   false,  false),
            //new Teammate(HenchmanIDs.Morinth,   "Morinth",            false,  1,      4,      0,      4,      7,      0,      5,      8,      0,          0,      false,  false,      false,      false,  true,   false,  true,   true),
            new Teammate(this, HenchmanIDs.Samara,    "Samara",               false,  1,      4,      0,      4,      7,      7,      6,      7,      0,          12,     false,  true,       false,      false,  true,   false,  true,   true, false,   false,  false),
            new Teammate(this, HenchmanIDs.Tali,      "Tali'zorah",           false,  0,      10,     0,      10,     0,      4,      9,      5,      0,          11,     true,   false,      false,      false,  true,   true,   false,  true, false,   true,   false),
            new Teammate(this, HenchmanIDs.Thane,     "Thane",                false,  1,      2,      0,      9,      12,     12,     1,      13,     0,          13,     false,  false,      false,      false,  true,   true,   true,   true, false,   false,  false),
            new Teammate(this, HenchmanIDs.Zaeed,     "Zaeed Masani",         false,  3,      1,      0,      7,      10,     2,      11,     3,      11,         0,      false,  false,      false,      false,  true,   false,  false,  true, false,   false,  false)
        ]);

        const serialisables: KnockoutObservable<Teammate>[] = [
            this.approach_squadmate_1,
            this.approach_squadmate_2,
            this.vents_specialist,
            this.vents_fireteam_leader,
            this.vents_squadmate_1,
            this.vents_squadmate_2,
            this.long_walk_specialist,
            this.long_walk_fireteam_leader,
            this.long_walk_escort,
            this.long_walk_squadmate_1,
            this.long_walk_squadmate_2,
            this.boss_squadmate_1,
            this.boss_squadmate_2
        ];

        this.serialised = ko.pureComputed({
            read: (): string => {
                let serialised: string = _.map(this.pool(), (teammate: Teammate): string => {
                    return (
                        (teammate.is_recruited() ? 1 : 0)
                        + (teammate.is_loyal() ? 2 : 0)
                        + (teammate.is_upgraded() ? 4 : 0)
                    ).toString(16);
                }).join("");

                serialised += _.map<KnockoutObservable<Teammate>, string>(serialisables, (observable: KnockoutObservable<Teammate>): string => {
                    const teammate = observable();
                    return (teammate ? teammate.id : 0).toString(16);
                }).join("");

                return serialised;
            },
            write: (serialised: string): void => {
                const pool = this.pool();
                for (let i = 0, l = pool.length; i < l; ++i) {
                    const flags = parseInt(serialised[i], 16);
                    pool[i].is_recruited(!!(flags & 1));
                    pool[i].is_loyal(!!(flags & 2));
                    pool[i].is_upgraded(!!(flags & 4));
                }

                _.each(serialisables, (observable: KnockoutObservable<Teammate>, index: number): void => {
                    const id = parseInt(serialised[pool.length + index], 16);
                    if (id > 0) {
                        observable(_.find(pool, (teammate: Teammate): boolean => {
                            return teammate.id === id;
                        }));
                    } else {
                        observable(undefined);
                    }
                });
            }
        });
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
