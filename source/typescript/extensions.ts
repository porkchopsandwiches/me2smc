///<reference path="./references.ts" />


interface KnockoutForcibleComputed<T> extends KnockoutComputed<T> {
    evaluateImmediate: () => void;
}

/*
interface KnockoutForcibleComputedFunctions<T> {
}


interface KnockoutForcibleComputedStatic {
    fn: KnockoutForcibleComputedFunctions<any>;

    <T>(): KnockoutForcibleComputed<T>;
    <T>(func: () => T, context?: any, options?: any): KnockoutForcibleComputed<T>;
    <T>(def: KnockoutComputedDefine<T>, context?: any): KnockoutForcibleComputed<T>;
    (options?: any, context?: any): KnockoutForcibleComputed<any>;
}

interface KnockoutStatic {
    forcibleComputed: KnockoutForcibleComputedStatic;
}
*/

interface KnockoutStatic {
    forcibleComputed: <T>(func: () => T, context?: any, options?: any) => KnockoutForcibleComputed<T>;
}

ko["forcibleComputed"] = function ko_forcibleComputed<T>(func: () => T, context?: any, options?: any): KnockoutForcibleComputed<T> {
    var trigger: KnockoutObservable<T>;
    var target: KnockoutComputed<T>;

    trigger = ko.observable<T>().extend({notify:'always'});
    target = ko.computed(function (): T {
        trigger();
        return func.call(context);
    }, null, options);

    target["evaluateImmediate"] = function(): void {
        trigger.valueHasMutated();
    };

    return <KnockoutForcibleComputed<T>> target;
};