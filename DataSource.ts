export class DataSource<T> {
    private data: T[];

    constructor(data: T[]) {
        this.data = data;
    }

    toArray<K extends keyof T>(key: K, separator: string = ","): DataSource<Omit<T, K> & Record<K, string[]>> {
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

    arrayToMap<K extends keyof T, O, OK extends keyof O>(key: K, other: DataSource<O>, oKey: OK): DataSource<Omit<T, K> & Record<K, O[]>> {
        const newData = this.data.map(item => {
            return {
                ...item,
                // @ts-ignore
                [key]: item[key].map(v => other.values.find(oItem => oItem[oKey].toString() === v.toString())) as O[]
            }
        });

        return new DataSource(newData);
    }

    get values(): T[] {
        return this.data;
    }
}