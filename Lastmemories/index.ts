
import { DataSource } from '../DataSource';
import ArmorData from './Armor.csv';
import DollData from './Doll.csv';
import SetEffectData from './SetEffect.csv';
import SkillData from './Skill.csv';
import { LastmemoriesDataSource } from './type';
import WeaponData from './Weapon.csv';


export const SkillDataSource = new DataSource<LastmemoriesDataSource.Skill>(SkillData)
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
                id: -1,
                learnChara: [],
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
    .arrayToMap("skills", SkillDataSource, "name");


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
            }
        }
    });

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


export const SetEffectDataSource = _SetEffectDataSource.hasManyLazy("armors", (item) => {
    return ArmorDataSource.data.filter(armor => item.name === armor._setEffect);
});














