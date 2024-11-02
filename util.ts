type Mapping<T, Depth extends number = 5> = Depth extends 0
    ? never
    : {
        _?: (keyof T)[]; // `keyof T` の配列を許可するオプションプロパティ
        [K in string]: K extends "_"
        ? (keyof T)[] | undefined // `_` の場合は `keyof T` の配列を許可
        : keyof T | Mapping<T, PrevDepth<Depth>>; // その他のキーは `keyof T` または再帰的な `Mapping`
    };

type PrevDepth<N extends number> = N extends 5
    ? 4
    : N extends 4
    ? 3
    : N extends 3
    ? 2
    : N extends 2
    ? 1
    : 0;

type MappingResult<T, M extends Mapping<T, Depth>, Depth extends number = 5> =
    M extends { _: (keyof T)[] }
    ? { [K in M["_"][number]]: T[K] } & {
        [K in Exclude<keyof M, "_">]: M[K] extends keyof T
        ? T[M[K]]
        : M[K] extends Mapping<T, PrevDepth<Depth>>
        ? MappingResult<T, M[K], PrevDepth<Depth>>
        : never;
    }
    : {
        [K in keyof M]: M[K] extends keyof T
        ? T[M[K]]
        : M[K] extends Mapping<T, PrevDepth<Depth>>
        ? MappingResult<T, M[K], PrevDepth<Depth>>
        : never;
    };

export const remapping = <T, M extends Mapping<T>>(item: T, mapping: M): MappingResult<T, M> => {
    const result: any = {};

    for (const key in mapping) {
        const mapValue = mapping[key];

        if (typeof mapValue === "string") {
            // @ts-ignore
            result[key] = item[mapValue];
        } else if (key === "_") {
            mapValue["_"].forEach(k => {
                result[key] = item[k];
            })
        } else if (typeof mapValue === "object" && mapValue !== null) {
            result[key] = remapping(item, mapValue);
        }
    }

    return result as MappingResult<T, M>;
}