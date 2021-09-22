export interface Mapper<From, To> {
  map(item: From, ...args: any[]): To;
}
