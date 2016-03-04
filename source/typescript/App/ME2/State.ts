import { ISerialisationSerialised } from "./Serialisation";
import { Normandy } from "./Normandy";
import { Application } from "../Application";
import { Henchman } from "./Henchman";
import { Teammates } from "./Teammates";
import { Teammate } from "./Teammate";
import { Stage } from "./Stages/Stage";

export class State {
    public teammates: KnockoutObservable<Teammates>;
    public normandy: Normandy;
    public stage: KnockoutObservable<Stage>;
    public app: Application;
    public serialised: KnockoutForcibleComputed<ISerialisationSerialised>;
    private _teammates: Teammates;

    constructor (app: Application) {
        this.app = app;
        this.normandy = new Normandy(true, true, true);
        this.stage = ko.observable(undefined);
        this.bootstrapTeammates();

        this.serialised = ko.forcibleComputed<ISerialisationSerialised>(() => {
            if (this.stage()) {
                return this.serialise();
            } else {
                return "";
            }
        });
    }

    public serialise (): ISerialisationSerialised {
        return this.app.serialisation.serialise(this);
    }

    public applySerialisedState (serialised: ISerialisationSerialised): void {
        this.app.serialisation.applySerialisedState(this, serialised);
    }

    private bootstrapTeammates (): void {
        this._teammates = new Teammates(_.chain<Henchman>(this.app.getHenchmen()).map<Teammate>((henchman: Henchman): Teammate => {
            return new Teammate(henchman, henchman.is_essential, false, false);
        }).sortBy((teammate: Teammate) => {
            return teammate.henchman.name;
        }).value());

        this.teammates = ko.observable<Teammates>(this._teammates);
    }
}
