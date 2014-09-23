///<reference path="../../../references.ts" />
module App {
    export module ME2 {
        export module UI {
            export interface ITeammate {
                teammate: App.ME2.Teammate;
                is_recruited: KnockoutObservable<boolean>;
                is_loyal: KnockoutObservable<boolean>;
                is_dead: KnockoutObservable<boolean>;
            }

            export class Teammate extends App.ME2.UI.Proxy implements ITeammate {
                public teammate: App.ME2.Teammate;
                public is_recruited: KnockoutObservable<boolean>    = ko.observable(undefined);
                public is_loyal: KnockoutObservable<boolean>        = ko.observable(undefined);
                public is_dead: KnockoutObservable<boolean>         = ko.observable(undefined);
                public can_be_loyal: KnockoutComputed<boolean>;
                public loyal_attributes: KnockoutComputed<{}>;
                public recruited_attributes: KnockoutComputed<{}>;

                constructor (teammate: App.ME2.Teammate) {
                    super();
                    this.teammate = teammate;

                    this.can_be_loyal = ko.computed((): boolean => {
                        return !!this.is_recruited();
                    });

                    this.loyal_attributes = ko.computed((): {} => {
                        var attr: {} = {};

                        if (!this.is_recruited()) {
                            attr["disabled"] = "disabled";
                        } else {
                            attr["disabled"] = undefined;
                        }

                        return attr;
                    });

                    this.recruited_attributes = ko.pureComputed((): {} => {
                        var attr: {} = {};

                        if (this.teammate.henchman.is_essential) {
                            attr["disabled"] = "disabled";
                        } else {
                            attr["disabled"] = undefined;
                        }

                        return attr;
                    });

                    this.link<App.ME2.Teammate, boolean>(this.teammate, "is_recruited");
                    this.link<App.ME2.Teammate, boolean>(this.teammate, "is_loyal");
                    this.link<App.ME2.Teammate, boolean>(this.teammate, "is_dead");

                    this.is_recruited.subscribe((is_recruited: boolean) => {
                        if (!is_recruited && this.is_loyal()) {
                            this.is_loyal(false);
                        }
                    });
                }
            }
        }
    }
}