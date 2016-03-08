import { Teammate } from "../../App/ME2/Logic";

export const name: string = "teammate-row";

interface IParams {
    teammate: Teammate;
}

void(((): void => {
    ko.components.register(name, {
        viewModel: function (params: IParams): void {
            _.extend(this, params);
        },
        template: `
        <span data-bind="
            style: {
                visibility: $data.available() ? 'visible' : 'hidden'
            },
            css: {'text-muted': !$data.teammate.hasRole($data.role)},
            click: function () {
                if ($data.observable() === teammate) {
                    $data.observable(undefined);
                } else {
                    $data.observable(teammate);
                }
            }">
            <span data-bind="css: $data.glyphs" class="glyphicon"></span><sup data-bind="text: $data.supertext"></sup>
        </span>
        `
    });
})());
