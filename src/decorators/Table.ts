import { Cache } from '../app/Cache'
import 'reflect-metadata'
export function Table() {
    return function <T extends { new(...args: any[]): {} }>(constructor: T) {
        let columns = Reflect.getOwnMetadata("columns", constructor.prototype) as any[]
        console.log(`class columns ${JSON.stringify(columns)}`)
        return class extends constructor {
            constructor(...args: any[]) {
                super(...args)
                console.log(typeof columns)
                console.log(JSON.stringify(columns))
                columns.map(v => {
                    const t = Reflect.getMetadata("design:type", this, v.columnName)
                })
            }
        }
    }
}