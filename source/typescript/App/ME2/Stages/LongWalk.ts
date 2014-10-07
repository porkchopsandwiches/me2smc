///<reference path="../../../references.ts" />
module App {
    export module ME2 {
        export module Stages {
            export interface ILongWalk {}

            export class LongWalk extends Stage implements ILongWalk {
                public id: StageIDs = App.ME2.Stages.StageIDs.LongWalk;
                public label: string = "Long Walk";

                constructor (stager: App.ME2.Stages.Stager) {
                    super(stager);
                    this.configureFields([
                        {
                            name: "long_walk_bubbler",
                            filter: (teammate: App.ME2.Teammate): boolean => {
                                return teammate.is_recruited() && !teammate.is_dead() && teammate.henchman.is_bubble_candidate;
                            },
                            role: App.ME2.TeammateRoles.LongWalkBubbler
                        },
                        {
                            name: "long_walk_leader",
                            filter: (teammate: App.ME2.Teammate): boolean => {
                                return teammate.is_recruited() && !teammate.is_dead() && teammate.henchman.is_leader_candidate;
                            },
                            role: App.ME2.TeammateRoles.LongWalkLeader
                        },
                        {
                            name: "long_walk_escort",
                            filter: (teammate: App.ME2.Teammate, teammates: App.ME2.Teammates): boolean => {

                                // If there are only 4 living teammates, no one can be escort
                                if (teammates.whoAreAlive().length() <= 4) {
                                    return false;
                                }

                                return teammate.is_recruited() && !teammate.is_dead() && teammate.henchman.is_escort_candidate;
                            },
                            optional: true,
                            role: App.ME2.TeammateRoles.LongWalkEscort
                        },
                        {
                            name: "long_walk_squadmate_1",
                            filter: App.ME2.Stages.Stage.genericTeammateFieldFilter,
                            role: App.ME2.TeammateRoles.LongWalkSquadmate1
                        },
                        {
                            name: "long_walk_squadmate_2",
                            filter: App.ME2.Stages.Stage.genericTeammateFieldFilter,
                            role: App.ME2.TeammateRoles.LongWalkSquadmate2
                        }
                    ]);
                }

                public evaluate (): App.ME2.TeammateDeathList {
                    var escort: App.ME2.Teammate;
                    var bubbler: App.ME2.Teammate;
                    var leader: App.ME2.Teammate;
                    var death_list: App.ME2.TeammateDeathList;

                    death_list = new App.ME2.TeammateDeathList();
                    escort = this.getFieldValue("long_walk_escort");
                    bubbler = this.getFieldValue("long_walk_bubbler");
                    leader = this.getFieldValue("long_walk_leader");

                    // If escort is not loyal, they will die
                    if (escort.henchman.id !== undefined && !escort.willBeEffectiveLongWalkEscort()) {
                        //escort.die(this.id, App.ME2.TeammateDeathCauses.Escort);
                        death_list.add({
                            teammate: escort,
                            death_stage_id: this.id,
                            death_cause: App.ME2.TeammateDeathCauses.Escort
                        });
                    }

                    // If bubbler is not an expert, or is not loyal, one of the squadmates dies
                    if (!bubbler.willBeEffectiveLongWalkBubbler()) {
                        //this.stager.app.state.teammates().withAnyOfTheseRoles(App.ME2.TeammateRoles.LongWalkSquadmate1, App.ME2.TeammateRoles.LongWalkSquadmate2).sortByLongWalkDeathPriority().last().die(this.id, App.ME2.TeammateDeathCauses.LongWalkBadBubbler);
                        death_list.add({
                            teammate: this.stager.app.state.teammates().withAnyOfTheseRoles(App.ME2.TeammateRoles.LongWalkSquadmate1, App.ME2.TeammateRoles.LongWalkSquadmate2).sortByLongWalkDeathPriority().last(),
                            death_stage_id: this.id,
                            death_cause: App.ME2.TeammateDeathCauses.LongWalkBadBubbler
                        });
                    }

                    // If leader is not loyal and not
                    if (!leader.willBeEffectiveLongWalkLeader()) {
                        //leader.die(this.id, App.ME2.TeammateDeathCauses.LongWalkBadLeader);
                        death_list.add({
                            teammate: leader,
                            death_stage_id: this.id,
                            death_cause: App.ME2.TeammateDeathCauses.LongWalkBadLeader
                        });
                    }

                    return death_list;
                }
            }
        }
    }
}