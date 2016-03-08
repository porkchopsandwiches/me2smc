import { Teammate } from "../../App/ME2/Teammate";
import { Role } from "../../App/constants";

export const name: string = "role-toggle";

interface IParams {
    teammate: Teammate;
    observable: KnockoutObservable<Teammate>;
    ideal?: KnockoutObservable<boolean>;
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
            this.ideal = params.ideal ? params.ideal : ko.observable(false);
            this.styles = {
                "role-toggle": true,
                "ideal": this.ideal,
                "selected": ko.pureComputed((): boolean => { return params.teammate.hasRole(params.role); }),
                "available": ko.pureComputed((): boolean => { return this.available(); })
            };
            this.styles[params.icon] = true;
        },
        template: `
        <span data-bind="
            css: styles,
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
