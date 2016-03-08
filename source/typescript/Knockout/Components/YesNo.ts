export const name: string = "yes-no";

interface IParams {
    value: KnockoutObservable<boolean> | boolean;
}

void(((): void => {
    ko.components.register(name, {
        viewModel: function (params: IParams): void {
            _.extend(this, params);
            this.value = ko.observable(ko.unwrap(params.value));
        },
        template: `
        <p class="form-control-static" data-bind="text: value() ? 'Yes' : 'No'"></p>
        `
    });
})());
