///<reference path="../../../references.ts" />
module App {
    export module ME2 {
        export module Stages {

            export interface ITeammateFieldFilter {
                (teammate: App.ME2.Teammate, teammates: App.ME2.Teammates): boolean;
            }

            export interface ITeammateField {
                name: string;
                filter: ITeammateFieldFilter;
                optional?: boolean;
            }

            export interface ITeammateObservableField extends ITeammateField {
                observable: KnockoutObservable<App.ME2.Teammate>;
                candidates: KnockoutForcibleComputed<App.ME2.Teammate[]>;
            }

            export interface IUIStage {
                is_evaluatable: any;
            }

            export class UIStage extends App.ME2.Stages.Stage implements IUIStage {
                public is_evaluatable: any;

                public fields: ITeammateObservableField[];


                // Generic filter only requires the teammate be alive
                static genericTeammateFieldFilter (teammate: App.ME2.Teammate): boolean {
                    return !teammate.is_dead();
                }

                static no_teammate: App.ME2.Teammate = new App.ME2.Teammate(new App.ME2.Henchman(undefined, undefined, "— None —"));

                // Replaces bootstrapTeammatefields
                public configureFields (fields: ITeammateField[]): void {
                    this.fields = _.map<ITeammateField, ITeammateObservableField>(fields, (field: ITeammateField): ITeammateObservableField => {
                        var observable_field: ITeammateObservableField;


                        observable_field = {
                            name:       field.name,
                            filter:     field.filter,
                            optional:   field.optional,
                            observable: ko.observable(undefined),
                            candidates: ko.forcibleComputed((): App.ME2.Teammate[] => {
                                var candidates: App.ME2.Teammate[];

                                // Candidates are those who fulfill the field's filter, and are not in use elsewhere
                                candidates = this.stager.app.state.teammates.filter((teammate: App.ME2.Teammate) => {
                                    return field.filter(teammate, this.stager.app.state.teammates);
                                }).filter((candidate: App.ME2.Teammate): boolean => {
                                    return !_.find(this.fields, (other_field: ITeammateObservableField): boolean => {

                                        // If not looking at self, and alternative has been instantiated
                                        if (other_field.name !== field.name && other_field.observable) {
                                            if (other_field.observable() === candidate) {
                                                return true;
                                            }
                                        }

                                        return false;
                                    });
                                }).value();

                                // Add a numpty candidate
                                candidates.unshift(App.ME2.Stages.UIStage.no_teammate);

                                return candidates;
                            })
                        };

                        return observable_field;
                    });
                }

                public getField (name: string): ITeammateObservableField {
                    return _.find<ITeammateObservableField>(this.fields, (field: ITeammateObservableField): boolean => {
                        return field.name === name;
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
                            field.observable.subscribe((new_value: App.ME2.Teammate): void => {

                                _.each(this.fields, (other_field: ITeammateObservableField) => {
                                    if (other_field.name !== field.name) {
                                        //console.log("UIStage", "updating options for", other_field.name);
                                        //this[other_field.name + "_candidates"].evaluateImmediate();
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
                                if (field.optional) {
                                    return false;
                                }

                                teammate = field.observable();

                                return teammate ? (teammate.henchman.id === undefined) : true;
                            });

                            return !fields_missing;
                        });
                    } else {
                        console.log("Fields not set");
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