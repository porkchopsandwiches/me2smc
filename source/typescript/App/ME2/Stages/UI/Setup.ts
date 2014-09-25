///<reference path="../../../../references.ts" />
module App {
    export module ME2 {
        export module Stages {
            export module UI {
                export interface ISetup {
                    normandy: App.ME2.UI.Normandy;
                }

                export class Setup extends Stage implements ISetup {
                    public id: string = StageIDs[StageIDs.Setup];
                    public label: string = "Setup";
                    public teammates: App.ME2.UI.Teammate[];
                    public stage: App.ME2.Stages.Setup;
                    public normandy: App.ME2.UI.Normandy;
                    public all_recruited: KnockoutComputed<boolean>;
                    public all_loyal: KnockoutComputed<boolean>;
                    //public is_evaluatable: KnockoutComputed<boolean>;

                    constructor (stage: App.ME2.Stages.IStage) {
                        super(stage);


                    }

                    public setup (): void {
                        this.bootstrapTeammates();

                        this.all_recruited = ko.pureComputed({
                            read: (): boolean => {
                                var unrecruited: App.ME2.UI.Teammate;

                                unrecruited = _.find(this.teammates, (teammate: App.ME2.UI.Teammate) => {
                                    return !teammate.is_recruited();
                                });

                                return !unrecruited;
                            },
                            write: (all_recruited: boolean): void => {
                                this.teammates.forEach((teammate: App.ME2.UI.Teammate) => {
                                    if (all_recruited || !teammate.teammate.henchman.is_essential) {
                                        teammate.is_recruited(all_recruited);
                                    }
                                });
                            },
                            owner: this
                        });

                        this.all_loyal = ko.pureComputed({
                            read: (): boolean => {
                                var unloyal: App.ME2.UI.Teammate;

                                unloyal = _.find(this.teammates, (teammate: App.ME2.UI.Teammate) => {
                                    return !teammate.is_loyal();
                                });

                                return !unloyal;
                            },
                            write: (all_loyal: boolean): void => {
                                if (all_loyal) {
                                    this.teammates.forEach((teammate: App.ME2.UI.Teammate) => {
                                        teammate.is_recruited(true);
                                        teammate.is_loyal(true);
                                    });
                                } else {
                                    this.teammates.forEach((teammate: App.ME2.UI.Teammate) => {
                                        teammate.is_loyal(false);
                                    });
                                }
                            },
                            owner: this
                        });

                        this.is_evaluatable = ko.pureComputed((): boolean => {
                            var is_evaluatable: boolean;

                            is_evaluatable = _.filter(this.teammates, (teammate: App.ME2.UI.Teammate): boolean => {
                                return teammate.is_recruited();
                            }).length >= 8;

                            return is_evaluatable;
                        });
                    }

                    private bootstrapTeammates () {
                        this.teammates = _.map(this.stage.stager.teammates, (teammate: App.ME2.Teammate): App.ME2.UI.Teammate => {
                            var ui_teammate: App.ME2.UI.Teammate;
                            ui_teammate = new App.ME2.UI.Teammate(teammate);

                            return ui_teammate;
                        });

                        this.normandy = new App.ME2.UI.Normandy(this.stage.stager.app.normandy);
                    }
                }
            }
        }
    }
}