///<reference path="../../../../references.ts" />
module App {
    export module ME2 {
        export module Stages {
            export module UI {
                export interface IStager {
                    stager: App.ME2.Stages.Stager;
                }

                export class Stager implements IStager {
                    public stager: App.ME2.Stages.Stager;
                    public stage: KnockoutObservable<App.ME2.Stages.IStage>      = ko.observable(undefined);
                    public teammates: KnockoutForcibleComputed<App.ME2.Teammate[]>;

                    constructor (stager: App.ME2.Stages.Stager) {
                        this.stager = stager;
                        this.teammates = ko.forcibleComputed(() => {
                            console.log("getting stager teammates.");
                            return this.stager.teammates;
                        });
                    }
                }
            }
        }
    }
}