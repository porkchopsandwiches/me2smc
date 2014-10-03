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
            OcculusSquadmate,
            VentsSquadmate,
            VentsVenter,
            VentsLeader,
            LongWalkSquadmate,
            LongWalkEscort,
            LongWalkBubbler,
            LongWalkLeader,
            BossSquadmate,
            HeldTheLine
        }

        export interface ITeammate {
            henchman: App.ME2.Henchman;
            is_loyal: KnockoutObservable<boolean>;
            is_recruited: KnockoutObservable<boolean>;
            is_dead: KnockoutObservable<boolean>;
            death_cause: KnockoutObservable<TeammateDeathCauses>;
            death_stage_id: KnockoutObservable<App.ME2.Stages.StageIDs>;
            hasRole (role: TeammateRoles): boolean;
            addRole (role: TeammateRoles): ITeammate;
            die (stage_id: App.ME2.Stages.StageIDs, death_cause: TeammateDeathCauses): ITeammate;
            willBeEffectiveLongWalkLeader (): boolean;
            willBeEffectiveLongWalkEscort (): boolean;
            willBeEffectiveLongWalkBubbler (): boolean;
            willSurviveBeingBossSquadmate (): boolean;
            willBeEffectiveVentVenter (): boolean;
            willBeEffectiveVentLeader (): boolean;
            getHoldTheLineScore (): number;
            roles: TeammateRoles[];
        }

        export class Teammate implements ITeammate {
            public death_cause: KnockoutObservable<TeammateDeathCauses>;
            public death_stage_id: KnockoutObservable<App.ME2.Stages.StageIDs>;
            public henchman: App.ME2.Henchman;
            public is_recruited: KnockoutObservable<boolean>;
            public is_loyal: KnockoutObservable<boolean>;
            public is_dead: KnockoutObservable<boolean>;
            public roles: TeammateRoles[];

            constructor (henchman: App.ME2.Henchman, is_recruited: boolean = false, is_loyal: boolean = false, is_dead: boolean = false) {
                this.henchman = henchman;
                this.is_recruited = ko.observable<boolean>(is_recruited);
                this.is_loyal = ko.observable<boolean>(is_recruited && is_loyal);
                this.is_dead = ko.observable<boolean>(is_dead);
                this.roles = [];

                // If not recruited, can't be loyal either
                this.is_recruited.subscribe((is_recruited: boolean) => {
                    if (!is_recruited && this.is_loyal()) {
                        this.is_loyal(false);
                    }
                });

                this.death_cause = ko.observable<TeammateDeathCauses>(undefined);
                this.death_stage_id = ko.observable<App.ME2.Stages.StageIDs>(undefined);

            }

            public addRole (role: TeammateRoles): Teammate {
                if (!this.hasRole(role)) {
                    this.roles.push(role);
                }
                return this;
            }

            public hasRole (role: TeammateRoles): boolean {
                return _.indexOf(this.roles, role) !== -1;
            }

            public getHoldTheLineScore (): number {
                return this.henchman.htl_value + (this.is_loyal() ? 1 : 0);
            }

            public willBeEffectiveLongWalkLeader (): boolean {
                return this.henchman.is_leader && (this.is_loyal() || this.henchman.is_super_leader);
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