import { Teammate } from "../../App/ME2/Teammate";

export const name: string = "pick-teammate";

interface IParams {
    target: KnockoutObservable<Teammate>;
    pool: KnockoutComputed<Teammate[]>;
    label?: string;
    id?: string;
}

void(((): void => {
    ko.components.register(name, {
        viewModel: function (params: IParams): void {
            this.target = params.target;
            this.pool = ko.pureComputed((): Teammate[] => {
                const candidates = params.pool();
                if (candidates) {
                    candidates.unshift(undefined);
                }
                return candidates;
            });
            this.label = params.label;
            this.id = params.id;
        },
        template: `
        <div class="form-group">
            <label data-bind="text: label, attr: {'for': id}"></label>
            <select class="form-control" id="test" data-bind="attr: {'id': id}, options: pool, optionsText: function (teammate) { return teammate ? teammate.name : '-- None --'; }, value: target"></select>
            </div>
        `
    });
})());
