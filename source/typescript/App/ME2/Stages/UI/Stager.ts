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

                    public setStager (stager: App.ME2.Stages.Stager): Stager {
                        this.stager = stager;
                        return this;
                    }
                }
            }
        }
    }
}