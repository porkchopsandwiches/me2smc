///<reference path="../../../../references.ts" />
module App {
    export module ME2 {
        export module Stages {
            export module UI {
                export interface ILongWalk {
                }

                export class LongWalk extends Stage implements ILongWalk {
                    public id: string = StageIDs[StageIDs.LongWalk];
                    public label: string = "Long Walk";
                }
            }
        }
    }
}