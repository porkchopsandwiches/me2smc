///<reference path="../../../../references.ts" />
module App {
    export module ME2 {
        export module Stages {
            export module UI {
                export interface ISetup {
                    normandy: App.ME2.Normandy;
                }

                export class Setup extends Stage implements ISetup {
                    public label: string = "Setup";
                    public teammates: App.ME2.Teammate[];
                    public stage: App.ME2.Stages.Setup;
                    public normandy: App.ME2.Normandy;
                    public all_recruited: KnockoutComputed<boolean>;
                    public all_loyal: KnockoutComputed<boolean>;

                    public setup (): void {
                        this.bootstrapTeammates();

                        this.all_recruited = ko.pureComputed({
                            read: (): boolean => {
                                var unrecruited: App.ME2.Teammate;

                                unrecruited = _.find(this.teammates, (teammate: App.ME2.Teammate) => {
                                    return !teammate.is_recruited();
                                });

                                return !unrecruited;
                            },
                            write: (all_recruited: boolean): void => {
                                this.teammates.forEach((teammate: App.ME2.Teammate) => {
                                    if (all_recruited || !teammate.henchman.is_essential) {
                                        teammate.is_recruited(all_recruited);
                                    }
                                });
                            },
                            owner: this
                        });

                        this.all_loyal = ko.pureComputed({
                            read: (): boolean => {
                                var unloyal: App.ME2.Teammate;

                                unloyal = _.find(this.teammates, (teammate: App.ME2.Teammate) => {
                                    return !teammate.is_loyal();
                                });

                                return !unloyal;
                            },
                            write: (all_loyal: boolean): void => {
                                if (all_loyal) {
                                    this.teammates.forEach((teammate: App.ME2.Teammate) => {
                                        teammate.is_recruited(true);
                                        teammate.is_loyal(true);
                                    });
                                } else {
                                    this.teammates.forEach((teammate: App.ME2.Teammate) => {
                                        teammate.is_loyal(false);
                                    });
                                }
                            },
                            owner: this
                        });

                        this.is_evaluatable = ko.pureComputed((): boolean => {
                            var is_evaluatable: boolean;

                            is_evaluatable = _.filter(this.teammates, (teammate: App.ME2.Teammate): boolean => {
                                return teammate.is_recruited();
                            }).length >= 8;

                            return is_evaluatable;
                        });
                    }

                    private bootstrapTeammates () {
                        this.teammates = this.stage.stager.app.state.teammates.value();

                        //this.normandy = new App.ME2.UI.Normandy(this.stage.stager.app.state.normandy);
                        this.normandy = this.stage.stager.app.state.normandy;
                    }
                }
            }
        }
    }
}