import { Teammate } from "./Teammate";
import { Teammates } from "./Teammates";
import { TeammateRoles } from "../constants";
import { State } from "./State";
import { Stage } from "./Stages/Stage";

export interface ITeammateFieldFilter {
    (teammate: Teammate, teammates: Teammates): boolean;
}

export interface ITeammateFieldConfig {
    name: string;
    filter: ITeammateFieldFilter;
    optional?: boolean;
    role?: TeammateRoles;
}

export interface ITeammateFieldSiblingGetter {
    (): TeammateField[];
}

export class TeammateField {
    public config: ITeammateFieldConfig;
    public observable: KnockoutObservable<Teammate>;
    public candidates: KnockoutForcibleComputed<Teammate[]>;

    constructor (state: State, siblings: ITeammateFieldSiblingGetter, config: ITeammateFieldConfig) {
        this.config = config;

        // The observable stores the selected teammate for this field
        this.observable = ko.observable(undefined);

        // Create the candidates observable that maintains a list of the possible candidates for this field.
        // Candidates are all teammates who are not filtered out, and who are also not assigned to other sibling fields.
        this.candidates = ko.forcibleComputed((): Teammate[] => {

            // Candidates are those who fulfill the field's filter, and are not in use elsewhere
            const candidates: Teammate[] = state.teammates().filter((teammate: Teammate) => {
                return config.filter(teammate, state.teammates());
            }).filter((candidate: Teammate): boolean => {
                return !_.find(siblings(), (other_field: TeammateField): boolean => {

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
            candidates.unshift(Stage.no_teammate);

            return candidates;
        });

        // Before the teammate changes, the previous teammate has the associated role removed
        this.observable.subscribe((teammate: Teammate) => {
            if (config.role !== undefined && teammate && teammate.henchman.id !== undefined) {
                teammate.removeRole(config.role);
            }
        }, null, "beforeChange");

        // After the teammate changes, assign them the role, and re-evaluate the sibling candidates list
        this.observable.subscribe((teammate: Teammate): void => {
            if (config.role !== undefined) {
                teammate.addRole(config.role);
            }

            _.each(siblings(), (other_field: TeammateField) => {
                if (other_field.config.name !== config.name) {
                    other_field.candidates.evaluateImmediate();
                }
            });
        });
    }
}
