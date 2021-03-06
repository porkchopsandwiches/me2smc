/* tslint:disable:no-require-imports */

import { name as Modal } from "./Knockout/Bindings/Modal";
import { name as PickTeammate } from "./Knockout/Components/PickTeammate";
import { name as TeammateList } from "./Knockout/Components/TeammateList";
import { name as RoleToggle } from "./Knockout/Components/RoleToggle";
import { name as RoleStatic } from "./Knockout/Components/RoleStatic";
import { name as DeathRoleStatic } from "./Knockout/Components/DeathRoleStatic";
import { name as ObservableToggle } from "./Knockout/Components/ObservableToggle";
import { name as TeammateName } from "./Knockout/Components/TeammateName";
import { name as TeammateRow } from "./Knockout/Components/TeammateRow";
import { name as YesNo } from "./Knockout/Components/YesNo";
import { name as PriorityRank } from "./Knockout/Components/PriorityRank";
import { Application } from "./App/Application";
import { Role } from "./App/constants";

// Load the CSS
require("../scss/app.scss");

// Force Knockout modules to be rendered in the output JS, even if we don't use them in the TypeScript
void([
    Modal,
    PickTeammate,
    TeammateList,
    RoleToggle,
    RoleStatic,
    DeathRoleStatic,
    ObservableToggle,
    TeammateName,
    TeammateRow,
    YesNo,
    PriorityRank
].join(","));

// Make required TypeScript classes available to the HTML
_.extend(window, {
    Application,
    Role
});
