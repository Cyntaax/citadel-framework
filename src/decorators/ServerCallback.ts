export function ServerCallback(name?: string) {
    return function(target: any, propertyName: string, desc: PropertyDescriptor) {
        let scb = Reflect.getOwnMetadata("scb", target) as unknown as {[key: string]: any}

        if(scb === undefined) {
            Reflect.defineMetadata("scb", {}, target)
        }

        scb = Reflect.getOwnMetadata("scb", target)

        if(name === undefined) {
            name = propertyName
        }
        scb[name] = {
            methodName: propertyName
        }
    }
}