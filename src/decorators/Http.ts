export function Get(name: string) {
    return function(target: any, propertyName: string, desc: PropertyDescriptor) {
        let http_gets = Reflect.getOwnMetadata("http_gets", target) as unknown as any[]

        if(http_gets === undefined) {
            Reflect.defineMetadata("http_gets", [], target)
        }

        http_gets = Reflect.getOwnMetadata("http_gets", target)

        http_gets.push({
            path: name,
            methodName: propertyName
        })
    }
}