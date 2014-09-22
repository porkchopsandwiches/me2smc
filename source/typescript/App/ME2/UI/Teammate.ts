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

                constructor (teammate: App.ME2.Teammate) {
                    super();
                    this.teammate = teammate;

                    this.link<App.ME2.Teammate, boolean>(this.teammate, "is_recruited");
                    this.link<App.ME2.Teammate, boolean>(this.teammate, "is_loyal");
                    this.link<App.ME2.Teammate, boolean>(this.teammate, "is_dead");
                }
            }
        }
    }
}