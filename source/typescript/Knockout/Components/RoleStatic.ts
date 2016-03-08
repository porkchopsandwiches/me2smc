import { Teammate } from "../../App/ME2/Teammate";
import { Role } from "../../App/constants";

export const name: string = "role-static";

interface IParams {
    teammate: Teammate;
    role: Role;
    supertext?: string;
    icon: string;
    classes?: string;
}

void(((): void => {
    ko.components.register(name, {
        viewModel: function (params: IParams): void {
            _.extend(this, params);
            this.glyphs = {
                glyphicon: true
            };
            this.glyphs["glyphicon-" + params.icon] = true;
            this.classes = {};
            this.classes[params.classes] = true;
        },
        template: `
        <span data-bind="
            if: $data.teammate.hasRole($data.role),
            css: $data.classes
            ">
            <span data-bind="css: $data.glyphs" class="glyphicon"></span><sup data-bind="text: $data.supertext"></sup>
        </span>
        `
    });
})());
