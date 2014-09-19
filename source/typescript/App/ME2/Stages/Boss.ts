///<reference path="../../../references.ts" />
module App {
    export module ME2 {
        export module Stages {
            export interface IBoss {
            }

            export class Boss extends SquadmatesStage implements IBoss {
                public ui: App.ME2.Stages.UI.Boss;

                constructor () {
                    super();
                    this.ui = new App.ME2.Stages.UI.Boss(this);
                }
            }
        }
    }
}