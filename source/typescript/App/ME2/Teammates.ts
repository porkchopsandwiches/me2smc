///<reference path="../../references.ts" />
module App {
    export module ME2 {
        export interface ITeammates {
            oa: Utilities.ObjectArray<App.ME2.Teammate>;
            value (): App.ME2.Teammate[];
            first (): App.ME2.Teammate;
            last (): App.ME2.Teammate;
            length (): number;
            whoAreAlive (): Teammates;
            whoAreRecruited (): Teammates;
            withRole (role: App.ME2.TeammateRoles): Teammates;
            withoutRole (role: App.ME2.TeammateRoles): Teammates;
            sortByHenchmanProperty (property: string, ascending?: boolean): Teammates;
            sortByShieldingDeathPriority (ascending?: boolean): Teammates;
            sortByArmourDeathPriority (ascending?: boolean): Teammates;
            sortByCannonDeathPriority (ascending?: boolean): Teammates;
            sortByLongWalkDeathPriority (ascending?: boolean): Teammates;
            sortByDefenceReportPriority (ascending?: boolean): Teammates;
            sortByKeepBasePriority (ascending?: boolean): Teammates;
            sortByDestroyBasePriority (ascending?: boolean): Teammates;
            sortByIsRecruited (ascending?: boolean): Teammates;
            without (...teammates: App.ME2.Teammate[]): Teammates;
            filter (iterator: Utilities.IObjectArrayIterator<App.ME2.Teammate, boolean>): Teammates;
            find (iterator: Utilities.IObjectArrayIterator<App.ME2.Teammate, boolean>): App.ME2.Teammate;
            sort<TSort> (iterator: Utilities.IObjectArrayIterator<App.ME2.Teammate, TSort>): Teammates;
            map<TResult> (iterator: Utilities.IObjectArrayIterator<App.ME2.Teammate, TResult>): TResult[];
            each (iterator: Utilities.IObjectArrayIterator<App.ME2.Teammate, void>): void;
        }

        export class Teammates implements ITeammates {

            public oa: Utilities.ObjectArray<App.ME2.Teammate>;

            constructor (elements: App.ME2.Teammate[]) {
                this.oa = new Utilities.ObjectArray<App.ME2.Teammate>(elements);
            }

            static fromObjectArray (oa: Utilities.ObjectArray<App.ME2.Teammate>): Teammates {
                return new Teammates(oa.elements);
            }

            public value (): App.ME2.Teammate[] {
                return this.oa.elements;
            }

            public first (): App.ME2.Teammate {
                return this.oa.first();
            }

            public last (): App.ME2.Teammate {
                return this.oa.last();
            }

            public length (): number {
                return this.oa.length();
            }

            public whoAreAlive (): Teammates {
                return this.filter((teammate: App.ME2.Teammate): boolean => {
                    return !teammate.is_dead();
                });
            }

            public die (stage_id: App.ME2.Stages.StageIDs, death_cause: App.ME2.TeammateDeathCauses): Teammates {
                this.each((teammate: App.ME2.Teammate): void => {
                    teammate.die(stage_id, death_cause);
                });
                return this;
            }

            public whoAreRecruited (): Teammates {
                return this.filter((teammate: App.ME2.Teammate): boolean => {
                    return teammate.is_recruited();
                });
            }

            public addRole (role: App.ME2.TeammateRoles): Teammates {
                this.each((teammate: App.ME2.Teammate): void => {
                    teammate.addRole(role);
                });
                return this;
            }

            public withRole (role: App.ME2.TeammateRoles): Teammates {
                return this.filter((teammate: App.ME2.Teammate): boolean => {
                    return teammate.hasRole(role);
                });
            }

            public withoutRole (role: App.ME2.TeammateRoles): Teammates {
                return this.filter((teammate: App.ME2.Teammate): boolean => {
                    return !teammate.hasRole(role);
                });
            }

            public sortByHenchmanProperty (property: string, ascending: boolean = true): Teammates {
                return this.sort<number>((teammate: App.ME2.Teammate): number => {
                    return (ascending ? 1 : -1) * teammate.henchman[property];
                });
            }

            public sortByShieldingDeathPriority (ascending: boolean = true): Teammates {
                return this.sortByHenchmanProperty("shielding_death_priority", ascending);
            }

            public sortByArmourDeathPriority (ascending: boolean = true): Teammates {
                return this.sortByHenchmanProperty("armour_death_priority", ascending);
            }

            public sortByCannonDeathPriority (ascending: boolean = true): Teammates {
                return this.sortByHenchmanProperty("cannon_death_priority", ascending);
            }

            public sortByLongWalkDeathPriority (ascending: boolean = true): Teammates {
                return this.sortByHenchmanProperty("long_walk_death_priority", ascending);
            }

            public sortByDefenceReportPriority (ascending: boolean = true): Teammates {
                return this.sortByHenchmanProperty("defence_report_priority", ascending);
            }

            public sortByKeepBasePriority (ascending: boolean = true): Teammates {
                return this.sortByHenchmanProperty("keep_base_priority", ascending);
            }

            public sortByDestroyBasePriority (ascending: boolean = true): Teammates {
                return this.sortByHenchmanProperty("destroy_base_priority", ascending);
            }

            public sortByIsRecruited (ascending: boolean = true): Teammates {
                return this.sort<number>((teammate: App.ME2.Teammate): number => {
                    return teammate.is_recruited() ? 0 : 1;
                });
            }

            public whoAdvocateKeepingTheBase (): Teammates {
                return this.filter((teammate: App.ME2.Teammate): boolean => {
                    return teammate.henchman.keep_base_priority > 0;
                });
            }

            public whoAdvocateDestroyingTheBase (): Teammates {
                return this.filter((teammate: App.ME2.Teammate): boolean => {
                    return teammate.henchman.destroy_base_priority > 0;
                });
            }

            public without (...teammates: App.ME2.Teammate[]): Teammates {
                return Teammates.fromObjectArray(this.oa.without.apply(this.oa, teammates));
            }

            public filter (iterator: Utilities.IObjectArrayIterator<App.ME2.Teammate, boolean>): Teammates {
                return Teammates.fromObjectArray(this.oa.filter(iterator));
            }

            public map<TResult> (iterator: Utilities.IObjectArrayIterator<App.ME2.Teammate, TResult>): TResult[] {
                return this.oa.map(iterator);
            }

            public find (iterator: Utilities.IObjectArrayIterator<App.ME2.Teammate, boolean>): App.ME2.Teammate {
                return this.oa.find(iterator);
            }

            public findByHenchman (henchman: App.ME2.Henchman): App.ME2.Teammate {
                return this.findByHenchmanID(henchman.id);
            }

            public findByHenchmanID (id: App.ME2.HenchmanIDs): App.ME2.Teammate {
                return this.find((teammate: App.ME2.Teammate): boolean => {
                    return teammate.henchman.id === id;
                });
            }

            public sort<TSort> (iterator: Utilities.IObjectArrayIterator<App.ME2.Teammate, TSort>): Teammates {
                return Teammates.fromObjectArray(this.oa.sort<TSort>(iterator));
            }

            public slice (start: number, end?: number): Teammates {
                return Teammates.fromObjectArray(this.oa.slice(start, end));
            }

            public getHoldTheLineTotal (): number {
                return _.chain<App.ME2.Teammate>(this.oa.elements).map<number>((teammate: App.ME2.Teammate): number => {
                    return teammate.getHoldTheLineScore();
                }).reduce<number>((sum: number, score: number): number => {
                    return sum + score;
                }, 0)["value"]();
            }

            public getHoldTheLineScore (): number {
                return this.getHoldTheLineTotal() / this.length();
            }

            public getHoldTheLineDeathCount (): number {
                var score: number;
                var pool_size: number;

                pool_size = this.length();
                score = this.getHoldTheLineScore();

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

            public whoDieHoldingTheLine (): Teammates {

                var death_count: number;
                death_count = this.getHoldTheLineDeathCount();

                if (death_count > 0) {
                    return this.sort<number>((teammate: App.ME2.Teammate): number => {
                        return teammate.henchman.htl_death_priority + (!teammate.is_loyal() ? 100 : 0); // Unloyal team members are prioritised over loyal ones
                    }).slice(-death_count);
                } else {
                    return new Teammates([]);
                }
            }

            public each (iterator: Utilities.IObjectArrayIterator<App.ME2.Teammate, void>): void {
                this.oa.each(iterator);
            }
        }
    }
}