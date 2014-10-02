///<reference path="../../../references.ts" />
module App {
    export module ME2 {
        export module Stages {
            export interface IBoss {
            }

            export class Boss extends Stage implements IBoss {
                public id: StageIDs = App.ME2.Stages.StageIDs.Boss;
                public label: string = "Boss";

                constructor (stager: App.ME2.Stages.Stager) {
                    super(stager);
                    this.configureFields([
                        {
                            name: "boss_squadmate_1",
                            filter: (teammate: App.ME2.Teammate): boolean => {
                                return teammate.is_recruited() && !teammate.is_dead() && !teammate.hasRole(App.ME2.TeammateRoles.LongWalkEscort);
                            }
                        },
                        {
                            name: "boss_squadmate_2",
                            filter: (teammate: App.ME2.Teammate): boolean => {
                                return teammate.is_recruited() && !teammate.is_dead() && !teammate.hasRole(App.ME2.TeammateRoles.LongWalkEscort);
                            }
                        }
                    ]);
                }

                public evaluate (): void {
                    var squadmate_1: App.ME2.Teammate;
                    var squadmate_2: App.ME2.Teammate;

                    squadmate_1 = this.getFieldValue("boss_squadmate_1");
                    squadmate_2 = this.getFieldValue("boss_squadmate_2");

                    squadmate_1.addRole(App.ME2.TeammateRoles.BossSquadmate);
                    squadmate_2.addRole(App.ME2.TeammateRoles.BossSquadmate);

                    // The two squadmates survive if loyal
                    if (!squadmate_1.willSurviveBeingBossSquadmate()) {
                        squadmate_1.die(this.id, App.ME2.TeammateDeathCauses.Boss);
                    }
                    if (!squadmate_2.willSurviveBeingBossSquadmate()) {
                        squadmate_2.die(this.id, App.ME2.TeammateDeathCauses.Boss);
                    }

                    this.stager.app.state.teammates().whoAreRecruited().whoAreAlive().withoutRole(App.ME2.TeammateRoles.BossSquadmate).withoutRole(App.ME2.TeammateRoles.LongWalkEscort).addRole(App.ME2.TeammateRoles.HeldTheLine).whoDieHoldingTheLine().die(this.id, App.ME2.TeammateDeathCauses.HoldTheLine);
                }
            }
        }
    }
}