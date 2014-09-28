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

                constructor (stager: App.ME2.Stages.Stager) {
                    super(stager);
                    this.ui = new App.ME2.Stages.UI.Boss(this);
                }

                public evaluate (): void {

                    this.boss_squadmate_1.addRole(App.ME2.TeammateRoles.BossSquadmate);
                    this.boss_squadmate_2.addRole(App.ME2.TeammateRoles.BossSquadmate);

                    // The two squadmates survive if loyal
                    if (!this.boss_squadmate_1.willSurviveBeingBossSquadmate()) {
                        this.boss_squadmate_1.die(this.ui.id, App.ME2.TeammateDeathCauses.Boss);
                    }
                    if (!this.boss_squadmate_2.willSurviveBeingBossSquadmate()) {
                        this.boss_squadmate_2.die(this.ui.id, App.ME2.TeammateDeathCauses.Boss);
                    }

                    this.stager.teammates.alive().withoutRole(App.ME2.TeammateRoles.BossSquadmate).withoutRole(App.ME2.TeammateRoles.LongWalkEscort).addRole(App.ME2.TeammateRoles.HeldTheLine).whoDieHoldingTheLine().die(this.ui.id, App.ME2.TeammateDeathCauses.HoldTheLine);
                }

                public isEvaluatable (): boolean {
                    return !!this.boss_squadmate_1 && !!this.boss_squadmate_2;
                }
            }
        }
    }
}