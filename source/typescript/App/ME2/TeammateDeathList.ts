///<reference path="../../references.ts" />
module App {
    export module ME2 {

        export interface ITeammateDeath {
            teammate: App.ME2.Teammate;
            death_cause: App.ME2.TeammateDeathCauses;
            death_stage_id: App.ME2.Stages.StageIDs;
        }

        export interface ITeammateDeathList {
            apply (): ITeammateDeathList;
            getAll (): ITeammateDeath[];
            find (teammate: App.ME2.Teammate): ITeammateDeath;
            add (ITeammateDeath): ITeammateDeathList;
        }

        export class TeammateDeathList implements ITeammateDeathList {
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

            public find (teammate: App.ME2.Teammate): ITeammateDeath {
                return _.find(this.list, (death: ITeammateDeath): boolean => {
                    return death.teammate.henchman.id === teammate.henchman.id;
                });
            }

            public add (death: ITeammateDeath): ITeammateDeathList {
                this.list.push(death);
                return this;
            }
        }
    }
}