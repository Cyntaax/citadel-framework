export function MapSource(module: string, method: string) {
    return function(target: any, propertyName: string, idx: number) {
        let mapsourcer = Reflect.getOwnMetadata("mapsourcer", target)
        if(mapsourcer === undefined) {
            Reflect.defineMetadata("mapsourcer", {}, target)
        }

        mapsourcer = Reflect.getOwnMetadata("mapsourcer", target) as {}

        console.log(`defining source on ${propertyName}`)

        Object.defineProperty(mapsourcer, propertyName, {
            value: {
                module,
                method,
                idx: idx,
                orig: propertyName
            },
            enumerable: true,
            configurable: true,
            writable: true
        })
    }
}