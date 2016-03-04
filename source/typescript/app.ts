/* tslint:disable:no-require-imports */

import { name as Modal } from "./Knockout/Bindings/Modal";
import { name as ForcibleComputed } from "./Knockout/ForcibleComputed";
import { Application } from "./App/Application";
import { StageIDs, TeammateRoles } from "./App/constants";
import * as Constants from "./App/constants";

// Load the CSS
require("../scss/app.scss");

void([
    Modal,
    ForcibleComputed,
    Constants
].join(","));

_.extend(window, {
    Application,
    Constants: {
        StageIDs,
        TeammateRoles
    }
});
