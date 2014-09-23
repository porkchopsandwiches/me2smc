///<reference path="../../../references.ts" />
module App {
    export module ME2 {
        export module Stages {
            export interface IBoss {
                boss_squadmate_1: App.ME2.Teammate;
                boss_squadmate_2: App.ME2.Teammate;
            }

            export class Boss extends Stage implements IBoss {
                public ui: App.ME2.Stages.UI.Boss;
                public boss_squadmate_1: App.ME2.Teammate;
                public boss_squadmate_2: App.ME2.Teammate;

                constructor () {
                    super();
                    this.ui = new App.ME2.Stages.UI.Boss(this);
                }

                private getHTLDeathCount (total: number, pool_size: number): number {
                    var score: number;
                    score = total / pool_size;
                    if (score < 2.0) {
                        if (pool_size >= 5) {
                            if (score >= 1.5) {
                                return 1;
                            } else if (score >= 0.5) {
                                return 2;
                            } else {
                                return 3;
                            }
                        } else if (pool_size === 4) {
                            if (score >= 1.0) {
                                return 1;
                            } else if (score >= 0.5) {
                                return 2;
                            } else if (score > 0) {
                                return 3;
                            } else {
                                return 4;
                            }
                        } else if (pool_size === 3) {
                            if (score >= 1) {
                                return 1;
                            } else if (score > 0) {
                                return 2;
                            } else {
                                return 3;
                            }
                        } else if (pool_size === 2) {
                            if (score > 0) {
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

                public evaluate (): App.ME2.Teammate[] {
                    var htl_pool: App.ME2.Teammate[];
                    var htl_total: number;

                    // The two squadmates survive if loyal
                    if (!this.boss_squadmate_1.is_loyal) {
                        this.boss_squadmate_1.die(App.ME2.TeammateDeathCauses.Boss);
                    }
                    if (!this.boss_squadmate_2.is_loyal) {
                        this.boss_squadmate_2.die(App.ME2.TeammateDeathCauses.Boss);
                    }

                    // For hold the line, include all remaining teammates except the escort and the two squadmates
                    htl_pool = _.filter(this.teammates, (teammate: App.ME2.Teammate): boolean => {
                        return !teammate.is_dead && teammate.henchman.id !== this.boss_squadmate_1.henchman.id && teammate.henchman.id !== this.boss_squadmate_2.henchman.id && !teammate.hasRole(App.ME2.TeammateRoles.LongWalkEscort);
                    });

                    // Determine total HTL score
                    htl_total = _.chain(htl_pool).map((teammate: App.ME2.Teammate): number => {
                        return teammate.getHoldTheLineScore();
                    }).reduce<number>((sum: number, score: number): number => {
                        return sum + score;
                    }, 0)["value"]();

                    // If this business got out of control, and some teammates weren't lucky enough to live through it
                    if (htl_total / htl_pool.length < 2.0) {
                        htl_pool = _.sortBy(htl_pool, (teammate: App.ME2.Teammate): number => {
                            return teammate.henchman.htl_death_priority + (!teammate.is_loyal ? 100 : 0); // Unloyal team members are prioritised over loyal ones
                        });
                        //console.log("death order", htl_pool);

                        htl_pool.slice(-1 * this.getHTLDeathCount(htl_total, htl_pool.length)).forEach((teammate: App.ME2.Teammate) => {
                            teammate.die(App.ME2.TeammateDeathCauses.HoldTheLine);
                        });


                        //console.log("death section", htl_pool);
                    }



                    return this.teammates;
                }

                public isEvaluatable (): boolean {
                    return !!this.boss_squadmate_1 && !!this.boss_squadmate_2;
                }
            }
        }
    }
}