///<reference path="../../../references.ts" />
module App {
    export module ME2 {
        export module Stages {
            export interface IBoss {
                boss_squadmate_1: KnockoutObservable<App.ME2.Teammate>;
                boss_squadmate_2: KnockoutObservable<App.ME2.Teammate>;
                boss_squadmate_1_candidates: KnockoutForcibleComputed<App.ME2.Teammate[]>;
                boss_squadmate_2_candidates: KnockoutForcibleComputed<App.ME2.Teammate[]>;
            }

            export class Boss extends UIStage implements IBoss {
                public id: StageIDs = App.ME2.Stages.StageIDs.Boss;
                public label: string = "Boss";
                public boss_squadmate_1: KnockoutObservable<App.ME2.Teammate>;
                public boss_squadmate_2: KnockoutObservable<App.ME2.Teammate>;
                public boss_squadmate_1_candidates: KnockoutForcibleComputed<App.ME2.Teammate[]>;
                public boss_squadmate_2_candidates: KnockoutForcibleComputed<App.ME2.Teammate[]>;
                public teammate_fields: ITeammateField[] = [
                    {
                        name: "boss_squadmate_1",
                        filter: (teammate: App.ME2.Teammate): boolean => {
                            return !teammate.is_dead() && !teammate.hasRole(App.ME2.TeammateRoles.LongWalkEscort);
                        }
                    },
                    {
                        name: "boss_squadmate_2",
                        filter: (teammate: App.ME2.Teammate): boolean => {
                            return !teammate.is_dead() && !teammate.hasRole(App.ME2.TeammateRoles.LongWalkEscort);
                        }
                    }
                ];

                constructor (stager: App.ME2.Stages.Stager) {
                    super(stager);
                    this.bootstrapTeammateFields();
                }

                public evaluate (): void {

                    this.boss_squadmate_1().addRole(App.ME2.TeammateRoles.BossSquadmate);
                    this.boss_squadmate_2().addRole(App.ME2.TeammateRoles.BossSquadmate);

                    // The two squadmates survive if loyal
                    if (!this.boss_squadmate_1().willSurviveBeingBossSquadmate()) {
                        this.boss_squadmate_1().die(this.id, App.ME2.TeammateDeathCauses.Boss);
                    }
                    if (!this.boss_squadmate_2().willSurviveBeingBossSquadmate()) {
                        this.boss_squadmate_2().die(this.id, App.ME2.TeammateDeathCauses.Boss);
                    }

                    this.stager.app.state.teammates.alive().withoutRole(App.ME2.TeammateRoles.BossSquadmate).withoutRole(App.ME2.TeammateRoles.LongWalkEscort).addRole(App.ME2.TeammateRoles.HeldTheLine).whoDieHoldingTheLine().die(this.id, App.ME2.TeammateDeathCauses.HoldTheLine);
                }
            }
        }
    }
}