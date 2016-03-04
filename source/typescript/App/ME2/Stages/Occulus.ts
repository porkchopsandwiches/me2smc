import { Stage } from "./Stage";
import { Stager } from "./Stager";
import { StageIDs, TeammateRoles, TeammateDeathCauses } from "../../constants";
import { TeammateDeathList } from "../TeammateDeathList";

export interface IOcculus {
}

export class Occulus extends Stage implements IOcculus {
    public id: StageIDs = StageIDs.Occulus;
    public label: string = "Occulus";

    constructor (stager: Stager) {
        super(stager);
        //this.bootstrapTeammateFields();
        this.configureFields([
            {
                name: "occulus_squadmate_1",
                filter: Stage.genericTeammateFieldFilter,
                role: TeammateRoles.OcculusSquadmate1
            },
            {
                name: "occulus_squadmate_2",
                filter: Stage.genericTeammateFieldFilter,
                role: TeammateRoles.OcculusSquadmate2
            }
        ]);
    }

    public evaluate (): TeammateDeathList {
        const death_list = new TeammateDeathList;

        // Get candidates to die (that is, they were not Occulus Squadmates)
        const dpt = this.stager.app.state.teammates().whoAreRecruited().withoutAnyOfTheseRoles(TeammateRoles.OcculusSquadmate1, TeammateRoles.OcculusSquadmate2);

        // Apply deaths
        if (!this.stager.app.state.normandy.has_shielding()) {
            death_list.add({
                teammate: dpt.whoAreAlive().sortByShieldingDeathPriority().last(),
                death_cause: TeammateDeathCauses.ShieldingFailure,
                death_stage_id: this.id
            });

            //dpt.whoAreAlive().sortByShieldingDeathPriority().last().die(this.id, TeammateDeathCauses.ShieldingFailure);
        }

        if (!this.stager.app.state.normandy.has_armour()) {
            //dpt.whoAreAlive().sortByArmourDeathPriority().last().die(this.id, TeammateDeathCauses.ArmourFailure);
            death_list.add({
                teammate: dpt.whoAreAlive().sortByArmourDeathPriority().last(),
                death_cause: TeammateDeathCauses.ArmourFailure,
                death_stage_id: this.id
            });
        }

        if (!this.stager.app.state.normandy.has_thanix_cannon()) {
            //dpt.whoAreAlive().sortByCannonDeathPriority().last().die(this.id, TeammateDeathCauses.CannonFailure);
            death_list.add({
                teammate: dpt.whoAreAlive().sortByCannonDeathPriority().last(),
                death_cause: TeammateDeathCauses.CannonFailure,
                death_stage_id: this.id
            });
        }

        return death_list;
    }
}
