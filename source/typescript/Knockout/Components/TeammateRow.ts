import { Teammate } from "../../App/ME2/Logic";
import { Logic } from "../../App/ME2/Logic";

export const name: string = "teammate-row";

interface IParams {
    teammate: Teammate;
    logic: Logic;
    modal_target: KnockoutObservable<Teammate>;
}

void(((): void => {
    ko.components.register(name, {
        viewModel: function (params: IParams): void {
            _.extend(this, params);
        },
        template: `
        <tr data-bind="css: {'text-muted': !teammate.is_recruited() }">
            <td>
                <a href="#view-profile" data-bind="click: function () { modal_target(teammate); }">
                    <span data-bind="text: teammate.name"></span>
                </a>
            </td>
            <td>
                <!-- ko component: { name: 'observable-toggle', params: {
                    observable: teammate.is_recruited,
                    icon: "ok",
                    supertext: ""
                } } --><!-- /ko -->
            </td>
            <td>
                <span data-bind="if: teammate.is_recruited">
                <!-- ko component: { name: 'observable-toggle', params: {
                    observable: teammate.is_loyal,
                    icon: "heart",
                    supertext: ""
                } } --><!-- /ko -->
                </span>
            </td>
            <td>
                <span data-bind="if: teammate.is_loyal">
                <!-- ko component: { name: 'observable-toggle', params: {
                    observable: teammate.is_upgraded,
                    icon: "circle-arrow-up",
                    supertext: ""
                } } --><!-- /ko -->
                </span>
            </td>
            <td>
                <!-- ko component: { name: 'role-toggle', params: {
                    teammate: teammate,
                    observable: logic.approach_squadmate_1,
                    pool: logic.approach_squadmate_pool_1,
                    role: Role.ApproachSquadmate1,
                    icon: "user",
                    supertext: "1"
                } } --><!-- /ko -->
                <!-- ko component: { name: 'role-toggle', params: {
                    teammate: teammate,
                    observable: logic.approach_squadmate_2,
                    pool: logic.approach_squadmate_pool_2,
                    role: Role.ApproachSquadmate2,
                    icon: "user",
                    supertext: "2"
                } } --><!-- /ko -->
            </td>
            <td>
                <!-- ko component: { name: 'role-toggle', params: {
                    teammate: teammate,
                    observable: logic.vents_specialist,
                    pool: logic.vents_specialist_pool,
                    role: Role.VentsSpecialist,
                    icon: "star",
                    supertext: ""
                } } --><!-- /ko -->
                <!-- ko component: { name: 'role-toggle', params: {
                    teammate: teammate,
                    observable: logic.vents_fireteam_leader,
                    pool: logic.vents_fireteam_leader_pool,
                    role: Role.VentsFireteamLeader,
                    icon: "fire",
                    supertext: ""
                } } --><!-- /ko -->
                <!-- ko component: { name: 'role-toggle', params: {
                    teammate: teammate,
                    observable: logic.vents_squadmate_1,
                    pool: logic.vents_squadmate_pool_1,
                    role: Role.VentsSquadmate1,
                    icon: "user",
                    supertext: "1"
                } } --><!-- /ko -->
                <!-- ko component: { name: 'role-toggle', params: {
                    teammate: teammate,
                    observable: logic.vents_squadmate_2,
                    pool: logic.vents_squadmate_pool_2,
                    role: Role.VentsSquadmate2,
                    icon: "user",
                    supertext: "2"
                } } --><!-- /ko -->
            </td>
            <td>
                <!-- ko component: { name: 'role-toggle', params: {
                    teammate: teammate,
                    observable: logic.long_walk_specialist,
                    pool: logic.long_walk_specialist_pool,
                    role: Role.LongWalkSpecialist,
                    icon: "star",
                    supertext: ""
                } } --><!-- /ko -->
                <!-- ko component: { name: 'role-toggle', params: {
                    teammate: teammate,
                    observable: logic.long_walk_fireteam_leader,
                    pool: logic.long_walk_fireteam_leader_pool,
                    role: Role.LongWalkFireteamLeader,
                    icon: "fire",
                    supertext: ""
                } } --><!-- /ko -->
                <!-- ko component: { name: 'role-toggle', params: {
                    teammate: teammate,
                    observable: logic.long_walk_escort,
                    pool: logic.long_walk_escort_pool,
                    role: Role.LongWalkEscort,
                    icon: "heart-empty",
                    supertext: ""
                } } --><!-- /ko -->
                <!-- ko component: { name: 'role-toggle', params: {
                    teammate: teammate,
                    observable: logic.long_walk_squadmate_1,
                    pool: logic.long_walk_squadmate_pool_1,
                    role: Role.LongWalkSquadmate1,
                    icon: "user",
                    supertext: "1"
                } } --><!-- /ko -->
                <!-- ko component: { name: 'role-toggle', params: {
                    teammate: teammate,
                    observable: logic.long_walk_squadmate_2,
                    pool: logic.long_walk_squadmate_pool_2,
                    role: Role.LongWalkSquadmate2,
                    icon: "user",
                    supertext: "2"
                } } --><!-- /ko -->
            </td>
            <td>
                <!-- ko component: { name: 'role-toggle', params: {
                    teammate: teammate,
                    observable: logic.boss_squadmate_1,
                    pool: logic.boss_squadmate_pool_1,
                    role: Role.BossSquadmate1,
                    icon: "user",
                    supertext: "1"
                } } --><!-- /ko -->
                <!-- ko component: { name: 'role-toggle', params: {
                    teammate: teammate,
                    observable: logic.boss_squadmate_2,
                    pool: logic.boss_squadmate_pool_2,
                    role: Role.BossSquadmate2,
                    icon: "user",
                    supertext: "2"
                } } --><!-- /ko -->
                <!-- ko component: { name: 'role-static', params: {
                    teammate: teammate,
                    role: Role.BossHoldingTheLine,
                    supertext: "",
                    icon: "flash"
                } } --><!-- /ko -->
            </td>
            <td>
                <span data-bind="
                    if: teammate.survives
                    ">
                    <span class="glyphicon glyphicon-ok-circle text-success"></span>
                </span>
                <!-- ko component: { name: 'death-role-static', params: {
                    teammate: teammate,
                    role: Role.ApproachShieldsDeath,
                    supertext: "Shield"
                } } --><!-- /ko -->
                <!-- ko component: { name: 'death-role-static', params: {
                    teammate: teammate,
                    role: Role.ApproachArmorDeath,
                    supertext: "Armour"
                } } --><!-- /ko -->
                <!-- ko component: { name: 'death-role-static', params: {
                    teammate: teammate,
                    role: Role.ApproachWeaponDeath,
                    supertext: "Weapon"
                } } --><!-- /ko -->
                <!-- ko component: { name: 'death-role-static', params: {
                    teammate: teammate,
                    role: Role.VentsDeath,
                    supertext: "Vents"
                } } --><!-- /ko -->
                <!-- ko component: { name: 'death-role-static', params: {
                    teammate: teammate,
                    role: Role.LongWalkSquadmateDeath,
                    supertext: "LW Squadmate"
                } } --><!-- /ko -->
                <!-- ko component: { name: 'death-role-static', params: {
                    teammate: teammate,
                    role: Role.LongWalkFireteamLeaderDeath,
                    supertext: "LW Leader"
                } } --><!-- /ko -->
                <!-- ko component: { name: 'death-role-static', params: {
                    teammate: teammate,
                    role: Role.LongWalkEscortDeath,
                    supertext: "Escort"
                } } --><!-- /ko -->
                <!-- ko component: { name: 'death-role-static', params: {
                    teammate: teammate,
                    role: Role.BossSquadmateDeath,
                    supertext: "Boss Squadmate"
                } } --><!-- /ko -->
                <!-- ko component: { name: 'death-role-static', params: {
                    teammate: teammate,
                    role: Role.BossHoldingTheLineDeath,
                    supertext: "HTL"
                } } --><!-- /ko -->
            </td>
        </tr>
        `
    });
})());
