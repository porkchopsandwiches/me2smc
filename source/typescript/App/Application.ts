module App {

    export class Application {

        public normandy: App.ME2.Normandy;
        private henchmen: App.ME2.Henchman[];
        public stager: App.ME2.Stages.Stager;

        constructor () {

            this.normandy = new App.ME2.Normandy();

            this.henchmen = [
                //                   ID                             Name                    HTL     HTLD    AD      SD      CD      LWD     CRP     Tech    Biotic      Leader      SLd     EC      VC      BC      VLC     LWLC
                new App.ME2.Henchman(App.ME2.HenchmanIDs.Garrus,    "Garrus Vakarian",      3,      5,      0,      8,      11,     10,     2,      false,  false,      true,       false,  true,   true,   false,  true,   true),
                new App.ME2.Henchman(App.ME2.HenchmanIDs.Grunt,     "Grunt",                3,      0,      0,      6,      9,      8,      4,      false,  false,      false,      false,  true,   false,  false,  true,   true),
                new App.ME2.Henchman(App.ME2.HenchmanIDs.Zaeed,     "Zaeed Masani",         3,      1,      0,      7,      10,     2,      10,     false,  false,      false,      false,  true,   false,  false,  true,   true),
                new App.ME2.Henchman(App.ME2.HenchmanIDs.Miranda,   "Miranda Lawson",       1,      7,      0,      0,      0,      -1,     11,     false,  false,      true,       true,   false,  false,  true,   true,   true),
                new App.ME2.Henchman(App.ME2.HenchmanIDs.Jacob,     "Jacob Taylor",         1,      6,      0,      0,      0,      6,      7,      false,  false,      true,       false,  true,   true,   true,   true,   true),
                new App.ME2.Henchman(App.ME2.HenchmanIDs.Samara,    "Samara",               1,      4,      0,      4,      7,      7,      5,      false,  true,       false,      false,  true,   false,  true,   true,   true),
                new App.ME2.Henchman(App.ME2.HenchmanIDs.Morinth,   "Morinth",              1,      4,      0,      4,      7,      0,      5,      false,  false,      false,      false,  true,   false,  true,   true,   true),
                new App.ME2.Henchman(App.ME2.HenchmanIDs.Thane,     "Thane",                1,      2,      0,      9,      12,     12,     0,      false,  false,      false,      false,  true,   true,   true,   true,   true),
                new App.ME2.Henchman(App.ME2.HenchmanIDs.Legion,    "Legion",               1,      3,      0,      11,     0,      9,      3,      true,   false,      false,      false,  true,   true,   false,  true,   true),
                new App.ME2.Henchman(App.ME2.HenchmanIDs.Kasumi,    "Kasumi Goto",          0,      9,      0,      12,     0,      3,      9,      true,   false,      false,      false,  true,   true,   false,  true,   true),
                new App.ME2.Henchman(App.ME2.HenchmanIDs.Tali,      "Tali'zorah",           0,      10,     0,      10,     0,      4,      8,      true,   false,      false,      false,  true,   true,   false,  true,   true),
                new App.ME2.Henchman(App.ME2.HenchmanIDs.Jack,      "Jack",                 0,      8,      12,     5,      8,      11,     1,      false,  true,       false,      false,  true,   false,  true,   true,   true),
                new App.ME2.Henchman(App.ME2.HenchmanIDs.Mordin,    "Mordin Solus",         0,      11,     0,      0,      0,      5,      6,      false,  false,      false,      false,  true,   true,   false,  true,   true)
            ];

            this.stager = new App.ME2.Stages.Stager(this);
            this.stager.nextStage();
        }

        public getHenchmen (): App.ME2.Henchman[] {
            return this.henchmen;
        }

        public getHenchman (id: App.ME2.HenchmanIDs): App.ME2.Henchman {
            return _.find(this.henchmen, (henchman: App.ME2.Henchman): boolean => {
                return henchman.id === id;
            });
        }
    }
}