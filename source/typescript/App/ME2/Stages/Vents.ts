///<reference path="../../../references.ts" />
module App {
    export module ME2 {
        export module Stages {

            export interface IVents {
                vent_squadmate_1: KnockoutObservable<App.ME2.Teammate>;
                vent_squadmate_1_candidates: KnockoutForcibleComputed<App.ME2.Teammate[]>;
                vent_squadmate_2: KnockoutObservable<App.ME2.Teammate>;
                vent_squadmate_2_candidates: KnockoutForcibleComputed<App.ME2.Teammate[]>;
                vent_venter: KnockoutObservable<App.ME2.Teammate>;
                vent_venter_candidates: KnockoutForcibleComputed<App.ME2.Teammate[]>;
                vent_leader: KnockoutObservable<App.ME2.Teammate>;
                vent_leader_candidates: KnockoutForcibleComputed<App.ME2.Teammate[]>;
            }

            export class Vents extends UIStage implements IVents {
                public id: StageIDs = App.ME2.Stages.StageIDs.Vents;
                public label: string = "Vents";
                public vent_squadmate_1: KnockoutObservable<App.ME2.Teammate>;
                public vent_squadmate_1_candidates: KnockoutForcibleComputed<App.ME2.Teammate[]>;
                public vent_squadmate_2: KnockoutObservable<App.ME2.Teammate>;
                public vent_squadmate_2_candidates: KnockoutForcibleComputed<App.ME2.Teammate[]>;
                public vent_venter: KnockoutObservable<App.ME2.Teammate>;
                public vent_venter_candidates: KnockoutForcibleComputed<App.ME2.Teammate[]>;
                public vent_leader: KnockoutObservable<App.ME2.Teammate>;
                public vent_leader_candidates: KnockoutForcibleComputed<App.ME2.Teammate[]>;
                public teammate_fields: ITeammateField[] = [
                    {
                        name: "vent_squadmate_1",
                        filter: UIStage.genericTeammateFieldFilter
                    },
                    {
                        name: "vent_squadmate_2",
                        filter: UIStage.genericTeammateFieldFilter
                    },
                    {
                        name: "vent_venter",
                        filter: (teammate: App.ME2.Teammate): boolean => {
                            return !teammate.is_dead() && teammate.henchman.is_vent_candidate;
                        }
                    },
                    {
                        name: "vent_leader",
                        filter: (teammate: App.ME2.Teammate): boolean => {
                            return !teammate.is_dead() && teammate.henchman.is_leader_candidate;
                        }
                    }
                ];

                constructor (stager: App.ME2.Stages.Stager) {
                    super(stager);
                    this.bootstrapTeammateFields();
                }

                public evaluate (): void {
                    this.vent_squadmate_1().addRole(App.ME2.TeammateRoles.VentsSquadmate);
                    this.vent_squadmate_2().addRole(App.ME2.TeammateRoles.VentsSquadmate);
                    this.vent_venter().addRole(App.ME2.TeammateRoles.VentsVenter);
                    this.vent_leader().addRole(App.ME2.TeammateRoles.VentsLeader);

                    if (!this.vent_venter().willBeEffectiveVentVenter()) {
                        this.vent_venter().die(this.id, App.ME2.TeammateDeathCauses.VentsBadVenter);
                    } else if (!this.vent_leader().willBeEffectiveVentLeader()) {
                        this.vent_venter().die(this.id, App.ME2.TeammateDeathCauses.VentsBadLeader);
                    }
                }
            }
        }
    }
}