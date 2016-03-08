import { Teammate } from "../../App/ME2/Teammate";
import { Role } from "../../App/constants";

export const name: string = "death-role-static";

interface IParams {
    teammate: Teammate;
    role: Role;
    supertext?: string;
}

void(((): void => {
    ko.components.register(name, {
        viewModel: function (params: IParams): void {
            _.extend(this, params);
        },
        template: `
        <!-- ko component: { name: 'role-static', params: {
            teammate: teammate,
            role: role,
            supertext: supertext,
            icon: "alert",
            classes: "text-danger"
        } } --><!-- /ko -->
        `
    });
})());
