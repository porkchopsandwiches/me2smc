import { Teammate } from "./Teammate";
import { TeammateDeathCauses, StageIDs } from "../constants";

export interface ITeammateDeath {
    teammate: Teammate;
    death_cause: TeammateDeathCauses;
    death_stage_id: StageIDs;
}

export class TeammateDeathList {
    private list: ITeammateDeath[];

    constructor (...list: ITeammateDeath[]) {
        this.list = list;
    }

    public apply (): TeammateDeathList {
        _.each(this.list, (element: ITeammateDeath) => {
            element.teammate.die(element.death_stage_id, element.death_cause);
        });
        return this;
    }

    public getAll (): ITeammateDeath[] {
        return this.list;
    }

    public find (teammate: Teammate): ITeammateDeath {
        return _.find(this.list, (death: ITeammateDeath): boolean => {
            return death.teammate.henchman.id === teammate.henchman.id;
        });
    }

    public add (death: ITeammateDeath): TeammateDeathList {
        this.list.push(death);
        return this;
    }
}
