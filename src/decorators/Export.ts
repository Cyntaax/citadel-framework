export function Export(name?: string) {
    return function(target: any, propertyName: string, desc: PropertyDescriptor) {
        let exportz = Reflect.getOwnMetadata("exportz", target) as unknown as {[key: string]: any}

        if(exportz === undefined) {
            Reflect.defineMetadata("exportz", {}, target)
        }

        exportz = Reflect.getOwnMetadata("exportz", target)
        if(name === undefined) {
            name = propertyName
        }
        exportz[name] = {
            methodName: propertyName
        }
    }
}