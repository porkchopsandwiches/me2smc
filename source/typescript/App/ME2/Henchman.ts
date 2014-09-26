module App {
    export module ME2 {

        export enum HenchmanIDs {
            Garrus,
            Grunt,
            Jack,
            Jacob,
            Kasumi,
            Legion,
            Miranda,
            Mordin,
            Morinth,
            Samara,
            Tali,
            Thane,
            Zaeed
        }

        export interface IHenchman {
            //app: App.Application;
            id: HenchmanIDs;
            name: string;
            is_essential: boolean;
            htl_value: number;
            htl_death_priority: number;
            armour_death_priority: number;
            shielding_death_priority: number;
            cannon_death_priority: number;
            long_walk_death_priority: number;
            cutscene_rescue_priority: number;
            defence_report_priority: number;
            keep_base_priority: number;
            destroy_base_priority: number;
            is_tech_expert: boolean;
            is_biotic_expert: boolean;
            is_leader: boolean;
            is_super_leader: boolean;
            is_escort_candidate: boolean;
            is_vent_candidate: boolean;
            is_bubble_candidate: boolean;
            is_leader_candidate: boolean;
            getHTLDeathPriorityRank (): number;
            getArmourDeathPriorityRank (): number;
            getShieldingDeathPriorityRank (): number;
            getCannonDeathPriorityRank (): number;
            getLongWalkDeathPriorityRank (): number;
            getCutsceneRescuePriorityRank (): number;
            getDefenceReportPriorityRank (): number;
            getKeepBasePriorityRank (): number;
            getDestroyBasePriorityRank (): number;
        }

        export class Henchman implements IHenchman {
            private app: App.Application;
            public id: HenchmanIDs;
            public name: string = "";
            public is_essential: boolean;
            public htl_value: number;
            public htl_death_priority: number;
            public armour_death_priority: number;
            public shielding_death_priority: number;
            public cannon_death_priority: number;
            public long_walk_death_priority: number;
            public cutscene_rescue_priority: number;
            public defence_report_priority: number;
            public keep_base_priority: number;
            public destroy_base_priority: number;
            public is_tech_expert: boolean;
            public is_biotic_expert: boolean;
            public is_leader: boolean;
            public is_super_leader: boolean;
            public is_escort_candidate: boolean;
            public is_vent_candidate: boolean;
            public is_bubble_candidate: boolean;
            public is_leader_candidate: boolean;

            constructor (
                app: App.Application,
                id: HenchmanIDs = undefined,
                name: string = "",
                is_essential: boolean = false,
                htl_value: number = 0,
                htl_death_priority: number = 0,
                armour_death_priority: number = 0,
                shielding_death_priority: number = 0,
                cannon_death_priority: number = 0,
                long_walk_death_priority: number = 0,
                cutscene_rescue_priority: number = 0,
                defence_report_priority: number = 0,
                keep_base_priority: number = 0,
                destroy_base_priority: number = 0,
                is_tech_expert: boolean = false,
                is_biotic_expert: boolean = false,
                is_leader: boolean = false,
                is_super_leader: boolean = false,
                is_escort_candidate: boolean = false,
                is_vent_candidate: boolean = false,
                is_bubble_candidate: boolean = false,
                is_leader_candidate: boolean = false
            ) {
                this.app = app;
                this.id = id;
                this.name = name;
                this.is_essential = is_essential;
                this.htl_value = htl_value;
                this.htl_death_priority = htl_death_priority;
                this.armour_death_priority = armour_death_priority;
                this.shielding_death_priority = shielding_death_priority;
                this.cannon_death_priority = cannon_death_priority;
                this.long_walk_death_priority = long_walk_death_priority;
                this.cutscene_rescue_priority = cutscene_rescue_priority;
                this.defence_report_priority = defence_report_priority;
                this.keep_base_priority = keep_base_priority;
                this.destroy_base_priority = destroy_base_priority;
                this.is_tech_expert = is_tech_expert;
                this.is_biotic_expert = is_biotic_expert;
                this.is_leader = is_leader;
                this.is_super_leader = is_super_leader;
                this.is_escort_candidate = is_escort_candidate;
                this.is_vent_candidate = is_vent_candidate;
                this.is_bubble_candidate = is_bubble_candidate;
                this.is_leader_candidate = is_leader_candidate;
            }

            private getHenchmenSortedBy (field: string): App.ME2.Henchman[] {
                return _.sortBy<App.ME2.Henchman, number>(this.app.getHenchmen(), (henchman: App.ME2.Henchman): number => {
                    return henchman[field];
                }).reverse();
            }

            public getHenchmenSortedByArmourDeathPriority (): App.ME2.Henchman[] {
                return this.getHenchmenSortedBy("armour_death_priority");
            }

            public getHenchmenSortedByShieldingDeathPriority (): App.ME2.Henchman[] {
                return this.getHenchmenSortedBy("shielding_death_priority");
            }

            public getHenchmenSortedByCannonDeathPriority (): App.ME2.Henchman[] {
                return this.getHenchmenSortedBy("cannon_death_priority");
            }

            public getHenchmenSortedByHTLDeathPriority (): App.ME2.Henchman[] {
                return this.getHenchmenSortedBy("htl_death_priority");
            }

            public getHenchmenSortedByLongWalkDeathPriority (): App.ME2.Henchman[] {
                return this.getHenchmenSortedBy("long_walk_death_priority");
            }

            public getHenchmenSortedByCutsceneRescuePriority (): App.ME2.Henchman[] {
                return this.getHenchmenSortedBy("cutscene_rescue_priority");
            }

            public getHenchmenSortedByDefenceReportPriority (): App.ME2.Henchman[] {
                return this.getHenchmenSortedBy("defence_report_priority");
            }

            public getHenchmenSortedByKeepBasePriority (): App.ME2.Henchman[] {
                return _.filter(this.getHenchmenSortedBy("keep_base_priority"), (henchman: App.ME2.Henchman) => {
                    return henchman.keep_base_priority > 0;
                });
            }

            public getHenchmenSortedByDestroyBasePriority (): App.ME2.Henchman[] {
                return _.filter(this.getHenchmenSortedBy("destroy_base_priority"), (henchman: App.ME2.Henchman) => {
                    return henchman.destroy_base_priority > 0;
                });
            }


            public getHTLDeathPriorityRank (): number {
                return _.indexOf<App.ME2.Henchman>(this.getHenchmenSortedByHTLDeathPriority(), this);
            }

            public getArmourDeathPriorityRank (): number {
                return _.indexOf<App.ME2.Henchman>(this.getHenchmenSortedByArmourDeathPriority(), this);
            }

            public getShieldingDeathPriorityRank (): number {
                return _.indexOf<App.ME2.Henchman>(this.getHenchmenSortedByShieldingDeathPriority(), this);
            }

            public getCannonDeathPriorityRank (): number {
                return _.indexOf<App.ME2.Henchman>(this.getHenchmenSortedByCannonDeathPriority(), this);
            }

            public getLongWalkDeathPriorityRank (): number {
                return _.indexOf<App.ME2.Henchman>(this.getHenchmenSortedByLongWalkDeathPriority(), this);
            }

            public getCutsceneRescuePriorityRank (): number {
                return _.indexOf<App.ME2.Henchman>(this.getHenchmenSortedByCutsceneRescuePriority(), this);
            }

            public getDefenceReportPriorityRank (): number {
                return _.indexOf<App.ME2.Henchman>(this.getHenchmenSortedByDefenceReportPriority(), this);
            }

            public getKeepBasePriorityRank (): number {
                return this.keep_base_priority > 0 ? _.indexOf<App.ME2.Henchman>(this.getHenchmenSortedByKeepBasePriority(), this) : undefined;
            }

            public getDestroyBasePriorityRank (): number {
                return this.destroy_base_priority > 0 ? _.indexOf<App.ME2.Henchman>(this.getHenchmenSortedByDestroyBasePriority(), this) : undefined;
            }
        }
    }
}