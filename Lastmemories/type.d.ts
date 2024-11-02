// type.d.ts
import type { Doll as DollType } from './Doll';
import type { Skill as SkillType } from './Skill';
import type { Weapon as WeaponType } from './Weapon';

export namespace LastmemoriesDataSource {
    export type Doll = DollType;
    export type Skill = SkillType;
    export type Weapon = WeaponType;
}
