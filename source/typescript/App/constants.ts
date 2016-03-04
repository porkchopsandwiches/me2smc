export enum HenchmanIDs {
    Garrus,
    Grunt,
    Jack,
    Jacob,
    Kasumi,
    Legion,
    Miranda,
    Mordin,
    Morinth,
    Samara,
    Tali,
    Thane,
    Zaeed
}

export enum NormandyDelayOptions {
    None = 0,
    Few = 1,
    Many = 2
}

export enum SerialisedElements {
    All = 0,
    StageID = 1,
    NormandyDelay = 2,
    NormandyFlags = 3,
    Teammates = 4
}

export enum SerialisedTeammateElements {
    All = 0,
    HenchmanID = 1,
    DeathCause = 2,
    DeathStageID = 3,
    Roles = 4
}

export enum TeammateDeathCauses {
    ArmourFailure,
    ShieldingFailure,
    CannonFailure,
    VentsBadVenter,
    VentsBadLeader,
    LongWalkBadBubbler,
    LongWalkBadLeader,
    Escort,
    Boss,
    HoldTheLine
}

export enum TeammateRoles {
    OcculusSquadmate1 = 0,
    OcculusSquadmate2 = 1,
    VentsSquadmate1 = 2,
    VentsSquadmate2 = 3,
    VentsVenter = 4,
    VentsLeader = 5,
    LongWalkSquadmate1 = 6,
    LongWalkSquadmate2 = 7,
    LongWalkEscort = 8,
    LongWalkBubbler = 9,
    LongWalkLeader = 10,
    BossSquadmate1 = 11,
    BossSquadmate2 = 12,
    HeldTheLine = 13
}

export enum StageIDs {
    Setup,
    Occulus,
    Vents,
    LongWalk,
    Boss,
    Summary
}

export enum SummaryCrewSurvivalOptions {
    AllSurvived,
    HalfSurvived,
    AllDied
}
