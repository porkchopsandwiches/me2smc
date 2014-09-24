///<reference path="../../../references.ts" />
module App {
    export module ME2 {
        export module Stages {

            export interface IStager {
                app: App.Application;
                stages: App.ME2.Stages.IStage[];
                ui: App.ME2.Stages.UI.Stager;
            }

            export interface IFrozenTeammate {
                henchman_id: App.ME2.HenchmanIDs;
                is_loyal: boolean;
                is_recruited: boolean;
                is_dead: boolean;
                roles: App.ME2.TeammateRoles[];
                death_cause: App.ME2.TeammateDeathCauses;
            }

            export class Stager implements IStager {
                public app: App.Application;
                public stages: App.ME2.Stages.IStage[];
                private stage: App.ME2.Stages.IStage;
                private freezes: string[];
                public teammates: App.ME2.Teammate[];
                public ui: App.ME2.Stages.UI.Stager;

                constructor (app: App.Application) {
                    this.app = app;

                    this.freezes = [];

                    this.stages = [
                        (new App.ME2.Stages.Setup()).setStager(this),
                        (new App.ME2.Stages.Occulus()).setStager(this),
                        (new App.ME2.Stages.Vents()).setStager(this),
                        (new App.ME2.Stages.LongWalk()).setStager(this),
                        (new App.ME2.Stages.Boss()).setStager(this),
                        (new App.ME2.Stages.Summary()).setStager(this)
                    ];

                    this.ui = new App.ME2.Stages.UI.Stager(this);

                    this.setTeammates([]);
                }

                private getIndexOfStage (stage: App.ME2.Stages.IStage): number {
                    return _.indexOf(this.stages, stage);
                }

                private freezeStage (stage: App.ME2.Stages.IStage): void {
                    var teammates: App.ME2.Teammate[];

                    // Evaluate the current stage
                    teammates = this.stage.evaluate(this.teammates);

                    this.freezes[this.getIndexOfStage(stage)] = this.freeze(teammates);

                    //this.teammates = teammates;
                    this.setTeammates(teammates);
                }

                private freeze (teammates: App.ME2.Teammate[]): string {
                    var frozen: IFrozenTeammate[];

                    frozen = _.map(teammates, (teammate: App.ME2.Teammate): IFrozenTeammate => {
                        return {
                            henchman_id: teammate.henchman.id,
                            is_loyal: teammate.is_loyal,
                            is_recruited: teammate.is_recruited,
                            is_dead: teammate.is_dead,
                            death_cause: teammate.death_cause,
                            roles: teammate.roles
                        };
                    });

                    return JSON.stringify(frozen);
                }

                private defrost (teammates: string): App.ME2.Teammate[] {
                    var frozen: IFrozenTeammate[];
                    frozen = JSON.parse(teammates);

                    return _.map<IFrozenTeammate, App.ME2.Teammate>(frozen, (frosted: IFrozenTeammate): App.ME2.Teammate => {
                        var teammate: App.ME2.Teammate;
                        teammate = new App.ME2.Teammate(this.app.getHenchman(frosted.henchman_id), frosted.is_loyal, frosted.is_recruited, frosted.is_dead);
                        teammate.death_cause = frosted.death_cause;
                        teammate.roles = frosted.roles;
                        return teammate;
                    });
                }

                public previousStage () {
                    var index: number;
                    if (this.stage) {
                        index = this.getIndexOfStage(this.stage) - 1;
                        this.setStage(this.stages[index]);
                        this.setTeammates(this.defrost(this.freezes[index]));
                    }
                }

                public nextStage () {
                    var index: number;


                    if (this.stage) {
                        index = this.getIndexOfStage(this.stage);

                        if (this.stage.isEvaluatable()) {
                            this.freezeStage(this.stage);

                            if (index < this.stages.length - 1) {
                                this.setStage(this.stages[this.getIndexOfStage(this.stage) + 1]);
                            }
                        } else {
                            throw new Error("Current Stage is not evaluatable.");
                        }
                    } else {
                        this.setStage(this.stages[0]);
                    }
                }

                private setTeammates (teammates: App.ME2.Teammate[]) {
                    this.teammates = teammates;
                    //this.ui.teammates(this.teammates);
                    this.ui.teammates.evaluateImmediate();
                }

                private setStage (stage: App.ME2.Stages.IStage) {
                    stage.setup(this.teammates);
                    this.stage = stage;
                    this.ui.stage(stage);
                }
            }
        }
    }
}