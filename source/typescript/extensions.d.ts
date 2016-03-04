declare interface KnockoutStatic {
    forcibleComputed<T>(func: () => T, context?: any, options?: any): KnockoutForcibleComputed<T>;
}

declare interface KnockoutForcibleComputed<T> extends KnockoutComputed<T> {
    evaluateImmediate: () => void;
}
