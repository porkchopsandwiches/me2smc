import { Application } from "../Application";
import { Teammate } from "./Logic";

export class UI {
    private app: Application;

    constructor (app: Application) {
        this.app = app;
    }

    public showRankPopover (event: Event, field: string, title: string): void {
        const $target = $(event.target);
        const $content = $("<ol />").addClass("rank-popover-list");
        const candidates = _.chain(this.app.logic.pool()).filter((teammate: Teammate): boolean => {
            const observable: KnockoutObservable<number> = teammate[field];
            return !!observable();
        }).sortBy((teammate: Teammate): number => {
            const observable: KnockoutObservable<number> = teammate[field];
            return observable();
        }).value();
        _.each(candidates, (teammate: Teammate) => {
            $content.append(
                $("<li />")
                .append(teammate.name)
            );
        });

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
