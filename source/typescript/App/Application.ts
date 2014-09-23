module App {

    export class Application {

        public normandy: App.ME2.Normandy;
        private henchmen: App.ME2.Henchman[];
        public stager: App.ME2.Stages.Stager;

        constructor () {

            this.normandy = new App.ME2.Normandy(true, true, true);

            this.henchmen = [
                //                   ID                             Name                    Ess     HTL     HTLD    AD      SD      CD      LWD     CRP     Tech    Biotic      Leader      SLd     EC      VC      BC      VLC     LWLC
                new App.ME2.Henchman(App.ME2.HenchmanIDs.Garrus,    "Garrus Vakarian",      true,   3,      5,      0,      8,      11,     10,     2,      false,  false,      true,       false,  true,   true,   false,  true,   true),
                new App.ME2.Henchman(App.ME2.HenchmanIDs.Grunt,     "Grunt",                false,  3,      0,      0,      6,      9,      8,      4,      false,  false,      false,      false,  true,   false,  false,  true,   true),
                new App.ME2.Henchman(App.ME2.HenchmanIDs.Zaeed,     "Zaeed Masani",         false,  3,      1,      0,      7,      10,     2,      10,     false,  false,      false,      false,  true,   false,  false,  true,   true),
                new App.ME2.Henchman(App.ME2.HenchmanIDs.Miranda,   "Miranda Lawson",       true,   1,      7,      0,      0,      0,      -1,     11,     false,  false,      true,       true,   false,  false,  true,   true,   true),
                new App.ME2.Henchman(App.ME2.HenchmanIDs.Jacob,     "Jacob Taylor",         true,   1,      6,      0,      0,      0,      6,      7,      false,  false,      true,       false,  true,   true,   true,   true,   true),
                new App.ME2.Henchman(App.ME2.HenchmanIDs.Samara,    "Samara",               false,  1,      4,      0,      4,      7,      7,      5,      false,  true,       false,      false,  true,   false,  true,   true,   true),
                //new App.ME2.Henchman(App.ME2.HenchmanIDs.Morinth,   "Morinth",            false,  1,      4,      0,      4,      7,      0,      5,      false,  false,      false,      false,  true,   false,  true,   true,   true),
                new App.ME2.Henchman(App.ME2.HenchmanIDs.Thane,     "Thane",                false,  1,      2,      0,      9,      12,     12,     0,      false,  false,      false,      false,  true,   true,   true,   true,   true),
                new App.ME2.Henchman(App.ME2.HenchmanIDs.Legion,    "Legion",               false,  1,      3,      0,      11,     0,      9,      3,      true,   false,      false,      false,  true,   true,   false,  true,   true),
                new App.ME2.Henchman(App.ME2.HenchmanIDs.Kasumi,    "Kasumi Goto",          false,  0,      9,      0,      12,     0,      3,      9,      true,   false,      false,      false,  true,   true,   false,  true,   true),
                new App.ME2.Henchman(App.ME2.HenchmanIDs.Tali,      "Tali'zorah",           false,  0,      10,     0,      10,     0,      4,      8,      true,   false,      false,      false,  true,   true,   false,  true,   true),
                new App.ME2.Henchman(App.ME2.HenchmanIDs.Jack,      "Jack",                 true,   0,      8,      12,     5,      8,      11,     1,      false,  true,       false,      false,  true,   false,  true,   true,   true),
                new App.ME2.Henchman(App.ME2.HenchmanIDs.Mordin,    "Mordin Solus",         true,   0,      11,     0,      0,      0,      5,      6,      false,  false,      false,      false,  true,   true,   false,  true,   true)
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

        public formatTeammateDeathCause (death_cause: App.ME2.TeammateDeathCauses): string {
            return App.ME2.TeammateDeathCauses[death_cause];
        }

        public formatTeammateRole (role: App.ME2.TeammateRoles): string {
            return App.ME2.TeammateRoles[role];
        }

        public formatYesNo (value: boolean): string {
            return value ? "Yes" : "No";
        }
    }
}