module App {
    export module ME2 {
        export module UI {
            export interface INormandy {
                has_armour: KnockoutObservable<boolean>;
                has_shielding: KnockoutObservable<boolean>;
                has_thanix_cannon: KnockoutObservable<boolean>;
                delay: KnockoutObservable<number>;
                normandy: App.ME2.Normandy;
            }

            export class Normandy extends App.ME2.UI.Proxy implements INormandy {
                public has_armour: KnockoutObservable<boolean>          = ko.observable(undefined);
                public has_shielding: KnockoutObservable<boolean>       = ko.observable(undefined);
                public has_thanix_cannon: KnockoutObservable<boolean>   = ko.observable(undefined);
                public delay: KnockoutObservable<number>                = ko.observable(undefined);
                public normandy: App.ME2.Normandy;


                constructor (normany: App.ME2.Normandy) {
                    super();
                    this.normandy = normany;

                    this.link<App.ME2.Normandy, boolean>(this.normandy, "has_armour");
                    this.link<App.ME2.Normandy, boolean>(this.normandy, "has_shielding");
                    this.link<App.ME2.Normandy, boolean>(this.normandy, "has_thanix_cannon");
                    this.link<App.ME2.Normandy, number>(this.normandy, "delay");
                }
            }
        }
    }
}