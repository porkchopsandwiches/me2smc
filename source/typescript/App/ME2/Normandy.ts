module App {
    export module ME2 {
        export interface INormandy {
            has_armour: boolean;
            has_shielding: boolean;
            has_thanix_cannon: boolean;
            delay: number;
        }

        export class Normandy implements INormandy {
            public has_armour: boolean;
            public has_shielding: boolean;
            public has_thanix_cannon: boolean;
            public delay: number;

            constructor (
                has_armor: boolean = false,
                has_shielding: boolean = false,
                has_thanix_cannon: boolean = false,
                delay: number = 0
            ) {
                this.has_armour = has_armor;
                this.has_shielding = has_shielding;
                this.has_thanix_cannon = has_thanix_cannon;
                this.delay = delay;
            }
        }
    }
}