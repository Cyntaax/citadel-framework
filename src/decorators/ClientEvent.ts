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

        events = Reflect.getOwnMetadata("events", target)

        events[name] = {
            methodName: propertyName,
            handler: desc.value
        }

    }
}

export function Event(name: string) {
    return function(target: any, propertyName: string, desc: PropertyDescriptor) {
        let events = Reflect.getOwnMetadata("regevents", target) as unknown as {[key: string]: any}

        if(events === undefined) {
            Reflect.defineMetadata("regevents", {}, target)
        }

        events = Reflect.getOwnMetadata("regevents", target)

        events[name] = {
            methodName: propertyName,
            handler: desc.value
        }
    }
}