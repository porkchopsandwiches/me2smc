///<reference path="../../../references.ts" />
module App {
    export module ME2 {
        export module Stages {

            export interface IVents {
                vent_squadmate_1: App.ME2.Teammate;
                vent_squadmate_2: App.ME2.Teammate;
                vent_venter: App.ME2.Teammate;
                vent_leader: App.ME2.Teammate;
            }

            export class Vents extends Stage implements IVents {
                public id: StageIDs = App.ME2.Stages.StageIDs.Boss;
                public vent_squadmate_1: App.ME2.Teammate;
                public vent_squadmate_2: App.ME2.Teammate;
                public vent_venter: App.ME2.Teammate;
                public vent_leader: App.ME2.Teammate;
                public ui: App.ME2.Stages.UI.Vents;

                constructor (stager: App.ME2.Stages.Stager) {
                    super(stager);
                    this.ui = new App.ME2.Stages.UI.Vents(this);
                }

                public evaluate (): void {
                    this.vent_squadmate_1.addRole(App.ME2.TeammateRoles.VentsSquadmate);
                    this.vent_squadmate_2.addRole(App.ME2.TeammateRoles.VentsSquadmate);
                    this.vent_venter.addRole(App.ME2.TeammateRoles.VentsVenter);
                    this.vent_leader.addRole(App.ME2.TeammateRoles.VentsLeader);

                    if (!this.vent_venter.willBeEffectiveVentVenter()) {
                        this.vent_venter.die(this.id, App.ME2.TeammateDeathCauses.VentsBadVenter);
                    } else if (!this.vent_leader.willBeEffectiveVentLeader()) {
                        this.vent_venter.die(this.id, App.ME2.TeammateDeathCauses.VentsBadLeader);
                    }
                }

                public isEvaluatable (): boolean {
                    return this.ui.is_evaluatable();
                }
            }
        }
    }
}