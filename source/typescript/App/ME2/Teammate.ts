///<reference path="../../references.ts" />
module App {
    export module ME2 {
        export enum TeammateDeathCauses {
            ArmourFailure,
            ShieldingFailure,
            CannonFailure,
            VentsBadVenter,
            VentsBadLeader,
            LongWalkBadBubbler,
            LongWalkBadLeader,
            Escort,
            Boss,
            HoldTheLine
        }

        export enum TeammateRoles {
            OcculusSquadmate1 = 0,
            OcculusSquadmate2 = 1,
            VentsSquadmate1 = 2,
            VentsSquadmate2 = 3,
            VentsVenter = 4,
            VentsLeader = 5,
            LongWalkSquadmate1 = 6,
            LongWalkSquadmate2 = 7,
            LongWalkEscort = 8,
            LongWalkBubbler = 9,
            LongWalkLeader = 10,
            BossSquadmate1 = 11,
            BossSquadmate2 = 12,
            HeldTheLine = 13
        }

        export interface ITeammate {
            henchman: App.ME2.Henchman;
            is_loyal: KnockoutObservable<boolean>;
            is_recruited: KnockoutObservable<boolean>;
            is_dead: KnockoutObservable<boolean>;
            death_cause: KnockoutObservable<TeammateDeathCauses>;
            death_stage_id: KnockoutObservable<App.ME2.Stages.StageIDs>;
            roles: KnockoutObservableArray<TeammateRoles>;
            hasRole (role: TeammateRoles): boolean;
            hasAnyOfTheseRoles (...roles: TeammateRoles[]): boolean;
            hasAllOfTheseRoles (...roles: TeammateRoles[]): boolean;
            addRole (role: TeammateRoles): ITeammate;
            die (stage_id: App.ME2.Stages.StageIDs, death_cause: TeammateDeathCauses): ITeammate;
            willBeEffectiveLongWalkLeader (): boolean;
            willBeEffectiveLongWalkEscort (): boolean;
            willBeEffectiveLongWalkBubbler (): boolean;
            willSurviveBeingBossSquadmate (): boolean;
            willBeEffectiveVentVenter (): boolean;
            willBeEffectiveVentLeader (): boolean;
            getHoldTheLineScore (): number;
        }

        export class Teammate implements ITeammate {
            public death_cause: KnockoutObservable<TeammateDeathCauses>;
            public death_stage_id: KnockoutObservable<App.ME2.Stages.StageIDs>;
            public henchman: App.ME2.Henchman;
            public is_recruited: KnockoutObservable<boolean>;
            public is_loyal: KnockoutObservable<boolean>;
            public is_dead: KnockoutObservable<boolean>;
            public roles: KnockoutObservableArray<TeammateRoles>;

            constructor (henchman: App.ME2.Henchman, is_recruited: boolean = false, is_loyal: boolean = false, is_dead: boolean = false, roles: TeammateRoles[] = []) {
                this.henchman = henchman;
                this.is_recruited = ko.observable<boolean>(is_recruited);
                this.is_loyal = ko.observable<boolean>(is_recruited && is_loyal);
                this.is_dead = ko.observable<boolean>(is_dead);
                this.roles = ko.observableArray(roles);
                this.death_cause = ko.observable<TeammateDeathCauses>(undefined);
                this.death_stage_id = ko.observable<App.ME2.Stages.StageIDs>(undefined);

                // If not recruited, can't be loyal either
                this.is_recruited.subscribe((is_recruited: boolean) => {
                    if (!is_recruited && this.is_loyal()) {
                        this.is_loyal(false);
                    }
                });
            }

            public addRole (role: TeammateRoles): Teammate {
                if (!this.hasRole(role)) {
                    this.roles.push(role);
                }
                return this;
            }

            public removeRole (role: TeammateRoles): Teammate {
                this.roles.remove(role);
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

            public die (stage_id: App.ME2.Stages.StageIDs, death_cause: TeammateDeathCauses): Teammate {
                this.death_stage_id(stage_id);
                this.death_cause(death_cause);
                this.is_dead(true);
                return this;
            }
        }
    }
}