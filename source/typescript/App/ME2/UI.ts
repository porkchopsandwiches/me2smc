import { Application } from "../Application";
import { Teammate } from "./Teammate";

export class UI {
    public teammate: KnockoutObservable<Teammate>;
    public share: KnockoutObservable<boolean>;
    private app: Application;

    constructor (app: Application) {
        this.app = app;
        this.teammate = ko.observable(undefined);
        this.share = ko.observable(false);

        if (window.location.search.length > 2) {
            this.app.logic.serialised(window.location.search.substr(1));
        }
    }

    public showRankPopover (event: Event, field: string, title: string): void {
        const $target = $(event.target);
        const $content = $("<ol />").addClass("rank-popover-list");
        _.chain(this.app.logic.pool()).filter((teammate: Teammate): boolean => {
            return !!(<KnockoutObservable<number>>teammate[field]());
        }).sortBy((teammate: Teammate): number => {
            return (<KnockoutObservable<number>>teammate[field])();
        }).each((teammate: Teammate) => {
            $content.append(
                $("<li />")
                .append(teammate.name)
            );
        }).value();

        $target.popover({
            trigger: "focus",
            title: title,
            html: true,
            content: $content
        })
        .on("hidden.bs.popover", () => {
            $target.popover("destroy");
        })
        .popover("show");
    }
}
