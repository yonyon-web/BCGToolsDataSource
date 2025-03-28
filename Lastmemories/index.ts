import { DataSource, type ExtractDataType } from '../DataSource';
import type { ReplaceProperty } from '../util';
import ArmorData from './Armor.csv';
import DollData from './Doll.csv';
import SetEffectData from './SetEffect.csv';
import SkillData from './Skill.csv';
import type { LastmemoriesDataSource } from './type';
import WeaponData from './Weapon.csv';
import SubStatusData from './SubStatus.csv';
import YoutuberData from './Youtuber.csv';
import AccessoryData from './Accessory.csv';
import { effect } from 'zod';


const _SkillDataSource = new DataSource<LastmemoriesDataSource.Skill>(SkillData)
    .toArray("characteristic")
    .toArray("evoCond1")
    .toArray("evoCond2");


export const DollDataSource = new DataSource<LastmemoriesDataSource.Doll>(DollData)
    .toArray("rarity")
    .toArray("skills")
    .toArray("usEvoCond1")
    .toArray("usEvoCond2")
    .map(item => {
        return {
            id: item.id,
            name: item.name,
            nameEn: item.nameEn,
            unit: item.unit,
            role: item.role,
            attr: item.attr,
            cv: item.cv,
            mv: item.mv,
            rarity: item.rarity,
            back: (item.rarity.some(r => r.includes("SS")) ? "SS" : item.rarity.some(r => r.includes("S")) ? "S" : " ") as "SS" | "S" | " ",
            isLimited: item.name.includes("("),
            text: item.text,
            skills: item.skills,
            status: {
                hp: item.hp,
                mp: item.mp,
                pAtk: item.pAtk,
                mAtk: item.mAtk,
                hMag: item.hMag,
                pDef: item.pDef,
                mDef: item.mDef,
                acc: item.acc,
                eva: item.eva,
                crit: item.crit,
                agi: item.agi,
            },
            uniqueSKill: {
                id: item.id,
                learnChara: [],
                isUnique: true,
                type: "アクティブ",
                effectType: "",
                name: item.usName,
                attr: item.usAttr,
                description: item.usDescription,
                characteristic: item.usCharacteristic,
                evoCond1: item.usEvoCond1,
                evoCond2: item.usEvoCond2,
            }
        }
    })
    .arrayToMap("skills", _SkillDataSource, "name");

export const SkillDataSource = _SkillDataSource.hasManyLazy("learnChara", (skill) => {
    return DollDataSource.data.filter(doll => doll._skills.includes(skill.name))
}).map(skill => {
    return {
        ...skill,
        isUnique: false,
    }
})
export type SkillData = ExtractDataType<typeof SkillDataSource>;

export type DollData = ReplaceProperty<ExtractDataType<typeof DollDataSource>, "uniqueSKill", SkillData>;


export const WeaponDataSource = new DataSource<LastmemoriesDataSource.Weapon>(WeaponData)
    .toArray("skill4")
    .toArray("skill5")
    .toArray("skill6")
    .map(item => {
        return {
            id: item.id,
            name: item.name,
            role: item.role,
            back: item.back,
            status: {
                hp: item.hp,
                mp: item.mp,
                pAtk: item.pAtk,
                mAtk: item.mAtk,
                hMag: item.hMag,
                pDef: item.pDef,
                mDef: item.mDef,
                acc: item.acc,
                eva: item.eva,
                crit: item.crit,
                agi: item.agi,
            },
            skill4: item.skill4,
            skill5: item.skill5,
            skill6: item.skill6,
        }
    });

export type WeaponData = ExtractDataType<typeof WeaponDataSource>;

const _SetEffectDataSource = new DataSource<LastmemoriesDataSource.SetEffect>(SetEffectData)
    .toArray("effect2")
    .toArray("effect3")
    .toArray("effect4");


export const ArmorDataSource = new DataSource<LastmemoriesDataSource.Armor>(ArmorData)
    .map(item => {
        return {
            id: item.id,
            name: item.name,
            role: item.role,
            back: item.back,
            setEffect: item.setEffect,
            part: item.part,
            status: {
                hp: item.hp,
                mp: item.mp,
                pAtk: item.pAtk,
                mAtk: item.mAtk,
                hMag: item.hMag,
                pDef: item.pDef,
                mDef: item.mDef,
                acc: item.acc,
                eva: item.eva,
                crit: item.crit,
                agi: item.agi,
            }
        }
    })
    .oneToMap("setEffect", _SetEffectDataSource, "name");
export type ArmorData = ExtractDataType<typeof ArmorDataSource>;


export const SetEffectDataSource = _SetEffectDataSource.hasManyLazy("armors", (item) => {
    return ArmorDataSource.data.filter(armor => item.name === armor._setEffect);
});
export type SetEffectData = ExtractDataType<typeof SetEffectDataSource>;


export const SubStatusDataSource = new DataSource<LastmemoriesDataSource.SubStatus>(SubStatusData).map(item => {
    return {
        id: item.id,
        name: item.name,
        effect: item.effect,
        a: [item.a1, item.a2, item.a3, item.a4, item.a5],
        b: [item.b1, item.b2, item.b3, item.b4, item.b5],
        c: [item.c1, item.c2, item.c3, item.c4, item.c5], 
    }
})
export type SubStatusData = ExtractDataType<typeof SubStatusDataSource>;

export const YoutuberDataSource = new DataSource<LastmemoriesDataSource.Youtuber>(YoutuberData);
export type YoutuberData = ExtractDataType<typeof YoutuberDataSource>;



export const AccessoryDataSource = new DataSource<LastmemoriesDataSource.Accessory>(AccessoryData)
    .map(item => {
        return {
            id: item.id,
            name: item.name,
            role: item.role,
            back: item.back,
            setEffect: item.setEffect,
            status: {
                hp: item.hp,
                mp: item.mp,
                pAtk: item.pAtk,
                mAtk: item.mAtk,
                hMag: item.hMag,
                pDef: item.pDef,
                mDef: item.mDef,
                acc: item.acc,
                eva: item.eva,
                crit: item.crit,
                agi: item.agi,
            }
        }
    })
    .oneToMap("setEffect", _SetEffectDataSource, "name");;

export type AccessoryData = ExtractDataType<typeof AccessoryDataSource>;





