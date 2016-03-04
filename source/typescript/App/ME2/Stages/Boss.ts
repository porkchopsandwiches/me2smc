import { Stage } from "./Stage";
import { Stager } from "./Stager";
import { StageIDs, TeammateRoles, TeammateDeathCauses } from "../../constants";
import { Teammate } from "../Teammate";
import { TeammateDeathList } from "../TeammateDeathList";

export interface IBoss {
}

export class Boss extends Stage implements IBoss {
    public id: StageIDs = StageIDs.Boss;
    public label: string = "Boss";

    constructor (stager: Stager) {
        super(stager);
        this.configureFields([
            {
                name: "boss_squadmate_1",
                filter: (teammate: Teammate): boolean => {
                    return teammate.is_recruited() && !teammate.is_dead() && !teammate.hasRole(TeammateRoles.LongWalkEscort);
                },
                role: TeammateRoles.BossSquadmate1
            },
            {
                name: "boss_squadmate_2",
                filter: (teammate: Teammate): boolean => {
                    return teammate.is_recruited() && !teammate.is_dead() && !teammate.hasRole(TeammateRoles.LongWalkEscort);
                },
                role: TeammateRoles.BossSquadmate2
            }
        ]);

        this.getFieldObservable("boss_squadmate_1").subscribe(() => {
            this.updateHTLRoles();
        });

        this.getFieldObservable("boss_squadmate_2").subscribe(() => {
            this.updateHTLRoles();
        });
    }

    public evaluate (): TeammateDeathList {
        const death_list = new TeammateDeathList();
        const squadmate_1 = this.getFieldValue("boss_squadmate_1");
        const squadmate_2 = this.getFieldValue("boss_squadmate_2");

        // The two squadmates survive if loyal
        if (!squadmate_1.willSurviveBeingBossSquadmate()) {
            //squadmate_1.die(this.id, TeammateDeathCauses.Boss);
            death_list.add({
                teammate: squadmate_1,
                death_stage_id: this.id,
                death_cause: TeammateDeathCauses.Boss
            });
        }
        if (!squadmate_2.willSurviveBeingBossSquadmate()) {
            //squadmate_2.die(this.id, TeammateDeathCauses.Boss);
            death_list.add({
                teammate: squadmate_2,
                death_stage_id: this.id,
                death_cause: TeammateDeathCauses.Boss
            });
        }

        //this.stager.app.state.teammates().withRole(TeammateRoles.HeldTheLine).whoDieHoldingTheLine().die(this.id, TeammateDeathCauses.HoldTheLine);
        this.stager.app.state.teammates().withRole(TeammateRoles.HeldTheLine).whoDieHoldingTheLine().each((teammate: Teammate) => {
            death_list.add({
                teammate: teammate,
                death_stage_id: this.id,
                death_cause: TeammateDeathCauses.HoldTheLine
            });
        });

        return death_list;
    }

    private updateHTLRoles () {
        const squadmates = this.stager.app.state.teammates().withAnyOfTheseRoles(TeammateRoles.BossSquadmate1, TeammateRoles.BossSquadmate2);
        const candidates = this.stager.app.state.teammates().whoAreAlive().whoAreRecruited();

        // If both Squadmates have been picked
        squadmates.removeRole(TeammateRoles.HeldTheLine);
        if (squadmates.length() === 2) {
            candidates.removeRole(TeammateRoles.HeldTheLine).withoutAnyOfTheseRoles(TeammateRoles.BossSquadmate1, TeammateRoles.BossSquadmate2, TeammateRoles.LongWalkEscort).addRole(TeammateRoles.HeldTheLine);
        }
    }
}
