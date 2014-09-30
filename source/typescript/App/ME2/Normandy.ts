module App {
    export module ME2 {
        export interface INormandy {
            has_armour: KnockoutObservable<boolean>;
            has_shielding: KnockoutObservable<boolean>;
            has_thanix_cannon: KnockoutObservable<boolean>;
            delay: KnockoutComputed<number>;
        }

        export class Normandy implements INormandy {
            //public has_armour: boolean;
            //public has_shielding: boolean;
            //public has_thanix_cannon: boolean;
            public has_armour: KnockoutObservable<boolean>;
            public has_shielding: KnockoutObservable<boolean>;
            public has_thanix_cannon: KnockoutObservable<boolean>;
            public delay: KnockoutComputed<number>;
            private _delay: number;

            constructor (
                has_armor: boolean = false,
                has_shielding: boolean = false,
                has_thanix_cannon: boolean = false,
                delay: number = 0
            ) {
                this.has_armour = ko.observable<boolean>(has_armor);
                this.has_shielding = ko.observable<boolean>(has_shielding);
                this.has_thanix_cannon = ko.observable<boolean>(has_thanix_cannon);
                this._delay = delay;

                this.delay = ko.pureComputed<number>({
                    read: (): number => {
                        console.log("reading delay", this._delay);
                        return this._delay;
                    },
                    write: (value: number): void => {
                        var delay: number;
                        delay = parseInt("" + value, 10);

                        if (!_.isNaN(delay)) {
                            console.log("writing delay", delay, "old value", this._delay);
                            this._delay = delay;
                        }
                    }
                });
            }
        }
    }
}