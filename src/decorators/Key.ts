export function Key(key: number) {
    return function(target: any, propertyName: string, propertyDesc: PropertyDescriptor) {
        let keys = Reflect.getOwnMetadata("keys", target) as unknown as any[]

        if(keys === undefined) {
            Reflect.defineMetadata("keys", [], target)
        }

        keys = Reflect.getOwnMetadata("keys", target)

        keys.push({
            methodName: propertyName,
            key
        })
    }
}