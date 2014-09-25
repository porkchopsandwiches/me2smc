///<reference path="../references.ts" />
module Utilities {

    export interface IObjectArrayIterator<T, TResult> {
        (value: T, index: number, list: T[]): TResult;
    }

    export interface IObjectArray<T> {
        elements: T[];
        first (): T;
        last (): T;
        length (): number;
        push (element: T): IObjectArray<T>;
        unshift (element: T): IObjectArray<T>;
        sort<TSort> (iterator: IObjectArrayIterator<T, TSort>): IObjectArray<T>;
        filter (iterator: IObjectArrayIterator<T, boolean>): IObjectArray<T>;
        find (iterator: IObjectArrayIterator<T, boolean>): T;
        map<TResult> (iterator: IObjectArrayIterator<T, TResult>): TResult[];
        each (iterator: IObjectArrayIterator<T, void>): void;
    }

    export class ObjectArray<T> implements IObjectArray<T> {
        public elements: T[];

        constructor (elements: T[]) {
            this.elements = elements;
        }

        private cloneElements (): T[] {
            return this.elements.slice(0);
        }

        private factory (elements: T[]): ObjectArray<T> {
            return new ObjectArray<T>(elements);
        }

        public first (): T {
            return this.elements.length ? this.elements[0] : undefined;
        }

        public last (): T {
            return this.elements.length ? this.elements[this.elements.length - 1] : undefined;
        }

        public length (): number {
            return this.elements.length;
        }

        public push (element: T): ObjectArray<T> {
            var elements: T[];
            elements = this.cloneElements();
            elements.push(element);
            return this.factory(elements);
        }

        public unshift (element: T): ObjectArray<T> {
            var elements: T[];
            elements = this.cloneElements();
            elements.unshift(element);
            return this.factory(elements);
        }

        public slice (start: number, end?: number): ObjectArray<T> {
            return this.factory(this.elements.slice(start, end));
        }

        public sort<TSort> (iterator: IObjectArrayIterator<T, TSort>): ObjectArray<T> {
            var elements: T[];
            elements = _.sortBy<T, TSort>(this.cloneElements(), iterator);
            return this.factory(elements);
        }

        public filter (iterator: IObjectArrayIterator<T, boolean>): ObjectArray<T> {
            var elements: T[];
            elements = _.filter<T>(this.cloneElements(), iterator);
            return this.factory(elements);
        }

        public without (...values: T[]) {
            var elements: T[];
            var args: any[];
            args = values;
            args.unshift(this.cloneElements());
            elements = _.without.apply(_, args);
            return this.factory(elements);
        }

        public find (iterator: IObjectArrayIterator<T, boolean>): T {
            return _.find<T>(this.elements, iterator);
        }

        public map<TResult> (iterator: IObjectArrayIterator<T, TResult>): TResult[] {
            return _.map<T, TResult>(this.elements, iterator);
        }

        public each (iterator: IObjectArrayIterator<T, void>): void {
            _.each<T>(this.elements, iterator);
        }
    }
}