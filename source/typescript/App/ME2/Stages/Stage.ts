///<reference path="../../../references.ts" />
module App {
    export module ME2 {
        export module Stages {

            export enum StageIDs {
                Setup,
                Occulus,
                Vents,
                LongWalk,
                Boss,
                Summary
            }

            export interface ITeammateFieldFilter {
                (teammate: App.ME2.Teammate, teammates: App.ME2.Teammates): boolean;
            }

            export interface ITeammateFieldConfig {
                name: string;
                filter: ITeammateFieldFilter;
                optional?: boolean;
            }

            export interface ITeammateObservableField {
                config: ITeammateFieldConfig;
                observable: KnockoutObservable<App.ME2.Teammate>;
                candidates: KnockoutForcibleComputed<App.ME2.Teammate[]>;
            }

            export interface IStage {
                evaluate (): void;
                setup (): void;
                isEvaluatable (): boolean;
                stager: App.ME2.Stages.Stager;
                id: App.ME2.Stages.StageIDs;
                label: string;
                is_evaluatable: KnockoutObservable<boolean>;
            }

            export class Stage implements IStage {
                public stager: App.ME2.Stages.Stager;
                public id: App.ME2.Stages.StageIDs;
                public label: string;
                public is_evaluatable: KnockoutObservable<boolean>;
                private fields: ITeammateObservableField[];

                // Generic filter only requires the teammate be alive
                static genericTeammateFieldFilter (teammate: App.ME2.Teammate): boolean {
                    return teammate.is_recruited() && !teammate.is_dead();
                }

                static no_teammate: App.ME2.Teammate = new App.ME2.Teammate(new App.ME2.Henchman(undefined, undefined, "— None —"));

                constructor (stager: App.ME2.Stages.Stager) {
                    this.stager = stager;
                }

                public evaluate (): void {}

                // Replaces bootstrapTeammatefields
                public configureFields (configs: ITeammateFieldConfig[]): void {
                    this.fields = _.map<ITeammateFieldConfig, ITeammateObservableField>(configs, (config: ITeammateFieldConfig): ITeammateObservableField => {
                        var field: ITeammateObservableField;

                        field = {
                            config:     config,
                            observable: ko.observable(undefined),
                            candidates: ko.forcibleComputed((): App.ME2.Teammate[] => {
                                var candidates: App.ME2.Teammate[];

                                // Candidates are those who fulfill the field's filter, and are not in use elsewhere
                                candidates = this.stager.app.state.teammates().filter((teammate: App.ME2.Teammate) => {
                                    return config.filter(teammate, this.stager.app.state.teammates());
                                }).filter((candidate: App.ME2.Teammate): boolean => {
                                    return !_.find(this.fields, (other_field: ITeammateObservableField): boolean => {

                                        // If not looking at self, and alternative has been instantiated
                                        if (other_field.config.name !== config.name && other_field.observable) {
                                            if (other_field.observable() === candidate) {
                                                return true;
                                            }
                                        }

                                        return false;
                                    });
                                }).value();

                                // Add a numpty candidate
                                candidates.unshift(App.ME2.Stages.Stage.no_teammate);

                                return candidates;
                            })
                        };

                        return field;
                    });
                }

                public getField (name: string): ITeammateObservableField {
                    return _.find<ITeammateObservableField>(this.fields, (field: ITeammateObservableField): boolean => {
                        return field.config.name === name;
                    });
                }

                public getFieldObservable (name: string): KnockoutObservable<App.ME2.Teammate> {
                    return this.getField(name).observable;
                }

                public getFieldCandidates (name: string): KnockoutForcibleComputed<App.ME2.Teammate[]> {
                    return this.getField(name).candidates;
                }

                public getFieldValue (name: string): App.ME2.Teammate {
                    return this.getFieldObservable(name)();
                }

                // Replaces setupTeammateFields
                public setupFields (): void {
                    if (this.fields) {
                        _.each(this.fields, (field: ITeammateObservableField): void => {
                            field.observable.subscribe((): void => {

                                _.each(this.fields, (other_field: ITeammateObservableField) => {
                                    if (other_field.config.name !== field.config.name) {
                                        other_field.candidates.evaluateImmediate();
                                    }
                                });
                            });
                        });

                        _.each(this.fields, (field: ITeammateObservableField): void => {
                            field.candidates.evaluateImmediate();
                        });
                    }
                }

                public linkIsEvaluatableToFields (): void {
                    if (this.fields) {
                        this.is_evaluatable = ko.forcibleComputed<boolean>(() => {
                            //var observable: KnockoutObservable<App.ME2.Teammate>;
                            var teammate: App.ME2.Teammate;
                            var fields_missing: boolean;

                            // Return false if there are any teammate fields with 'no teammate' values
                            fields_missing = !!_.find(this.fields, (field: ITeammateObservableField): boolean => {
                                if (field.config.optional) {
                                    return false;
                                }

                                teammate = field.observable();

                                return teammate ? (teammate.henchman.id === undefined) : true;
                            });

                            return !fields_missing;
                        });
                    }
                }

                public setup (): void {
                    this.setupFields();
                    this.linkIsEvaluatableToFields();
                }

                public isEvaluatable (): boolean {
                    return this.is_evaluatable();
                }
            }
        }
    }
}