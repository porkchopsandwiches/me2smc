<!DOCTYPE html>
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
									<td>
										<a href="#view-profile" data-bind="click: function () { $root.henchman(teammate.henchman) }, text: teammate.henchman.name"></a>
									</td>
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
							<div class="col-md-6">
								<div class="form-group">
									<label>Upgrades</label>
									<div class="checkbox">
										<label><input type="checkbox" data-bind="checked: ui.normandy.has_armour" /> Has Armour upgrade?</label>
									</div>
									<div class="checkbox">
										<label><input type="checkbox" data-bind="checked: ui.normandy.has_shielding" /> Has Shielding upgrade?</label>
									</div>
									<div class="checkbox">
										<label><input type="checkbox" data-bind="checked: ui.normandy.has_thanix_cannon" /> Has Thanix Cannon?</label>
									</div>
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
									<label>Mission Delay</label>
									<input class="form-control" type="number" min="0" max="20" data-bind="value: ui.normandy.delay" />
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
									<label for="occulus-squadmate-1">Squadmate #1</label>
									<select class="form-control" id="occulus-squadmate-1" data-bind="options: ui.occulus_squadmate_1_candidates, optionsText: App.Application.renderTeammateName, value: ui.occulus_squadmate_1"></select>
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
									<label for="occulus-squadmate-2">Squadmate #2</label>
									<select class="form-control" id="occulus-squadmate-2" data-bind="options: ui.occulus_squadmate_2_candidates, optionsText: App.Application.renderTeammateName, value: ui.occulus_squadmate_2"></select>
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
									<label for="vent-venter">Venter</label>
									<select class="form-control" id="vent-venter" data-bind="options: ui.vent_venter_candidates, optionsText: App.Application.renderTeammateNameVentVenter, value: ui.vent_venter"></select>
								</div>
								<div class="form-group">
									<label for="vent-leader">Leader</label>
									<select class="form-control" id="vent-leader" data-bind="options: ui.vent_leader_candidates, optionsText: App.Application.renderTeammateNameVentLeader, value: ui.vent_leader"></select>
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
									<label for="vent-squadmate-1">Squadmate #1</label>
									<select class="form-control" id="vent-squadmate-1" data-bind="options: ui.vent_squadmate_1_candidates, optionsText: App.Application.renderTeammateName, value: ui.vent_squadmate_1"></select>
								</div>
								<div class="form-group">
									<label for="vent-squadmate-1">Squadmate #2</label>
									<select class="form-control" id="vent-squadmate-1" data-bind="options: ui.vent_squadmate_2_candidates, optionsText: App.Application.renderTeammateName, value: ui.vent_squadmate_2"></select>
								</div>
							</div>
						</div>
					</form>
				<!-- /ko -->
				<!-- ko if: ui.id === App.ME2.Stages.UI.StageIDs.LongWalk -->
					<form role="form">
						<div class="row">
							<div class="col-md-6">
								<div class="form-group">
									<label for="long-walk-bubbler">Bubbler</label>
									<select class="form-control" id="long-walk-bubbler" data-bind="options: ui.long_walk_bubbler_candidates, optionsText: App.Application.renderTeammateNameLongWalkBubbler, value: ui.long_walk_bubbler"></select>
								</div>
								<div class="form-group">
									<label for="long-walk-leader">Leader</label>
									<select class="form-control" id="long-walk-leader" data-bind="options: ui.long_walk_leader_candidates, optionsText: App.Application.renderTeammateNameLongWalkLeader, value: ui.long_walk_leader"></select>
								</div>
								<div class="form-group">
									<label for="long-walk-escort">Escort</label>
									<select class="form-control" id="long-walk-escort" data-bind="options: ui.long_walk_escort_candidates, optionsText: App.Application.renderTeammateNameLongWalkEscort, value: ui.long_walk_escort"></select>
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
									<label for="long-walk-squadmate-1">Squadmate #1</label>
									<select class="form-control" id="long-walk-squadmate-1" data-bind="options: ui.long_walk_squadmate_1_candidates, optionsText: App.Application.renderTeammateName, value: ui.long_walk_squadmate_1"></select>
								</div>
								<div class="form-group">
									<label for="long-walk-squadmate-2">Squadmate #2</label>
									<select class="form-control" id="long-walk-squadmate-2" data-bind="options: ui.long_walk_squadmate_2_candidates, optionsText: App.Application.renderTeammateName, value: ui.long_walk_squadmate_2"></select>
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
									<label for="boss-squadmate-1">Squadmate #1</label>
									<select class="form-control" id="boss-squadmate-1" data-bind="options: ui.boss_squadmate_1_candidates, optionsText: App.Application.renderTeammateNameBossSquadmate, value: ui.boss_squadmate_1"></select>
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
									<label for="boss-squadmate-2">Squadmate #2</label>
									<select class="form-control" id="boss-squadmate-2" data-bind="options: ui.boss_squadmate_2_candidates, optionsText: App.Application.renderTeammateNameBossSquadmate, value: ui.boss_squadmate_2"></select>
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
									<label>Reports on defence</label>
									<p class="form-control-static" data-bind="text: App.Application.renderTeammateName(ui.defence_reporter())"></p>
								</div>
								<div class="form-group">
									<label>Advocates keeping the base</label>
									<p class="form-control-static" data-bind="text: App.Application.renderTeammateNameKeepBaseAdvocate(ui.keep_base_advocate())"></p>
								</div>
								<div class="form-group">
									<label>Advocates destroying the base</label>
									<p class="form-control-static" data-bind="text: App.Application.renderTeammateName(ui.destroy_base_advocate())"></p>
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
									<label>Shepard lives</label>
									<p class="form-control-static" data-bind="text: App.Application.renderYesNo(ui.shepard_lives)"></p>
								</div>
								<div class="form-group">
									<label>Shepard caught by</label>
									<p class="form-control-static" data-bind="text: App.Application.renderTeammateName(ui.shepard_pulled_up_by())"></p>
								</div>
								<div class="form-group">
									<label>Crew</label>
									<p class="form-control-static" data-bind="text: App.Application.renderCrewSurvival(ui.crew_survival())"></p>
								</div>
							</div>
						</div>
					</form>
				<!-- /ko -->
			<!-- /ko -->

			<table class="table table-striped summary-table" data-bind="visible: stager.ui.stage().ui.id !== App.ME2.Stages.UI.StageIDs.Setup">
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
					<!-- ko with: stager.ui.teammates -->
						<!-- ko foreach: $data -->
							<tr data-bind="attr: { class: (is_dead ? 'danger' : '') }">
								<td><a href="#view-profile" data-bind="click: function () { $root.henchman(henchman) }, text: henchman.name"></a> <!-- ko if: is_loyal --><span class="glyphicon glyphicon-heart"></span><!-- /ko --></td>
								<td>
									<!-- ko if: is_dead -->
										<span data-bind="text: App.Application.renderTeammateDeathCause(death_cause)"></span>
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
					<!-- /ko -->
				</tbody>
			</table>

			<!-- ko with: stager.ui.stage -->
				<button class="btn btn-primary" data-bind="enable: ui.id > App.ME2.Stages.UI.StageIDs.Setup, click: function () { $root.stager.previousStage() }">Previous</button>
				<button class="btn btn-primary" data-bind="enable: ui.is_evaluatable, click: function () { $root.stager.nextStage() }">Next</button>
			<!-- /ko -->

			<div class="modal fade" tabindex="-1" role="dialog" data-bind="modal: $root.henchman()">
				<!-- ko with: $root.henchman() -->
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal">&times;</button>
								<h4 class="modal-title" data-bind="text: name"></h4>
							</div>
							<div class="modal-body">
								<form class="form-horizontal" role="form">
									<div class="form-group">
										<label class="col-sm-6 control-label">Recruitment can be skipped</label>
										<div class="col-sm-6">
											<p class="form-control-static" data-bind="text: App.Application.renderYesNo(!is_essential)"></p>
										</div>
									</div>


									<fieldset>
										<legend>Attributes</legend>
										<div class="row">
											<div class="col-md-6">
												<div class="form-group">
													<label class="col-sm-8 control-label">Tech Expert</label>
													<div class="col-sm-4">
														<p class="form-control-static" data-bind="text: App.Application.renderYesNo(is_tech_expert)"></p>
													</div>
												</div>
												<div class="form-group">
													<label class="col-sm-8 control-label">Biotic Expert</label>
													<div class="col-sm-4">
														<p class="form-control-static" data-bind="text: App.Application.renderYesNo(is_biotic_expert)"></p>
													</div>
												</div>
											</div>
											<div class="col-md-6">
												<div class="form-group">
													<label class="col-sm-8 control-label">Fireteam Leader</label>
													<div class="col-sm-4">
														<p class="form-control-static"><span data-bind="text: App.Application.renderYesNo(is_leader)"></span><span data-bind="visible: is_super_leader"> ✸</span></p>
													</div>
												</div>
												<div class="form-group">
													<label class="col-sm-8 control-label"><abbr title="Hold the line">HTL</abbr> score</label>
													<div class="col-sm-4">
														<p class="form-control-static" data-bind="text: htl_value"></p>
													</div>
												</div>
											</div>
										</div>
									</fieldset>
									<fieldset>
										<legend>Eligibility for Roles</legend>
										<div class="row">
											<div class="col-md-6">
												<div class="form-group">
													<label class="col-sm-8 control-label">Vents</label>
													<div class="col-sm-4">
														<p class="form-control-static" data-bind="text: App.Application.renderYesNo(is_vent_candidate)"></p>
													</div>
												</div>
												<div class="form-group">
													<label class="col-sm-8 control-label">Biotic Bubble</label>
													<div class="col-sm-4">
														<p class="form-control-static" data-bind="text: App.Application.renderYesNo(is_bubble_candidate)"></p>
													</div>
												</div>
											</div>
											<div class="col-md-6">
												<div class="form-group">
													<label class="col-sm-8 control-label">Leader</label>
													<div class="col-sm-4">
														<p class="form-control-static" data-bind="text: App.Application.renderYesNo(is_leader_candidate)"></p>
													</div>
												</div>
												<div class="form-group">
													<label class="col-sm-8 control-label">Crew Escort</label>
													<div class="col-sm-4">
														<p class="form-control-static" data-bind="text: App.Application.renderYesNo(is_escort_candidate)"></p>
													</div>
												</div>
											</div>
										</div>
									</fieldset>
									<fieldset>
										<legend>Priority</legend>
										<div class="row">
											<div class="col-md-6">
												<div class="form-group">
													<label class="col-sm-8 control-label"><a tabindex="0" data-bind="click: App.Application.showArmourDeathRankPopover">Armour Death</a></label>
													<div class="col-sm-4">
														<p class="form-control-static" data-bind="text: App.Application.renderRank(getArmourDeathPriorityRank())"></p>
													</div>
												</div>
												<div class="form-group">
													<label class="col-sm-8 control-label"><a tabindex="1" data-bind="click: App.Application.showShieldingDeathRankPopover">Shielding Death</a></label>
													<div class="col-sm-4">
														<p class="form-control-static" data-bind="text: App.Application.renderRank(getShieldingDeathPriorityRank())"></p>
													</div>
												</div>
												<div class="form-group">
													<label class="col-sm-8 control-label"><a tabindex="2" data-bind="click: App.Application.showCannonDeathRankPopover">Cannon Death</a></label>
													<div class="col-sm-4">
														<p class="form-control-static" data-bind="text: App.Application.renderRank(getCannonDeathPriorityRank())"></p>
													</div>
												</div>
												<div class="form-group">
													<label class="col-sm-8 control-label"><a tabindex="3" data-bind="click: App.Application.showLongWalkDeathRankPopover">Long Walk Death</a></label>
													<div class="col-sm-4">
														<p class="form-control-static" data-bind="text: App.Application.renderRank(getLongWalkDeathPriorityRank())"></p>
													</div>
												</div>
												<div class="form-group">
													<label class="col-sm-8 control-label"><a tabindex="4" data-bind="click: App.Application.showHTMLDeathRankPopover">HTL Death</a></label>
													<div class="col-sm-4">
														<p class="form-control-static" data-bind="text: App.Application.renderRank(getHTLDeathPriorityRank())"></p>
													</div>
												</div>
											</div>
											<div class="col-md-6">
												<div class="form-group">
													<label class="col-sm-8 control-label"><a tabindex="5" data-bind="click: App.Application.showDefenceReportRankPopover">Defence Report</a></label>
													<div class="col-sm-4">
														<p class="form-control-static" data-bind="text: App.Application.renderRank(getDefenceReportPriorityRank())"></p>
													</div>
												</div>
												<div class="form-group">
													<label class="col-sm-8 control-label"><a tabindex="6" data-bind="click: App.Application.showKeepBaseAdvocateRankPopover">Keep Base Advocate</a></label>
													<div class="col-sm-4">
														<p class="form-control-static" data-bind="html: App.Application.renderRank(getKeepBasePriorityRank())"></p>
													</div>
												</div>
												<div class="form-group">
													<label class="col-sm-8 control-label"><a tabindex="7" data-bind="click: App.Application.showDestroyBaseAdvocateRankPopover">Destroy Base Advocate</a></label>
													<div class="col-sm-4">
														<p class="form-control-static" data-bind="html: App.Application.renderRank(getDestroyBasePriorityRank())"></p>
													</div>
												</div>
												<div class="form-group">
													<label class="col-sm-8 control-label"><a tabindex="8" data-bind="click: App.Application.showCutsceneRescueRankPopover">Catch Shepard</a></label>
													<div class="col-sm-4">
														<p class="form-control-static" data-bind="text: App.Application.renderRank(getCutsceneRescuePriorityRank())"></p>
													</div>
												</div>
											</div>
										</div>
									</fieldset>
								</form>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-primary" data-bind="click: function () { $root.henchman(undefined); }">Close</button>
							</div>
						</div>
					</div>
				<!-- /ko -->
			</div>
		</div>

		<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
		<script src="//cdnjs.cloudflare.com/ajax/libs/knockout/3.2.0/knockout-min.js"></script>
		<script src="//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.compat.js"></script>
		<script src="../cdn/vendor/bootstrap/bootstrap.js"></script>
		<script src="../cdn/javascript/app-1.0.0.js"></script>
		<script>
			$(function () {

				var app = new App.Application();

				// Debugging
				window.app = app;

				// Initialise Knockout
				ko.applyBindings(app);
			});
		</script>
	</body>
</html>