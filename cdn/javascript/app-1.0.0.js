var App;
(function (App) {
    var Application = (function () {
        function Application() {
            this.normandy = new App.ME2.Normandy(true, true, true);

            this.henchmen = [
                new App.ME2.Henchman(0 /* Garrus */, "Garrus Vakarian", 3, 5, 0, 8, 11, 10, 2, false, false, true, false, true, true, false, true, true),
                new App.ME2.Henchman(1 /* Grunt */, "Grunt", 3, 0, 0, 6, 9, 8, 4, false, false, false, false, true, false, false, true, true),
                new App.ME2.Henchman(12 /* Zaeed */, "Zaeed Masani", 3, 1, 0, 7, 10, 2, 10, false, false, false, false, true, false, false, true, true),
                new App.ME2.Henchman(6 /* Miranda */, "Miranda Lawson", 1, 7, 0, 0, 0, -1, 11, false, false, true, true, false, false, true, true, true),
                new App.ME2.Henchman(3 /* Jacob */, "Jacob Taylor", 1, 6, 0, 0, 0, 6, 7, false, false, true, false, true, true, true, true, true),
                new App.ME2.Henchman(9 /* Samara */, "Samara", 1, 4, 0, 4, 7, 7, 5, false, true, false, false, true, false, true, true, true),
                new App.ME2.Henchman(11 /* Thane */, "Thane", 1, 2, 0, 9, 12, 12, 0, false, false, false, false, true, true, true, true, true),
                new App.ME2.Henchman(5 /* Legion */, "Legion", 1, 3, 0, 11, 0, 9, 3, true, false, false, false, true, true, false, true, true),
                new App.ME2.Henchman(4 /* Kasumi */, "Kasumi Goto", 0, 9, 0, 12, 0, 3, 9, true, false, false, false, true, true, false, true, true),
                new App.ME2.Henchman(10 /* Tali */, "Tali'zorah", 0, 10, 0, 10, 0, 4, 8, true, false, false, false, true, true, false, true, true),
                new App.ME2.Henchman(2 /* Jack */, "Jack", 0, 8, 12, 5, 8, 11, 1, false, true, false, false, true, false, true, true, true),
                new App.ME2.Henchman(7 /* Mordin */, "Mordin Solus", 0, 11, 0, 0, 0, 5, 6, false, false, false, false, true, true, false, true, true)
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
            function Henchman(id, name, htl_value, htl_death_priority, armour_death_priority, shielding_death_priority, cannon_death_priority, long_walk_death_priority, cutscene_rescue_priority, is_tech_expert, is_biotic_expert, is_leader, is_super_leader, is_escort_candidate, is_vent_candidate, is_bubble_candidate, is_vent_leader_candidate, is_long_walk_leader_candidate) {
                if (typeof name === "undefined") { name = ""; }
                if (typeof htl_value === "undefined") { htl_value = 0; }
                if (typeof htl_death_priority === "undefined") { htl_death_priority = 0; }
                if (typeof armour_death_priority === "undefined") { armour_death_priority = 0; }
                if (typeof shielding_death_priority === "undefined") { shielding_death_priority = 0; }
                if (typeof cannon_death_priority === "undefined") { cannon_death_priority = 0; }
                if (typeof long_walk_death_priority === "undefined") { long_walk_death_priority = 0; }
                if (typeof cutscene_rescue_priority === "undefined") { cutscene_rescue_priority = 0; }
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
                this.htl_value = 0;
                this.htl_death_priority = 0;
                this.shielding_death_priority = 0;
                this.cutscene_rescue_priority = 0;
                this.is_tech_expert = false;
                this.is_biotic_expert = false;
                this.is_leader = false;
                this.is_super_leader = false;
                this.is_escort_candidate = false;
                this.is_vent_candidate = false;
                this.is_bubble_candidate = false;
                this.is_vent_leader_candidate = false;
                this.is_long_walk_leader_candidate = false;
                this.id = id;
                this.name = name;
                this.htl_value = htl_value;
                this.htl_death_priority = htl_death_priority;
                this.armour_death_priority = armour_death_priority;
                this.shielding_death_priority = shielding_death_priority;
                this.cannon_death_priority = cannon_death_priority;
                this.long_walk_death_priority = long_walk_death_priority;
                this.cutscene_rescue_priority = cutscene_rescue_priority;
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
var App;
(function (App) {
    (function (ME2) {
        (function (Stages) {
            var Stage = (function () {
                function Stage() {
                }
                Stage.prototype.setStager = function (stager) {
                    this.stager = stager;
                    return this;
                };

                Stage.prototype.evaluate = function () {
                    return this.teammates;
                };

                Stage.prototype.setup = function (teammates) {
                    this.teammates = teammates;
                    this.ui.setup();
                };

                Stage.prototype.isEvaluatable = function () {
                    return true;
                };
                return Stage;
            })();
            Stages.Stage = Stage;
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
            var SquadmatesStage = (function (_super) {
                __extends(SquadmatesStage, _super);
                function SquadmatesStage() {
                    _super.call(this);
                }
                SquadmatesStage.prototype.isEvaluatable = function () {
                    return !!this.squadmate_1 && !!this.squadmate_2;
                };
                return SquadmatesStage;
            })(Stages.Stage);
            Stages.SquadmatesStage = SquadmatesStage;
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
                    this.teammates = [];
                    this.stages = [
                        (new App.ME2.Stages.Setup()).setStager(this),
                        (new App.ME2.Stages.Occulus()).setStager(this),
                        (new App.ME2.Stages.Vents()).setStager(this),
                        (new App.ME2.Stages.LongWalk()).setStager(this),
                        (new App.ME2.Stages.Boss()).setStager(this)
                    ];

                    this.ui = (new App.ME2.Stages.UI.Stager()).setStager(this);
                }
                Stager.prototype.getIndexOfStage = function (stage) {
                    return _.indexOf(this.stages, stage);
                };

                Stager.prototype.freezeStage = function (stage) {
                    var teammates;

                    teammates = this.stage.evaluate(this.teammates);

                    this.freezes[this.getIndexOfStage(stage)] = this.freeze(teammates);

                    this.teammates = teammates;
                };

                Stager.prototype.freeze = function (teammates) {
                    var frozen;

                    frozen = _.map(teammates, function (teammate) {
                        return {
                            henchman_id: teammate.henchman.id,
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
                    }
                };

                Stager.prototype.nextStage = function () {
                    if (this.stage) {
                        if (this.stage.isEvaluatable() || true) {
                            this.freezeStage(this.stage);
                            this.setStage(this.stages[this.getIndexOfStage(this.stage) + 1]);
                        } else {
                            throw new Error("Current Stage is not evaluatable.");
                        }
                    } else {
                        this.setStage(this.stages[0]);
                    }
                };

                Stager.prototype.setStage = function (stage) {
                    this.stage = stage;
                    this.ui.stage(stage);
                    stage.setup(this.teammates);
                };
                return Stager;
            })();
            Stages.Stager = Stager;
        })(ME2.Stages || (ME2.Stages = {}));
        var Stages = ME2.Stages;
    })(App.ME2 || (App.ME2 = {}));
    var ME2 = App.ME2;
})(App || (App = {}));
var App;
(function (App) {
    (function (ME2) {
        (function (Stages) {
            var Occulus = (function (_super) {
                __extends(Occulus, _super);
                function Occulus() {
                    _super.call(this);

                    this.ui = new App.ME2.Stages.UI.Occulus(this);
                }
                Occulus.prototype.evaluate = function () {
                    var death_pool;
                    var shielding_death;
                    var armour_death;
                    var thanix_cannon_death;

                    this.occulus_squadmate_1.addRole(0 /* OcculusSquadmate */);
                    this.occulus_squadmate_2.addRole(0 /* OcculusSquadmate */);

                    death_pool = _.filter(this.teammates, function (teammate) {
                        return !teammate.is_dead && !teammate.hasRole(0 /* OcculusSquadmate */);
                    });

                    if (!this.stager.app.normandy.has_shielding) {
                        death_pool = _.sortBy(death_pool, function (teammate) {
                            return teammate.henchman.shielding_death_priority;
                        });
                        shielding_death = death_pool.pop();
                        shielding_death.die(1 /* ShieldingFailure */);
                    }

                    if (!this.stager.app.normandy.has_armour) {
                        death_pool = _.sortBy(death_pool, function (teammate) {
                            return teammate.henchman.armour_death_priority;
                        });
                        armour_death = death_pool.pop();
                        armour_death.die(0 /* ArmourFailure */);
                    }

                    if (!this.stager.app.normandy.has_thanix_cannon) {
                        death_pool = _.sortBy(death_pool, function (teammate) {
                            return teammate.henchman.cannon_death_priority;
                        });
                        thanix_cannon_death = death_pool.pop();
                        thanix_cannon_death.die(2 /* CannonFailure */);
                    }

                    return this.teammates;
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
                function Vents() {
                    _super.call(this);
                    this.ui = new App.ME2.Stages.UI.Vents(this);
                }
                Vents.prototype.evaluate = function () {
                    this.vent_squadmate_1.addRole(1 /* VentsSquadmate */);
                    this.vent_squadmate_2.addRole(1 /* VentsSquadmate */);
                    this.vent_venter.addRole(2 /* VentsVenter */);
                    this.vent_leader.addRole(3 /* VentsLeader */);

                    if (this.vent_venter.henchman.is_tech_expert && this.vent_venter.is_loyal && this.vent_leader.henchman.is_leader && this.vent_leader.is_loyal) {
                    } else {
                        this.vent_venter.die(3 /* Vents */);
                    }

                    return this.teammates;
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
                function LongWalk() {
                    _super.call(this);
                    this.ui = new App.ME2.Stages.UI.LongWalk(this);
                }
                LongWalk.prototype.evaluate = function () {
                    this.long_walk_squadmate_1.addRole(4 /* LongWalkSquadmate */);
                    this.long_walk_squadmate_2.addRole(4 /* LongWalkSquadmate */);
                    this.long_walk_escort.addRole(5 /* LongWalkEscort */);
                    this.long_walk_leader.addRole(7 /* LongWalkLeader */);
                    this.long_walk_bubbler.addRole(6 /* LongWalkBubbler */);

                    if (!this.long_walk_escort.is_loyal) {
                        this.long_walk_escort.die(5 /* Escort */);
                    }

                    if (this.long_walk_bubbler.is_loyal && this.long_walk_bubbler.henchman.is_biotic_expert) {
                    } else {
                        if (this.long_walk_squadmate_1.henchman.long_walk_death_priority > this.long_walk_squadmate_2.henchman.long_walk_death_priority) {
                            this.long_walk_squadmate_1.die(4 /* LongWalk */);
                        } else {
                            this.long_walk_squadmate_2.die(4 /* LongWalk */);
                        }
                    }

                    if (this.long_walk_leader.henchman.is_long_walk_leader_candidate && (this.long_walk_leader.is_loyal || this.long_walk_leader.henchman.is_super_leader)) {
                    } else {
                        this.long_walk_leader.die(4 /* LongWalk */);
                    }

                    return this.teammates;
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
                function Setup() {
                    _super.call(this);
                    this.ui = new App.ME2.Stages.UI.Setup(this);
                }
                Setup.prototype.bootstrapTeammates = function () {
                    this.teammates = _.map(this.stager.app.getHenchmen(), function (henchman) {
                        return new App.ME2.Teammate(henchman, true, true, false);
                    });
                };

                Setup.prototype.setup = function (teammates) {
                    this.bootstrapTeammates();
                    this.ui.setup();
                };

                Setup.prototype.evaluate = function () {
                    return this.teammates;
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
        (function (TeammateDeathCauses) {
            TeammateDeathCauses[TeammateDeathCauses["ArmourFailure"] = 0] = "ArmourFailure";
            TeammateDeathCauses[TeammateDeathCauses["ShieldingFailure"] = 1] = "ShieldingFailure";
            TeammateDeathCauses[TeammateDeathCauses["CannonFailure"] = 2] = "CannonFailure";
            TeammateDeathCauses[TeammateDeathCauses["Vents"] = 3] = "Vents";
            TeammateDeathCauses[TeammateDeathCauses["LongWalk"] = 4] = "LongWalk";
            TeammateDeathCauses[TeammateDeathCauses["Escort"] = 5] = "Escort";
            TeammateDeathCauses[TeammateDeathCauses["Boss"] = 6] = "Boss";
            TeammateDeathCauses[TeammateDeathCauses["HoldTheLine"] = 7] = "HoldTheLine";
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
            Teammate.prototype.setHenchman = function (henchman) {
                this.henchman = henchman;
                return this;
            };

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

            Teammate.prototype.die = function (death_cause) {
                this.is_dead = true;
                this.death_cause = death_cause;
                console.log("[Teammate]", this.henchman.name, "died because", TeammateDeathCauses[death_cause]);
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
        (function (Stages) {
            (function (UI) {
                var Stager = (function () {
                    function Stager() {
                        this.stage = ko.observable(undefined);
                    }
                    Stager.prototype.setStager = function (stager) {
                        this.stager = stager;
                        return this;
                    };
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
                })(UI.StageIDs || (UI.StageIDs = {}));
                var StageIDs = UI.StageIDs;

                var Stage = (function () {
                    function Stage(stage) {
                        this.teammate_fields = {};
                        this.stage = stage;
                    }
                    Stage.genericTeammateFieldFilter = function (teammate) {
                        return true;
                    };

                    Stage.prototype.getTeammateCandidatesFor = function (field) {
                        var _this = this;
                        var candidates;
                        var found;

                        candidates = _.filter(this.getLivingCandidates(), this.teammate_fields[field]);

                        candidates = _.filter(candidates, function (candidate) {
                            found = false;

                            _.each(_this.teammate_fields, function (filter, key) {
                                if (key !== field && _this.stage[key] === candidate) {
                                    found = true;
                                }
                            });

                            return !found;
                        });

                        return candidates;
                    };

                    Stage.prototype.bootstrapTeammateField = function (field) {
                        var _this = this;
                        this[field] = ko.observable(undefined);
                        this[field + "_candidates"] = ko.forcibleComputed(function () {
                            return _this.getTeammateCandidatesFor(field);
                        });
                    };

                    Stage.prototype.bootstrapTeammateFields = function () {
                        var _this = this;
                        _.each(_.keys(this.teammate_fields), function (field) {
                            _this.bootstrapTeammateField(field);
                        });
                    };

                    Stage.prototype.setupTeammateField = function (field) {
                        var _this = this;
                        this[field].subscribe(function (new_value) {
                            _this.stage[field] = new_value;

                            _.each(_this.teammate_fields, function (filter, key) {
                                if (key !== field) {
                                    _this[key + "_candidates"].evaluateImmediate();
                                }
                            });
                        });

                        this[field](this.stage[field]);
                    };

                    Stage.prototype.setupTeammateFields = function () {
                        var _this = this;
                        _.each(_.keys(this.teammate_fields), function (field) {
                            _this.setupTeammateField(field);
                        });

                        _.each(_.keys(this.teammate_fields), function (field) {
                            _this[field + "_candidates"].evaluateImmediate();
                        });
                    };

                    Stage.prototype.proxy = function (property_name) {
                        var _this = this;
                        this[property_name](this.stage[property_name]);
                        this[property_name].subscribe(function (new_value) {
                            _this.stage[property_name] = new_value;
                        });
                    };

                    Stage.prototype.getLivingCandidates = function () {
                        return _.filter(this.stage.teammates, function (teammate) {
                            return !teammate.is_dead;
                        });
                    };

                    Stage.prototype.renderTeammateForSelect = function (teammate) {
                        return teammate.henchman.name;
                    };

                    Stage.prototype.setup = function () {
                    };
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
                var SquadmatesStage = (function (_super) {
                    __extends(SquadmatesStage, _super);
                    function SquadmatesStage() {
                        _super.apply(this, arguments);
                    }
                    SquadmatesStage.prototype.setupSquadmates = function () {
                    };
                    return SquadmatesStage;
                })(UI.Stage);
                UI.SquadmatesStage = SquadmatesStage;
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
                        this.teammate_fields = {
                            "boss_squadmate_1": UI.Stage.genericTeammateFieldFilter,
                            "boss_squadmate_2": UI.Stage.genericTeammateFieldFilter
                        };
                        this.bootstrapTeammateFields();
                    }
                    Boss.prototype.setup = function () {
                        this.setupTeammateFields();
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
                        this.teammate_fields = {
                            "long_walk_squadmate_1": UI.Stage.genericTeammateFieldFilter,
                            "long_walk_squadmate_2": UI.Stage.genericTeammateFieldFilter,
                            "long_walk_escort": function (teammate) {
                                return teammate.henchman.is_escort_candidate;
                            },
                            "long_walk_bubbler": function (teammate) {
                                return teammate.henchman.is_bubble_candidate;
                            },
                            "long_walk_leader": function (teammate) {
                                return teammate.henchman.is_long_walk_leader_candidate;
                            }
                        };
                        this.bootstrapTeammateFields();
                    }
                    LongWalk.prototype.setup = function () {
                        this.setupTeammateFields();
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
                        this.teammate_fields = {
                            "occulus_squadmate_1": UI.Stage.genericTeammateFieldFilter,
                            "occulus_squadmate_2": UI.Stage.genericTeammateFieldFilter
                        };
                        this.bootstrapTeammateFields();
                    }
                    Occulus.prototype.setup = function () {
                        this.setupTeammateFields();
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
                        this.bootstrapTeammates();
                    };

                    Setup.prototype.bootstrapTeammates = function () {
                        this.teammates = _.map(this.stage.teammates, function (teammate) {
                            return new App.ME2.UI.Teammate(teammate);
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
                        this.teammate_fields = {
                            "vent_squadmate_1": UI.Stage.genericTeammateFieldFilter,
                            "vent_squadmate_2": UI.Stage.genericTeammateFieldFilter,
                            "vent_venter": function (teammate) {
                                return teammate.henchman.is_vent_candidate;
                            },
                            "vent_leader": function (teammate) {
                                return teammate.henchman.is_vent_leader_candidate;
                            }
                        };
                        this.bootstrapTeammateFields();
                    }
                    Vents.prototype.setup = function () {
                        this.setupTeammateFields();
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
                    _super.call(this);
                    this.is_recruited = ko.observable(undefined);
                    this.is_loyal = ko.observable(undefined);
                    this.is_dead = ko.observable(undefined);
                    this.teammate = teammate;

                    this.link(this.teammate, "is_recruited");
                    this.link(this.teammate, "is_loyal");
                    this.link(this.teammate, "is_dead");
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
                function Boss() {
                    _super.call(this);
                    this.ui = new App.ME2.Stages.UI.Boss(this);
                }
                Boss.prototype.getHTLDeathCount = function (total, pool_size) {
                    var score;
                    score = total / pool_size;
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

                Boss.prototype.evaluate = function () {
                    var _this = this;
                    var htl_pool;
                    var htl_total;

                    if (!this.boss_squadmate_1.is_loyal) {
                        this.boss_squadmate_1.die(6 /* Boss */);
                    }
                    if (!this.boss_squadmate_2.is_loyal) {
                        this.boss_squadmate_2.die(6 /* Boss */);
                    }

                    htl_pool = _.filter(this.teammates, function (teammate) {
                        return !teammate.is_dead && teammate.henchman.id !== _this.boss_squadmate_1.henchman.id && teammate.henchman.id !== _this.boss_squadmate_2.henchman.id && !teammate.hasRole(5 /* LongWalkEscort */);
                    });

                    htl_total = _.chain(htl_pool).map(function (teammate) {
                        return teammate.getHoldTheLineScore();
                    }).reduce(function (sum, score) {
                        return sum + score;
                    }, 0)["value"]();

                    if (htl_total / htl_pool.length < 2.0) {
                        htl_pool = _.sortBy(htl_pool, function (teammate) {
                            return teammate.henchman.htl_death_priority + (!teammate.is_loyal ? 100 : 0);
                        });
                        console.log("death order", htl_pool);

                        htl_pool = htl_pool.slice(-1 * this.getHTLDeathCount(htl_total, htl_pool.length));

                        console.log("death section", htl_pool);
                    }

                    return this.teammates;
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
