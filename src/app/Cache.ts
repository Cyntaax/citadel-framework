export class Cache {
    static app: any = null
    static modules: {[key: string]: any} = {}
    static moduleCache: {[key: string]: any } = {}
    static ticks: { [key: string]: any } = {}
    static stores: { [key: string]: any } = {}
    static models: { [key: string]: any } = {}
}