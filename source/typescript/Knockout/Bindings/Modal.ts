export const name: string = "modal";

void(((): void => {
    ko.bindingHandlers[name] = {
        init: (element: HTMLElement, value_accessor: KnockoutObservable<any>, all_bindings_accessor: KnockoutAllBindingsAccessor, data: any, context: any): any => {
            const $element = $(element);

            $element.modal({
                show: false
            });

            ko.utils.domNodeDisposal.addDisposeCallback(element, () => {
                $element.modal("destroy");
            });
        },
        update: (element: HTMLElement, value_accessor: KnockoutObservable<any>, all_bindings_accessor: KnockoutAllBindingsAccessor, data: any, context: any): void => {
            const value = value_accessor();
            const $element = $(element);

            if (value) {
                $element.modal("show");
            } else {
                $element.modal("hide");
            }
        }
    };
})());
