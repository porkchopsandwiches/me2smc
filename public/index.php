<?php

$config = require("../config/config.php");


?><!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<title>ME2 SMC</title>
		<link rel="stylesheet" href="../cdn/stylesheets/app-1.0.0.min.css" />
	</head>
	<body>
		<div id="app">
			<!-- ko with: stager.ui.stage -->
				<h2 data-bind="text: ui.label"></h2>
				<!-- ko if: ui.id == "Setup" -->
					<table class="table">
						<thead>
							<tr>
								<th>Teammate</th>
								<th>Is Recruited</th>
								<th>Is Loyal</th>
								<th>Is Dead</th>
							</tr>
						</thead>
						<tbody>
							<!-- ko foreach: ui.teammates -->
								<tr>
									<td data-bind="text: teammate.henchman.name"></td>
									<td>
										<input type="checkbox" data-bind="checked: is_recruited" />
									</td>
									<td>
										<input type="checkbox" data-bind="checked: is_loyal" />
									</td>
									<td>
										<input type="checkbox" data-bind="checked: is_dead" />
									</td>
								</tr>
							<!-- /ko -->
						</tbody>
					</table>
					<h3>Normandy</h3>
					<div>
						<label>Has Armour</label>
						<input type="checkbox" data-bind="checked: ui.normandy.has_armour" />
					</div>
					<div>
						<label>Has Shielding</label>
						<input type="checkbox" data-bind="checked: ui.normandy.has_shielding" />
					</div>
					<div>
						<label>Has Thanix Cannon</label>
						<input type="checkbox" data-bind="checked: ui.normandy.has_thanix_cannon" />
					</div>
				<!-- /ko -->

				<!-- ko if: ui.id == "Occulus" -->
					<div>
						<label>Squadmate #1</label>
						<select data-bind="options: ui.occulus_squadmate_1_candidates, optionsText: ui.renderTeammateForSelect, value: ui.occulus_squadmate_1"></select>
					</div>
					<div>
						<label>Squadmate #2</label>
						<select data-bind="options: ui.occulus_squadmate_2_candidates, optionsText: ui.renderTeammateForSelect, value: ui.occulus_squadmate_2"></select>
					</div>
				<!-- /ko -->

				<!-- ko if: ui.id == "Vents" -->
					<div>
						<label>Venter</label>
						<select data-bind="options: ui.vent_venter_candidates, optionsText: ui.renderTeammateForSelect, value: ui.vent_venter"></select>
					</div>
					<div>
						<label>Leader</label>
						<select data-bind="options: ui.vent_leader_candidates, optionsText: ui.renderTeammateForSelect, value: ui.vent_leader"></select>
					</div>
					<div>
						<label>Squadmate #1</label>
						<select data-bind="options: ui.vent_squadmate_1_candidates, optionsText: ui.renderTeammateForSelect, value: ui.vent_squadmate_1"></select>
					</div>
					<div>
						<label>Squadmate #2</label>
						<select data-bind="options: ui.vent_squadmate_2_candidates, optionsText: ui.renderTeammateForSelect, value: ui.vent_squadmate_2"></select>
					</div>
				<!-- /ko -->

				<!-- ko if: ui.id == "LongWalk" -->
					<div>
						<label>Escort</label>
						<select data-bind="options: ui.long_walk_escort_candidates, optionsText: ui.renderTeammateForSelect, value: ui.long_walk_escort"></select>
					</div>
					<div>
						<label>Bubbler</label>
						<select data-bind="options: ui.long_walk_bubbler_candidates, optionsText: ui.renderTeammateForSelect, value: ui.long_walk_bubbler"></select>
					</div>
					<div>
						<label>Leader</label>
						<select data-bind="options: ui.long_walk_leader_candidates, optionsText: ui.renderTeammateForSelect, value: ui.long_walk_leader"></select>
					</div>
					<div>
						<label>Squadmate #1</label>
						<select data-bind="options: ui.long_walk_squadmate_1_candidates, optionsText: ui.renderTeammateForSelect, value: ui.long_walk_squadmate_1"></select>
					</div>
					<div>
						<label>Squadmate #2</label>
						<select data-bind="options: ui.long_walk_squadmate_2_candidates, optionsText: ui.renderTeammateForSelect, value: ui.long_walk_squadmate_2"></select>
					</div>
				<!-- /ko -->

				<!-- ko if: ui.id == "Boss" -->
					<div>
						<label>Squadmate #1</label>
						<select data-bind="options: ui.boss_squadmate_1_candidates, optionsText: ui.renderTeammateForSelect, value: ui.boss_squadmate_1"></select>
					</div>
					<div>
						<label>Squadmate #2</label>
						<select data-bind="options: ui.boss_squadmate_2_candidates, optionsText: ui.renderTeammateForSelect, value: ui.boss_squadmate_2"></select>
					</div>
				<!-- /ko -->

				<button data-bind="click: function () { $root.stager.nextStage() }">Next</button>
			<!-- /ko -->
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