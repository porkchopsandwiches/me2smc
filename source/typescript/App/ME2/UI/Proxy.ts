module App {
    export module ME2 {
        export module UI {
            export interface IProxy {

            }

            export class Proxy implements IProxy {
                public link<T, T2> (target: T, property: string): void {
                    var observable: KnockoutObservable<T2>;
                    observable = this[property];

                    // Set initial value
                    observable(target[property]);

                    // Observe changes on the proxy
                    observable.subscribe((new_value: T2) => {
                        target[property] = new_value;
                    });
                }
            }
        }
    }
}