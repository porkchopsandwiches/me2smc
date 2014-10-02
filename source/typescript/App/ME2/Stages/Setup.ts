///<reference path="../../../references.ts" />
module App {
    export module ME2 {
        export module Stages {
            export interface ISetup {
                all_recruited: KnockoutComputed<boolean>;
                all_loyal: KnockoutComputed<boolean>;
                is_evaluatable: KnockoutComputed<boolean>;
            }

            export class Setup extends Stage implements ISetup {
                public id: StageIDs = App.ME2.Stages.StageIDs.Setup;
                public label: string = "Set up";
                public all_recruited: KnockoutComputed<boolean>;
                public all_loyal: KnockoutComputed<boolean>;
                public is_evaluatable: KnockoutComputed<boolean>;

                public evaluate () {
                }

                private getTeammates (): App.ME2.Teammates {
                    return this.stager.app.state.teammates();
                }

                public setup (): void {

                    this.all_recruited = ko.pureComputed({
                        read: (): boolean => {
                            return !this.getTeammates().find((teammate: App.ME2.Teammate): boolean => {
                                return !teammate.is_recruited();
                            });
                        },
                        write: (all_recruited: boolean): void => {
                            this.getTeammates().each((teammate: App.ME2.Teammate) => {
                                if (all_recruited || !teammate.henchman.is_essential) {
                                    teammate.is_recruited(all_recruited);
                                }
                            });
                        },
                        owner: this
                    });

                    this.all_loyal = ko.pureComputed({
                        read: (): boolean => {
                            return !this.getTeammates().find((teammate: App.ME2.Teammate) => {
                                return !teammate.is_loyal();
                            });
                        },
                        write: (all_loyal: boolean): void => {
                            if (all_loyal) {
                                this.getTeammates().each((teammate: App.ME2.Teammate) => {
                                    teammate.is_recruited(true);
                                    teammate.is_loyal(true);
                                });
                            } else {
                                this.getTeammates().each((teammate: App.ME2.Teammate) => {
                                    teammate.is_loyal(false);
                                });
                            }
                        },
                        owner: this
                    });

                    this.is_evaluatable = ko.pureComputed<boolean>((): boolean => {
                        var is_evaluatable: boolean;

                        is_evaluatable = _.filter(this.getTeammates().value(), (teammate: App.ME2.Teammate): boolean => {
                            return teammate.is_recruited();
                        }).length >= 8;

                        return is_evaluatable;
                    });
                }
            }
        }
    }
}