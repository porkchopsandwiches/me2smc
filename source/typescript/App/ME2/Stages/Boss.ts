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
                            },
                            role: App.ME2.TeammateRoles.BossSquadmate1
                        },
                        {
                            name: "boss_squadmate_2",
                            filter: (teammate: App.ME2.Teammate): boolean => {
                                return teammate.is_recruited() && !teammate.is_dead() && !teammate.hasRole(App.ME2.TeammateRoles.LongWalkEscort);
                            },
                            role: App.ME2.TeammateRoles.BossSquadmate2
                        }
                    ]);

                    this.getFieldObservable("boss_squadmate_1").subscribe(() => {
                        this.stager.app.state.teammates().whoAreAlive().whoAreRecruited().removeRole(App.ME2.TeammateRoles.HeldTheLine).withoutAnyOfTheseRoles(App.ME2.TeammateRoles.BossSquadmate1, App.ME2.TeammateRoles.BossSquadmate2, App.ME2.TeammateRoles.LongWalkEscort).addRole(App.ME2.TeammateRoles.HeldTheLine);
                    });

                    this.getFieldObservable("boss_squadmate_2").subscribe(() => {
                        this.stager.app.state.teammates().whoAreAlive().whoAreRecruited().removeRole(App.ME2.TeammateRoles.HeldTheLine).withoutAnyOfTheseRoles(App.ME2.TeammateRoles.BossSquadmate1, App.ME2.TeammateRoles.BossSquadmate2, App.ME2.TeammateRoles.LongWalkEscort).addRole(App.ME2.TeammateRoles.HeldTheLine);
                    });
                }

                public evaluate (): void {
                    var squadmate_1: App.ME2.Teammate;
                    var squadmate_2: App.ME2.Teammate;

                    squadmate_1 = this.getFieldValue("boss_squadmate_1");
                    squadmate_2 = this.getFieldValue("boss_squadmate_2");

                    // The two squadmates survive if loyal
                    if (!squadmate_1.willSurviveBeingBossSquadmate()) {
                        squadmate_1.die(this.id, App.ME2.TeammateDeathCauses.Boss);
                    }
                    if (!squadmate_2.willSurviveBeingBossSquadmate()) {
                        squadmate_2.die(this.id, App.ME2.TeammateDeathCauses.Boss);
                    }

                    this.stager.app.state.teammates().withRole(App.ME2.TeammateRoles.HeldTheLine).whoDieHoldingTheLine().die(this.id, App.ME2.TeammateDeathCauses.HoldTheLine);

                    //this.stager.app.state.teammates().whoAreRecruited().whoAreAlive().withoutAnyOfTheseRoles(App.ME2.TeammateRoles.BossSquadmate1, App.ME2.TeammateRoles.BossSquadmate2, App.ME2.TeammateRoles.LongWalkEscort).addRole(App.ME2.TeammateRoles.HeldTheLine).whoDieHoldingTheLine().die(this.id, App.ME2.TeammateDeathCauses.HoldTheLine);
                }
            }
        }
    }
}