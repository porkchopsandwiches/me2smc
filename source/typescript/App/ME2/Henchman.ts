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
            id: HenchmanIDs;
            name: string;
            htl_value: number;
            htl_death_priority: number;
            armour_death_priority: number;
            shielding_death_priority: number;
            cannon_death_priority: number;
            long_walk_death_priority: number;
            cutscene_rescue_priority: number;
            is_tech_expert: boolean;
            is_biotic_expert: boolean;
            is_leader: boolean;
            is_super_leader: boolean;
            is_escort_candidate: boolean;
            is_vent_candidate: boolean;
            is_bubble_candidate: boolean;
            is_vent_leader_candidate: boolean;
            is_long_walk_leader_candidate: boolean;
        }

        export class Henchman implements IHenchman {
            public id: HenchmanIDs;
            public name: string = "";
            public htl_value: number = 0;
            public htl_death_priority: number = 0;
            public armour_death_priority: number;
            public shielding_death_priority: number = 0;
            public cannon_death_priority: number;
            public long_walk_death_priority: number;
            public cutscene_rescue_priority: number = 0;
            public is_tech_expert: boolean = false;
            public is_biotic_expert: boolean = false;
            public is_leader: boolean = false;
            public is_super_leader: boolean = false;
            public is_escort_candidate: boolean = false;
            public is_vent_candidate: boolean = false;
            public is_bubble_candidate: boolean = false;
            public is_vent_leader_candidate: boolean = false;
            public is_long_walk_leader_candidate: boolean = false;

            constructor (
                id: HenchmanIDs,
                name: string = "",
                htl_value: number = 0,
                htl_death_priority: number = 0,
                armour_death_priority: number = 0,
                shielding_death_priority: number = 0,
                cannon_death_priority: number = 0,
                long_walk_death_priority: number = 0,
                cutscene_rescue_priority: number = 0,
                is_tech_expert: boolean = false,
                is_biotic_expert: boolean = false,
                is_leader: boolean = false,
                is_super_leader: boolean = false,
                is_escort_candidate: boolean = false,
                is_vent_candidate: boolean = false,
                is_bubble_candidate: boolean = false,
                is_vent_leader_candidate: boolean = false,
                is_long_walk_leader_candidate: boolean = false
            ) {
                this.id = id;
                this.name = name;
                this.htl_value = htl_value;
                this.htl_death_priority = htl_death_priority;
                this.armour_death_priority = armour_death_priority;
                this.shielding_death_priority = shielding_death_priority;
                this.cannon_death_priority = cannon_death_priority;
                this.long_walk_death_priority = long_walk_death_priority;
                this.cutscene_rescue_priority = cutscene_rescue_priority;
                this.is_tech_expert = is_tech_expert;
                this.is_biotic_expert = is_biotic_expert;
                this.is_leader = is_leader;
                this.is_super_leader = is_super_leader;
                this.is_escort_candidate = is_escort_candidate;
                this.is_vent_candidate = is_vent_candidate;
                this.is_bubble_candidate = is_bubble_candidate;
                this.is_vent_leader_candidate = is_vent_leader_candidate;
                this.is_long_walk_leader_candidate = is_long_walk_leader_candidate;
            }
        }
    }
}