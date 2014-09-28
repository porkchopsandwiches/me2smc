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
            is_loyal: boolean;
            is_recruited: boolean;
            is_dead: boolean;
            death_cause: TeammateDeathCauses;
            death_stage_id: App.ME2.Stages.UI.StageIDs;
            hasRole (role: TeammateRoles): boolean;
            addRole (role: TeammateRoles): ITeammate;
            die (stage_id: App.ME2.Stages.UI.StageIDs, death_cause: TeammateDeathCauses): ITeammate;
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
            public death_cause: TeammateDeathCauses;
            public death_stage_id: App.ME2.Stages.UI.StageIDs;
            public henchman: App.ME2.Henchman;
            public is_recruited: boolean = false;
            public is_loyal: boolean = false;
            public is_dead: boolean = false;
            public roles: TeammateRoles[] = [];

            constructor (
                henchman: App.ME2.Henchman,
                is_recruited: boolean = false,
                is_loyal: boolean = false,
                is_dead: boolean = false
            ) {
                this.henchman = henchman;
                this.is_recruited = is_recruited;
                this.is_loyal = is_loyal;
                this.is_dead = is_dead;
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
                return this.henchman.htl_value + (this.is_loyal ? 1 : 0);
            }

            public willBeEffectiveLongWalkLeader (): boolean {
                return this.henchman.is_leader && (this.is_loyal || this.henchman.is_super_leader);
            }

            public willBeEffectiveLongWalkEscort (): boolean {
                return this.is_loyal;
            }

            public willBeEffectiveLongWalkBubbler (): boolean {
                return this.is_loyal && this.henchman.is_biotic_expert;
            }

            public willSurviveBeingBossSquadmate (): boolean {
                return this.is_loyal;
            }

            public willBeEffectiveVentVenter (): boolean {
                return this.henchman.is_tech_expert && this.is_loyal;
            }

            public willBeEffectiveVentLeader (): boolean {
                return this.henchman.is_leader && this.is_loyal;
            }

            public die (stage_id: App.ME2.Stages.UI.StageIDs, death_cause: TeammateDeathCauses): Teammate {
                this.death_stage_id = stage_id;
                this.is_dead = true;
                this.death_cause = death_cause;
                return this;
            }
        }
    }
}