var App;
(function (App) {
    var Application = (function () {
        function Application() {
            this.normandy = new App.ME2.Normandy(true, true, true);

            this.henchmen = [
                new App.ME2.Henchman(0 /* Garrus */, "Garrus Vakarian", true, 3, 5, 0, 8, 11, 10, 2, 11, 8, 0, false, false, true, false, true, true, false, true, true),
                new App.ME2.Henchman(1 /* Grunt */, "Grunt", false, 3, 0, 0, 6, 9, 8, 4, 9, 12, 0, false, false, false, false, true, false, false, true, true),
                new App.ME2.Henchman(2 /* Jack */, "Jack", true, 0, 8, 12, 5, 8, 11, 1, 12, 0, 8, false, true, false, false, true, false, true, true, true),
                new App.ME2.Henchman(3 /* Jacob */, "Jacob Taylor", true, 1, 6, 0, 0, 0, 6, 7, 8, 0, 10, false, false, true, false, true, true, true, true, true),
                new App.ME2.Henchman(4 /* Kasumi */, "Kasumi Goto", false, 0, 9, 0, 12, 0, 3, 9, 4, 0, 9, true, false, false, false, true, true, false, true, true),
                new App.ME2.Henchman(5 /* Legion */, "Legion", false, 1, 3, 0, 11, 0, 9, 3, 10, 9, 0, true, false, false, false, true, true, false, true, true),
                new App.ME2.Henchman(6 /* Miranda */, "Miranda Lawson", true, 1, 7, 0, 0, 0, -1, 11, 2, 13, 0, false, false, true, true, false, false, true, true, true),
                new App.ME2.Henchman(7 /* Mordin */, "Mordin Solus", true, 0, 11, 0, 0, 0, 5, 6, 6, 10, 0, false, false, false, false, true, true, false, true, true),
                new App.ME2.Henchman(9 /* Samara */, "Samara", false, 1, 4, 0, 4, 7, 7, 5, 7, 0, 12, false, true, false, false, true, false, true, true, true),
                new App.ME2.Henchman(10 /* Tali */, "Tali'zorah", false, 0, 10, 0, 10, 0, 4, 8, 5, 0, 11, true, false, false, false, true, true, false, true, true),
                new App.ME2.Henchman(11 /* Thane */, "Thane", false, 1, 2, 0, 9, 12, 12, 0, 13, 0, 13, false, false, false, false, true, true, true, true, true),
                new App.ME2.Henchman(12 /* Zaeed */, "Zaeed Masani", false, 3, 1, 0, 7, 10, 2, 10, 3, 11, 0, false, false, false, false, true, false, false, true, true)
            ];

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

        Application.prototype.formatTeammateRole = function (role) {
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

        Application.prototype.formatYesNo = function (value) {
            return value ? "Yes" : "No";
        };

        Application.prototype.renderTeammateForSelect = function (teammate) {
            if (teammate.henchman) {
                return teammate.henchman.name;
            } else {
                return "-- None --";
            }
        };

        Application.prototype.renderTeammateName = function (teammate) {
            if (teammate && teammate.henchman) {
                return teammate.henchman.name;
            } else {
                return "-- None -- ";
            }
        };

        Application.prototype.formatTeammateDeathCause = function (death_cause) {
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
        return Application;
    })();
    App.Application = Application;
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
            function Henchman(id, name, is_essential, htl_value, htl_death_priority, armour_death_priority, shielding_death_priority, cannon_death_priority, long_walk_death_priority, cutscene_rescue_priority, defence_report_priority, keep_base_priority, destroy_base_priority, is_tech_expert, is_biotic_expert, is_leader, is_super_leader, is_escort_candidate, is_vent_candidate, is_bubble_candidate, is_vent_leader_candidate, is_long_walk_leader_candidate) {
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
                if (typeof is_vent_leader_candidate === "undefined") { is_vent_leader_candidate = false; }
                if (typeof is_long_walk_leader_candidate === "undefined") { is_long_walk_leader_candidate = false; }
                this.name = "";
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
                this.is_vent_leader_candidate = is_vent_leader_candidate;
                this.is_long_walk_leader_candidate = is_long_walk_leader_candidate;
            }
            return Henchman;
        })();
        ME2.Henchman = Henchman;
    })(App.ME2 || (App.ME2 = {}));
    var ME2 = App.ME2;
})(App || (App = {}));
var App;
(function (App) {
    (function (ME2) {
        var Normandy = (function () {
            function Normandy(has_armor, has_shielding, has_thanix_cannon) {
                if (typeof has_armor === "undefined") { has_armor = false; }
                if (typeof has_shielding === "undefined") { has_shielding = false; }
                if (typeof has_thanix_cannon === "undefined") { has_thanix_cannon = false; }
                this.has_armour = has_armor;
                this.has_shielding = has_shielding;
                this.has_thanix_cannon = has_thanix_cannon;
            }
            return Normandy;
        })();
        ME2.Normandy = Normandy;
    })(App.ME2 || (App.ME2 = {}));
    var ME2 = App.ME2;
})(App || (App = {}));


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
                    this.app = app;

                    this.freezes = [];

                    this.stages = [
                        new App.ME2.Stages.Setup(this),
                        new App.ME2.Stages.Occulus(this),
                        new App.ME2.Stages.Vents(this),
                        new App.ME2.Stages.LongWalk(this),
                        new App.ME2.Stages.Boss(this),
                        new App.ME2.Stages.Summary(this)
                    ];

                    this.ui = new App.ME2.Stages.UI.Stager(this);

                    this.bootstrapTeammates();
                }
                Stager.prototype.bootstrapTeammates = function () {
                    this.teammates = _.chain(this.app.getHenchmen()).map(function (henchman) {
                        return new App.ME2.Teammate(henchman, henchman.is_essential, false, false);
                    }).sortBy(function (teammate) {
                        return teammate.henchman.name;
                    }).value();
                };

                Stager.prototype.getIndexOfStage = function (stage) {
                    return _.indexOf(this.stages, stage);
                };

                Stager.prototype.freezeStage = function (stage) {
                    this.stage.evaluate();
                    this.ui.teammates.evaluateImmediate();

                    this.freezes[this.getIndexOfStage(stage)] = this.freeze(this.teammates);
                };

                Stager.prototype.freeze = function (teammates) {
                    var frozen;

                    frozen = _.map(teammates, function (teammate) {
                        return {
                            henchman_id: teammate.henchman.id,
                            henchman_name: teammate.henchman.name,
                            is_loyal: teammate.is_loyal,
                            is_recruited: teammate.is_recruited,
                            is_dead: teammate.is_dead,
                            death_cause: teammate.death_cause,
                            roles: teammate.roles
                        };
                    });

                    return JSON.stringify(frozen);
                };

                Stager.prototype.defrost = function (teammates) {
                    var _this = this;
                    var frozen;
                    frozen = JSON.parse(teammates);

                    return _.map(frozen, function (frosted) {
                        var teammate;
                        teammate = new App.ME2.Teammate(_this.app.getHenchman(frosted.henchman_id), frosted.is_loyal, frosted.is_recruited, frosted.is_dead);
                        teammate.death_cause = frosted.death_cause;
                        teammate.roles = frosted.roles;
                        return teammate;
                    });
                };

                Stager.prototype.previousStage = function () {
                    var index;
                    if (this.stage) {
                        index = this.getIndexOfStage(this.stage) - 1;
                        this.setStage(this.stages[index]);
                        this.teammates = this.defrost(this.freezes[index]);
                        this.ui.teammates.evaluateImmediate();
                    }
                };

                Stager.prototype.nextStage = function () {
                    var index;

                    if (this.stage) {
                        index = this.getIndexOfStage(this.stage);

                        if (this.stage.isEvaluatable()) {
                            this.freezeStage(this.stage);

                            if (index < this.stages.length - 1) {
                                this.setStage(this.stages[this.getIndexOfStage(this.stage) + 1]);
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
                    this.stage = stage;
                    this.ui.stage(stage);
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
                    this.ui = new App.ME2.Stages.UI.Occulus(this);
                }
                Occulus.prototype.evaluate = function () {
                    var dpt;

                    this.occulus_squadmate_1.addRole(0 /* OcculusSquadmate */);
                    this.occulus_squadmate_2.addRole(0 /* OcculusSquadmate */);

                    dpt = (new App.ME2.Teammates(this.stager.teammates)).withoutRole(0 /* OcculusSquadmate */);

                    if (!this.stager.app.normandy.has_shielding) {
                        dpt.alive().sortByShieldingDeathPriority().last().die(1 /* ShieldingFailure */);
                    }

                    if (!this.stager.app.normandy.has_armour) {
                        dpt.alive().sortByArmourDeathPriority().last().die(0 /* ArmourFailure */);
                    }

                    if (!this.stager.app.normandy.has_thanix_cannon) {
                        dpt.alive().sortByCannonDeathPriority().last().die(2 /* CannonFailure */);
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
                    this.ui = new App.ME2.Stages.UI.Vents(this);
                }
                Vents.prototype.evaluate = function () {
                    this.vent_squadmate_1.addRole(1 /* VentsSquadmate */);
                    this.vent_squadmate_2.addRole(1 /* VentsSquadmate */);
                    this.vent_venter.addRole(2 /* VentsVenter */);
                    this.vent_leader.addRole(3 /* VentsLeader */);

                    if (!this.vent_venter.willBeEffectiveVentVenter()) {
                        this.vent_venter.die(3 /* VentsBadVenter */);
                    } else if (!this.vent_leader.willBeEffectiveVentLeader()) {
                        this.vent_venter.die(4 /* VentsBadLeader */);
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
                    this.ui = new App.ME2.Stages.UI.LongWalk(this);
                }
                LongWalk.prototype.evaluate = function () {
                    this.long_walk_squadmate_1.addRole(4 /* LongWalkSquadmate */);
                    this.long_walk_squadmate_2.addRole(4 /* LongWalkSquadmate */);
                    this.long_walk_escort.addRole(5 /* LongWalkEscort */);
                    this.long_walk_leader.addRole(7 /* LongWalkLeader */);
                    this.long_walk_bubbler.addRole(6 /* LongWalkBubbler */);

                    if (!this.long_walk_escort.willBeEffectiveLongWalkEscort()) {
                        this.long_walk_escort.die(7 /* Escort */);
                    }

                    if (!this.long_walk_bubbler.willBeEffectiveLongWalkBubbler()) {
                        (new App.ME2.Teammates(this.stager.teammates)).withRole(4 /* LongWalkSquadmate */).sortByLongWalkDeathPriority().last().die(5 /* LongWalkBadBubbler */);
                    }

                    if (!this.long_walk_leader.willBeEffectiveLongWalkLeader()) {
                        this.long_walk_leader.die(6 /* LongWalkBadLeader */);
                    }
                };

                LongWalk.prototype.isEvaluatable = function () {
                    return !!this.long_walk_bubbler && !!this.long_walk_escort && !!this.long_walk_leader && !!this.long_walk_squadmate_1 && !!this.long_walk_squadmate_2;
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
            var Setup = (function (_super) {
                __extends(Setup, _super);
                function Setup(stager) {
                    _super.call(this, stager);
                    this.ui = new App.ME2.Stages.UI.Setup(this);
                }
                Setup.prototype.evaluate = function () {
                    this.stager.teammates = (new App.ME2.Teammates(this.stager.teammates)).recruited().value();
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

            Teammate.prototype.die = function (death_cause) {
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

            Teammates.prototype.die = function (death_cause) {
                this.each(function (teammate) {
                    teammate.die(death_cause);
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
        (function (Stages) {
            (function (UI) {
                var Stager = (function () {
                    function Stager(stager) {
                        var _this = this;
                        this.stage = ko.observable(undefined);
                        this.stager = stager;
                        this.teammates = ko.forcibleComputed(function () {
                            return _this.stager.teammates;
                        });
                    }
                    return Stager;
                })();
                UI.Stager = Stager;
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
                (function (StageIDs) {
                    StageIDs[StageIDs["Setup"] = 0] = "Setup";
                    StageIDs[StageIDs["Occulus"] = 1] = "Occulus";
                    StageIDs[StageIDs["Vents"] = 2] = "Vents";
                    StageIDs[StageIDs["LongWalk"] = 3] = "LongWalk";
                    StageIDs[StageIDs["Boss"] = 4] = "Boss";
                    StageIDs[StageIDs["Summary"] = 5] = "Summary";
                })(UI.StageIDs || (UI.StageIDs = {}));
                var StageIDs = UI.StageIDs;

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

                        candidates = _.filter(this.stage.stager.teammates, field.filter);

                        candidates = _.filter(candidates, function (candidate) {
                            return !_.find(_this.teammate_fields, function (other_field) {
                                return other_field.name !== field.name && _this.stage[other_field.name] === candidate;
                            });
                        });

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
                                observable = _this[field.name];
                                teammate = observable();
                                return teammate ? !teammate.henchman : true;
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
                    Stage.no_teammate = new App.ME2.Teammate();
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
                        this.id = UI.StageIDs[4 /* Boss */];
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
                        this.id = UI.StageIDs[3 /* LongWalk */];
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
                                    return !teammate.is_dead && teammate.henchman.is_long_walk_leader_candidate;
                                }
                            },
                            {
                                name: "long_walk_escort",
                                filter: function (teammate) {
                                    return !teammate.is_dead && teammate.henchman.is_escort_candidate;
                                }
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
                        this.id = UI.StageIDs[1 /* Occulus */];
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
                    function Setup(stage) {
                        _super.call(this, stage);
                        this.id = UI.StageIDs[0 /* Setup */];
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
                        this.teammates = _.map(this.stage.stager.teammates, function (teammate) {
                            var ui_teammate;
                            ui_teammate = new App.ME2.UI.Teammate(teammate);

                            return ui_teammate;
                        });

                        this.normandy = new App.ME2.UI.Normandy(this.stage.stager.app.normandy);
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
                        this.id = UI.StageIDs[2 /* Vents */];
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
                                    return !teammate.is_dead && teammate.henchman.is_vent_leader_candidate;
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
                var Summary = (function (_super) {
                    __extends(Summary, _super);
                    function Summary(stage) {
                        _super.call(this, stage);
                        this.id = UI.StageIDs[5 /* Summary */];
                        this.label = "Summary";
                        this.shepard_lives = ko.observable(undefined);
                        this.shepard_pulled_up_by = ko.observable(undefined);
                        this.defence_reporter = ko.observable(undefined);
                        this.keep_base_advocate = ko.observable(undefined);
                        this.destroy_base_advocate = ko.observable(undefined);
                    }
                    Summary.prototype.getLivingTeammates = function () {
                        return _.filter(this.stage.stager.teammates, function (teammate) {
                            return !teammate.is_dead;
                        });
                    };

                    Summary.prototype.getShepardLives = function () {
                        return this.getLivingTeammates().length > 1;
                    };

                    Summary.prototype.getShepardCatcher = function () {
                        var living_teammates;
                        var score;
                        living_teammates = _.sortBy(this.getLivingTeammates(), function (teammate) {
                            score = teammate.henchman.cutscene_rescue_priority + (teammate.hasRole(8 /* BossSquadmate */) ? 100 : 0);
                            return score;
                        });

                        return living_teammates.length > 1 ? living_teammates.pop() : undefined;
                    };

                    Summary.prototype.getDefenceReporter = function () {
                        return _.chain(this.stage.stager.teammates).filter(function (teammate) {
                            return teammate.hasRole(9 /* HeldTheLine */);
                        }).sortBy(function (teammate) {
                            return teammate.henchman.defence_report_priority;
                        }).pop().value();
                    };

                    Summary.prototype.getKeepBaseAdvocate = function () {
                        return _.chain(this.stage.stager.teammates).filter(function (teammate) {
                            return teammate.hasRole(8 /* BossSquadmate */) && teammate.henchman.keep_base_priority > 0;
                        }).sortBy(function (teammate) {
                            return teammate.henchman.keep_base_priority;
                        }).pop().value();
                    };

                    Summary.prototype.getDestroyBaseAdvocate = function () {
                        return _.chain(this.stage.stager.teammates).filter(function (teammate) {
                            return teammate.hasRole(8 /* BossSquadmate */) && teammate.henchman.destroy_base_priority > 0;
                        }).sortBy(function (teammate) {
                            return teammate.henchman.destroy_base_priority;
                        }).pop().value();
                    };

                    Summary.prototype.setup = function () {
                        this.defence_reporter(this.getDefenceReporter());
                        this.shepard_lives(this.getShepardLives());
                        this.shepard_pulled_up_by(this.getShepardCatcher());
                        this.keep_base_advocate(this.getKeepBaseAdvocate());
                        this.destroy_base_advocate(this.getDestroyBaseAdvocate());
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
        (function (Stages) {
            var Boss = (function (_super) {
                __extends(Boss, _super);
                function Boss(stager) {
                    _super.call(this, stager);
                    this.ui = new App.ME2.Stages.UI.Boss(this);
                }
                Boss.prototype.evaluate = function () {
                    this.boss_squadmate_1.addRole(8 /* BossSquadmate */);
                    this.boss_squadmate_2.addRole(8 /* BossSquadmate */);

                    if (!this.boss_squadmate_1.willSurviveBeingBossSquadmate()) {
                        this.boss_squadmate_1.die(8 /* Boss */);
                    }
                    if (!this.boss_squadmate_2.willSurviveBeingBossSquadmate()) {
                        this.boss_squadmate_2.die(8 /* Boss */);
                    }

                    (new App.ME2.Teammates(this.stager.teammates)).alive().withoutRole(8 /* BossSquadmate */).addRole(9 /* HeldTheLine */).whoDieHoldingTheLine().die(9 /* HoldTheLine */);
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
//# sourceMappingURL=app-1.0.0.js.map
