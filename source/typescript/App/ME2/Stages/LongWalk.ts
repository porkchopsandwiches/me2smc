module App {
    export module ME2 {
        export module Stages {
            export interface ILongWalk {
                bubbler: App.ME2.Teammate;
                leader: App.ME2.Teammate;
            }

            export class LongWalk extends SquadmatesStage implements ILongWalk {
                public ui: App.ME2.Stages.UI.LongWalk;
                public bubbler: App.ME2.Teammate;
                public leader: App.ME2.Teammate;

                constructor () {
                    super();
                    this.ui = new App.ME2.Stages.UI.LongWalk(this);
                }
            }
        }
    }
}