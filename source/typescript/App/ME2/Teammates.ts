import { Teammate } from "./Teammate";
import { ObjectArray, IObjectArrayIterator } from "../../Utilities/ObjectArray";
import { Henchman } from "./Henchman";
import { TeammateRoles, TeammateDeathCauses, StageIDs, HenchmanIDs } from "../constants";

export class Teammates {

    public oa: ObjectArray<Teammate>;

    constructor (elements: Teammate[]) {
        this.oa = new ObjectArray<Teammate>(elements);
    }

    public static fromObjectArray (oa: ObjectArray<Teammate>): Teammates {
        return new Teammates(oa.elements);
    }

    public value (): Teammate[] {
        return this.oa.elements;
    }

    public first (): Teammate {
        return this.oa.first();
    }

    public last (): Teammate {
        return this.oa.last();
    }

    public length (): number {
        return this.oa.length();
    }

    public whoAreAlive (): Teammates {
        return this.filter((teammate: Teammate): boolean => {
            return !teammate.is_dead();
        });
    }

    public die (stage_id: StageIDs, death_cause: TeammateDeathCauses): Teammates {
        this.each((teammate: Teammate): void => {
            teammate.die(stage_id, death_cause);
        });
        return this;
    }

    public whoAreRecruited (): Teammates {
        return this.filter((teammate: Teammate): boolean => {
            return teammate.is_recruited();
        });
    }

    public addRole (role: TeammateRoles): Teammates {
        this.each((teammate: Teammate): void => {
            teammate.addRole(role);
        });
        return this;
    }

    public removeRole (role: TeammateRoles): Teammates {
        this.each((teammate: Teammate): void => {
            teammate.removeRole(role);
        });
        return this;
    }

    public withRole (role: TeammateRoles): Teammates {
        return this.filter((teammate: Teammate): boolean => {
            return teammate.hasRole(role);
        });
    }

    public withAnyOfTheseRoles (...roles: TeammateRoles[]): Teammates {
        return this.filter((teammate: Teammate): boolean => {
            return teammate.hasAnyOfTheseRoles.apply(teammate, roles);
        });
    }

    public withoutRole (role: TeammateRoles): Teammates {
        return this.filter((teammate: Teammate): boolean => {
            return !teammate.hasRole(role);
        });
    }

    public withoutAnyOfTheseRoles (...roles: TeammateRoles[]): Teammates {
        return this.filter((teammate: Teammate): boolean => {
            return !teammate.hasAnyOfTheseRoles.apply(teammate, roles);
        });
    }

    public sortByHenchmanProperty (property: string, ascending: boolean = true): Teammates {
        return this.sort<number>((teammate: Teammate): number => {
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
        return this.sort<number>((teammate: Teammate): number => {
            return teammate.is_recruited() ? 0 : 1;
        });
    }

    public whoAdvocateKeepingTheBase (): Teammates {
        return this.filter((teammate: Teammate): boolean => {
            return teammate.henchman.keep_base_priority > 0;
        });
    }

    public whoAdvocateDestroyingTheBase (): Teammates {
        return this.filter((teammate: Teammate): boolean => {
            return teammate.henchman.destroy_base_priority > 0;
        });
    }

    public without (...teammates: Teammate[]): Teammates {
        return Teammates.fromObjectArray(this.oa.without.apply(this.oa, teammates));
    }

    public filter (iterator: IObjectArrayIterator<Teammate, boolean>): Teammates {
        return Teammates.fromObjectArray(this.oa.filter(iterator));
    }

    public map<TResult> (iterator: IObjectArrayIterator<Teammate, TResult>): TResult[] {
        return this.oa.map(iterator);
    }

    public find (iterator: IObjectArrayIterator<Teammate, boolean>): Teammate {
        return this.oa.find(iterator);
    }

    public findByHenchman (henchman: Henchman): Teammate {
        return this.findByHenchmanID(henchman.id);
    }

    public findByHenchmanID (id: HenchmanIDs): Teammate {
        return this.find((teammate: Teammate): boolean => {
            return teammate.henchman.id === id;
        });
    }

    public sort<TSort> (iterator: IObjectArrayIterator<Teammate, TSort>): Teammates {
        return Teammates.fromObjectArray(this.oa.sort<TSort>(iterator));
    }

    public slice (start: number, end?: number): Teammates {
        return Teammates.fromObjectArray(this.oa.slice(start, end));
    }

    public getHoldTheLineTotal (): number {
        const scores: number[] = _.map(this.oa.elements, (teammate: Teammate): number => {
            return teammate.getHoldTheLineScore();
        });

        return _.reduce(scores, (sum: number, score: number): number => {
            return sum + score;
        }, 0);
    }

    public getHoldTheLineScore (): number {
        return this.getHoldTheLineTotal() / this.length();
    }

    public getHoldTheLineDeathCount (): number {
        const pool_size = this.length();
        const score = this.getHoldTheLineScore();

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
        const death_count = this.getHoldTheLineDeathCount();

        if (death_count > 0) {
            return this.sort<number>((teammate: Teammate): number => {
                return teammate.henchman.htl_death_priority + (!teammate.is_loyal() ? 100 : 0); // Unloyal team members are prioritised over loyal ones
            }).slice(-death_count);
        } else {
            return new Teammates([]);
        }
    }

    public each (iterator: IObjectArrayIterator<Teammate, void>): void {
        this.oa.each(iterator);
    }
}
