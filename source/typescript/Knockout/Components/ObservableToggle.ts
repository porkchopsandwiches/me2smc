export const name: string = "observable-toggle";

interface IParams {
    observable: KnockoutObservable<boolean>;
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
            this.css = {
                "observable-toggle": true,
                "selected": params.observable
            };
            this.css[params.icon] = true;
        },
        template: `
        <span data-bind="
            css: $data.css,
            click: function () {
                $data.observable(!$data.observable());
            }">
            <span data-bind="css: $data.glyphs" class="glyphicon"></span><sup data-bind="text: $data.supertext"></sup>
        </span>
        `
    });
})());
