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
				<!-- ko if: ui.id == "Setup" -->
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
						<div class="checkbox">
							<label><input type="checkbox" data-bind="checked: ui.normandy.has_armour" /> Has Armour upgrade?</label>
						</div>
						<div class="checkbox">
							<label><input type="checkbox" data-bind="checked: ui.normandy.has_shielding" /> Has Shielding upgrade?</label>
						</div>
						<div class="checkbox">
							<label><input type="checkbox" data-bind="checked: ui.normandy.has_thanix_cannon" /> Has Thanix Cannon?</label>
						</div>
					</form>

				<!-- /ko -->

				<!-- ko if: ui.id == "Occulus" -->
					<form role="form">
						<div class="form-group">
							<label>Squadmate #1</label>
							<select class="form-control" data-bind="options: ui.occulus_squadmate_1_candidates, optionsText: ui.renderTeammateForSelect, value: ui.occulus_squadmate_1"></select>
						</div>
						<div class="form-group">
							<label>Squadmate #2</label>
							<select class="form-control" data-bind="options: ui.occulus_squadmate_2_candidates, optionsText: ui.renderTeammateForSelect, value: ui.occulus_squadmate_2"></select>
						</div>
					</form>
				<!-- /ko -->

				<!-- ko if: ui.id == "Vents" -->
					<form role="form">
						<div class="form-group">
							<label>Venter</label>
							<select class="form-control" data-bind="options: ui.vent_venter_candidates, optionsText: ui.renderTeammateForSelect, value: ui.vent_venter"></select>
						</div>
						<div class="form-group">
							<label>Leader</label>
							<select class="form-control" data-bind="options: ui.vent_leader_candidates, optionsText: ui.renderTeammateForSelect, value: ui.vent_leader"></select>
						</div>
						<div class="form-group">
							<label>Squadmate #1</label>
							<select class="form-control" data-bind="options: ui.vent_squadmate_1_candidates, optionsText: ui.renderTeammateForSelect, value: ui.vent_squadmate_1"></select>
						</div>
						<div class="form-group">
							<label>Squadmate #2</label>
							<select class="form-control" data-bind="options: ui.vent_squadmate_2_candidates, optionsText: ui.renderTeammateForSelect, value: ui.vent_squadmate_2"></select>
						</div>
					</form>
				<!-- /ko -->

				<!-- ko if: ui.id == "LongWalk" -->
					<form role="form">
						<div class="form-group">
							<label>Bubbler</label>
							<select class="form-control" data-bind="options: ui.long_walk_bubbler_candidates, optionsText: ui.renderTeammateForSelect, value: ui.long_walk_bubbler"></select>
						</div>
						<div class="form-group">
							<label>Leader</label>
							<select class="form-control" data-bind="options: ui.long_walk_leader_candidates, optionsText: ui.renderTeammateForSelect, value: ui.long_walk_leader"></select>
						</div>
						<div class="form-group">
							<label>Escort</label>
							<select class="form-control" data-bind="options: ui.long_walk_escort_candidates, optionsText: ui.renderTeammateForSelect, value: ui.long_walk_escort"></select>
						</div>
						<div class="form-group">
							<label>Squadmate #1</label>
							<select class="form-control" data-bind="options: ui.long_walk_squadmate_1_candidates, optionsText: ui.renderTeammateForSelect, value: ui.long_walk_squadmate_1"></select>
						</div>
						<div class="form-group">
							<label>Squadmate #2</label>
							<select class="form-control" data-bind="options: ui.long_walk_squadmate_2_candidates, optionsText: ui.renderTeammateForSelect, value: ui.long_walk_squadmate_2"></select>
						</div>
					</form>
				<!-- /ko -->

				<!-- ko if: ui.id == "Boss" -->
					<form role="form">
						<div class="form-group">
							<label>Squadmate #1</label>
							<select class="form-control" data-bind="options: ui.boss_squadmate_1_candidates, optionsText: ui.renderTeammateForSelect, value: ui.boss_squadmate_1"></select>
						</div>
						<div class="form-group">
							<label>Squadmate #2</label>
							<select class="form-control" data-bind="options: ui.boss_squadmate_2_candidates, optionsText: ui.renderTeammateForSelect, value: ui.boss_squadmate_2"></select>
						</div>
					</form>
				<!-- /ko -->

				<!-- ko if: ui.id == "Summary" -->
					<div>Shepard lives?: <span data-bind="text: ui.shepard_lives"></span></div>
				<!-- /ko -->


			<!-- /ko -->

			<!-- ko with: stager.ui.teammates -->
				<!-- ko if: $data.length > 0 -->
					<table class="table table-striped summary-table">
						<thead>
							<tr>
								<th>Teammates</th>
								<th>Is loyal?</th>
								<th>Died?</th>
								<th>Roles</th>
							</tr>
						</thead>
						<tbody>
							<!-- ko foreach: $data -->
								<tr>
									<td><span data-bind="text: henchman.name"></span></td>
									<td><span data-bind="text: $root.formatYesNo(is_loyal)"></span></td>
									<td>
										<!-- ko if: is_dead -->
											<span data-bind="text: $root.formatTeammateDeathCause(death_cause)"></span>
										<!-- /ko -->
									</td>
									<td>
										<ul class="roles">
											<!-- ko foreach: roles -->
												<li><span data-bind="text: $root.formatTeammateRole($data)"></span></li>
											<!-- /ko -->
										</ul>
									</td>
								</tr>
							<!-- /ko -->
						</tbody>
					</table>
				<!-- /ko -->
			<!-- /ko -->

			<button class="btn btn-primary" data-bind="click: function () { $root.stager.nextStage() }">Next</button>

		</div>

		<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
		<script src="//cdnjs.cloudflare.com/ajax/libs/knockout/3.2.0/knockout-min.js"></script>
		<script src="//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.compat.js"></script>
		<script src="//cdnjs.cloudflare.com/ajax/libs/async/0.9.0/async.js"></script>
		<script src="../source/vendor/finch/finch.min.js"></script>
		<script src="../source/vendor/rx/rx.all.js"></script>
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