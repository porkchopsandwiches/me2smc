import { Stage } from "./Stage";
import { Stager } from "./Stager";
import { StageIDs, TeammateRoles, TeammateDeathCauses } from "../../constants";
import { Teammate } from "../Teammate";
import { TeammateDeathList } from "../TeammateDeathList";

export interface IVents {
}

export class Vents extends Stage implements IVents {
    public id: StageIDs = StageIDs.Vents;
    public label: string = "Vents";

    constructor (stager: Stager) {
        super(stager);
        //this.bootstrapTeammateFields();
        this.configureFields([
            {
                name: "vent_squadmate_1",
                filter: Stage.genericTeammateFieldFilter,
                role: TeammateRoles.VentsSquadmate1
            },
            {
                name: "vent_squadmate_2",
                filter: Stage.genericTeammateFieldFilter,
                role: TeammateRoles.VentsSquadmate2
            },
            {
                name: "vent_venter",
                filter: (teammate: Teammate): boolean => {
                    return teammate.is_recruited() && !teammate.is_dead() && teammate.henchman.is_vent_candidate;
                },
                role: TeammateRoles.VentsVenter
            },
            {
                name: "vent_leader",
                filter: (teammate: Teammate): boolean => {
                    return teammate.is_recruited() && !teammate.is_dead() && teammate.henchman.is_leader_candidate;
                },
                role: TeammateRoles.VentsLeader
            }
        ]);
    }

    public evaluate (): TeammateDeathList {
        const death_list = new TeammateDeathList();

        const venter = this.getFieldValue("vent_venter");
        const leader = this.getFieldValue("vent_leader");

        if (!venter.willBeEffectiveVentVenter()) {
            //venter.die(this.id, TeammateDeathCauses.VentsBadVenter);
            death_list.add({
                teammate: venter,
                death_stage_id: this.id,
                death_cause: TeammateDeathCauses.VentsBadVenter
            });
        } else if (!leader.willBeEffectiveVentLeader()) {
            //venter.die(this.id, TeammateDeathCauses.VentsBadLeader);
            death_list.add({
                teammate: venter,
                death_stage_id: this.id,
                death_cause: TeammateDeathCauses.VentsBadLeader
            });
        }

        return death_list;
    }
}
