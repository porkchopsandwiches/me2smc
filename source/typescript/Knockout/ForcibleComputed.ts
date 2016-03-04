export const name: string = "forcibleComputed";

void(((): void => {
    ko[name] = <T>(func: () => T, context?: any, options?: any): KnockoutForcibleComputed<T> => {
        const trigger: KnockoutObservable<T> = ko.observable<T>().extend({notify:'always'});
        const target: KnockoutComputed<T> = ko.computed(function (): T {
            trigger();
            return func.call(context);
        }, null, options);

        target["evaluateImmediate"] = function(): void {
            trigger.valueHasMutated();
        };

        return <KnockoutForcibleComputed<T>> target;
    };
})());
