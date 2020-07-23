export function Column(options: any): void
export function Column(target: any, propertyName: string, descriptor?: PropertyDescriptor): void
export function Column(...args: any[]): Function | void {
    if(args.length >= 2) {
        // no args passed
        const [target, propName]: [any, string] = args as any
        let columns = Reflect.getOwnMetadata("columns", target) as any[]
        if(columns === undefined) {
            Reflect.defineMetadata("columns", [], target)
        }
        columns = Reflect.getOwnMetadata("columns", target)

        columns.push({
            columnName: propName
        })
        return
    }
    return function() {
        console.log(`Mk!`)
    }
}