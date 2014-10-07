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
                        this.updateHTLRoles();
                    });

                    this.getFieldObservable("boss_squadmate_2").subscribe(() => {
                        this.updateHTLRoles();
                    });
                }

                private updateHTLRoles () {

                    var candidates: App.ME2.Teammates;
                    var squadmates: App.ME2.Teammates;

                    squadmates = this.stager.app.state.teammates().withAnyOfTheseRoles(App.ME2.TeammateRoles.BossSquadmate1, App.ME2.TeammateRoles.BossSquadmate2);
                    candidates = this.stager.app.state.teammates().whoAreAlive().whoAreRecruited();

                    // If both Squadmates have been picked
                    squadmates.removeRole(App.ME2.TeammateRoles.HeldTheLine);
                    if (squadmates.length() === 2) {
                        candidates.removeRole(App.ME2.TeammateRoles.HeldTheLine).withoutAnyOfTheseRoles(App.ME2.TeammateRoles.BossSquadmate1, App.ME2.TeammateRoles.BossSquadmate2, App.ME2.TeammateRoles.LongWalkEscort).addRole(App.ME2.TeammateRoles.HeldTheLine);
                    }
                }

                public evaluate (): App.ME2.TeammateDeathList {
                    var squadmate_1: App.ME2.Teammate;
                    var squadmate_2: App.ME2.Teammate;
                    var death_list: App.ME2.TeammateDeathList;

                    death_list = new App.ME2.TeammateDeathList();
                    squadmate_1 = this.getFieldValue("boss_squadmate_1");
                    squadmate_2 = this.getFieldValue("boss_squadmate_2");

                    // The two squadmates survive if loyal
                    if (!squadmate_1.willSurviveBeingBossSquadmate()) {
                        //squadmate_1.die(this.id, App.ME2.TeammateDeathCauses.Boss);
                        death_list.add({
                            teammate: squadmate_1,
                            death_stage_id: this.id,
                            death_cause: App.ME2.TeammateDeathCauses.Boss
                        });
                    }
                    if (!squadmate_2.willSurviveBeingBossSquadmate()) {
                        //squadmate_2.die(this.id, App.ME2.TeammateDeathCauses.Boss);
                        death_list.add({
                            teammate: squadmate_2,
                            death_stage_id: this.id,
                            death_cause: App.ME2.TeammateDeathCauses.Boss
                        });
                    }

                    //this.stager.app.state.teammates().withRole(App.ME2.TeammateRoles.HeldTheLine).whoDieHoldingTheLine().die(this.id, App.ME2.TeammateDeathCauses.HoldTheLine);
                    this.stager.app.state.teammates().withRole(App.ME2.TeammateRoles.HeldTheLine).whoDieHoldingTheLine().each((teammate: App.ME2.Teammate) => {
                        death_list.add({
                            teammate: teammate,
                            death_stage_id: this.id,
                            death_cause: App.ME2.TeammateDeathCauses.HoldTheLine
                        });
                    });

                    return death_list;
                }
            }
        }
    }
}