<?php

$config = require("../config/config.php");


?><!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<title>ME2 SMC</title>
		<link rel="stylesheet" href="../cdn/stylesheets/app-1.0.0.min.css" />
	</head>
	<body>
		<div id="app" class="container">
			<!-- ko with: stager.ui.stage -->
				<h2 data-bind="text: ui.label"></h2>
				<!-- ko if: ui.id === App.ME2.Stages.UI.StageIDs.Setup -->
					<h3>Teammates</h3>
					<table class="table table-striped setup-table">
						<thead>
							<tr>
								<th>Teammate</th>
								<th><label><input type="checkbox" data-bind="checked: ui.all_recruited" /> Is Recruited</label></th>
								<th><label><input type="checkbox" data-bind="checked: ui.all_loyal" /> Is Loyal</label></th>
							</tr>
						</thead>
						<tbody>
							<!-- ko foreach: ui.teammates -->
								<tr>
									<td data-bind="text: teammate.henchman.name"></td>
									<td>
										<label>
											<input type="checkbox" data-bind="attr: recruited_attributes, checked: is_recruited" />
										</label>
									</td>
									<td>
										<label>
											<input type="checkbox" data-bind="attr: loyal_attributes, checked: is_loyal" />
										</label>
									</td>
								</tr>
							<!-- /ko -->
						</tbody>
					</table>
					<h3>Normandy</h3>
					<form role="form">
						<div class="row">
							<div class="col-md-4">
								<div class="checkbox">
									<label><input type="checkbox" data-bind="checked: ui.normandy.has_armour" /> Has Armour upgrade?</label>
								</div>
							</div>
							<div class="col-md-4">
								<div class="checkbox">
									<label><input type="checkbox" data-bind="checked: ui.normandy.has_shielding" /> Has Shielding upgrade?</label>
								</div>
							</div>
							<div class="col-md-4">
								<div class="checkbox">
									<label><input type="checkbox" data-bind="checked: ui.normandy.has_thanix_cannon" /> Has Thanix Cannon?</label>
								</div>
							</div>
						</div>
					</form>
				<!-- /ko -->
				<!-- ko if: ui.id === App.ME2.Stages.UI.StageIDs.Occulus -->
					<form role="form">
						<div class="row">
							<div class="col-md-6">
								<div class="form-group">
									<label>Squadmate #1</label>
									<select class="form-control" data-bind="options: ui.occulus_squadmate_1_candidates, optionsText: $root.renderTeammateName, value: ui.occulus_squadmate_1"></select>
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
									<label>Squadmate #2</label>
									<select class="form-control" data-bind="options: ui.occulus_squadmate_2_candidates, optionsText: $root.renderTeammateName, value: ui.occulus_squadmate_2"></select>
								</div>
							</div>
						</div>
					</form>
				<!-- /ko -->
				<!-- ko if: ui.id === App.ME2.Stages.UI.StageIDs.Vents -->
					<form role="form">
						<div class="row">
							<div class="col-md-6">
								<div class="form-group">
									<label>Venter</label>
									<select class="form-control" data-bind="options: ui.vent_venter_candidates, optionsText: $root.renderTeammateName, value: ui.vent_venter"></select>
								</div>
								<div class="form-group">
									<label>Leader</label>
									<select class="form-control" data-bind="options: ui.vent_leader_candidates, optionsText: $root.renderTeammateName, value: ui.vent_leader"></select>
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
									<label>Squadmate #1</label>
									<select class="form-control" data-bind="options: ui.vent_squadmate_1_candidates, optionsText: $root.renderTeammateName, value: ui.vent_squadmate_1"></select>
								</div>
								<div class="form-group">
									<label>Squadmate #2</label>
									<select class="form-control" data-bind="options: ui.vent_squadmate_2_candidates, optionsText: $root.renderTeammateName, value: ui.vent_squadmate_2"></select>
								</div>
							</div>
						</div>
					</form>
				<!-- /ko -->
				<!-- ko if: ui.id === App.ME2.Stages.UI.StageIDs.Vents -->
					<form role="form">
						<div class="row">
							<div class="col-md-6">
								<div class="form-group">
									<label>Bubbler</label>
									<select class="form-control" data-bind="options: ui.long_walk_bubbler_candidates, optionsText: $root.renderTeammateName, value: ui.long_walk_bubbler"></select>
								</div>
								<div class="form-group">
									<label>Leader</label>
									<select class="form-control" data-bind="options: ui.long_walk_leader_candidates, optionsText: $root.renderTeammateName, value: ui.long_walk_leader"></select>
								</div>
								<div class="form-group">
									<label>Escort</label>
									<select class="form-control" data-bind="options: ui.long_walk_escort_candidates, optionsText: $root.renderTeammateName, value: ui.long_walk_escort"></select>
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
									<label>Squadmate #1</label>
									<select class="form-control" data-bind="options: ui.long_walk_squadmate_1_candidates, optionsText: $root.renderTeammateName, value: ui.long_walk_squadmate_1"></select>
								</div>
								<div class="form-group">
									<label>Squadmate #2</label>
									<select class="form-control" data-bind="options: ui.long_walk_squadmate_2_candidates, optionsText: $root.renderTeammateName, value: ui.long_walk_squadmate_2"></select>
								</div>
							</div>
						</div>
					</form>
				<!-- /ko -->
				<!-- ko if: ui.id == App.ME2.Stages.UI.StageIDs.Boss -->
					<form role="form">
						<div class="row">
							<div class="col-md-6">
								<div class="form-group">
									<label>Squadmate #1</label>
									<select class="form-control" data-bind="options: ui.boss_squadmate_1_candidates, optionsText: $root.renderTeammateName, value: ui.boss_squadmate_1"></select>
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
									<label>Squadmate #2</label>
									<select class="form-control" data-bind="options: ui.boss_squadmate_2_candidates, optionsText: $root.renderTeammateName, value: ui.boss_squadmate_2"></select>
								</div>
							</div>
						</div>
					</form>
				<!-- /ko -->
				<!-- ko if: ui.id === App.ME2.Stages.UI.StageIDs.Summary -->
					<form role="form">
						<div class="row">
							<div class="col-md-6">
								<div class="form-group">
									<label>Reports on defence?</label>
									<p class="form-control-static" data-bind="text: $root.renderTeammateName(ui.defence_reporter())"></p>
								</div>
								<div class="form-group">
									<label>Advocates keeping the base</label>
									<p class="form-control-static" data-bind="text: $root.renderTeammateName(ui.keep_base_advocate())"></p>
								</div>
								<div class="form-group">
									<label>Advocates destroying the base</label>
									<p class="form-control-static" data-bind="text: $root.renderTeammateName(ui.destroy_base_advocate())"></p>
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
									<label>Shepard lives?</label>
									<p class="form-control-static" data-bind="text: $root.formatYesNo(ui.shepard_lives)"></p>
								</div>
								<div class="form-group">
									<label>Shepard pulled up by</label>
									<p class="form-control-static" data-bind="text: $root.renderTeammateName(ui.shepard_pulled_up_by())"></p>
								</div>
							</div>
						</div>
					</form>
				<!-- /ko -->
			<!-- /ko -->

			<!-- ko if: stager.ui.stage().ui.id !== App.ME2.Stages.UI.StageIDs.Setup -->
				<table class="table table-striped summary-table">
					<thead>
						<tr>
							<th>Teammates</th>
							<th>Death</th>
							<th>Occulus</th>
							<th>Vents</th>
							<th>Long Walk</th>
							<th>Boss</th>
						</tr>
					</thead>
					<tbody>
						<!-- ko foreach: stager.ui.teammates -->
							<tr data-bind="attr: { class: (is_dead ? 'danger' : '') }">
								<td><span data-bind="text: henchman.name"></span> <!-- ko if: is_loyal --><span class="glyphicon glyphicon-heart"></span><!-- /ko --></td>
								<td>
									<!-- ko if: is_dead -->
										<span data-bind="text: $root.formatTeammateDeathCause(death_cause)"></span>
									<!-- /ko -->
								</td>
								<td>
									<!-- ko if: hasRole(App.ME2.TeammateRoles.OcculusSquadmate) -->
										<span class="glyphicon glyphicon-user"></span>
									<!-- /ko -->
								</td>
								<td>
									<!-- ko if: hasRole(App.ME2.TeammateRoles.VentsSquadmate) -->
										<span class="glyphicon glyphicon-user"></span>
									<!-- /ko -->
									<!-- ko if: hasRole(App.ME2.TeammateRoles.VentsVenter) -->
										<span class="glyphicon glyphicon-star"></span>
									<!-- /ko -->
									<!-- ko if: hasRole(App.ME2.TeammateRoles.VentsLeader) -->
										<span class="glyphicon glyphicon-fire"></span>
									<!-- /ko -->
								</td>
								<td>
									<!-- ko if: hasRole(App.ME2.TeammateRoles.LongWalkSquadmate) -->
										<span class="glyphicon glyphicon-user"></span>
									<!-- /ko -->
									<!-- ko if: hasRole(App.ME2.TeammateRoles.LongWalkBubbler) -->
										<span class="glyphicon glyphicon-star"></span>
									<!-- /ko -->
									<!-- ko if: hasRole(App.ME2.TeammateRoles.LongWalkLeader) -->
										<span class="glyphicon glyphicon-fire"></span>
									<!-- /ko -->
									<!-- ko if: hasRole(App.ME2.TeammateRoles.LongWalkEscort) -->
										<span class="glyphicon glyphicon-heart-empty"></span>
									<!-- /ko -->
								</td>
								<td>
									<!-- ko if: hasRole(App.ME2.TeammateRoles.BossSquadmate) -->
										<span class="glyphicon glyphicon-user"></span>
									<!-- /ko -->
								</td>
							</tr>
						<!-- /ko -->
					</tbody>
				</table>
			<!-- /ko -->

			<!-- ko with: stager.ui.stage -->
				<button class="btn btn-primary" data-bind="enable: ui.is_evaluatable, click: function () { $root.stager.nextStage() }">Next</button>
			<!-- /ko -->
		</div>

		<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
		<script src="//cdnjs.cloudflare.com/ajax/libs/knockout/3.2.0/knockout-min.js"></script>
		<script src="//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.compat.js"></script>
		<script src="../cdn/javascript/app-1.0.0.js"></script>
		<script>
			$(function () {

				var app = new App.Application();

				// Initialise Knockout
				ko.applyBindings(app);

				// Debugging
				window.app = app;
			});
		</script>
	</body>
</html>