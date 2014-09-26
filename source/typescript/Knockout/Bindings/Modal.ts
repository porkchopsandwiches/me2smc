///<reference path="../../references.ts" />
module Knockout {
    export module Bindings {

        export interface IModalHandler {
            (element: HTMLElement, value_accessor: KnockoutObservable<any>): void;
        }

        export interface IModal {
            init: IModalHandler;
            update: IModalHandler;
        }

        export class Modal implements IModal {

            public init: IModalHandler;
            public update: IModalHandler;

            constructor () {
                function init (element: HTMLElement, value_accessor: KnockoutObservable<any>): void {
                    var $element: JQuery;
                    $element = $(element);

                    $element.modal({
                        show: false
                    });

                    ko.utils.domNodeDisposal.addDisposeCallback(element, () => {
                        $element.modal("destroy");
                    });
                }

                function update (element: HTMLElement, value_accessor: KnockoutObservable<any>): void {
                    var value: any;
                    var $element: JQuery;
                    value = value_accessor();
                    $element = $(element);

                    if (value) {
                        $element.modal("show");
                    } else {
                        $element.modal("hide");
                    }
                }

                this.init = init;
                this.update = update;
            }
        }
    }
}

ko.bindingHandlers["modal"] = new Knockout.Bindings.Modal();