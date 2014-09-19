module App {
    export module ME2 {
        export module Stages {
            export interface ISquadmatesState extends IStage {
                squadmate_1: App.ME2.Teammate;
                squadmate_2: App.ME2.Teammate;
            }

            export class SquadmatesStage extends Stage implements ISquadmatesState {
                public squadmate_1: App.ME2.Teammate;
                public squadmate_2: App.ME2.Teammate;

                constructor () {
                    super();
                }

                public isEvaluatable (): boolean {
                    return !!this.squadmate_1 && !!this.squadmate_2;
                }
            }
        }
    }
}