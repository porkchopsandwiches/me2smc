///<reference path="../../references.ts" />

module App {
    export module ME2 {

        export interface ITeammateFieldFilter {
            (teammate: App.ME2.Teammate, teammates: App.ME2.Teammates): boolean;
        }

        export interface ITeammateFieldConfig {
            name: string;
            filter: ITeammateFieldFilter;
            optional?: boolean;
            role?: App.ME2.TeammateRoles;
        }

        export interface ITeammateField {
            config: ITeammateFieldConfig;
            observable: KnockoutObservable<App.ME2.Teammate>;
            candidates: KnockoutForcibleComputed<App.ME2.Teammate[]>;
        }

        export interface ITeammateFieldSiblingGetter {
            (): ITeammateField[];
        }

        export class TeammateField implements ITeammateField {
            public config: ITeammateFieldConfig;
            public observable: KnockoutObservable<App.ME2.Teammate>;
            public candidates: KnockoutForcibleComputed<App.ME2.Teammate[]>;

            constructor (state: App.ME2.State, siblings: ITeammateFieldSiblingGetter, config: ITeammateFieldConfig) {
                this.config = config;

                // The observable stores the selected teammate for this field
                this.observable = ko.observable(undefined);

                // Create the candidates observable that maintains a list of the possible candidates for this field.
                // Candidates are all teammates who are not filtered out, and who are also not assigned to other sibling fields.
                this.candidates = ko.forcibleComputed((): App.ME2.Teammate[] => {
                    var candidates: App.ME2.Teammate[];

                    // Candidates are those who fulfill the field's filter, and are not in use elsewhere
                    candidates = state.teammates().filter((teammate: App.ME2.Teammate) => {
                        return config.filter(teammate, state.teammates());
                    }).filter((candidate: App.ME2.Teammate): boolean => {
                        return !_.find(siblings(), (other_field: ITeammateField): boolean => {

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
                });

                // Before the teammate changes, the previous teammate has the associated role removed
                this.observable.subscribe((teammate: App.ME2.Teammate) => {
                    if (config.role !== undefined && teammate && teammate.henchman.id !== undefined) {
                        teammate.removeRole(config.role);
                    }
                }, null, "beforeChange");

                // After the teammate changes, assign them the role, and re-evaluate the sibling candidates list
                this.observable.subscribe((teammate: App.ME2.Teammate): void => {
                    if (config.role !== undefined) {
                        teammate.addRole(config.role);
                    }

                    _.each(siblings(), (other_field: ITeammateField) => {
                        if (other_field.config.name !== config.name) {
                            other_field.candidates.evaluateImmediate();
                        }
                    });
                });
            }
        }
    }
}
