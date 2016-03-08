import { Logic } from "./ME2/Logic";
import { UI } from "./ME2/UI";

export class Application {
    public logic: Logic;
    public ui: UI;

    constructor () {
        this.logic = new Logic(this);
        this.ui = new UI(this);
    }
}
