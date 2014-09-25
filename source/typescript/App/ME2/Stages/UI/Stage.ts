///<reference path="../../../../references.ts" />
module App {
    export module ME2 {
        export module Stages {
            export module UI {
                export enum StageIDs {
                    Setup,
                    Occulus,
                    Vents,
                    LongWalk,
                    Boss,
                    Summary
                }

                export interface ITeammateFieldFilter {
                    (teammate: App.ME2.Teammate): boolean;
                }

                export interface ITeammateField {
                    name: string;
                    filter: ITeammateFieldFilter;
                }

                export interface IStage {
                    id: StageIDs;
                    label: string;
                    stage: App.ME2.Stages.IStage;
                    setup: () => void;
                    getTeammateCandidatesFor: (field) => App.ME2.Teammate[];
                    bootstrapTeammateFields: () => void;
                    setupTeammateFields: () => void;
                    teammate_fields: ITeammateField[];
                    is_evaluatable: KnockoutComputed<boolean>;
                }

                export class Stage implements IStage {
                    public id: StageIDs;
                    public label: string;
                    public stage: App.ME2.Stages.IStage;
                    public teammate_fields: ITeammateField[] = [];
                    public is_evaluatable: KnockoutComputed<boolean>;

                    // Generic filter only requires the teammate be alive
                    static genericTeammateFieldFilter (teammate: App.ME2.Teammate): boolean {
                        return !teammate.is_dead;
                    }

                    static no_teammate: App.ME2.Teammate = new App.ME2.Teammate(new App.ME2.Henchman(undefined, "— None —"));

                    constructor (stage: App.ME2.Stages.IStage) {
                        this.stage = stage;
                    }

                    public getTeammateFieldByName (name: string): ITeammateField {
                        return _.find(this.teammate_fields, (field: ITeammateField) => {
                            return field.name === name;
                        })
                    }

                    public getTeammateCandidatesFor (field: ITeammateField): App.ME2.Teammate[] {
                        var candidates: App.ME2.Teammate[];

                        // Candidates are those who fulfill the field's filter, and are not in use elsewhere
                        candidates = this.stage.stager.teammates.filter(field.filter).filter((candidate: App.ME2.Teammate): boolean => {
                            return !_.find(this.teammate_fields, (other_field: ITeammateField): boolean => {
                                return other_field.name !== field.name && this.stage[other_field.name] === candidate;
                            });
                        }).value();

                        // Add a numpty candidate
                        candidates.unshift(Stage.no_teammate);

                        return candidates;
                    }

                    public bootstrapTeammateFields (): void {
                        _.each(this.teammate_fields, (field: ITeammateField): void => {
                            this[field.name] = ko.observable(undefined);
                            this[field.name + "_candidates"] = ko.forcibleComputed(() => {
                                return this.getTeammateCandidatesFor(field);
                            });
                        });
                    }

                    public setupTeammateFields (): void {

                        _.each(this.teammate_fields, (field: ITeammateField): void => {
                            this[field.name].subscribe((new_value: App.ME2.Teammate) => {

                                // Reflect new value
                                this.stage[field.name] = new_value;

                                _.each(this.teammate_fields, (other_field: ITeammateField) => {
                                    if (other_field.name !== field.name) {
                                        this[other_field.name + "_candidates"].evaluateImmediate();
                                    }
                                });
                            });

                            this[field.name](this.stage[field.name]);
                        });

                        // Do an initial update
                        _.each(this.teammate_fields, (field: ITeammateField): void => {
                            this[field.name + "_candidates"].evaluateImmediate();
                        });
                    }

                    public linkIsEvaluatableToTeammateFields (): void {
                        this.is_evaluatable = ko.pureComputed(() => {
                            var observable: KnockoutObservable<App.ME2.Teammate>;
                            var teammate: App.ME2.Teammate;

                            // Return false if there are any teammate fields with 'no teammate' values
                            return !_.find(this.teammate_fields, (field: ITeammateField): boolean => {
                                observable = this[field.name];
                                teammate = observable();
                                return teammate ? (teammate.henchman.id === undefined) : true;
                            });
                        });
                    }

                    public proxy<T> (property_name: string) {
                        this[property_name](this.stage[property_name]);
                        this[property_name].subscribe((new_value: T) => {
                            this.stage[property_name] = new_value;
                        });
                    }



                    public setup (): void {}
                }
            }
        }
    }
}