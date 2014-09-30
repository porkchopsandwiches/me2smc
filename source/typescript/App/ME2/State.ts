///<reference path="../../references.ts" />
module App {
    export module ME2 {
        export interface IState {
            teammates: App.ME2.Teammates;
            normandy: App.ME2.Normandy;
            stage_id: App.ME2.Stages.StageIDs;
            app: App.Application;
        }

        export class State implements IState {
            public teammates: App.ME2.Teammates;
            public normandy: App.ME2.Normandy;
            public stage_id: App.ME2.Stages.StageIDs;
            public app: App.Application;

            constructor (app: App.Application) {
                this.app = app;
                this.normandy = new App.ME2.Normandy(true, true, true);
                this.bootstrapTeammates();
            }

            private bootstrapTeammates (): void {
                this.teammates = new App.ME2.Teammates(_.chain<App.ME2.Henchman>(this.app.getHenchmen()).map<App.ME2.Teammate>((henchman: App.ME2.Henchman): App.ME2.Teammate => {
                    return new App.ME2.Teammate(henchman, henchman.is_essential, false, false);
                }).sortBy((teammate: App.ME2.Teammate) => {
                    return teammate.henchman.name;
                }).value());
            }
        }
    }
}