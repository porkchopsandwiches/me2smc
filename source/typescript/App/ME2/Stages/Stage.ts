import { Teammate } from "../Teammate";
import { Stager } from "./Stager";
import { StageIDs } from "../../constants";
import { ITeammateFieldConfig, TeammateField } from "../TeammateField";
import { TeammateDeathList } from "../TeammateDeathList";
import { Henchman } from "../Henchman";

export abstract class Stage {
    public static no_teammate: Teammate = new Teammate(new Henchman(undefined, undefined, "— None —"));

    public stager: Stager;
    public id: StageIDs;
    public label: string;
    public is_evaluatable: KnockoutObservable<boolean>;
    private fields: TeammateField[];

    // Generic filter only requires the teammate be alive
    public static genericTeammateFieldFilter (teammate: Teammate): boolean {
        return teammate.is_recruited() && !teammate.is_dead();
    }

    constructor (stager: Stager) {
        this.stager = stager;
    }

    public evaluate (): TeammateDeathList {
        return new TeammateDeathList();
    }

    public evaluateAndApply (): void {
        this.evaluate().apply();
    }

    // Replaces bootstrapTeammatefields
    public configureFields (configs: ITeammateFieldConfig[]): void {
        this.fields = [];
        this.fields = _.map<ITeammateFieldConfig, TeammateField>(configs, (config: ITeammateFieldConfig): TeammateField => {
            return new TeammateField(this.stager.app.state, (): TeammateField[] => { return this.fields; }, config);
        });

        // Force a refresh
        _.each(this.fields, (field: TeammateField): void => {
            field.candidates.evaluateImmediate();
        });

        this.is_evaluatable = ko.forcibleComputed<boolean>(() => {
            // Return false if there are any teammate fields with 'no teammate' values
            const fields_missing = !!_.find(this.fields, (field: TeammateField): boolean => {
                if (field.config.optional) {
                    return false;
                }

                const teammate = field.observable();

                return teammate ? (teammate.henchman.id === undefined) : true;
            });

            return !fields_missing;
        });
    }

    public getField (name: string): TeammateField {
        return _.find<TeammateField>(this.fields, (field: TeammateField): boolean => {
            return field.config.name === name;
        });
    }

    public getFieldObservable (name: string): KnockoutObservable<Teammate> {
        return this.getField(name).observable;
    }

    public getFieldCandidates (name: string): KnockoutForcibleComputed<Teammate[]> {
        return this.getField(name).candidates;
    }

    public getFieldValue (name: string): Teammate {
        return this.getFieldObservable(name)();
    }

    public setup (): void {
        // Attempt to apply the current values for each field
        _.each(this.fields, (field: TeammateField): void => {

            // Get teammate with the role this field is attached to
            const state_teammate = this.stager.app.state.teammates().withRole(field.config.role).first();
            const selector_teammate = field.observable();

            if (state_teammate) {
                if (selector_teammate === undefined || selector_teammate.henchman.id !== state_teammate.henchman.id) {
                    field.observable(state_teammate);
                }
            }
        });
    }

    public isEvaluatable (): boolean {
        return this.is_evaluatable();
    }
}
