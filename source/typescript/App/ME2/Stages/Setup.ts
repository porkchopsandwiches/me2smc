import { Stage } from "./Stage";
import { Stager } from "./Stager";
import { StageIDs } from "../../constants";
import { Teammate } from "../Teammate";
import { Teammates } from "../Teammates";
import { TeammateDeathList } from "../TeammateDeathList";

export interface ISetup {
    all_recruited: KnockoutComputed<boolean>;
    all_loyal: KnockoutComputed<boolean>;
    is_evaluatable: KnockoutComputed<boolean>;
}

export class Setup extends Stage implements ISetup {
    public id: StageIDs = StageIDs.Setup;
    public label: string = "Set up";
    public all_recruited: KnockoutComputed<boolean>;
    public all_loyal: KnockoutComputed<boolean>;
    public is_evaluatable: KnockoutComputed<boolean>;

    constructor (stager: Stager) {
        super(stager);

        this.all_recruited = ko.pureComputed({
            read: (): boolean => {
                return !this.getTeammates().find((teammate: Teammate): boolean => {
                    return !teammate.is_recruited();
                });
            },
            write: (all_recruited: boolean): void => {
                this.getTeammates().each((teammate: Teammate) => {
                    if (all_recruited || !teammate.henchman.is_essential) {
                        teammate.is_recruited(all_recruited);
                    }
                });
            },
            owner: this
        });

        this.all_loyal = ko.pureComputed({
            read: (): boolean => {
                return !this.getTeammates().find((teammate: Teammate) => {
                    return !teammate.is_loyal();
                });
            },
            write: (all_loyal: boolean): void => {
                if (all_loyal) {
                    this.getTeammates().each((teammate: Teammate) => {
                        teammate.is_recruited(true);
                        teammate.is_loyal(true);
                    });
                } else {
                    this.getTeammates().each((teammate: Teammate) => {
                        teammate.is_loyal(false);
                    });
                }
            },
            owner: this
        });

        this.is_evaluatable = ko.pureComputed<boolean>((): boolean => {
            const is_evaluatable = _.filter(this.getTeammates().value(), (teammate: Teammate): boolean => {
                return teammate.is_recruited();
            }).length >= 8;

            return is_evaluatable;
        });
    }

    public evaluate (): TeammateDeathList {
        return new TeammateDeathList();
    }

    private getTeammates (): Teammates {
        return this.stager.app.state.teammates();
    }
}
