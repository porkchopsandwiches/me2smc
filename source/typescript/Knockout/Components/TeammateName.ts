import { Teammate } from "../../App/ME2/Teammate";

export const name: string = "teammate-name";

interface IParams {
    teammate: KnockoutObservable<Teammate>;
}

void(((): void => {
    ko.components.register(name, {
        viewModel: function (params: IParams): void {
            _.extend(this, params);
        },
        template: `
        <p class="form-control-static" data-bind="with: teammate"><span data-bind="text: name"></span></p>
        `
    });
})());
