import { Stage } from "./Stage";
import { Stager } from "./Stager";
import { StageIDs, TeammateRoles, TeammateDeathCauses } from "../../constants";
import { Teammate } from "../Teammate";
import { Teammates } from "../Teammates";
import { TeammateDeathList } from "../TeammateDeathList";

export interface ILongWalk {}

export class LongWalk extends Stage implements ILongWalk {
    public id: StageIDs = StageIDs.LongWalk;
    public label: string = "Long Walk";

    constructor (stager: Stager) {
        super(stager);
        this.configureFields([
            {
                name: "long_walk_bubbler",
                filter: (teammate: Teammate): boolean => {
                    return teammate.is_recruited() && !teammate.is_dead() && teammate.henchman.is_bubble_candidate;
                },
                role: TeammateRoles.LongWalkBubbler
            },
            {
                name: "long_walk_leader",
                filter: (teammate: Teammate): boolean => {
                    return teammate.is_recruited() && !teammate.is_dead() && teammate.henchman.is_leader_candidate;
                },
                role: TeammateRoles.LongWalkLeader
            },
            {
                name: "long_walk_escort",
                filter: (teammate: Teammate, teammates: Teammates): boolean => {

                    // If there are only 4 living teammates, no one can be escort
                    if (teammates.whoAreAlive().length() <= 4) {
                        return false;
                    }

                    return teammate.is_recruited() && !teammate.is_dead() && teammate.henchman.is_escort_candidate;
                },
                optional: true,
                role: TeammateRoles.LongWalkEscort
            },
            {
                name: "long_walk_squadmate_1",
                filter: Stage.genericTeammateFieldFilter,
                role: TeammateRoles.LongWalkSquadmate1
            },
            {
                name: "long_walk_squadmate_2",
                filter: Stage.genericTeammateFieldFilter,
                role: TeammateRoles.LongWalkSquadmate2
            }
        ]);
    }

    public evaluate (): TeammateDeathList {
        const death_list = new TeammateDeathList();
        const escort = this.getFieldValue("long_walk_escort");
        const bubbler = this.getFieldValue("long_walk_bubbler");
        const leader = this.getFieldValue("long_walk_leader");

        // If escort is not loyal, they will die
        if (escort.henchman.id !== undefined && !escort.willBeEffectiveLongWalkEscort()) {
            //escort.die(this.id, TeammateDeathCauses.Escort);
            death_list.add({
                teammate: escort,
                death_stage_id: this.id,
                death_cause: TeammateDeathCauses.Escort
            });
        }

        // If bubbler is not an expert, or is not loyal, one of the squadmates dies
        if (!bubbler.willBeEffectiveLongWalkBubbler()) {
            //this.stager.app.state.teammates().withAnyOfTheseRoles(TeammateRoles.LongWalkSquadmate1, TeammateRoles.LongWalkSquadmate2).sortByLongWalkDeathPriority().last().die(this.id, TeammateDeathCauses.LongWalkBadBubbler);
            death_list.add({
                teammate: this.stager.app.state.teammates().withAnyOfTheseRoles(TeammateRoles.LongWalkSquadmate1, TeammateRoles.LongWalkSquadmate2).sortByLongWalkDeathPriority().last(),
                death_stage_id: this.id,
                death_cause: TeammateDeathCauses.LongWalkBadBubbler
            });
        }

        // If leader is not loyal and not
        if (!leader.willBeEffectiveLongWalkLeader()) {
            //leader.die(this.id, TeammateDeathCauses.LongWalkBadLeader);
            death_list.add({
                teammate: leader,
                death_stage_id: this.id,
                death_cause: TeammateDeathCauses.LongWalkBadLeader
            });
        }

        return death_list;
    }
}
