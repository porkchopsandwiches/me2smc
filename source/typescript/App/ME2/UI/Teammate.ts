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

            export class Teammate implements ITeammate {
                public teammate: App.ME2.Teammate;
                public is_recruited: KnockoutObservable<boolean>    = ko.observable(undefined);
                public is_loyal: KnockoutObservable<boolean>        = ko.observable(undefined);
                public is_dead: KnockoutObservable<boolean>         = ko.observable(undefined);

                static proxy<T, T2, T3> (proxy: T, target: T2, property: string): void {
                    var observable: KnockoutObservable<T3>;
                    observable = proxy[property];

                    // Set initial value
                    observable(target[property]);

                    // Observe changes on the proxy
                    observable.subscribe((new_value: T3) => {
                        target[property] = new_value;
                    });
                }

                constructor (teammate: App.ME2.Teammate) {
                    this.teammate = teammate;

                    Teammate.proxy<Teammate, App.ME2.Teammate, boolean>(this, this.teammate, "is_recruited");
                    Teammate.proxy<Teammate, App.ME2.Teammate, boolean>(this, this.teammate, "is_loyal");
                    Teammate.proxy<Teammate, App.ME2.Teammate, boolean>(this, this.teammate, "is_dead");

                    /*
                    this.is_recruited(this.teammate.is_recruited);
                    this.is_loyal(this.teammate.is_loyal);
                    this.is_dead(this.teammate.is_dead);

                    this.is_recruited.subscribe((is_recruited: boolean) => {
                        this.teammate.is_recruited = is_recruited;
                    })
                    */
                }
            }
        }
    }
}