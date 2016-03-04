import { Application } from "../Application";
import { Normandy } from "./Normandy";
import { Teammate } from "./Teammate";
import { Teammates } from "./Teammates";
import { State } from "./State";
import { TeammateRoles, TeammateDeathCauses, SerialisedTeammateElements, SerialisedElements, StageIDs } from "../constants";

interface ISerialisedNormandy extends String {
}

interface ISerialisedTeammate extends String {
}

export interface ISerialisationSerialised extends String {
}

export class Serialisation {
    // Captures Henchman ID (1), Death Cause (1), Death Stage ID (1), Roles (5)
    public static TeammateRegex: RegExp = /^([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f]{5})$/;
    public static TeammatesRegex: RegExp = /[0-9a-f]{8}/g;

    // Captures: StageID (1), Normandy Delay (2), Normandy Flags (1) ((Teammate Stuff) x 12)
    public static SerialisedRegex: RegExp = /^([0-9a-f])([\d]{2})([\d])((?:[0-9a-f]{2}[0-9a-f][0-9a-f]{5}){12})$/;

    private app: Application;

    /// -------------------------------------------
    /// Utility methods
    /// -------------------------------------------

    public static lpad (value: string, length: number = 2): string {
        const value_str = value;
        return value_str.length >= length ? value_str : new Array(length - value_str.length + 1).join("0") + value_str;
    }

    public static indexesToFlags (indexes: number[]): number {
        return _.reduce(indexes, (accumulator: number, index: number): number => {
            return accumulator + Math.pow(2, index);
        }, 0);
    }

    public static flagsToIndexes (flags: number): number[] {
        const indexes: number[] = [];
        let index = 0;
        let flag = 1;
        while (flag <= flags) {
            if (flags & flag) {
                indexes.push(index);
            }

            index++;
            flag *= 2;
        }

        return indexes;
    }

    public static getRoleCount (): number {
        return _.keys(TeammateRoles).length / 2;
    }

    constructor (app: Application) {
        this.app = app;
    }

    /// -------------------------------------------
    /// Public interfaces
    /// -------------------------------------------

    public serialise (state: State): ISerialisationSerialised {
        const elements: any[] = [
            Serialisation.lpad((<number>state.stage().id).toString(16), 1),
            this.serialiseNormandy(state.normandy),
            _.map<Teammate, ISerialisedTeammate>(state.teammates().value(), (teammate: Teammate): ISerialisedTeammate => {
                return this.serialiseTeammate(teammate);
            }).join("")
        ];

        return <ISerialisationSerialised>elements.join("");
    }

    public deserialise (serialised: ISerialisationSerialised): State {
        const matches = serialised.match(Serialisation.SerialisedRegex);
        if (matches) {

            const deserialised = new State(this.app);
            deserialised.stage(this.app.stager.getStage(parseInt("0x" + matches[SerialisedElements.StageID], 16)));
            deserialised.normandy = this.deserialiseNormandyElements(matches[SerialisedElements.NormandyDelay], matches[SerialisedElements.NormandyFlags]);
            deserialised.teammates(new Teammates(_.map(matches[SerialisedElements.Teammates].match(Serialisation.TeammatesRegex), (serialised_teammate: ISerialisedTeammate): Teammate => {
                return this.deserialiseTeammate(serialised_teammate);
            })));

            return deserialised;
        } else {
            throw new Error("Serialised data was malformed.");
        }
    }

    public applySerialisedState (state: State, serialised: ISerialisationSerialised): void {
        const new_state = this.deserialise(serialised);

        state.normandy.delay(new_state.normandy.delay());
        state.normandy.has_armour(new_state.normandy.has_armour());
        state.normandy.has_shielding(new_state.normandy.has_shielding());
        state.normandy.has_thanix_cannon(new_state.normandy.has_thanix_cannon());

        const new_teammates= new_state.teammates();

        state.teammates().each((teammate: Teammate): void => {
            const new_teammate = new_teammates.findByHenchman(teammate.henchman);

            teammate.is_recruited(new_teammate.is_recruited());
            teammate.is_loyal(new_teammate.is_loyal());
            teammate.is_dead(new_teammate.is_dead());
            teammate.roles.removeAll();
            _.each(new_teammate.roles(), (role: TeammateRoles): void => {
                teammate.addRole(role);
            });

            //teammate.roles = new_teammate.roles;
            teammate.death_cause = new_teammate.death_cause;
            teammate.death_stage_id = new_teammate.death_stage_id;
        });

        state.stage(new_state.stage());
    }

    /// -------------------------------------------
    /// Teammates
    /// -------------------------------------------

    // Length 8
    private serialiseTeammate (teammate: Teammate): ISerialisedTeammate {
        const role_offset = Serialisation.getRoleCount();

        const roles = teammate.roles().slice(0);
        if (teammate.is_recruited()) {
            roles.push(role_offset + 1);
        }
        if (teammate.is_loyal()) {
            roles.push(role_offset + 2);
        }
        if (teammate.is_dead()) {
            roles.push(role_offset + 3);
        }

        const elements = [
            Serialisation.lpad((<number> teammate.henchman.id).toString(16), 1),
            Serialisation.lpad((teammate.death_cause() === undefined ? 0 : teammate.death_cause() + 1).toString(16), 1),
            Serialisation.lpad((teammate.death_stage_id() || 0).toString(16), 1),
            Serialisation.lpad(Serialisation.indexesToFlags(roles).toString(16), 5)
        ];

        return <ISerialisedTeammate>elements.join("");
    }

    private deserialiseTeammate (serialised: ISerialisedTeammate): Teammate {
        const matches: string[] = serialised.match(Serialisation.TeammateRegex);
        const henchman_id         = parseInt("0x" + matches[SerialisedTeammateElements.HenchmanID], 16);
        const death_cause: TeammateDeathCauses         = parseInt("0x" + matches[SerialisedTeammateElements.DeathCause], 16);
        const death_stage_id: StageIDs      = parseInt("0x" + matches[SerialisedTeammateElements.DeathStageID], 16) || undefined;
        let roles: TeammateRoles[]               = Serialisation.flagsToIndexes(parseInt("0x" + matches[SerialisedTeammateElements.Roles], 16));
        const role_offset         = Serialisation.getRoleCount();

        const is_recruited = _.indexOf(roles, role_offset + 1) >= 0;
        const is_loyal = _.indexOf(roles, role_offset + 2) >= 0;
        const is_dead = _.indexOf(roles, role_offset + 3) >= 0;

        roles = _.without(roles, role_offset + 1, role_offset + 2, role_offset + 3);

        const deserialised = new Teammate(this.app.getHenchman(henchman_id), is_recruited, is_loyal, is_dead, roles);
        if (is_dead) {
            deserialised.die(death_stage_id, death_cause - 1);
        }

        return deserialised;
    }

    /// -------------------------------------------
    /// Normandy
    /// -------------------------------------------

    private serialiseNormandy (normandy: Normandy): ISerialisedNormandy {
        const flags = 0 + (normandy.has_armour() ? 1 : 0) + (normandy.has_shielding() ? 2 : 0) + (normandy.has_thanix_cannon() ? 4 : 0);
        const elements: string[] = [
            Serialisation.lpad(normandy.delay().toString(10), 2),
            Serialisation.lpad(flags.toString(10), 1)
        ];

        return <ISerialisedNormandy>elements.join("");
    }

    private deserialiseNormandyElements (serialised_delay: string, serialised_flags: string): Normandy {
        const delay               = parseInt(serialised_delay, 10);
        const flags               = parseInt(serialised_flags, 10);
        const has_armour          = !!(flags & 1);
        const has_shielding       = !!(flags & 2);
        const has_thanix_cannon   = !!(flags & 4);

        return new Normandy(has_armour, has_shielding, has_thanix_cannon, delay);
    }
}
