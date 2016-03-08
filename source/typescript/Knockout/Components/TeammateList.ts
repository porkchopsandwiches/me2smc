import { Teammate } from "../../App/ME2/Teammate";

export const name: string = "teammate-list";

interface IParams {
    pool: KnockoutComputed<Teammate[]>;
    label?: string;
}

void(((): void => {
    ko.components.register(name, {
        viewModel: function (params: IParams): void {
            this.pool = params.pool;
            this.label = params.label;
            this.rendered = ko.pureComputed((): string => {
                return _.map<Teammate, string>(this.pool(), (teammate: Teammate): string => {
                    return teammate.name;
                }).join(", ");
            });
        },
        template: `
        <div class="form-group">
            <label data-bind="text: label"></label>
            <input class="form-control" type="text" data-bind="value: rendered" />
        </div>
        `
    });
})());
