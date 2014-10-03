///<reference path="../../references.ts" />
module App {
    export module ME2 {
        export interface IState {
            teammates: KnockoutObservable<App.ME2.Teammates>;
            normandy: App.ME2.Normandy;
            //stage_id: App.ME2.Stages.StageIDs;
            stage: KnockoutObservable<App.ME2.Stages.IStage>;
            app: App.Application;
            serialised: KnockoutForcibleComputed<App.ME2.ISerialisationSerialised>;
        }

        export class State implements IState {
            private _teammates: App.ME2.Teammates;
            public teammates: KnockoutObservable<App.ME2.Teammates>;
            public normandy: App.ME2.Normandy;
            //public stage_id: App.ME2.Stages.StageIDs;
            public stage: KnockoutObservable<App.ME2.Stages.IStage>;
            public app: App.Application;
            public serialised: KnockoutForcibleComputed<App.ME2.ISerialisationSerialised>;

            constructor (app: App.Application) {
                this.app = app;
                this.normandy = new App.ME2.Normandy(true, true, true);
                this.stage = ko.observable(undefined);
                this.bootstrapTeammates();

                this.serialised = ko.forcibleComputed<App.ME2.ISerialisationSerialised>(() => {
                    if (this.stage()) {
                        return this.serialise();
                    } else {
                        return "";
                    }
                });
            }

            private bootstrapTeammates (): void {
                this._teammates = new App.ME2.Teammates(_.chain<App.ME2.Henchman>(this.app.getHenchmen()).map<App.ME2.Teammate>((henchman: App.ME2.Henchman): App.ME2.Teammate => {
                    return new App.ME2.Teammate(henchman, henchman.is_essential, false, false);
                }).sortBy((teammate: App.ME2.Teammate) => {
                    return teammate.henchman.name;
                }).value());

                this.teammates = ko.observable<App.ME2.Teammates>(this._teammates);
            }

            public serialise (): App.ME2.ISerialisationSerialised {
                return this.app.serialisation.serialise(this);
            }

            public applySerialisedState (serialised: App.ME2.ISerialisationSerialised): void {
                this.app.serialisation.applySerialisedState(this, serialised);
            }
        }
    }
}