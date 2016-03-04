import { Application } from "../../Application";
import { StageIDs } from "../../constants";
import { Stage } from "./Stage";
import { ISerialisationSerialised } from "../Serialisation";
import { Setup } from "./Setup";
import { Occulus } from "./Occulus";
import { Vents } from "./Vents";
import { LongWalk } from "./LongWalk";
import { Boss } from "./Boss";
import { Summary } from "./Summary";

export interface IStager {
    app: Application;
}

export class Stager implements IStager {
    public app: Application;
    public can_go_back: KnockoutObservable<boolean>;
    private stages: Stage[];
    private freezes: ISerialisationSerialised[];
    private initial_freeze: ISerialisationSerialised;

    constructor (app: Application) {
        this.app = app;
        this.freezes = [];

        this.stages = _.sortBy<Stage, StageIDs>([
            new Setup(this),
            new Occulus(this),
            new Vents(this),
            new LongWalk(this),
            new Boss(this),
            new Summary(this)
        ], (stage: Stage): StageIDs => {
            return stage.id;
        });

        this.app.state.stage.subscribe((stage: Stage) => {
            stage.setup();
        });

        this.can_go_back = ko.observable<boolean>(false);

        // Apply the first stage
        this.app.state.stage(this.getStage(0));

        // Freeze an initial state for resetting
        this.initial_freeze = this.app.state.serialise();
    }

    public getStage (id: StageIDs): Stage {
        return this.stages[id];
    }

    public reset () {
        this.app.state.applySerialisedState(this.initial_freeze);
    }

    public back () {
        if (this.can_go_back()) {
            this.app.state.applySerialisedState(this.freezes.pop());
            this.can_go_back(!!this.freezes.length);
        }
    }

    public next () {
        const current_stage = this.app.state.stage();

        if (current_stage.isEvaluatable()) {

            // Freeze the current state
            this.freeze();

            current_stage.evaluateAndApply();

            if (current_stage.id < this.stages.length - 1) {
                this.app.state.stage(this.getStage(current_stage.id + 1));
            }
        }
    }

    private freeze () {
        this.freezes.push(this.app.state.serialise());
        this.can_go_back(true);
    }
}
