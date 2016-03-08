import { Teammate, Role } from "../../App/ME2/Logic";

export const name: string = "role-toggle";

interface IParams {
    teammate: Teammate;
    observable: KnockoutObservable<Teammate>;
    pool: KnockoutObservable<Teammate[]>;
    role: Role;
    icon: string;
    supertext?: string;
}

void(((): void => {
    ko.components.register(name, {
        viewModel: function (params: IParams): void {
            _.extend(this, params);
            this.glyphs = {
                glyphicon: true
            };
            this.glyphs["glyphicon-" + params.icon] = true;
            this.available = ko.pureComputed((): boolean => {
                return _.contains(params.pool(), params.teammate);
            });
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
