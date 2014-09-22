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
                    Boss
                }

                export interface ITeammateFieldFilter {
                    (teammate: App.ME2.Teammate): boolean;
                }

                export interface ITeammateFields {
                    [key: string]: ITeammateFieldFilter;
                }

                export interface IStage {
                    id: string;
                    label: string;
                    stage: App.ME2.Stages.IStage;
                    setup: () => void;
                    getTeammateCandidatesFor: (field) => App.ME2.Teammate[];
                    bootstrapTeammateField: (field: string) => void;
                    bootstrapTeammateFields: () => void;
                    setupTeammateField: (field: string) => void;
                    setupTeammateFields: () => void;
                    teammate_fields: ITeammateFields;
                }

                export class Stage implements IStage {
                    public id: string;
                    public label: string;
                    public stage: App.ME2.Stages.IStage;
                    public teammate_fields: ITeammateFields = {};

                    static genericTeammateFieldFilter (teammate: App.ME2.Teammate): boolean {
                        return true;
                    }

                    constructor (stage: App.ME2.Stages.IStage) {
                        this.stage = stage;
                    }

                    public getTeammateCandidatesFor (field): App.ME2.Teammate[] {
                        var candidates: App.ME2.Teammate[];
                        var found: boolean;

                        // Apply the teammate field's own filter first
                        candidates = _.filter(this.getLivingCandidates(), this.teammate_fields[field]);

                        // Filter out users who are already in use in other fields
                        candidates = _.filter(candidates, (candidate: App.ME2.Teammate): boolean => {
                            found = false;

                            _.each(this.teammate_fields, (filter: ITeammateFieldFilter, key: string) => {
                                if (key !== field && this.stage[key] === candidate) {
                                    found = true;
                                }
                            });

                            return !found;
                        });

                        return candidates;
                    }

                    public bootstrapTeammateField (field: string): void {
                        this[field] = ko.observable(undefined);
                        this[field + "_candidates"] = ko.forcibleComputed(() => {
                            return this.getTeammateCandidatesFor(field);
                        });
                    }

                    public bootstrapTeammateFields (): void {
                        _.each(_.keys(this.teammate_fields), (field) => {
                            this.bootstrapTeammateField(field);
                        });
                    }

                    public setupTeammateField (field: string): void {
                        this[field].subscribe((new_value: App.ME2.Teammate) => {

                            // Reflect new value
                            this.stage[field] = new_value;

                            _.each(this.teammate_fields, (filter: ITeammateFieldFilter, key: string) => {
                                if (key !== field) {
                                    this[key + "_candidates"].evaluateImmediate();
                                }
                            });
                        });

                        this[field](this.stage[field]);

                    }

                    public setupTeammateFields (): void {
                        _.each(_.keys(this.teammate_fields), (field: string) => {
                            this.setupTeammateField(field);
                        });

                        // Do an initial update
                        _.each(_.keys(this.teammate_fields), (field: string) => {
                            this[field + "_candidates"].evaluateImmediate();
                        });
                    }

                    public proxy<T> (property_name: string) {
                        this[property_name](this.stage[property_name]);
                        this[property_name].subscribe((new_value: T) => {
                            this.stage[property_name] = new_value;
                        });
                    }

                    public getLivingCandidates (): App.ME2.Teammate[] {
                        return _.filter(this.stage.teammates, (teammate: App.ME2.Teammate) => {
                            return !teammate.is_dead;
                        });
                    }

                    public renderTeammateForSelect (teammate: App.ME2.Teammate): string {
                        return teammate.henchman.name;
                    }

                    public setup (): void {}
                }
            }
        }
    }
}