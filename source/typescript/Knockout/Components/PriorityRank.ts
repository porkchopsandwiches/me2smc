export const name: string = "priority-rank";

interface IParams {
    value: number | KnockoutObservable<number>;
}

void(((): void => {
    ko.components.register(name, {
        viewModel: function (params: IParams): void {
            this.value = ko.unwrap(params.value);
        },
        template: `
        <p class="form-control-static">
            <span data-bind="if: value !== undefined">#<span data-bind="text: value"></span></span>
            <span data-bind="if: value === undefined"><span class=\"text-muted\">N/A</span></span>
        </p>
        `
    });
})());
