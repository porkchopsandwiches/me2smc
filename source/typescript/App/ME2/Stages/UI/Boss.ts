///<reference path="../../../../references.ts" />
module App {
    export module ME2 {
        export module Stages {
            export module UI {
                export interface IBoss {
                }

                export class Boss extends Stage implements IBoss {
                    public id: string = StageIDs[StageIDs.Boss];
                    public label: string = "Boss";
                }
            }
        }
    }
}