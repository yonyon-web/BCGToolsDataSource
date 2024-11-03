// type.d.ts
import type { Armor as ArmorType } from './Armor';
import type { Doll as DollType } from './Doll';
import type { SetEffect as SetEffectType } from './SetEffect';
import type { Skill as SkillType } from './Skill';
import type { Weapon as WeaponType } from './Weapon';

export namespace LastmemoriesDataSource {
    export type Doll = DollType;
    export type Skill = SkillType;
    export type Weapon = WeaponType;
    export type Armor = ArmorType;
    export type SetEffect = SetEffectType;
}
