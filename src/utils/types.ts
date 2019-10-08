type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type StripId<T extends {id?: any}> = Omit<T, 'id'>;
export type OptionalId<T extends {id?: any}> = PartialBy<T, 'id'>;