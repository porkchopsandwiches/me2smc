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
                            filter: App.ME2.Stages.Stage.genericTeammateFieldFilter,
                            role: App.ME2.TeammateRoles.VentsSquadmate1
                        },
                        {
                            name: "vent_squadmate_2",
                            filter: App.ME2.Stages.Stage.genericTeammateFieldFilter,
                            role: App.ME2.TeammateRoles.VentsSquadmate2
                        },
                        {
                            name: "vent_venter",
                            filter: (teammate: App.ME2.Teammate): boolean => {
                                return teammate.is_recruited() && !teammate.is_dead() && teammate.henchman.is_vent_candidate;
                            },
                            role: App.ME2.TeammateRoles.VentsVenter
                        },
                        {
                            name: "vent_leader",
                            filter: (teammate: App.ME2.Teammate): boolean => {
                                return teammate.is_recruited() && !teammate.is_dead() && teammate.henchman.is_leader_candidate;
                            },
                            role: App.ME2.TeammateRoles.VentsLeader
                        }
                    ]);
                }

                public evaluate (): App.ME2.TeammateDeathList {
                    var venter: App.ME2.Teammate;
                    var leader: App.ME2.Teammate;
                    var death_list: App.ME2.TeammateDeathList;

                    death_list = new App.ME2.TeammateDeathList();

                    venter = this.getFieldValue("vent_venter");
                    leader = this.getFieldValue("vent_leader");

                    if (!venter.willBeEffectiveVentVenter()) {
                        //venter.die(this.id, App.ME2.TeammateDeathCauses.VentsBadVenter);
                        death_list.add({
                            teammate: venter,
                            death_stage_id: this.id,
                            death_cause: App.ME2.TeammateDeathCauses.VentsBadVenter
                        });
                    } else if (!leader.willBeEffectiveVentLeader()) {
                        //venter.die(this.id, App.ME2.TeammateDeathCauses.VentsBadLeader);
                        death_list.add({
                            teammate: venter,
                            death_stage_id: this.id,
                            death_cause: App.ME2.TeammateDeathCauses.VentsBadLeader
                        });
                    }

                    return death_list;
                }
            }
        }
    }
}