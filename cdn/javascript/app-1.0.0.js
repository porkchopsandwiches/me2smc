

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
                var _this = this;
                this.henchman = henchman;
                this.is_recruited = ko.observable(is_recruited);
                this.is_loyal = ko.observable(is_loyal);
                this.is_dead = ko.observable(is_dead);
                this.roles = [];

                this.is_recruited.subscribe(function (is_recruited) {
                    if (!is_recruited && _this.is_loyal()) {
                        _this.is_loyal(false);
                    }
                });
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
                return this.henchman.htl_value + (this.is_loyal() ? 1 : 0);
            };

            Teammate.prototype.willBeEffectiveLongWalkLeader = function () {
                return this.henchman.is_leader && (this.is_loyal() || this.henchman.is_super_leader);
            };

            Teammate.prototype.willBeEffectiveLongWalkEscort = function () {
                return this.is_loyal();
            };

            Teammate.prototype.willBeEffectiveLongWalkBubbler = function () {
                return this.is_loyal() && this.henchman.is_biotic_expert;
            };

            Teammate.prototype.willSurviveBeingBossSquadmate = function () {
                return this.is_loyal();
            };

            Teammate.prototype.willBeEffectiveVentVenter = function () {
                return this.henchman.is_tech_expert && this.is_loyal();
            };

            Teammate.prototype.willBeEffectiveVentLeader = function () {
                return this.henchman.is_leader && this.is_loyal();
            };

            Teammate.prototype.die = function (stage_id, death_cause) {
                this.death_stage_id = stage_id;
                this.death_cause = death_cause;
                this.is_dead(true);
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
                    return !teammate.is_dead();
                });
            };

            Teammates.prototype.dead = function () {
                return this.filter(function (teammate) {
                    return teammate.is_dead();
                });
            };

            Teammates.prototype.loyal = function () {
                return this.filter(function (teammate) {
                    return teammate.is_loyal();
                });
            };

            Teammates.prototype.disloyal = function () {
                return this.filter(function (teammate) {
                    return !teammate.is_loyal();
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
                    return teammate.is_recruited();
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
                        return teammate.henchman.htl_death_priority + (!teammate.is_loyal() ? 100 : 0);
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
                this._delay = ko.observable(delay);

                this.delay = ko.pureComputed({
                    read: function () {
                        return _this._delay();
                    },
                    write: function (value) {
                        var delay;
                        delay = parseInt("" + value, 10);

                        if (!_.isNaN(delay)) {
                            _this._delay(delay);
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
                Stage.genericTeammateFieldFilter = function (teammate) {
                    return teammate.is_recruited() && !teammate.is_dead();
                };

                Stage.prototype.evaluate = function () {
                };

                Stage.prototype.configureFields = function (configs) {
                    var _this = this;
                    this.fields = _.map(configs, function (config) {
                        var field;

                        field = {
                            config: config,
                            observable: ko.observable(undefined),
                            candidates: ko.forcibleComputed(function () {
                                var candidates;

                                candidates = _this.stager.app.state.teammates().filter(function (teammate) {
                                    return config.filter(teammate, _this.stager.app.state.teammates());
                                }).filter(function (candidate) {
                                    return !_.find(_this.fields, function (other_field) {
                                        if (other_field.config.name !== config.name && other_field.observable) {
                                            if (other_field.observable() === candidate) {
                                                return true;
                                            }
                                        }

                                        return false;
                                    });
                                }).value();

                                candidates.unshift(App.ME2.Stages.Stage.no_teammate);

                                return candidates;
                            })
                        };

                        return field;
                    });
                };

                Stage.prototype.getField = function (name) {
                    return _.find(this.fields, function (field) {
                        return field.config.name === name;
                    });
                };

                Stage.prototype.getFieldObservable = function (name) {
                    return this.getField(name).observable;
                };

                Stage.prototype.getFieldCandidates = function (name) {
                    return this.getField(name).candidates;
                };

                Stage.prototype.getFieldValue = function (name) {
                    return this.getFieldObservable(name)();
                };

                Stage.prototype.setupFields = function () {
                    var _this = this;
                    if (this.fields) {
                        _.each(this.fields, function (field) {
                            field.observable.subscribe(function () {
                                _.each(_this.fields, function (other_field) {
                                    if (other_field.config.name !== field.config.name) {
                                        other_field.candidates.evaluateImmediate();
                                    }
                                });
                            });
                        });

                        _.each(this.fields, function (field) {
                            field.candidates.evaluateImmediate();
                        });
                    }
                };

                Stage.prototype.linkIsEvaluatableToFields = function () {
                    var _this = this;
                    if (this.fields) {
                        this.is_evaluatable = ko.forcibleComputed(function () {
                            var teammate;
                            var fields_missing;

                            fields_missing = !!_.find(_this.fields, function (field) {
                                if (field.config.optional) {
                                    return false;
                                }

                                teammate = field.observable();

                                return teammate ? (teammate.henchman.id === undefined) : true;
                            });

                            return !fields_missing;
                        });
                    }
                };

                Stage.prototype.setup = function () {
                    this.setupFields();
                    this.linkIsEvaluatableToFields();
                };

                Stage.prototype.isEvaluatable = function () {
                    return this.is_evaluatable();
                };
                Stage.no_teammate = new App.ME2.Teammate(new App.ME2.Henchman(undefined, undefined, "— None —"));
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

                    this.app.state.stage.subscribe(function (stage) {
                        console.log("Before stage change...");
                        stage.setup();
                    }, "beforeChange");
                }
                Stager.prototype.getStage = function (id) {
                    return this.stages[id];
                };

                Stager.prototype.previousStage = function () {
                    var current_stage;
                    current_stage = this.app.state.stage();
                    if (current_stage) {
                        this.app.state.applySerialisedState(this.freezes[current_stage.id - 1]);

                        this.setStage(this.stages[current_stage.id - 1]);
                    }
                };

                Stager.prototype.nextStage = function () {
                    var current_stage;

                    current_stage = this.app.state.stage();

                    if (current_stage) {
                        if (current_stage.isEvaluatable()) {
                            this.freezes[current_stage.id] = this.app.state.serialise();

                            current_stage.evaluate();

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
                    this.app.state.stage(stage);
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
                    this.label = "Occulus";

                    this.configureFields([
                        {
                            name: "occulus_squadmate_1",
                            filter: App.ME2.Stages.Stage.genericTeammateFieldFilter
                        },
                        {
                            name: "occulus_squadmate_2",
                            filter: App.ME2.Stages.Stage.genericTeammateFieldFilter
                        }
                    ]);
                }
                Occulus.prototype.evaluate = function () {
                    var dpt;

                    this.getFieldValue("occulus_squadmate_1").addRole(0 /* OcculusSquadmate */);
                    this.getFieldValue("occulus_squadmate_2").addRole(0 /* OcculusSquadmate */);

                    dpt = this.stager.app.state.teammates().withoutRole(0 /* OcculusSquadmate */);

                    if (!this.stager.app.state.normandy.has_shielding()) {
                        dpt.alive().sortByShieldingDeathPriority().last().die(this.id, 1 /* ShieldingFailure */);
                    }

                    if (!this.stager.app.state.normandy.has_armour()) {
                        dpt.alive().sortByArmourDeathPriority().last().die(this.id, 0 /* ArmourFailure */);
                    }

                    if (!this.stager.app.state.normandy.has_thanix_cannon()) {
                        dpt.alive().sortByCannonDeathPriority().last().die(this.id, 2 /* CannonFailure */);
                    }
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
                    this.id = 2 /* Vents */;
                    this.label = "Vents";

                    this.configureFields([
                        {
                            name: "vent_squadmate_1",
                            filter: App.ME2.Stages.Stage.genericTeammateFieldFilter
                        },
                        {
                            name: "vent_squadmate_2",
                            filter: App.ME2.Stages.Stage.genericTeammateFieldFilter
                        },
                        {
                            name: "vent_venter",
                            filter: function (teammate) {
                                return teammate.is_recruited() && !teammate.is_dead() && teammate.henchman.is_vent_candidate;
                            }
                        },
                        {
                            name: "vent_leader",
                            filter: function (teammate) {
                                return teammate.is_recruited() && !teammate.is_dead() && teammate.henchman.is_leader_candidate;
                            }
                        }
                    ]);
                }
                Vents.prototype.evaluate = function () {
                    var venter;
                    var leader;

                    venter = this.getFieldValue("vent_venter");
                    leader = this.getFieldValue("vent_leader");

                    this.getFieldValue("vent_squadmate_1").addRole(1 /* VentsSquadmate */);
                    this.getFieldValue("vent_squadmate_2").addRole(1 /* VentsSquadmate */);
                    venter.addRole(2 /* VentsVenter */);
                    leader.addRole(3 /* VentsLeader */);

                    if (!venter.willBeEffectiveVentVenter()) {
                        venter.die(this.id, 3 /* VentsBadVenter */);
                    } else if (!leader.willBeEffectiveVentLeader()) {
                        venter.die(this.id, 4 /* VentsBadLeader */);
                    }
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
                    this.label = "Long Walk";
                    this.configureFields([
                        {
                            name: "long_walk_bubbler",
                            filter: function (teammate) {
                                return teammate.is_recruited() && !teammate.is_dead() && teammate.henchman.is_bubble_candidate;
                            }
                        },
                        {
                            name: "long_walk_leader",
                            filter: function (teammate) {
                                return teammate.is_recruited() && !teammate.is_dead() && teammate.henchman.is_leader_candidate;
                            }
                        },
                        {
                            name: "long_walk_escort",
                            filter: function (teammate, teammates) {
                                if (teammates.alive().length() <= 4) {
                                    return false;
                                }

                                return teammate.is_recruited() && !teammate.is_dead() && teammate.henchman.is_escort_candidate;
                            },
                            optional: true
                        },
                        {
                            name: "long_walk_squadmate_1",
                            filter: App.ME2.Stages.Stage.genericTeammateFieldFilter
                        },
                        {
                            name: "long_walk_squadmate_2",
                            filter: App.ME2.Stages.Stage.genericTeammateFieldFilter
                        }
                    ]);
                }
                LongWalk.prototype.evaluate = function () {
                    var squadmate_1;
                    var squadmate_2;
                    var escort;
                    var bubbler;
                    var leader;

                    squadmate_1 = this.getFieldValue("long_walk_squadmate_1");
                    squadmate_2 = this.getFieldValue("long_walk_squadmate_2");
                    escort = this.getFieldValue("long_walk_escort");
                    bubbler = this.getFieldValue("long_walk_bubbler");
                    leader = this.getFieldValue("long_walk_leader");

                    squadmate_1.addRole(4 /* LongWalkSquadmate */);
                    squadmate_2.addRole(4 /* LongWalkSquadmate */);
                    escort.addRole(5 /* LongWalkEscort */);
                    leader.addRole(7 /* LongWalkLeader */);
                    bubbler.addRole(6 /* LongWalkBubbler */);

                    if (escort.henchman.id !== undefined && !escort.willBeEffectiveLongWalkEscort()) {
                        escort.die(this.id, 7 /* Escort */);
                    }

                    if (!bubbler.willBeEffectiveLongWalkBubbler()) {
                        this.stager.app.state.teammates().withRole(4 /* LongWalkSquadmate */).sortByLongWalkDeathPriority().last().die(this.id, 5 /* LongWalkBadBubbler */);
                    }

                    if (!leader.willBeEffectiveLongWalkLeader()) {
                        leader.die(this.id, 6 /* LongWalkBadLeader */);
                    }
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
                    this.label = "Boss";
                    this.configureFields([
                        {
                            name: "boss_squadmate_1",
                            filter: function (teammate) {
                                return teammate.is_recruited() && !teammate.is_dead() && !teammate.hasRole(5 /* LongWalkEscort */);
                            }
                        },
                        {
                            name: "boss_squadmate_2",
                            filter: function (teammate) {
                                return teammate.is_recruited() && !teammate.is_dead() && !teammate.hasRole(5 /* LongWalkEscort */);
                            }
                        }
                    ]);
                }
                Boss.prototype.evaluate = function () {
                    var squadmate_1;
                    var squadmate_2;

                    squadmate_1 = this.getFieldValue("boss_squadmate_1");
                    squadmate_2 = this.getFieldValue("boss_squadmate_2");

                    squadmate_1.addRole(8 /* BossSquadmate */);
                    squadmate_2.addRole(8 /* BossSquadmate */);

                    if (!squadmate_1.willSurviveBeingBossSquadmate()) {
                        squadmate_1.die(this.id, 8 /* Boss */);
                    }
                    if (!squadmate_2.willSurviveBeingBossSquadmate()) {
                        squadmate_2.die(this.id, 8 /* Boss */);
                    }

                    this.stager.app.state.teammates().alive().withoutRole(8 /* BossSquadmate */).withoutRole(5 /* LongWalkEscort */).addRole(9 /* HeldTheLine */).whoDieHoldingTheLine().die(this.id, 9 /* HoldTheLine */);
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
                function Setup() {
                    _super.apply(this, arguments);
                    this.id = 0 /* Setup */;
                    this.label = "Set up";
                }
                Setup.prototype.evaluate = function () {
                };

                Setup.prototype.getTeammates = function () {
                    return this.stager.app.state.teammates();
                };

                Setup.prototype.setup = function () {
                    var _this = this;
                    this.all_recruited = ko.pureComputed({
                        read: function () {
                            return !_this.getTeammates().find(function (teammate) {
                                return !teammate.is_recruited();
                            });
                        },
                        write: function (all_recruited) {
                            _this.getTeammates().each(function (teammate) {
                                if (all_recruited || !teammate.henchman.is_essential) {
                                    teammate.is_recruited(all_recruited);
                                }
                            });
                        },
                        owner: this
                    });

                    this.all_loyal = ko.pureComputed({
                        read: function () {
                            return !_this.getTeammates().find(function (teammate) {
                                return !teammate.is_loyal();
                            });
                        },
                        write: function (all_loyal) {
                            if (all_loyal) {
                                _this.getTeammates().each(function (teammate) {
                                    teammate.is_recruited(true);
                                    teammate.is_loyal(true);
                                });
                            } else {
                                _this.getTeammates().each(function (teammate) {
                                    teammate.is_loyal(false);
                                });
                            }
                        },
                        owner: this
                    });

                    this.is_evaluatable = ko.pureComputed(function () {
                        var is_evaluatable;

                        is_evaluatable = _.filter(_this.getTeammates().value(), function (teammate) {
                            return teammate.is_recruited();
                        }).length >= 8;

                        return is_evaluatable;
                    });
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
            (function (SummaryCrewSurvivalOptions) {
                SummaryCrewSurvivalOptions[SummaryCrewSurvivalOptions["AllSurvived"] = 0] = "AllSurvived";
                SummaryCrewSurvivalOptions[SummaryCrewSurvivalOptions["HalfSurvived"] = 1] = "HalfSurvived";
                SummaryCrewSurvivalOptions[SummaryCrewSurvivalOptions["AllDied"] = 2] = "AllDied";
            })(Stages.SummaryCrewSurvivalOptions || (Stages.SummaryCrewSurvivalOptions = {}));
            var SummaryCrewSurvivalOptions = Stages.SummaryCrewSurvivalOptions;

            var Summary = (function (_super) {
                __extends(Summary, _super);
                function Summary(stager) {
                    _super.call(this, stager);
                    this.id = 5 /* Summary */;
                    this.label = "Summary";
                    this.shepard_lives = ko.observable(undefined);
                    this.shepard_pulled_up_by = ko.observable(undefined);
                    this.defence_reporter = ko.observable(undefined);
                    this.keep_base_advocate = ko.observable(undefined);
                    this.destroy_base_advocate = ko.observable(undefined);
                    this.crew_survival = ko.observable(undefined);
                    this.is_evaluatable = ko.observable(false);
                }
                Summary.prototype.getLivingTeammates = function () {
                    return this.stager.app.state.teammates().alive();
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
                    return this.stager.app.state.teammates().withRole(9 /* HeldTheLine */).sortByDefenceReportPriority().last();
                };

                Summary.prototype.getKeepBaseAdvocate = function () {
                    return this.stager.app.state.teammates().withRole(8 /* BossSquadmate */).whoAdvocateKeepingTheBase().sortByKeepBasePriority().last();
                };

                Summary.prototype.getDestroyBaseAdvocate = function () {
                    return this.stager.app.state.teammates().withRole(8 /* BossSquadmate */).whoAdvocateDestroyingTheBase().sortByDestroyBasePriority().last();
                };

                Summary.prototype.getCrewSurvival = function () {
                    if (this.stager.app.state.teammates().withRole(5 /* LongWalkEscort */).length() === 0) {
                        return 2 /* AllDied */;
                    }

                    if (this.stager.app.state.normandy.delay() === 0) {
                        return 0 /* AllSurvived */;
                    } else if (this.stager.app.state.normandy.delay() <= 3) {
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
        var State = (function () {
            function State(app) {
                var _this = this;
                this.app = app;
                this.normandy = new App.ME2.Normandy(true, true, true);
                this.stage = ko.observable(undefined);
                this.bootstrapTeammates();

                this.stage.subscribe(function () {
                    _this.teammates.valueHasMutated();
                });
            }
            State.prototype.bootstrapTeammates = function () {
                this._teammates = new App.ME2.Teammates(_.chain(this.app.getHenchmen()).map(function (henchman) {
                    return new App.ME2.Teammate(henchman, henchman.is_essential, false, false);
                }).sortBy(function (teammate) {
                    return teammate.henchman.name;
                }).value());

                this.teammates = ko.observable(this._teammates);
            };

            State.prototype.serialise = function () {
                return this.app.serialisation.serialise(this);
            };

            State.prototype.applySerialisedState = function (serialised) {
                this.app.serialisation.applySerialisedState(this, serialised);
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
            Serialisation.prototype.lpad = function (value, length) {
                if (typeof length === "undefined") { length = 2; }
                var value_str;
                value_str = "" + value;
                return value_str.length >= length ? value_str : new Array(length - value_str.length + 1).join("0") + value_str;
            };

            Serialisation.prototype.indexesToFlags = function (indexes) {
                return _.reduce(indexes, function (accumulator, index) {
                    return accumulator + Math.pow(2, index);
                }, 0);
            };

            Serialisation.prototype.flagsToIndexes = function (flags) {
                var indexes;
                var index;
                var flag;
                indexes = [];
                index = 0;
                flag = 1;
                while (flag <= flags) {
                    if (flags & flag) {
                        indexes.push(index);
                    }

                    index++;
                    flag *= 2;
                }

                return indexes;
            };

            Serialisation.prototype.serialiseRoles = function (roles) {
                return this.lpad(this.indexesToFlags(roles), 4);
            };

            Serialisation.prototype.deserialiseRoles = function (roles) {
                return _.map(this.flagsToIndexes(parseInt(roles, 10)), function (index) {
                    return index;
                });
            };

            Serialisation.prototype.serialiseTeammate = function (teammate) {
                var elements;
                var flags;

                flags = 0 + (teammate.is_recruited() ? 1 : 0) + (teammate.is_loyal() ? 2 : 0) + (teammate.is_dead() ? 4 : 0);

                elements = [
                    this.lpad(teammate.henchman.id, 2),
                    this.lpad(teammate.death_cause || 0, 1),
                    this.lpad(teammate.death_stage_id || 0, 1),
                    this.lpad(flags, 1),
                    this.serialiseRoles(teammate.roles)
                ];

                return elements.join("");
            };

            Serialisation.prototype.deserialiseTeammate = function (teammate) {
                var henchman_id;
                var death_cause;
                var death_stage_id;
                var flags;
                var is_recruited;
                var is_loyal;
                var is_dead;
                var roles;
                var deserialised;

                henchman_id = parseInt(teammate.substr(0, 2), 10);
                death_cause = parseInt(teammate.substr(2, 1), 10) || undefined;
                death_stage_id = parseInt(teammate.substr(3, 1), 10) || undefined;
                flags = parseInt(teammate.substr(4, 1), 10);
                is_recruited = !!(flags & 1);
                is_loyal = !!(flags & 2);
                is_dead = !!(flags & 4);
                roles = this.deserialiseRoles(teammate.substr(5));

                deserialised = new App.ME2.Teammate(this.app.getHenchman(henchman_id), is_loyal, is_recruited, is_dead);
                if (is_dead) {
                    deserialised.die(death_stage_id, death_cause);
                }
                deserialised.roles = roles;

                return deserialised;
            };

            Serialisation.prototype.serialiseNormandy = function (normandy) {
                var elements;
                var flags;

                flags = 0 + (normandy.has_armour() ? 1 : 0) + (normandy.has_shielding() ? 2 : 0) + (normandy.has_thanix_cannon() ? 4 : 0);

                elements = [
                    this.lpad(normandy.delay(), 2),
                    this.lpad(flags, 1)
                ];

                return elements.join("");
            };

            Serialisation.prototype.deserialiseNormandy = function (serialised) {
                var flags;
                var has_armour;
                var has_shielding;
                var has_thanix_cannon;
                var delay;

                delay = parseInt(serialised.substr(0, 2), 10);
                flags = parseInt(serialised.substr(2), 10);
                has_armour = !!(flags & 1);
                has_shielding = !!(flags & 2);
                has_thanix_cannon = !!(flags & 4);

                return new App.ME2.Normandy(has_armour, has_shielding, has_thanix_cannon, delay);
            };

            Serialisation.prototype.serialise = function (state) {
                var _this = this;
                var elements;

                elements = [
                    this.lpad(state.stage().id, 2),
                    this.serialiseNormandy(state.normandy),
                    _.map(state.teammates().value(), function (teammate) {
                        return _this.serialiseTeammate(teammate);
                    }).join("")
                ];

                return elements.join("");
            };

            Serialisation.prototype.deserialise = function (serialised) {
                var _this = this;
                var deserialised;

                deserialised = new App.ME2.State(this.app);
                deserialised.stage(this.app.stager.getStage(parseInt(serialised.substr(0, 2), 10)));
                deserialised.normandy = this.deserialiseNormandy(serialised.substr(2, 3));
                deserialised.teammates(new App.ME2.Teammates(_.map(serialised.substr(5).match(/.{9}/g), function (serialised_teammate) {
                    return _this.deserialiseTeammate(serialised_teammate);
                })));

                return deserialised;
            };

            Serialisation.prototype.applySerialisedState = function (state, serialised) {
                var new_state = this.deserialise(serialised);

                state.stage(new_state.stage());
                state.normandy.delay(new_state.normandy.delay());
                state.normandy.has_armour(new_state.normandy.has_armour());
                state.normandy.has_shielding(new_state.normandy.has_shielding());
                state.normandy.has_thanix_cannon(new_state.normandy.has_thanix_cannon());
                state.teammates(new App.ME2.Teammates(new_state.teammates().value()));
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
                    return App.ME2.Stages.SummaryCrewSurvivalOptions[crew_survival];
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
