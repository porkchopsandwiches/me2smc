import { TeammateRoles, TeammateDeathCauses, StageIDs } from "../constants";
import { Henchman } from "./Henchman";

export class Teammate {
    public death_cause: KnockoutObservable<TeammateDeathCauses>;
    public death_stage_id: KnockoutObservable<StageIDs>;
    public henchman: Henchman;
    public is_recruited: KnockoutObservable<boolean>;
    public is_loyal: KnockoutObservable<boolean>;
    public is_dead: KnockoutObservable<boolean>;
    public roles: KnockoutObservableArray<TeammateRoles>;

    constructor (henchman: Henchman, is_recruited: boolean = false, is_loyal: boolean = false, is_dead: boolean = false, roles: TeammateRoles[] = []) {
        this.henchman = henchman;
        this.is_recruited = ko.observable<boolean>(is_recruited);
        this.is_loyal = ko.observable<boolean>(is_recruited && is_loyal);
        this.is_dead = ko.observable<boolean>(is_dead);
        this.roles = ko.observableArray(roles);
        this.death_cause = ko.observable<TeammateDeathCauses>(undefined);
        this.death_stage_id = ko.observable<StageIDs>(undefined);

        // If not recruited, can't be loyal either
        this.is_recruited.subscribe((is_recruited: boolean) => {
            if (!is_recruited && this.is_loyal()) {
                this.is_loyal(false);
            }
        });
    }

    // Only does anything is the Teammate is still alive
    public addRole (role: TeammateRoles): Teammate {
        if (!this.hasRole(role)) {
            if (!this.is_dead()) {
                this.roles.push(role);
            }
        }
        return this;
    }

    // Only does anything is the Teammate is still alive
    public removeRole (role: TeammateRoles): Teammate {
        if (!this.is_dead()) {
            this.roles.remove(role);
        }
        return this;
    }

    public hasRole (role: TeammateRoles): boolean {
        return this.roles.indexOf(role) > -1;
    }

    public hasAnyOfTheseRoles (...roles: TeammateRoles[]): boolean {
        return _.some<TeammateRoles>(roles, (role: TeammateRoles): boolean => {
            return this.hasRole(role);
        });
    }

    public hasAllOfTheseRoles (...roles: TeammateRoles[]): boolean {
        return _.every<TeammateRoles>(roles, (role: TeammateRoles): boolean => {
            return this.hasRole(role);
        });
    }

    public getHoldTheLineScore (): number {
        return this.henchman.htl_value + (this.is_loyal() ? 1 : 0);
    }

    public willBeEffectiveLongWalkLeader (): boolean {
        return this.henchman.is_leader && (this.is_loyal() || this.henchman.is_super_leader); // 'Super leader' (i.e. Miranda) will be effective even if not loyal
    }

    public willBeEffectiveLongWalkEscort (): boolean {
        return this.is_loyal();
    }

    public willBeEffectiveLongWalkBubbler (): boolean {
        return this.is_loyal() && this.henchman.is_biotic_expert;
    }

    public willSurviveBeingBossSquadmate (): boolean {
        return this.is_loyal();
    }

    public willBeEffectiveVentVenter (): boolean {
        return this.henchman.is_tech_expert && this.is_loyal();
    }

    public willBeEffectiveVentLeader (): boolean {
        return this.henchman.is_leader && this.is_loyal();
    }

    public die (stage_id: StageIDs, death_cause: TeammateDeathCauses): Teammate {
        this.death_stage_id(stage_id);
        this.death_cause(death_cause);
        this.is_dead(true);
        return this;
    }
}
