///<reference path="../../../references.ts" />
module App {
    export module ME2 {
        export module Stages {

            export interface IVents {
            }

            export class Vents extends Stage implements IVents {
                public id: StageIDs = App.ME2.Stages.StageIDs.Vents;
                public label: string = "Vents";

                constructor (stager: App.ME2.Stages.Stager) {
                    super(stager);
                    //this.bootstrapTeammateFields();
                    this.configureFields([
                        {
                            name: "vent_squadmate_1",
                            filter: App.ME2.Stages.Stage.genericTeammateFieldFilter
                        },
                        {
                            name: "vent_squadmate_2",
                            filter: App.ME2.Stages.Stage.genericTeammateFieldFilter
                        },
                        {
                            name: "vent_venter",
                            filter: (teammate: App.ME2.Teammate): boolean => {
                                return teammate.is_recruited() && !teammate.is_dead() && teammate.henchman.is_vent_candidate;
                            }
                        },
                        {
                            name: "vent_leader",
                            filter: (teammate: App.ME2.Teammate): boolean => {
                                return teammate.is_recruited() && !teammate.is_dead() && teammate.henchman.is_leader_candidate;
                            }
                        }
                    ]);
                }

                public evaluate (): void {
                    var venter: App.ME2.Teammate;
                    var leader: App.ME2.Teammate;
                    var squadmate_1: App.ME2.Teammate;
                    var squadmate_2: App.ME2.Teammate;

                    venter = this.getFieldValue("vent_venter");
                    leader = this.getFieldValue("vent_leader");
                    squadmate_1 = this.getFieldValue("vent_squadmate_1");
                    squadmate_2 = this.getFieldValue("vent_squadmate_2");

                    squadmate_1.addRole(App.ME2.TeammateRoles.VentsSquadmate1);
                    squadmate_2.addRole(App.ME2.TeammateRoles.VentsSquadmate2);
                    venter.addRole(App.ME2.TeammateRoles.VentsVenter);
                    leader.addRole(App.ME2.TeammateRoles.VentsLeader);

                    if (!venter.willBeEffectiveVentVenter()) {
                        venter.die(this.id, App.ME2.TeammateDeathCauses.VentsBadVenter);
                    } else if (!leader.willBeEffectiveVentLeader()) {
                        venter.die(this.id, App.ME2.TeammateDeathCauses.VentsBadLeader);
                    }
                }
            }
        }
    }
}