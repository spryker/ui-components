export interface DataSerializer<D> {
    serialize(data: D): unknown;
}
