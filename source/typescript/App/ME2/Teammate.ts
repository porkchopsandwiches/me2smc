module App {
    export module ME2 {

        export enum TeammateDeathCauses {
            ArmourFailure,
            ShieldingFailure,
            CannonFailure,
            Vents,
            LongWalk,
            Escort,
            Boss,
            HoldTheLine
        }

        export interface ITeammate {
            henchman: App.ME2.Henchman;
            is_loyal: boolean;
            is_recruited: boolean;
            is_dead: boolean;
            death_cause: TeammateDeathCauses;
        }

        export class Teammate implements ITeammate {
            public death_cause: TeammateDeathCauses;
            public henchman: App.ME2.Henchman;
            public is_recruited: boolean = false;
            public is_loyal: boolean = false;
            public is_dead: boolean = false;

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

            public setHenchman (henchman: App.ME2.Henchman): Teammate {
                this.henchman = henchman;
                return this;
            }

            public die (death_cause: TeammateDeathCauses): Teammate {
                this.is_dead = true;
                this.death_cause = death_cause;
                return this;
            }
        }
    }
}