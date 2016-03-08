/* tslint:disable:no-require-imports */

import { name as Modal } from "./Knockout/Bindings/Modal";
import { name as ForcibleComputed } from "./Knockout/ForcibleComputed";
import { name as PickTeammate } from "./Knockout/Components/PickTeammate";
import { name as TeammateList } from "./Knockout/Components/TeammateList";
import { name as RoleToggle } from "./Knockout/Components/RoleToggle";
import { name as RoleStatic } from "./Knockout/Components/RoleStatic";
import { name as DeathRoleStatic } from "./Knockout/Components/DeathRoleStatic";
import { name as ObservableToggle } from "./Knockout/Components/ObservableToggle";
import { name as TeammateName } from "./Knockout/Components/TeammateName";
import { Application } from "./App/Application";
import { StageIDs, TeammateRoles } from "./App/constants";
import * as Constants from "./App/constants";
import { Role } from "./App/ME2/Logic";

// Load the CSS
require("../scss/app.scss");

void([
    Modal,
    ForcibleComputed,
    PickTeammate,
    TeammateList,
    RoleToggle,
    RoleStatic,
    DeathRoleStatic,
    ObservableToggle,
    TeammateName,
    Constants
].join(","));

_.extend(window, {
    Application,
    Role,
    Constants: {
        StageIDs,
        TeammateRoles
    }
});
