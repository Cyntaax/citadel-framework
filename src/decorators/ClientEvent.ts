export function ClientEvent(name: string) {
    return function(target: any, propertyName: string, desc: PropertyDescriptor) {
        if(desc === undefined) {

        } else {
            onNet(name, desc.value)
        }
    }
}

export function NetEvent(name: string) {
    return function(target: any, propertyName: string, desc: PropertyDescriptor) {
        let events = Reflect.getOwnMetadata("events", target) as unknown as {[key: string]: any}

        if(events === undefined) {
            Reflect.defineMetadata("events", {}, target)
        }

        events = Reflect.getOwnMetadata("commands", target)

        events[name] = {
            methodName: propertyName,
            handler: desc.value
        }

    }
}