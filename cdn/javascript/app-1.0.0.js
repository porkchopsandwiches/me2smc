

ko["forcibleComputed"] = function ko_forcibleComputed(func, context, options) {
    var trigger;
    var target;

    trigger = ko.observable().extend({ notify: 'always' });
    target = ko.computed(function () {
        trigger();
        return func.call(context);
    }, null, options);

    target["evaluateImmediate"] = function () {
        trigger.valueHasMutated();
    };

    return target;
};
var Utilities;
(function (Utilities) {
    var ObjectArray = (function () {
        function ObjectArray(elements) {
            this.elements = elements;
        }
        ObjectArray.prototype.cloneElements = function () {
            return this.elements.slice(0);
        };

        ObjectArray.prototype.factory = function (elements) {
            return new ObjectArray(elements);
        };

        ObjectArray.prototype.first = function () {
            return this.elements.length ? this.elements[0] : undefined;
        };

        ObjectArray.prototype.last = function () {
            return this.elements.length ? this.elements[this.elements.length - 1] : undefined;
        };

        ObjectArray.prototype.length = function () {
            return this.elements.length;
        };

        ObjectArray.prototype.push = function (element) {
            var elements;
            elements = this.cloneElements();
            elements.push(element);
            return this.factory(elements);
        };

        ObjectArray.prototype.unshift = function (element) {
            var elements;
            elements = this.cloneElements();
            elements.unshift(element);
            return this.factory(elements);
        };

        ObjectArray.prototype.slice = function (start, end) {
            return this.factory(this.elements.slice(start, end));
        };

        ObjectArray.prototype.sort = function (iterator) {
            var elements;
            elements = _.sortBy(this.cloneElements(), iterator);
            return this.factory(elements);
        };

        ObjectArray.prototype.filter = function (iterator) {
            var elements;
            elements = _.filter(this.cloneElements(), iterator);
            return this.factory(elements);
        };

        ObjectArray.prototype.without = function () {
            var values = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                values[_i] = arguments[_i + 0];
            }
            var elements;
            var args;
            args = values;
            args.unshift(this.cloneElements());
            elements = _.without.apply(_, args);
            return this.factory(elements);
        };

        ObjectArray.prototype.find = function (iterator) {
            return _.find(this.elements, iterator);
        };

        ObjectArray.prototype.map = function (iterator) {
            return _.map(this.elements, iterator);
        };

        ObjectArray.prototype.each = function (iterator) {
            _.each(this.elements, iterator);
        };
        return ObjectArray;
    })();
    Utilities.ObjectArray = ObjectArray;
})(Utilities || (Utilities = {}));
var App;
(function (App) {
    (function (ME2) {
        (function (Stages) {
            (function (StageIDs) {
                StageIDs[StageIDs["Setup"] = 0] = "Setup";
                StageIDs[StageIDs["Occulus"] = 1] = "Occulus";
                StageIDs[StageIDs["Vents"] = 2] = "Vents";
                StageIDs[StageIDs["LongWalk"] = 3] = "LongWalk";
                StageIDs[StageIDs["Boss"] = 4] = "Boss";
                StageIDs[StageIDs["Summary"] = 5] = "Summary";
            })(Stages.StageIDs || (Stages.StageIDs = {}));
            var StageIDs = Stages.StageIDs;

            var Stage = (function () {
                function Stage(stager) {
                    this.stager = stager;
                }
                Stage.prototype.setStager = function (stager) {
                    this.stager = stager;
                    return this;
                };

                Stage.prototype.evaluate = function () {
                };

                Stage.prototype.setup = function () {
                    this.ui.setup();
                };

                Stage.prototype.isEvaluatable = function () {
                    return false;
                };
                return Stage;
            })();
            Stages.Stage = Stage;
        })(ME2.Stages || (ME2.Stages = {}));
        var Stages = ME2.Stages;
    })(App.ME2 || (App.ME2 = {}));
    var ME2 = App.ME2;
})(App || (App = {}));
var App;
(function (App) {
    (function (ME2) {
        (function (Stages) {
            var Stager = (function () {
                function Stager(app) {
                    var _this = this;
                    this.app = app;
                    this.freezes = [];
                    this.stage = ko.observable(undefined);

                    this.stages = _.sortBy([
                        new App.ME2.Stages.Setup(this),
                        new App.ME2.Stages.Occulus(this),
                        new App.ME2.Stages.Vents(this),
                        new App.ME2.Stages.LongWalk(this),
                        new App.ME2.Stages.Boss(this),
                        new App.ME2.Stages.Summary(this)
                    ], function (stage) {
                        return stage.id;
                    });

                    this.teammates = ko.forcibleComputed(function () {
                        return _this.app.state.teammates.value();
                    });

                    this.stage.subscribe(function (stage) {
                        _this.app.state.stage_id = stage.id;
                    });
                }
                Stager.prototype.previousStage = function () {
                    var current_stage;
                    current_stage = this.stage();
                    if (current_stage) {
                        this.app.state = this.app.serialisation.deserialise(this.freezes[current_stage.id - 1]);
                        this.setStage(this.stages[current_stage.id - 1]);
                        this.teammates.evaluateImmediate();
                    }
                };

                Stager.prototype.nextStage = function () {
                    var current_stage;

                    current_stage = this.stage();

                    if (current_stage) {
                        if (current_stage.isEvaluatable()) {
                            this.freezes[current_stage.id] = this.app.serialisation.serialise(this.app.state);

                            this.stage().evaluate();
                            this.teammates.evaluateImmediate();

                            if (current_stage.id < this.stages.length - 1) {
                                this.setStage(this.stages[current_stage.id + 1]);
                            }
                        } else {
                            throw new Error("Current Stage is not evaluatable.");
                        }
                    } else {
                        this.setStage(this.stages[0]);
                    }
                };

                Stager.prototype.setStage = function (stage) {
                    stage.setup();

                    this.stage(stage);
                };
                return Stager;
            })();
            Stages.Stager = Stager;
        })(ME2.Stages || (ME2.Stages = {}));
        var Stages = ME2.Stages;
    })(App.ME2 || (App.ME2 = {}));
    var ME2 = App.ME2;
})(App || (App = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var App;
(function (App) {
    (function (ME2) {
        (function (Stages) {
            var Occulus = (function (_super) {
                __extends(Occulus, _super);
                function Occulus(stager) {
                    _super.call(this, stager);
                    this.id = 1 /* Occulus */;
                    this.ui = new App.ME2.Stages.UI.Occulus(this);
                }
                Occulus.prototype.evaluate = function () {
                    var dpt;

                    this.occulus_squadmate_1.addRole(0 /* OcculusSquadmate */);
                    this.occulus_squadmate_2.addRole(0 /* OcculusSquadmate */);

                    dpt = this.stager.app.state.teammates.withoutRole(0 /* OcculusSquadmate */);

                    if (!this.stager.app.state.normandy.has_shielding()) {
                        dpt.alive().sortByShieldingDeathPriority().last().die(this.id, 1 /* ShieldingFailure */);
                    }

                    if (!this.stager.app.state.normandy.has_armour()) {
                        dpt.alive().sortByArmourDeathPriority().last().die(this.id, 0 /* ArmourFailure */);
                    }

                    if (!this.stager.app.state.normandy.has_thanix_cannon()) {
                        console.log("no thanix channon");
                        console.log("killing", dpt.alive().sortByCannonDeathPriority().last());
                        dpt.alive().sortByCannonDeathPriority().last().die(this.id, 2 /* CannonFailure */);
                    }
                };

                Occulus.prototype.isEvaluatable = function () {
                    return this.ui.is_evaluatable();
                };
                return Occulus;
            })(Stages.Stage);
            Stages.Occulus = Occulus;
        })(ME2.Stages || (ME2.Stages = {}));
        var Stages = ME2.Stages;
    })(App.ME2 || (App.ME2 = {}));
    var ME2 = App.ME2;
})(App || (App = {}));
var App;
(function (App) {
    (function (ME2) {
        (function (Stages) {
            var Vents = (function (_super) {
                __extends(Vents, _super);
                function Vents(stager) {
                    _super.call(this, stager);
                    this.id = 4 /* Boss */;
                    this.ui = new App.ME2.Stages.UI.Vents(this);
                }
                Vents.prototype.evaluate = function () {
                    this.vent_squadmate_1.addRole(1 /* VentsSquadmate */);
                    this.vent_squadmate_2.addRole(1 /* VentsSquadmate */);
                    this.vent_venter.addRole(2 /* VentsVenter */);
                    this.vent_leader.addRole(3 /* VentsLeader */);

                    if (!this.vent_venter.willBeEffectiveVentVenter()) {
                        this.vent_venter.die(this.id, 3 /* VentsBadVenter */);
                    } else if (!this.vent_leader.willBeEffectiveVentLeader()) {
                        this.vent_venter.die(this.id, 4 /* VentsBadLeader */);
                    }
                };

                Vents.prototype.isEvaluatable = function () {
                    return this.ui.is_evaluatable();
                };
                return Vents;
            })(Stages.Stage);
            Stages.Vents = Vents;
        })(ME2.Stages || (ME2.Stages = {}));
        var Stages = ME2.Stages;
    })(App.ME2 || (App.ME2 = {}));
    var ME2 = App.ME2;
})(App || (App = {}));
var App;
(function (App) {
    (function (ME2) {
        (function (Stages) {
            var LongWalk = (function (_super) {
                __extends(LongWalk, _super);
                function LongWalk(stager) {
                    _super.call(this, stager);
                    this.id = 3 /* LongWalk */;
                    this.ui = new App.ME2.Stages.UI.LongWalk(this);
                }
                LongWalk.prototype.evaluate = function () {
                    this.long_walk_squadmate_1.addRole(4 /* LongWalkSquadmate */);
                    this.long_walk_squadmate_2.addRole(4 /* LongWalkSquadmate */);
                    this.long_walk_escort.addRole(5 /* LongWalkEscort */);
                    this.long_walk_leader.addRole(7 /* LongWalkLeader */);
                    this.long_walk_bubbler.addRole(6 /* LongWalkBubbler */);

                    if (this.long_walk_escort.henchman.id !== undefined && !this.long_walk_escort.willBeEffectiveLongWalkEscort()) {
                        this.long_walk_escort.die(this.id, 7 /* Escort */);
                    }

                    if (!this.long_walk_bubbler.willBeEffectiveLongWalkBubbler()) {
                        this.stager.app.state.teammates.withRole(4 /* LongWalkSquadmate */).sortByLongWalkDeathPriority().last().die(this.id, 5 /* LongWalkBadBubbler */);
                    }

                    if (!this.long_walk_leader.willBeEffectiveLongWalkLeader()) {
                        this.long_walk_leader.die(this.id, 6 /* LongWalkBadLeader */);
                    }
                };

                LongWalk.prototype.isEvaluatable = function () {
                    return this.ui.is_evaluatable();
                };
                return LongWalk;
            })(Stages.Stage);
            Stages.LongWalk = LongWalk;
        })(ME2.Stages || (ME2.Stages = {}));
        var Stages = ME2.Stages;
    })(App.ME2 || (App.ME2 = {}));
    var ME2 = App.ME2;
})(App || (App = {}));
var App;
(function (App) {
    (function (ME2) {
        (function (Stages) {
            var Boss = (function (_super) {
                __extends(Boss, _super);
                function Boss(stager) {
                    _super.call(this, stager);
                    this.id = 4 /* Boss */;
                    this.ui = new App.ME2.Stages.UI.Boss(this);
                }
                Boss.prototype.evaluate = function () {
                    this.boss_squadmate_1.addRole(8 /* BossSquadmate */);
                    this.boss_squadmate_2.addRole(8 /* BossSquadmate */);

                    if (!this.boss_squadmate_1.willSurviveBeingBossSquadmate()) {
                        this.boss_squadmate_1.die(this.id, 8 /* Boss */);
                    }
                    if (!this.boss_squadmate_2.willSurviveBeingBossSquadmate()) {
                        this.boss_squadmate_2.die(this.id, 8 /* Boss */);
                    }

                    this.stager.app.state.teammates.alive().withoutRole(8 /* BossSquadmate */).withoutRole(5 /* LongWalkEscort */).addRole(9 /* HeldTheLine */).whoDieHoldingTheLine().die(this.id, 9 /* HoldTheLine */);
                };

                Boss.prototype.isEvaluatable = function () {
                    return !!this.boss_squadmate_1 && !!this.boss_squadmate_2;
                };
                return Boss;
            })(Stages.Stage);
            Stages.Boss = Boss;
        })(ME2.Stages || (ME2.Stages = {}));
        var Stages = ME2.Stages;
    })(App.ME2 || (App.ME2 = {}));
    var ME2 = App.ME2;
})(App || (App = {}));
var App;
(function (App) {
    (function (ME2) {
        (function (Stages) {
            var Setup = (function (_super) {
                __extends(Setup, _super);
                function Setup(stager) {
                    _super.call(this, stager);
                    this.id = 0 /* Setup */;
                    this.ui = new App.ME2.Stages.UI.Setup(this);
                }
                Setup.prototype.evaluate = function () {
                    this.stager.app.state.teammates = this.stager.app.state.teammates.recruited();
                };

                Setup.prototype.isEvaluatable = function () {
                    return this.ui.is_evaluatable();
                };
                return Setup;
            })(Stages.Stage);
            Stages.Setup = Setup;
        })(ME2.Stages || (ME2.Stages = {}));
        var Stages = ME2.Stages;
    })(App.ME2 || (App.ME2 = {}));
    var ME2 = App.ME2;
})(App || (App = {}));
var App;
(function (App) {
    (function (ME2) {
        (function (Stages) {
            var Summary = (function (_super) {
                __extends(Summary, _super);
                function Summary(stager) {
                    _super.call(this, stager);
                    this.id = 5 /* Summary */;
                    this.ui = new App.ME2.Stages.UI.Summary(this);
                }
                return Summary;
            })(Stages.Stage);
            Stages.Summary = Summary;
        })(ME2.Stages || (ME2.Stages = {}));
        var Stages = ME2.Stages;
    })(App.ME2 || (App.ME2 = {}));
    var ME2 = App.ME2;
})(App || (App = {}));
var App;
(function (App) {
    (function (ME2) {
        (function (HenchmanIDs) {
            HenchmanIDs[HenchmanIDs["Garrus"] = 0] = "Garrus";
            HenchmanIDs[HenchmanIDs["Grunt"] = 1] = "Grunt";
            HenchmanIDs[HenchmanIDs["Jack"] = 2] = "Jack";
            HenchmanIDs[HenchmanIDs["Jacob"] = 3] = "Jacob";
            HenchmanIDs[HenchmanIDs["Kasumi"] = 4] = "Kasumi";
            HenchmanIDs[HenchmanIDs["Legion"] = 5] = "Legion";
            HenchmanIDs[HenchmanIDs["Miranda"] = 6] = "Miranda";
            HenchmanIDs[HenchmanIDs["Mordin"] = 7] = "Mordin";
            HenchmanIDs[HenchmanIDs["Morinth"] = 8] = "Morinth";
            HenchmanIDs[HenchmanIDs["Samara"] = 9] = "Samara";
            HenchmanIDs[HenchmanIDs["Tali"] = 10] = "Tali";
            HenchmanIDs[HenchmanIDs["Thane"] = 11] = "Thane";
            HenchmanIDs[HenchmanIDs["Zaeed"] = 12] = "Zaeed";
        })(ME2.HenchmanIDs || (ME2.HenchmanIDs = {}));
        var HenchmanIDs = ME2.HenchmanIDs;

        var Henchman = (function () {
            function Henchman(app, id, name, is_essential, htl_value, htl_death_priority, armour_death_priority, shielding_death_priority, cannon_death_priority, long_walk_death_priority, cutscene_rescue_priority, defence_report_priority, keep_base_priority, destroy_base_priority, is_tech_expert, is_biotic_expert, is_leader, is_super_leader, is_escort_candidate, is_vent_candidate, is_bubble_candidate, is_leader_candidate) {
                if (typeof id === "undefined") { id = undefined; }
                if (typeof name === "undefined") { name = ""; }
                if (typeof is_essential === "undefined") { is_essential = false; }
                if (typeof htl_value === "undefined") { htl_value = 0; }
                if (typeof htl_death_priority === "undefined") { htl_death_priority = 0; }
                if (typeof armour_death_priority === "undefined") { armour_death_priority = 0; }
                if (typeof shielding_death_priority === "undefined") { shielding_death_priority = 0; }
                if (typeof cannon_death_priority === "undefined") { cannon_death_priority = 0; }
                if (typeof long_walk_death_priority === "undefined") { long_walk_death_priority = 0; }
                if (typeof cutscene_rescue_priority === "undefined") { cutscene_rescue_priority = 0; }
                if (typeof defence_report_priority === "undefined") { defence_report_priority = 0; }
                if (typeof keep_base_priority === "undefined") { keep_base_priority = 0; }
                if (typeof destroy_base_priority === "undefined") { destroy_base_priority = 0; }
                if (typeof is_tech_expert === "undefined") { is_tech_expert = false; }
                if (typeof is_biotic_expert === "undefined") { is_biotic_expert = false; }
                if (typeof is_leader === "undefined") { is_leader = false; }
                if (typeof is_super_leader === "undefined") { is_super_leader = false; }
                if (typeof is_escort_candidate === "undefined") { is_escort_candidate = false; }
                if (typeof is_vent_candidate === "undefined") { is_vent_candidate = false; }
                if (typeof is_bubble_candidate === "undefined") { is_bubble_candidate = false; }
                if (typeof is_leader_candidate === "undefined") { is_leader_candidate = false; }
                this.name = "";
                this.app = app;
                this.id = id;
                this.name = name;
                this.is_essential = is_essential;
                this.htl_value = htl_value;
                this.htl_death_priority = htl_death_priority;
                this.armour_death_priority = armour_death_priority;
                this.shielding_death_priority = shielding_death_priority;
                this.cannon_death_priority = cannon_death_priority;
                this.long_walk_death_priority = long_walk_death_priority;
                this.cutscene_rescue_priority = cutscene_rescue_priority;
                this.defence_report_priority = defence_report_priority;
                this.keep_base_priority = keep_base_priority;
                this.destroy_base_priority = destroy_base_priority;
                this.is_tech_expert = is_tech_expert;
                this.is_biotic_expert = is_biotic_expert;
                this.is_leader = is_leader;
                this.is_super_leader = is_super_leader;
                this.is_escort_candidate = is_escort_candidate;
                this.is_vent_candidate = is_vent_candidate;
                this.is_bubble_candidate = is_bubble_candidate;
                this.is_leader_candidate = is_leader_candidate;
            }
            Henchman.prototype.getHenchmenSortedBy = function (field) {
                return _.sortBy(this.app.getHenchmen(), function (henchman) {
                    return henchman[field];
                }).reverse();
            };

            Henchman.prototype.getHenchmenSortedByArmourDeathPriority = function () {
                return this.getHenchmenSortedBy("armour_death_priority");
            };

            Henchman.prototype.getHenchmenSortedByShieldingDeathPriority = function () {
                return this.getHenchmenSortedBy("shielding_death_priority");
            };

            Henchman.prototype.getHenchmenSortedByCannonDeathPriority = function () {
                return this.getHenchmenSortedBy("cannon_death_priority");
            };

            Henchman.prototype.getHenchmenSortedByHTLDeathPriority = function () {
                return this.getHenchmenSortedBy("htl_death_priority");
            };

            Henchman.prototype.getHenchmenSortedByLongWalkDeathPriority = function () {
                return this.getHenchmenSortedBy("long_walk_death_priority");
            };

            Henchman.prototype.getHenchmenSortedByCutsceneRescuePriority = function () {
                return this.getHenchmenSortedBy("cutscene_rescue_priority");
            };

            Henchman.prototype.getHenchmenSortedByDefenceReportPriority = function () {
                return this.getHenchmenSortedBy("defence_report_priority");
            };

            Henchman.prototype.getHenchmenSortedByKeepBasePriority = function () {
                return _.filter(this.getHenchmenSortedBy("keep_base_priority"), function (henchman) {
                    return henchman.keep_base_priority > 0;
                });
            };

            Henchman.prototype.getHenchmenSortedByDestroyBasePriority = function () {
                return _.filter(this.getHenchmenSortedBy("destroy_base_priority"), function (henchman) {
                    return henchman.destroy_base_priority > 0;
                });
            };

            Henchman.prototype.getHTLDeathPriorityRank = function () {
                return _.indexOf(this.getHenchmenSortedByHTLDeathPriority(), this);
            };

            Henchman.prototype.getArmourDeathPriorityRank = function () {
                return _.indexOf(this.getHenchmenSortedByArmourDeathPriority(), this);
            };

            Henchman.prototype.getShieldingDeathPriorityRank = function () {
                return _.indexOf(this.getHenchmenSortedByShieldingDeathPriority(), this);
            };

            Henchman.prototype.getCannonDeathPriorityRank = function () {
                return _.indexOf(this.getHenchmenSortedByCannonDeathPriority(), this);
            };

            Henchman.prototype.getLongWalkDeathPriorityRank = function () {
                return _.indexOf(this.getHenchmenSortedByLongWalkDeathPriority(), this);
            };

            Henchman.prototype.getCutsceneRescuePriorityRank = function () {
                return _.indexOf(this.getHenchmenSortedByCutsceneRescuePriority(), this);
            };

            Henchman.prototype.getDefenceReportPriorityRank = function () {
                return _.indexOf(this.getHenchmenSortedByDefenceReportPriority(), this);
            };

            Henchman.prototype.getKeepBasePriorityRank = function () {
                return this.keep_base_priority > 0 ? _.indexOf(this.getHenchmenSortedByKeepBasePriority(), this) : undefined;
            };

            Henchman.prototype.getDestroyBasePriorityRank = function () {
                return this.destroy_base_priority > 0 ? _.indexOf(this.getHenchmenSortedByDestroyBasePriority(), this) : undefined;
            };
            return Henchman;
        })();
        ME2.Henchman = Henchman;
    })(App.ME2 || (App.ME2 = {}));
    var ME2 = App.ME2;
})(App || (App = {}));
var App;
(function (App) {
    (function (ME2) {
        (function (TeammateDeathCauses) {
            TeammateDeathCauses[TeammateDeathCauses["ArmourFailure"] = 0] = "ArmourFailure";
            TeammateDeathCauses[TeammateDeathCauses["ShieldingFailure"] = 1] = "ShieldingFailure";
            TeammateDeathCauses[TeammateDeathCauses["CannonFailure"] = 2] = "CannonFailure";
            TeammateDeathCauses[TeammateDeathCauses["VentsBadVenter"] = 3] = "VentsBadVenter";
            TeammateDeathCauses[TeammateDeathCauses["VentsBadLeader"] = 4] = "VentsBadLeader";
            TeammateDeathCauses[TeammateDeathCauses["LongWalkBadBubbler"] = 5] = "LongWalkBadBubbler";
            TeammateDeathCauses[TeammateDeathCauses["LongWalkBadLeader"] = 6] = "LongWalkBadLeader";
            TeammateDeathCauses[TeammateDeathCauses["Escort"] = 7] = "Escort";
            TeammateDeathCauses[TeammateDeathCauses["Boss"] = 8] = "Boss";
            TeammateDeathCauses[TeammateDeathCauses["HoldTheLine"] = 9] = "HoldTheLine";
        })(ME2.TeammateDeathCauses || (ME2.TeammateDeathCauses = {}));
        var TeammateDeathCauses = ME2.TeammateDeathCauses;

        (function (TeammateRoles) {
            TeammateRoles[TeammateRoles["OcculusSquadmate"] = 0] = "OcculusSquadmate";
            TeammateRoles[TeammateRoles["VentsSquadmate"] = 1] = "VentsSquadmate";
            TeammateRoles[TeammateRoles["VentsVenter"] = 2] = "VentsVenter";
            TeammateRoles[TeammateRoles["VentsLeader"] = 3] = "VentsLeader";
            TeammateRoles[TeammateRoles["LongWalkSquadmate"] = 4] = "LongWalkSquadmate";
            TeammateRoles[TeammateRoles["LongWalkEscort"] = 5] = "LongWalkEscort";
            TeammateRoles[TeammateRoles["LongWalkBubbler"] = 6] = "LongWalkBubbler";
            TeammateRoles[TeammateRoles["LongWalkLeader"] = 7] = "LongWalkLeader";
            TeammateRoles[TeammateRoles["BossSquadmate"] = 8] = "BossSquadmate";
            TeammateRoles[TeammateRoles["HeldTheLine"] = 9] = "HeldTheLine";
        })(ME2.TeammateRoles || (ME2.TeammateRoles = {}));
        var TeammateRoles = ME2.TeammateRoles;

        var Teammate = (function () {
            function Teammate(henchman, is_recruited, is_loyal, is_dead) {
                if (typeof is_recruited === "undefined") { is_recruited = false; }
                if (typeof is_loyal === "undefined") { is_loyal = false; }
                if (typeof is_dead === "undefined") { is_dead = false; }
                this.is_recruited = false;
                this.is_loyal = false;
                this.is_dead = false;
                this.roles = [];
                this.henchman = henchman;
                this.is_recruited = is_recruited;
                this.is_loyal = is_loyal;
                this.is_dead = is_dead;
            }
            Teammate.prototype.addRole = function (role) {
                if (!this.hasRole(role)) {
                    this.roles.push(role);
                }
                return this;
            };

            Teammate.prototype.hasRole = function (role) {
                return _.indexOf(this.roles, role) !== -1;
            };

            Teammate.prototype.getHoldTheLineScore = function () {
                return this.henchman.htl_value + (this.is_loyal ? 1 : 0);
            };

            Teammate.prototype.willBeEffectiveLongWalkLeader = function () {
                return this.henchman.is_leader && (this.is_loyal || this.henchman.is_super_leader);
            };

            Teammate.prototype.willBeEffectiveLongWalkEscort = function () {
                return this.is_loyal;
            };

            Teammate.prototype.willBeEffectiveLongWalkBubbler = function () {
                return this.is_loyal && this.henchman.is_biotic_expert;
            };

            Teammate.prototype.willSurviveBeingBossSquadmate = function () {
                return this.is_loyal;
            };

            Teammate.prototype.willBeEffectiveVentVenter = function () {
                return this.henchman.is_tech_expert && this.is_loyal;
            };

            Teammate.prototype.willBeEffectiveVentLeader = function () {
                return this.henchman.is_leader && this.is_loyal;
            };

            Teammate.prototype.die = function (stage_id, death_cause) {
                this.death_stage_id = stage_id;
                this.is_dead = true;
                this.death_cause = death_cause;
                return this;
            };
            return Teammate;
        })();
        ME2.Teammate = Teammate;
    })(App.ME2 || (App.ME2 = {}));
    var ME2 = App.ME2;
})(App || (App = {}));
var App;
(function (App) {
    (function (ME2) {
        var Teammates = (function () {
            function Teammates(elements) {
                this.oa = new Utilities.ObjectArray(elements);
            }
            Teammates.fromObjectArray = function (oa) {
                return new Teammates(oa.elements);
            };

            Teammates.prototype.value = function () {
                return this.oa.elements;
            };

            Teammates.prototype.first = function () {
                return this.oa.first();
            };

            Teammates.prototype.last = function () {
                return this.oa.last();
            };

            Teammates.prototype.length = function () {
                return this.oa.length();
            };

            Teammates.prototype.alive = function () {
                return this.filter(function (teammate) {
                    return !teammate.is_dead;
                });
            };

            Teammates.prototype.dead = function () {
                return this.filter(function (teammate) {
                    return teammate.is_dead;
                });
            };

            Teammates.prototype.loyal = function () {
                return this.filter(function (teammate) {
                    return teammate.is_loyal;
                });
            };

            Teammates.prototype.disloyal = function () {
                return this.filter(function (teammate) {
                    return !teammate.is_loyal;
                });
            };

            Teammates.prototype.die = function (stage_id, death_cause) {
                this.each(function (teammate) {
                    teammate.die(stage_id, death_cause);
                });
                return this;
            };

            Teammates.prototype.recruited = function () {
                return this.filter(function (teammate) {
                    return teammate.is_recruited;
                });
            };

            Teammates.prototype.addRole = function (role) {
                this.each(function (teammate) {
                    teammate.addRole(role);
                });
                return this;
            };

            Teammates.prototype.withRole = function (role) {
                return this.filter(function (teammate) {
                    return teammate.hasRole(role);
                });
            };

            Teammates.prototype.withoutRole = function (role) {
                return this.filter(function (teammate) {
                    return !teammate.hasRole(role);
                });
            };

            Teammates.prototype.sortByHenchmanProperty = function (property, ascending) {
                if (typeof ascending === "undefined") { ascending = true; }
                return this.sort(function (teammate) {
                    return (ascending ? 1 : -1) * teammate.henchman[property];
                });
            };

            Teammates.prototype.sortByShieldingDeathPriority = function (ascending) {
                if (typeof ascending === "undefined") { ascending = true; }
                return this.sortByHenchmanProperty("shielding_death_priority", ascending);
            };

            Teammates.prototype.sortByArmourDeathPriority = function (ascending) {
                if (typeof ascending === "undefined") { ascending = true; }
                return this.sortByHenchmanProperty("armour_death_priority", ascending);
            };

            Teammates.prototype.sortByCannonDeathPriority = function (ascending) {
                if (typeof ascending === "undefined") { ascending = true; }
                return this.sortByHenchmanProperty("cannon_death_priority", ascending);
            };

            Teammates.prototype.sortByLongWalkDeathPriority = function (ascending) {
                if (typeof ascending === "undefined") { ascending = true; }
                return this.sortByHenchmanProperty("long_walk_death_priority", ascending);
            };

            Teammates.prototype.sortByDefenceReportPriority = function (ascending) {
                if (typeof ascending === "undefined") { ascending = true; }
                return this.sortByHenchmanProperty("defence_report_priority", ascending);
            };

            Teammates.prototype.sortByKeepBasePriority = function (ascending) {
                if (typeof ascending === "undefined") { ascending = true; }
                return this.sortByHenchmanProperty("keep_base_priority", ascending);
            };

            Teammates.prototype.sortByDestroyBasePriority = function (ascending) {
                if (typeof ascending === "undefined") { ascending = true; }
                return this.sortByHenchmanProperty("destroy_base_priority", ascending);
            };

            Teammates.prototype.whoAdvocateKeepingTheBase = function () {
                return this.filter(function (teammate) {
                    return teammate.henchman.keep_base_priority > 0;
                });
            };

            Teammates.prototype.whoAdvocateDestroyingTheBase = function () {
                return this.filter(function (teammate) {
                    return teammate.henchman.destroy_base_priority > 0;
                });
            };

            Teammates.prototype.without = function () {
                var teammates = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    teammates[_i] = arguments[_i + 0];
                }
                return Teammates.fromObjectArray(this.oa.without.apply(this.oa, teammates));
            };

            Teammates.prototype.filter = function (iterator) {
                return Teammates.fromObjectArray(this.oa.filter(iterator));
            };

            Teammates.prototype.map = function (iterator) {
                return this.oa.map(iterator);
            };

            Teammates.prototype.find = function (iterator) {
                return this.oa.find(iterator);
            };

            Teammates.prototype.sort = function (iterator) {
                return Teammates.fromObjectArray(this.oa.sort(iterator));
            };

            Teammates.prototype.slice = function (start, end) {
                return Teammates.fromObjectArray(this.oa.slice(start, end));
            };

            Teammates.prototype.getHoldTheLineTotal = function () {
                return _.chain(this.oa.elements).map(function (teammate) {
                    return teammate.getHoldTheLineScore();
                }).reduce(function (sum, score) {
                    return sum + score;
                }, 0)["value"]();
            };

            Teammates.prototype.getHoldTheLineDeathCount = function () {
                var score;
                var total;
                var pool_size;
                total = this.getHoldTheLineTotal();
                pool_size = this.length();
                score = this.getHoldTheLineTotal() / pool_size;

                console.log("HTL Total", total, "pool", pool_size, " = score", score);

                if (score < 2.0) {
                    if (pool_size >= 5) {
                        if (score >= 1.5) {
                            return 1;
                        } else if (score >= 0.5) {
                            return 2;
                        } else {
                            return 3;
                        }
                    } else if (pool_size === 4) {
                        if (score >= 1.0) {
                            return 1;
                        } else if (score >= 0.5) {
                            return 2;
                        } else if (score > 0) {
                            return 3;
                        } else {
                            return 4;
                        }
                    } else if (pool_size === 3) {
                        if (score >= 1) {
                            return 1;
                        } else if (score > 0) {
                            return 2;
                        } else {
                            return 3;
                        }
                    } else if (pool_size === 2) {
                        if (score > 0) {
                            return 1;
                        } else {
                            return 2;
                        }
                    } else {
                        return 1;
                    }
                } else {
                    return 0;
                }
            };

            Teammates.prototype.whoDieHoldingTheLine = function () {
                var death_count;
                death_count = this.getHoldTheLineDeathCount();
                console.log("HTL deaths", death_count);

                if (death_count > 0) {
                    return this.sort(function (teammate) {
                        return teammate.henchman.htl_death_priority + (!teammate.is_loyal ? 100 : 0);
                    }).slice(-death_count);
                } else {
                    return new Teammates([]);
                }
            };

            Teammates.prototype.each = function (iterator) {
                this.oa.each(iterator);
            };
            return Teammates;
        })();
        ME2.Teammates = Teammates;
    })(App.ME2 || (App.ME2 = {}));
    var ME2 = App.ME2;
})(App || (App = {}));
var App;
(function (App) {
    (function (ME2) {
        var Normandy = (function () {
            function Normandy(has_armor, has_shielding, has_thanix_cannon, delay) {
                if (typeof has_armor === "undefined") { has_armor = false; }
                if (typeof has_shielding === "undefined") { has_shielding = false; }
                if (typeof has_thanix_cannon === "undefined") { has_thanix_cannon = false; }
                if (typeof delay === "undefined") { delay = 0; }
                var _this = this;
                this.has_armour = ko.observable(has_armor);
                this.has_shielding = ko.observable(has_shielding);
                this.has_thanix_cannon = ko.observable(has_thanix_cannon);
                this._delay = delay;

                this.delay = ko.pureComputed({
                    read: function () {
                        console.log("reading delay", _this._delay);
                        return _this._delay;
                    },
                    write: function (value) {
                        var delay;
                        delay = parseInt("" + value, 10);

                        if (!_.isNaN(delay)) {
                            console.log("writing delay", delay, "old value", _this._delay);
                            _this._delay = delay;
                        }
                    }
                });
            }
            return Normandy;
        })();
        ME2.Normandy = Normandy;
    })(App.ME2 || (App.ME2 = {}));
    var ME2 = App.ME2;
})(App || (App = {}));
var App;
(function (App) {
    (function (ME2) {
        (function (Stages) {
            (function (UI) {
                var Stage = (function () {
                    function Stage(stage) {
                        this.teammate_fields = [];
                        this.stage = stage;
                    }
                    Stage.genericTeammateFieldFilter = function (teammate) {
                        return !teammate.is_dead;
                    };

                    Stage.prototype.getTeammateFieldByName = function (name) {
                        return _.find(this.teammate_fields, function (field) {
                            return field.name === name;
                        });
                    };

                    Stage.prototype.getTeammateCandidatesFor = function (field) {
                        var _this = this;
                        var candidates;

                        candidates = this.stage.stager.app.state.teammates.filter(function (teammate) {
                            return field.filter(teammate, _this.stage.stager.app.state.teammates);
                        }).filter(function (candidate) {
                            return !_.find(_this.teammate_fields, function (other_field) {
                                return other_field.name !== field.name && _this.stage[other_field.name] === candidate;
                            });
                        }).value();

                        candidates.unshift(Stage.no_teammate);

                        return candidates;
                    };

                    Stage.prototype.bootstrapTeammateFields = function () {
                        var _this = this;
                        _.each(this.teammate_fields, function (field) {
                            _this[field.name] = ko.observable(undefined);
                            _this[field.name + "_candidates"] = ko.forcibleComputed(function () {
                                return _this.getTeammateCandidatesFor(field);
                            });
                        });
                    };

                    Stage.prototype.setupTeammateFields = function () {
                        var _this = this;
                        _.each(this.teammate_fields, function (field) {
                            _this[field.name].subscribe(function (new_value) {
                                _this.stage[field.name] = new_value;

                                _.each(_this.teammate_fields, function (other_field) {
                                    if (other_field.name !== field.name) {
                                        _this[other_field.name + "_candidates"].evaluateImmediate();
                                    }
                                });
                            });

                            _this[field.name](_this.stage[field.name]);
                        });

                        _.each(this.teammate_fields, function (field) {
                            _this[field.name + "_candidates"].evaluateImmediate();
                        });
                    };

                    Stage.prototype.linkIsEvaluatableToTeammateFields = function () {
                        var _this = this;
                        this.is_evaluatable = ko.pureComputed(function () {
                            var observable;
                            var teammate;

                            return !_.find(_this.teammate_fields, function (field) {
                                if (field.optional) {
                                    return false;
                                }

                                observable = _this[field.name];
                                teammate = observable();
                                return teammate ? (teammate.henchman.id === undefined) : true;
                            });
                        });
                    };

                    Stage.prototype.proxy = function (property_name) {
                        var _this = this;
                        this[property_name](this.stage[property_name]);
                        this[property_name].subscribe(function (new_value) {
                            _this.stage[property_name] = new_value;
                        });
                    };

                    Stage.prototype.setup = function () {
                    };
                    Stage.no_teammate = new App.ME2.Teammate(new App.ME2.Henchman(undefined, undefined, "— None —"));
                    return Stage;
                })();
                UI.Stage = Stage;
            })(Stages.UI || (Stages.UI = {}));
            var UI = Stages.UI;
        })(ME2.Stages || (ME2.Stages = {}));
        var Stages = ME2.Stages;
    })(App.ME2 || (App.ME2 = {}));
    var ME2 = App.ME2;
})(App || (App = {}));
var App;
(function (App) {
    (function (ME2) {
        (function (Stages) {
            (function (UI) {
                var Boss = (function (_super) {
                    __extends(Boss, _super);
                    function Boss(stage) {
                        _super.call(this, stage);
                        this.label = "Boss";
                        this.teammate_fields = [
                            {
                                name: "boss_squadmate_1",
                                filter: function (teammate) {
                                    return !teammate.is_dead && !teammate.hasRole(5 /* LongWalkEscort */);
                                }
                            },
                            {
                                name: "boss_squadmate_2",
                                filter: function (teammate) {
                                    return !teammate.is_dead && !teammate.hasRole(5 /* LongWalkEscort */);
                                }
                            }
                        ];
                        this.bootstrapTeammateFields();
                    }
                    Boss.prototype.setup = function () {
                        this.setupTeammateFields();
                        this.linkIsEvaluatableToTeammateFields();
                    };
                    return Boss;
                })(UI.Stage);
                UI.Boss = Boss;
            })(Stages.UI || (Stages.UI = {}));
            var UI = Stages.UI;
        })(ME2.Stages || (ME2.Stages = {}));
        var Stages = ME2.Stages;
    })(App.ME2 || (App.ME2 = {}));
    var ME2 = App.ME2;
})(App || (App = {}));
var App;
(function (App) {
    (function (ME2) {
        (function (Stages) {
            (function (UI) {
                var LongWalk = (function (_super) {
                    __extends(LongWalk, _super);
                    function LongWalk(stage) {
                        _super.call(this, stage);
                        this.label = "Long Walk";
                        this.teammate_fields = [
                            {
                                name: "long_walk_bubbler",
                                filter: function (teammate) {
                                    return !teammate.is_dead && teammate.henchman.is_bubble_candidate;
                                }
                            },
                            {
                                name: "long_walk_leader",
                                filter: function (teammate) {
                                    return !teammate.is_dead && teammate.henchman.is_leader_candidate;
                                }
                            },
                            {
                                name: "long_walk_escort",
                                filter: function (teammate, teammates) {
                                    if (teammates.alive().length() <= 4) {
                                        return false;
                                    }

                                    return !teammate.is_dead && teammate.henchman.is_escort_candidate;
                                },
                                optional: true
                            },
                            {
                                name: "long_walk_squadmate_1",
                                filter: UI.Stage.genericTeammateFieldFilter
                            },
                            {
                                name: "long_walk_squadmate_2",
                                filter: UI.Stage.genericTeammateFieldFilter
                            }
                        ];
                        this.bootstrapTeammateFields();
                    }
                    LongWalk.prototype.setup = function () {
                        this.setupTeammateFields();
                        this.linkIsEvaluatableToTeammateFields();
                    };
                    return LongWalk;
                })(UI.Stage);
                UI.LongWalk = LongWalk;
            })(Stages.UI || (Stages.UI = {}));
            var UI = Stages.UI;
        })(ME2.Stages || (ME2.Stages = {}));
        var Stages = ME2.Stages;
    })(App.ME2 || (App.ME2 = {}));
    var ME2 = App.ME2;
})(App || (App = {}));
var App;
(function (App) {
    (function (ME2) {
        (function (Stages) {
            (function (UI) {
                var Occulus = (function (_super) {
                    __extends(Occulus, _super);
                    function Occulus(stage) {
                        _super.call(this, stage);
                        this.label = "Occulus";
                        this.teammate_fields = [
                            {
                                name: "occulus_squadmate_1",
                                filter: UI.Stage.genericTeammateFieldFilter
                            },
                            {
                                name: "occulus_squadmate_2",
                                filter: UI.Stage.genericTeammateFieldFilter
                            }
                        ];
                        this.bootstrapTeammateFields();
                    }
                    Occulus.prototype.setup = function () {
                        this.setupTeammateFields();
                        this.linkIsEvaluatableToTeammateFields();
                    };
                    return Occulus;
                })(UI.Stage);
                UI.Occulus = Occulus;
            })(Stages.UI || (Stages.UI = {}));
            var UI = Stages.UI;
        })(ME2.Stages || (ME2.Stages = {}));
        var Stages = ME2.Stages;
    })(App.ME2 || (App.ME2 = {}));
    var ME2 = App.ME2;
})(App || (App = {}));
var App;
(function (App) {
    (function (ME2) {
        (function (Stages) {
            (function (UI) {
                var Setup = (function (_super) {
                    __extends(Setup, _super);
                    function Setup() {
                        _super.apply(this, arguments);
                        this.label = "Setup";
                    }
                    Setup.prototype.setup = function () {
                        var _this = this;
                        this.bootstrapTeammates();

                        this.all_recruited = ko.pureComputed({
                            read: function () {
                                var unrecruited;

                                unrecruited = _.find(_this.teammates, function (teammate) {
                                    return !teammate.is_recruited();
                                });

                                return !unrecruited;
                            },
                            write: function (all_recruited) {
                                _this.teammates.forEach(function (teammate) {
                                    if (all_recruited || !teammate.teammate.henchman.is_essential) {
                                        teammate.is_recruited(all_recruited);
                                    }
                                });
                            },
                            owner: this
                        });

                        this.all_loyal = ko.pureComputed({
                            read: function () {
                                var unloyal;

                                unloyal = _.find(_this.teammates, function (teammate) {
                                    return !teammate.is_loyal();
                                });

                                return !unloyal;
                            },
                            write: function (all_loyal) {
                                if (all_loyal) {
                                    _this.teammates.forEach(function (teammate) {
                                        teammate.is_recruited(true);
                                        teammate.is_loyal(true);
                                    });
                                } else {
                                    _this.teammates.forEach(function (teammate) {
                                        teammate.is_loyal(false);
                                    });
                                }
                            },
                            owner: this
                        });

                        this.is_evaluatable = ko.pureComputed(function () {
                            var is_evaluatable;

                            is_evaluatable = _.filter(_this.teammates, function (teammate) {
                                return teammate.is_recruited();
                            }).length >= 8;

                            return is_evaluatable;
                        });
                    };

                    Setup.prototype.bootstrapTeammates = function () {
                        this.teammates = this.stage.stager.app.state.teammates.map(function (teammate) {
                            return new App.ME2.UI.Teammate(teammate);
                        });

                        this.normandy = this.stage.stager.app.state.normandy;
                    };
                    return Setup;
                })(UI.Stage);
                UI.Setup = Setup;
            })(Stages.UI || (Stages.UI = {}));
            var UI = Stages.UI;
        })(ME2.Stages || (ME2.Stages = {}));
        var Stages = ME2.Stages;
    })(App.ME2 || (App.ME2 = {}));
    var ME2 = App.ME2;
})(App || (App = {}));
var App;
(function (App) {
    (function (ME2) {
        (function (Stages) {
            (function (UI) {
                var Vents = (function (_super) {
                    __extends(Vents, _super);
                    function Vents(stage) {
                        _super.call(this, stage);
                        this.label = "Vents";
                        this.teammate_fields = [
                            {
                                name: "vent_squadmate_1",
                                filter: UI.Stage.genericTeammateFieldFilter
                            },
                            {
                                name: "vent_squadmate_2",
                                filter: UI.Stage.genericTeammateFieldFilter
                            },
                            {
                                name: "vent_venter",
                                filter: function (teammate) {
                                    return !teammate.is_dead && teammate.henchman.is_vent_candidate;
                                }
                            },
                            {
                                name: "vent_leader",
                                filter: function (teammate) {
                                    return !teammate.is_dead && teammate.henchman.is_leader_candidate;
                                }
                            }
                        ];
                        this.bootstrapTeammateFields();
                    }
                    Vents.prototype.setup = function () {
                        this.setupTeammateFields();
                        this.linkIsEvaluatableToTeammateFields();
                    };
                    return Vents;
                })(UI.Stage);
                UI.Vents = Vents;
            })(Stages.UI || (Stages.UI = {}));
            var UI = Stages.UI;
        })(ME2.Stages || (ME2.Stages = {}));
        var Stages = ME2.Stages;
    })(App.ME2 || (App.ME2 = {}));
    var ME2 = App.ME2;
})(App || (App = {}));
var App;
(function (App) {
    (function (ME2) {
        (function (Stages) {
            (function (UI) {
                (function (SummaryCrewSurvivalOptions) {
                    SummaryCrewSurvivalOptions[SummaryCrewSurvivalOptions["AllSurvived"] = 0] = "AllSurvived";
                    SummaryCrewSurvivalOptions[SummaryCrewSurvivalOptions["HalfSurvived"] = 1] = "HalfSurvived";
                    SummaryCrewSurvivalOptions[SummaryCrewSurvivalOptions["AllDied"] = 2] = "AllDied";
                })(UI.SummaryCrewSurvivalOptions || (UI.SummaryCrewSurvivalOptions = {}));
                var SummaryCrewSurvivalOptions = UI.SummaryCrewSurvivalOptions;

                var Summary = (function (_super) {
                    __extends(Summary, _super);
                    function Summary(stage) {
                        _super.call(this, stage);
                        this.label = "Summary";
                        this.shepard_lives = ko.observable(undefined);
                        this.shepard_pulled_up_by = ko.observable(undefined);
                        this.defence_reporter = ko.observable(undefined);
                        this.keep_base_advocate = ko.observable(undefined);
                        this.destroy_base_advocate = ko.observable(undefined);
                        this.crew_survival = ko.observable(undefined);
                    }
                    Summary.prototype.getLivingTeammates = function () {
                        return this.stage.stager.app.state.teammates.alive();
                    };

                    Summary.prototype.getShepardLives = function () {
                        return this.getLivingTeammates().length() > 1;
                    };

                    Summary.prototype.getShepardCatcher = function () {
                        var candidates;
                        var score;

                        candidates = this.getLivingTeammates().sort(function (teammate) {
                            score = teammate.henchman.cutscene_rescue_priority + (teammate.hasRole(8 /* BossSquadmate */) ? 100 : 0);
                            return score;
                        });

                        return candidates.length() > 1 ? candidates.last() : undefined;
                    };

                    Summary.prototype.getDefenceReporter = function () {
                        return this.stage.stager.app.state.teammates.withRole(9 /* HeldTheLine */).sortByDefenceReportPriority().last();
                    };

                    Summary.prototype.getKeepBaseAdvocate = function () {
                        return this.stage.stager.app.state.teammates.withRole(8 /* BossSquadmate */).whoAdvocateKeepingTheBase().sortByKeepBasePriority().last();
                    };

                    Summary.prototype.getDestroyBaseAdvocate = function () {
                        return this.stage.stager.app.state.teammates.withRole(8 /* BossSquadmate */).whoAdvocateDestroyingTheBase().sortByDestroyBasePriority().last();
                    };

                    Summary.prototype.getCrewSurvival = function () {
                        if (this.stage.stager.app.state.teammates.withRole(5 /* LongWalkEscort */).length() === 0) {
                            return 2 /* AllDied */;
                        }

                        if (this.stage.stager.app.state.normandy.delay() === 0) {
                            return 0 /* AllSurvived */;
                        } else if (this.stage.stager.app.state.normandy.delay() <= 3) {
                            return 1 /* HalfSurvived */;
                        } else {
                            return 2 /* AllDied */;
                        }
                    };

                    Summary.prototype.setup = function () {
                        this.defence_reporter(this.getDefenceReporter());
                        this.shepard_lives(this.getShepardLives());
                        this.shepard_pulled_up_by(this.getShepardCatcher());
                        this.keep_base_advocate(this.getKeepBaseAdvocate());
                        this.destroy_base_advocate(this.getDestroyBaseAdvocate());
                        this.crew_survival(this.getCrewSurvival());
                    };
                    return Summary;
                })(UI.Stage);
                UI.Summary = Summary;
            })(Stages.UI || (Stages.UI = {}));
            var UI = Stages.UI;
        })(ME2.Stages || (ME2.Stages = {}));
        var Stages = ME2.Stages;
    })(App.ME2 || (App.ME2 = {}));
    var ME2 = App.ME2;
})(App || (App = {}));
var App;
(function (App) {
    (function (ME2) {
        (function (UI) {
            var Proxy = (function () {
                function Proxy() {
                }
                Proxy.prototype.link = function (target, property) {
                    var observable;
                    observable = this[property];

                    observable(target[property]);

                    observable.subscribe(function (new_value) {
                        target[property] = new_value;
                    });
                };
                return Proxy;
            })();
            UI.Proxy = Proxy;
        })(ME2.UI || (ME2.UI = {}));
        var UI = ME2.UI;
    })(App.ME2 || (App.ME2 = {}));
    var ME2 = App.ME2;
})(App || (App = {}));
var App;
(function (App) {
    (function (ME2) {
        (function (UI) {
            var Teammate = (function (_super) {
                __extends(Teammate, _super);
                function Teammate(teammate) {
                    var _this = this;
                    _super.call(this);
                    this.is_recruited = ko.observable(undefined);
                    this.is_loyal = ko.observable(undefined);
                    this.is_dead = ko.observable(undefined);
                    this.teammate = teammate;

                    this.can_be_loyal = ko.computed(function () {
                        return !!_this.is_recruited();
                    });

                    this.loyal_attributes = ko.computed(function () {
                        var attr = {};

                        if (!_this.is_recruited()) {
                            attr["disabled"] = "disabled";
                        } else {
                            attr["disabled"] = undefined;
                        }

                        return attr;
                    });

                    this.recruited_attributes = ko.pureComputed(function () {
                        var attr = {};

                        if (_this.teammate.henchman.is_essential) {
                            attr["disabled"] = "disabled";
                        } else {
                            attr["disabled"] = undefined;
                        }

                        return attr;
                    });

                    this.link(this.teammate, "is_recruited");
                    this.link(this.teammate, "is_loyal");
                    this.link(this.teammate, "is_dead");

                    this.is_recruited.subscribe(function (is_recruited) {
                        if (!is_recruited && _this.is_loyal()) {
                            _this.is_loyal(false);
                        }
                    });
                }
                return Teammate;
            })(App.ME2.UI.Proxy);
            UI.Teammate = Teammate;
        })(ME2.UI || (ME2.UI = {}));
        var UI = ME2.UI;
    })(App.ME2 || (App.ME2 = {}));
    var ME2 = App.ME2;
})(App || (App = {}));
var App;
(function (App) {
    (function (ME2) {
        (function (UI) {
            var Normandy = (function (_super) {
                __extends(Normandy, _super);
                function Normandy(normany) {
                    _super.call(this);
                    this.has_armour = ko.observable(undefined);
                    this.has_shielding = ko.observable(undefined);
                    this.has_thanix_cannon = ko.observable(undefined);
                    this.normandy = normany;

                    this.link(this.normandy, "has_armour");
                    this.link(this.normandy, "has_shielding");
                    this.link(this.normandy, "has_thanix_cannon");
                }
                return Normandy;
            })(App.ME2.UI.Proxy);
            UI.Normandy = Normandy;
        })(ME2.UI || (ME2.UI = {}));
        var UI = ME2.UI;
    })(App.ME2 || (App.ME2 = {}));
    var ME2 = App.ME2;
})(App || (App = {}));
var App;
(function (App) {
    (function (ME2) {
        var State = (function () {
            function State(app) {
                this.app = app;
                this.normandy = new App.ME2.Normandy(true, true, true);
                this.bootstrapTeammates();
            }
            State.prototype.bootstrapTeammates = function () {
                this.teammates = new App.ME2.Teammates(_.chain(this.app.getHenchmen()).map(function (henchman) {
                    return new App.ME2.Teammate(henchman, henchman.is_essential, false, false);
                }).sortBy(function (teammate) {
                    return teammate.henchman.name;
                }).value());
            };
            return State;
        })();
        ME2.State = State;
    })(App.ME2 || (App.ME2 = {}));
    var ME2 = App.ME2;
})(App || (App = {}));
var App;
(function (App) {
    (function (ME2) {
        var Serialisation = (function () {
            function Serialisation(app) {
                this.app = app;
            }
            Serialisation.prototype.serialise = function (state) {
                var serialised;

                serialised = {
                    stage_id: state.stage_id,
                    normandy: {
                        delay: state.normandy.delay(),
                        has_armour: state.normandy.has_armour(),
                        has_shielding: state.normandy.has_shielding(),
                        has_thanix_cannon: state.normandy.has_thanix_cannon()
                    },
                    teammates: _.map(state.teammates.value(), function (teammate) {
                        return {
                            henchman_id: teammate.henchman.id,
                            henchman_name: teammate.henchman.name,
                            is_loyal: teammate.is_loyal,
                            is_recruited: teammate.is_recruited,
                            is_dead: teammate.is_dead,
                            death_cause: teammate.death_cause,
                            death_stage_id: teammate.death_stage_id,
                            roles: teammate.roles
                        };
                    })
                };

                console.log(JSON.stringify(serialised));

                return JSON.stringify(serialised);
            };

            Serialisation.prototype.deserialise = function (state) {
                var _this = this;
                var serialised;
                var deserialised;

                serialised = JSON.parse(state);
                deserialised = new App.ME2.State(this.app);
                deserialised.stage_id = serialised.stage_id;

                deserialised.normandy.delay(serialised.normandy.delay);
                deserialised.normandy.has_armour(serialised.normandy.has_armour);
                deserialised.normandy.has_shielding(serialised.normandy.has_shielding);
                deserialised.normandy.has_thanix_cannon(serialised.normandy.has_thanix_cannon);

                deserialised.teammates = new App.ME2.Teammates(_.map(serialised.teammates, function (serialised_teammate) {
                    var teammate;
                    teammate = new App.ME2.Teammate(_this.app.getHenchman(serialised_teammate.henchman_id), serialised_teammate.is_loyal, serialised_teammate.is_recruited, serialised_teammate.is_dead);
                    teammate.death_cause = serialised_teammate.death_cause;
                    teammate.death_stage_id = serialised_teammate.death_stage_id;
                    teammate.roles = serialised_teammate.roles;
                    return teammate;
                }));

                return deserialised;
            };
            return Serialisation;
        })();
        ME2.Serialisation = Serialisation;
    })(App.ME2 || (App.ME2 = {}));
    var ME2 = App.ME2;
})(App || (App = {}));
var Knockout;
(function (Knockout) {
    (function (Bindings) {
        var Modal = (function () {
            function Modal() {
                function init(element, value_accessor) {
                    var $element;
                    $element = $(element);

                    $element.modal({
                        show: false
                    });

                    ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                        $element.modal("destroy");
                    });
                }

                function update(element, value_accessor) {
                    var value;
                    var $element;
                    value = value_accessor();
                    $element = $(element);

                    if (value) {
                        $element.modal("show");
                    } else {
                        $element.modal("hide");
                    }
                }

                this.init = init;
                this.update = update;
            }
            return Modal;
        })();
        Bindings.Modal = Modal;
    })(Knockout.Bindings || (Knockout.Bindings = {}));
    var Bindings = Knockout.Bindings;
})(Knockout || (Knockout = {}));

ko.bindingHandlers["modal"] = new Knockout.Bindings.Modal();
var App;
(function (App) {
    var Application = (function () {
        function Application() {
            this.henchmen = [
                new App.ME2.Henchman(this, 0 /* Garrus */, "Garrus Vakarian", true, 3, 5, 0, 8, 11, 10, 2, 11, 8, 0, false, false, true, false, true, true, false, true),
                new App.ME2.Henchman(this, 1 /* Grunt */, "Grunt", false, 3, 0, 0, 6, 9, 8, 4, 9, 12, 0, false, false, false, false, true, false, false, true),
                new App.ME2.Henchman(this, 2 /* Jack */, "Jack", true, 0, 8, 12, 5, 8, 11, 1, 12, 0, 8, false, true, false, false, true, false, true, true),
                new App.ME2.Henchman(this, 3 /* Jacob */, "Jacob Taylor", true, 1, 6, 0, 0, 0, 6, 7, 8, 0, 10, false, false, true, false, true, true, true, true),
                new App.ME2.Henchman(this, 4 /* Kasumi */, "Kasumi Goto", false, 0, 9, 0, 12, 0, 3, 9, 4, 0, 9, true, false, false, false, true, true, false, true),
                new App.ME2.Henchman(this, 5 /* Legion */, "Legion", false, 1, 3, 0, 11, 0, 9, 3, 10, 9, 0, true, false, false, false, true, true, false, true),
                new App.ME2.Henchman(this, 6 /* Miranda */, "Miranda Lawson", true, 1, 7, 0, 0, 0, -1, 11, 2, 13, 0, false, false, true, true, false, false, true, true),
                new App.ME2.Henchman(this, 7 /* Mordin */, "Mordin Solus", true, 0, 11, 0, 0, 0, 5, 6, 6, 10, 0, false, false, false, false, true, true, false, true),
                new App.ME2.Henchman(this, 9 /* Samara */, "Samara", false, 1, 4, 0, 4, 7, 7, 5, 7, 0, 12, false, true, false, false, true, false, true, true),
                new App.ME2.Henchman(this, 10 /* Tali */, "Tali'zorah", false, 0, 10, 0, 10, 0, 4, 8, 5, 0, 11, true, false, false, false, true, true, false, true),
                new App.ME2.Henchman(this, 11 /* Thane */, "Thane", false, 1, 2, 0, 9, 12, 12, 0, 13, 0, 13, false, false, false, false, true, true, true, true),
                new App.ME2.Henchman(this, 12 /* Zaeed */, "Zaeed Masani", false, 3, 1, 0, 7, 10, 2, 10, 3, 11, 0, false, false, false, false, true, false, false, true)
            ];

            this.serialisation = new App.ME2.Serialisation(this);
            this.henchman = ko.observable(undefined);
            this.state = new App.ME2.State(this);
            this.stager = new App.ME2.Stages.Stager(this);
            this.stager.nextStage();
        }
        Application.prototype.getHenchmen = function () {
            return this.henchmen;
        };

        Application.prototype.getHenchman = function (id) {
            return _.find(this.henchmen, function (henchman) {
                return henchman.id === id;
            });
        };

        Application.formatTeammateRole = function (role) {
            switch (role) {
                case 0 /* OcculusSquadmate */:
                    return "Occulus Squadmate";
                case 3 /* VentsLeader */:
                    return "Vents Leader";
                case 2 /* VentsVenter */:
                    return "Vents Tech Expert";
                case 1 /* VentsSquadmate */:
                    return "Vents Squadmate";
                case 6 /* LongWalkBubbler */:
                    return "Long Walk Biotic Expert";
                case 5 /* LongWalkEscort */:
                    return "Escort";
                case 7 /* LongWalkLeader */:
                    return "Long Walk Leader";
                case 4 /* LongWalkSquadmate */:
                    return "Long Walk Squadmate";
                case 8 /* BossSquadmate */:
                    return "Boss Squadmate";
                case 9 /* HeldTheLine */:
                    return "Held the line";
            }

            return App.ME2.TeammateRoles[role];
        };

        Application.renderYesNo = function (value) {
            return value ? "Yes" : "No";
        };

        Application.renderRank = function (value) {
            if (value !== undefined) {
                return "#" + (value + 1);
            } else {
                return "<span class=\"text-muted\">N/A</span>";
            }
        };

        Application.renderTeammateName = function (teammate, highlight) {
            if (typeof highlight === "undefined") { highlight = false; }
            if (teammate) {
                return teammate.henchman.name + (highlight ? " " + Application.ideal_symbol : "");
            } else {
                return "N/A";
            }
        };

        Application.renderTeammateNameVentVenter = function (teammate) {
            return Application.renderTeammateName(teammate, teammate.willBeEffectiveVentVenter());
        };

        Application.renderTeammateNameVentLeader = function (teammate) {
            return Application.renderTeammateName(teammate, teammate.willBeEffectiveVentLeader());
        };

        Application.renderTeammateNameLongWalkBubbler = function (teammate) {
            return Application.renderTeammateName(teammate, teammate.willBeEffectiveLongWalkBubbler());
        };

        Application.renderTeammateNameLongWalkLeader = function (teammate) {
            return Application.renderTeammateName(teammate, teammate.willBeEffectiveLongWalkLeader());
        };

        Application.renderTeammateNameLongWalkEscort = function (teammate) {
            return Application.renderTeammateName(teammate, teammate.willBeEffectiveLongWalkEscort());
        };

        Application.renderTeammateNameBossSquadmate = function (teammate) {
            return Application.renderTeammateName(teammate, teammate.willSurviveBeingBossSquadmate());
        };

        Application.renderTeammateNameKeepBaseAdvocate = function (teammate) {
            return Application.renderTeammateName(teammate, teammate && teammate.henchman.id === 6 /* Miranda */);
        };

        Application.renderTeammateDeathCause = function (death_cause) {
            switch (death_cause) {
                case 0 /* ArmourFailure */:
                    return "Advanced Armour not acquired";
                case 1 /* ShieldingFailure */:
                    return "Advanced Shielding not acquired";
                case 2 /* CannonFailure */:
                    return "Thanix Cannon not acquired";
                case 4 /* VentsBadLeader */:
                    return "Bad vents leader";
                case 3 /* VentsBadVenter */:
                    return "Bad vents choice";
                case 7 /* Escort */:
                    return "Disloyal escort";
                case 5 /* LongWalkBadBubbler */:
                    return "Bad long walk bubbler";
                case 6 /* LongWalkBadLeader */:
                    return "Bad long walk leader";
                case 8 /* Boss */:
                    return "Disloyal Boss squadmate";
                case 9 /* HoldTheLine */:
                    return "Failed to hold the line";
                default:
                    return App.ME2.TeammateDeathCauses[death_cause];
            }
        };

        Application.renderCrewSurvival = function (crew_survival) {
            switch (crew_survival) {
                case 2 /* AllDied */:
                    return "All Died";
                case 1 /* HalfSurvived */:
                    return "Half Survived";
                case 0 /* AllSurvived */:
                    return "All Survived";
                default:
                    return App.ME2.Stages.UI.SummaryCrewSurvivalOptions[crew_survival];
            }
        };

        Application.showArmourDeathRankPopover = function (henchman, event) {
            return Application.showRankPopover($(event.target), "Armour Deaths", henchman, henchman.getHenchmenSortedByArmourDeathPriority());
        };

        Application.showShieldingDeathRankPopover = function (henchman, event) {
            return Application.showRankPopover($(event.target), "Shielding Deaths", henchman, henchman.getHenchmenSortedByShieldingDeathPriority());
        };

        Application.showCannonDeathRankPopover = function (henchman, event) {
            return Application.showRankPopover($(event.target), "Cannon Deaths", henchman, henchman.getHenchmenSortedByCannonDeathPriority());
        };

        Application.showLongWalkDeathRankPopover = function (henchman, event) {
            return Application.showRankPopover($(event.target), "Long Walk Deaths", henchman, henchman.getHenchmenSortedByLongWalkDeathPriority());
        };

        Application.showHTMLDeathRankPopover = function (henchman, event) {
            return Application.showRankPopover($(event.target), "Hold the line Deaths", henchman, henchman.getHenchmenSortedByHTLDeathPriority());
        };

        Application.showDefenceReportRankPopover = function (henchman, event) {
            return Application.showRankPopover($(event.target), "Defence Reports", henchman, henchman.getHenchmenSortedByDefenceReportPriority());
        };

        Application.showKeepBaseAdvocateRankPopover = function (henchman, event) {
            return Application.showRankPopover($(event.target), "Keep Base Advocates", henchman, henchman.getHenchmenSortedByKeepBasePriority());
        };

        Application.showDestroyBaseAdvocateRankPopover = function (henchman, event) {
            return Application.showRankPopover($(event.target), "Destroy Base Advocates", henchman, henchman.getHenchmenSortedByDestroyBasePriority());
        };

        Application.showCutsceneRescueRankPopover = function (henchman, event) {
            return Application.showRankPopover($(event.target), "Catchs Shepard", henchman, henchman.getHenchmenSortedByCutsceneRescuePriority());
        };

        Application.showRankPopover = function ($target, title, henchman, list) {
            var $content;
            $content = $("<ol />").addClass("rank-popover-list");
            _.each(list, function (list_henchman) {
                $content.append($("<li />").append(list_henchman.name));
            });

            $target.popover({
                trigger: "focus",
                title: title,
                html: true,
                content: $content
            }).on("hidden.bs.popover", function () {
                $target.popover("destroy");
            }).popover("show");
        };
        Application.ideal_symbol = "✭";
        return Application;
    })();
    App.Application = Application;
})(App || (App = {}));
//# sourceMappingURL=app-1.0.0.js.map
