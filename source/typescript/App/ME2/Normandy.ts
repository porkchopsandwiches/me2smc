import { NormandyDelayOptions } from "../constants";

export class Normandy {
    public has_armour: KnockoutObservable<boolean>;
    public has_shielding: KnockoutObservable<boolean>;
    public has_thanix_cannon: KnockoutObservable<boolean>;
    public delay: KnockoutComputed<number>;
    private _delay: KnockoutObservable<NormandyDelayOptions>;

    constructor (
        has_armor: boolean = false,
        has_shielding: boolean = false,
        has_thanix_cannon: boolean = false,
        delay: number = 0
    ) {
        this.has_armour = ko.observable<boolean>(has_armor);
        this.has_shielding = ko.observable<boolean>(has_shielding);
        this.has_thanix_cannon = ko.observable<boolean>(has_thanix_cannon);
        this._delay = ko.observable<number>(delay);

        this.delay = ko.pureComputed<number>({
            read: (): number => {
                return this._delay();
            },
            write: (value: number): void => {
                const delay = parseInt("" + value, 10);

                if (!_.isNaN(delay) && delay >= NormandyDelayOptions.None && delay <= NormandyDelayOptions.Many) {
                    this._delay(delay);
                }
            }
        });
    }
}
