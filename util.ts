export type ReplaceProperty<
    T,
    K extends keyof T,
    NewType,
    KeepOriginal extends boolean = false
> = {
    [P in keyof T as P extends K
    ? KeepOriginal extends true
    ? never
    : P
    : P]: P extends K ? NewType : T[P];
} & (KeepOriginal extends true ? Record<`_${string & K}`, T[K]> : {});