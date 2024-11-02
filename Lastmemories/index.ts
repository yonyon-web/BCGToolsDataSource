
import { DataSource } from '../DataSource';
import DollData from './Doll.csv';
import SkillData from './Skill.csv';
import { LastmemoriesDataSource } from './type';


export const SkillDataSoutce = new DataSource<LastmemoriesDataSource.Skill>(SkillData)
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
    .arrayToMap("skills", SkillDataSoutce, "name");








