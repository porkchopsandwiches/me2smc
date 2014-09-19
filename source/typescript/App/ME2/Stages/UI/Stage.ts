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
                    teammate_fields: string[];
                }

                export class Stage implements IStage {
                    public id: string;
                    public label: string;
                    public stage: App.ME2.Stages.IStage;
                    public teammate_fields: string[] = [];


                    constructor (stage: App.ME2.Stages.IStage) {
                        this.stage = stage;
                    }

                    public getOtherTeammateFields (field) {
                        return _.without(this.teammate_fields, field);
                    }

                    public getTeammateCandidatesFor (field): App.ME2.Teammate[] {
                        var i: number;
                        var l: number;
                        var fields: string[];
                        var candidates: App.ME2.Teammate[];
                        fields = this.getOtherTeammateFields(field);
                        l = fields.length;

                        candidates = _.filter(this.getLivingCandidates(), (candidate: App.ME2.Teammate): boolean => {
                            for (i = 0; i < l; ++i) {
                                if (this.stage[fields[i]] === candidate) {
                                    return false;
                                }
                            }

                            return true;
                        });

                        return candidates;
                    }

                    public bootstrapTeammateField (field: string): void {
                        this[field] = ko.observable(undefined);
                        this[field + "_candidates"] = ko.forcibleComputed(() => {
                            console.log("getting teammates for ", field);
                            return this.getTeammateCandidatesFor(field);
                        });
                    }

                    public bootstrapTeammateFields (): void {
                        this.teammate_fields.forEach((field) => {
                            this.bootstrapTeammateField(field);
                        });
                    }

                    public setupTeammateField (field: string): void {

                        this[field].subscribe((new_value: App.ME2.Teammate) => {
                            var fields = this.getOtherTeammateFields(field);

                            // Reflect new value
                            this.stage[field] = new_value;

                            // Notify other fields
                            fields.forEach((other_field: string) => {
                                this[other_field + "_candidates"].evaluateImmediate();
                            });
                        });

                        this[field](this.stage[field]);

                    }

                    public setupTeammateFields (): void {
                        this.teammate_fields.forEach((field: string) => {
                            this.setupTeammateField(field);
                        });

                        // Do an initial update
                        this.teammate_fields.forEach((field: string) => {
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