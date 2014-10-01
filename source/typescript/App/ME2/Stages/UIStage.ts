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
                getTeammateCandidatesFor (field): App.ME2.Teammate[];
                bootstrapTeammateFields (): void;
                setupTeammateFields (): void;
                teammate_fields: ITeammateField[];
                //is_evaluatable: KnockoutComputed<boolean>;
                //is_evaluatable: KnockoutForcibleComputed<boolean>;
                is_evaluatable: any;
            }

            export class UIStage extends App.ME2.Stages.Stage implements IUIStage {
                public teammate_fields: ITeammateField[] = [];
                //public is_evaluatable: KnockoutForcibleComputed<boolean>;
                public is_evaluatable: any;

                public fields: ITeammateObservableField[];


                // Generic filter only requires the teammate be alive
                static genericTeammateFieldFilter (teammate: App.ME2.Teammate): boolean {
                    return !teammate.is_dead();
                }

                static no_teammate: App.ME2.Teammate = new App.ME2.Teammate(new App.ME2.Henchman(undefined, undefined, "— None —"));

                public getTeammateFieldByName (name: string): ITeammateField {
                    return _.find(this.teammate_fields, (field: ITeammateField) => {
                        return field.name === name;
                    })
                }

                public getTeammateCandidatesFor (field: ITeammateField): App.ME2.Teammate[] {
                    var candidates: App.ME2.Teammate[];
                    var other_value: App.ME2.Teammate;

                    // Candidates are those who fulfill the field's filter, and are not in use elsewhere
                    candidates = this.stager.app.state.teammates.filter((teammate: App.ME2.Teammate) => {
                        return field.filter(teammate, this.stager.app.state.teammates);
                    }).filter((candidate: App.ME2.Teammate): boolean => {
                        return !_.find(this.teammate_fields, (other_field: ITeammateField): boolean => {

                            // If not looking at self, and alternative has been instantiated
                            if (other_field.name !== field.name && this[other_field.name]) {
                                other_value = this[other_field.name]();

                                if (other_value === candidate) {
                                    return true;
                                }
                            }

                            return false;

                            //return other_field.name !== field.name && this[other_field.name] === candidate;
                        });
                    }).value();

                    // Add a numpty candidate
                    candidates.unshift(App.ME2.Stages.UIStage.no_teammate);

                    //console.log("UIStage", "Getting candidates for", field.name, "results in", candidates);

                    return candidates;
                }

                public bootstrapTeammateFields (): void {
                    //console.log("UIStage", "bootstrap teammate fields", this.teammate_fields);
                    _.each(this.teammate_fields, (field: ITeammateField): void => {
                        this[field.name] = ko.observable(undefined);
                        this[field.name + "_candidates"] = ko.forcibleComputed(() => {
                            return this.getTeammateCandidatesFor(field);
                        });
                    });
                }

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

                public setupTeammateFields (): void {

                    _.each(this.teammate_fields, (field: ITeammateField): void => {
                        this[field.name].subscribe((new_value: App.ME2.Teammate) => {
                            //console.log("UIStage", field.name, "new value", new_value);

                            _.each(this.teammate_fields, (other_field: ITeammateField) => {
                                if (other_field.name !== field.name) {
                                    //console.log("UIStage", "updating options for", other_field.name);
                                    this[other_field.name + "_candidates"].evaluateImmediate();
                                }
                            });
                        });
                    });

                    // Do an initial update
                    _.each(this.teammate_fields, (field: ITeammateField): void => {
                        this[field.name + "_candidates"].evaluateImmediate();
                    });
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

                public linkIsEvaluatableToTeammateFields (): void {
                    //console.log("UIStage", "is_evaluatable", "linking...");
                    this.is_evaluatable = ko.forcibleComputed<boolean>(() => {
                        //console.log("UIStage", "is_evaluatable", "beginning compute");
                        var observable: KnockoutObservable<App.ME2.Teammate>;
                        var teammate: App.ME2.Teammate;
                        var fields_missing: boolean;

                        // Return false if there are any teammate fields with 'no teammate' values
                        fields_missing = !!_.find(this.teammate_fields, (field: ITeammateField): boolean => {
                            //console.log("UIStage", "is_evaluatable", field, this[field.name]());
                            if (field.optional) {
                                return false;
                            }

                            observable = this[field.name];
                            teammate = observable();
                            return teammate ? (teammate.henchman.id === undefined) : true;
                        });

                        //console.log("UIStage", "Updating is_evaluatable", !fields_missing);

                        return !fields_missing;
                    });

                    //console.log("UIStage", "is_evaluatable", "initial value", this.is_evaluatable());
                }

                public linkIsEvaluatableToFields (): void {
                    if (this.fields) {
                        this.is_evaluatable = ko.forcibleComputed<boolean>(() => {
                            //var observable: KnockoutObservable<App.ME2.Teammate>;
                            var teammate: App.ME2.Teammate;
                            var fields_missing: boolean;

                            // Return false if there are any teammate fields with 'no teammate' values
                            fields_missing = !!_.find(this.fields, (field: ITeammateObservableField): boolean => {
                                //console.log("UIStage", "is_evaluatable", field, this[field.name]());
                                if (field.optional) {
                                    return false;
                                }

                                //observable = this[field.name];
                                teammate = field.observable();

                                //return field.observable()

                                return teammate ? (teammate.henchman.id === undefined) : true;
                            });

                            //console.log("UIStage", "Updating is_evaluatable", !fields_missing);

                            return !fields_missing;
                        });
                    } else {
                        console.log("Fields not set");
                    }
                }

                public setup (): void {
                    //console.log("UIStage", "setup", this.teammate_fields);
                    this.setupTeammateFields();
                    this.setupFields();
                    this.linkIsEvaluatableToFields();
                    this.linkIsEvaluatableToTeammateFields();
                }

                public isEvaluatable (): boolean {
                    return this.is_evaluatable();
                }
            }
        }
    }
}