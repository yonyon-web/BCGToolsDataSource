export type ReplaceProperty<
    T,
    K extends keyof T,
    NewType,
    KeepOriginal extends boolean = false
> = {
    [P in keyof T]: P extends K ? NewType : T[P];
} & (KeepOriginal extends true ? { [P in K as `_${string & P}`]: T[P] } : {});
