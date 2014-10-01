module App {
    export module ME2 {
        export module Stages {
            export interface ILongWalk {

            }

            export class LongWalk extends UIStage implements ILongWalk {
                public id: StageIDs = App.ME2.Stages.StageIDs.LongWalk;
                public label: string = "Long Walk";


                constructor (stager: App.ME2.Stages.Stager) {
                    super(stager);
                    this.configureFields([
                        {
                            name: "long_walk_bubbler",
                            filter: (teammate: App.ME2.Teammate): boolean => {
                                return !teammate.is_dead() && teammate.henchman.is_bubble_candidate;
                            }
                        },
                        {
                            name: "long_walk_leader",
                            filter: (teammate: App.ME2.Teammate): boolean => {
                                return !teammate.is_dead() && teammate.henchman.is_leader_candidate;
                            }
                        },
                        {
                            name: "long_walk_escort",
                            filter: (teammate: App.ME2.Teammate, teammates: App.ME2.Teammates): boolean => {

                                // If there are only 4 living teammates, no one can be escort
                                if (teammates.alive().length() <= 4) {
                                    return false;
                                }

                                return !teammate.is_dead() && teammate.henchman.is_escort_candidate;
                            },
                            optional: true
                        },
                        {
                            name: "long_walk_squadmate_1",
                            filter: UIStage.genericTeammateFieldFilter
                        },
                        {
                            name: "long_walk_squadmate_2",
                            filter: UIStage.genericTeammateFieldFilter
                        }
                    ]);
                }

                public evaluate (): void {

                    var squadmate_1: App.ME2.Teammate;
                    var squadmate_2: App.ME2.Teammate;
                    var escort: App.ME2.Teammate;
                    var bubbler: App.ME2.Teammate;
                    var leader: App.ME2.Teammate;

                    squadmate_1 = this.getFieldValue("long_walk_squadmate_1");
                    squadmate_2 = this.getFieldValue("long_walk_squadmate_2");
                    escort = this.getFieldValue("long_walk_escort");
                    bubbler = this.getFieldValue("long_walk_bubbler");
                    leader = this.getFieldValue("long_walk_leader");

                    squadmate_1.addRole(App.ME2.TeammateRoles.LongWalkSquadmate);
                    squadmate_2.addRole(App.ME2.TeammateRoles.LongWalkSquadmate);
                    escort.addRole(App.ME2.TeammateRoles.LongWalkEscort);
                    leader.addRole(App.ME2.TeammateRoles.LongWalkLeader);
                    bubbler.addRole(App.ME2.TeammateRoles.LongWalkBubbler);

                    // If escort is not loyal, they will die
                    if (escort.henchman.id !== undefined && !escort.willBeEffectiveLongWalkEscort()) {
                        escort.die(this.id, App.ME2.TeammateDeathCauses.Escort);
                    }

                    // If bubbler is not an expert, or is not loyal, one of the squadmates dies
                    if (!bubbler.willBeEffectiveLongWalkBubbler()) {
                        this.stager.app.state.teammates.withRole(App.ME2.TeammateRoles.LongWalkSquadmate).sortByLongWalkDeathPriority().last().die(this.id, App.ME2.TeammateDeathCauses.LongWalkBadBubbler);
                    }

                    // If leader is not loyal and not
                    if (!leader.willBeEffectiveLongWalkLeader()) {
                        leader.die(this.id, App.ME2.TeammateDeathCauses.LongWalkBadLeader);
                    }
                }
            }
        }
    }
}