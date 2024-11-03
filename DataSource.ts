import type { ReplaceProperty } from "./util";

export type ExtractDataType<D> = D extends DataSource<infer T> ? T : never;

export class DataSource<T> {
    data: T[];

    constructor(data: T[]) {
        this.data = data;
    }

    toArray<K extends keyof T>(key: K, separator: string = ","): DataSource<ReplaceProperty<T, K, string[]>> {
        const newData = this.data.map(item => {
            // @ts-ignore
            const array = item[key].split(separator);

            return {
                ...item,
                [key]: array
            }
        })
        return new DataSource(newData);
    }

    map<R>(fn: (item: T) => R): DataSource<R> {
        return new DataSource(this.data.map(fn))
    }

    arrayToMap<K extends keyof T, O, OK extends keyof O, R extends ReplaceProperty<T, K, O[], true>>(key: K, other: DataSource<O>, oKey: OK): DataSource<R> {
        const newData = this.data.map(item => {
            return {
                ...item,
                [`_${String(key)}`]: item[key],
                // @ts-ignore
                [key]: other.data.find(oItem => oItem[oKey].toString().trim() === item.toString().trim()) as O[]
            }
        }) as unknown as R[];

        return new DataSource(newData);
    }

    hasManyLazy<O, K extends string>(newKey: K, fn: (item: T) => O[]): DataSource<T & { [key in K]: () => O[] }> {
        const newData = this.data.map(item => {
            return {
                ...item,
                [newKey]: () => fn(item)
            }
        });

        return new DataSource(newData) as DataSource<T & { [key in K]: () => O[] }>;
    }

    oneToMap<
        K extends keyof T,
        O,
        R extends ReplaceProperty<T, K, O, true>
    >(key: K, other: DataSource<O>, oKey: string): DataSource<R> {
        const newData = this.data.map(item => {
            return {
                ...item,
                [`_${String(key)}`]: item[key],
                // @ts-ignore
                [key]: other.values.find(oItem => oItem[oKey].toString().trim() === item[key].toString().trim()) as O

            }
        }) as unknown as R[];

        return new DataSource(newData);
    }

    get values(): T[] {
        return this.data;
    }
}