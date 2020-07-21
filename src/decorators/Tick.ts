export function Tick(name: string) {
    return function(target: any, mname: string, desc: PropertyDescriptor) {
        let ticks = Reflect.getOwnMetadata("ticks", target)
        if(ticks === undefined) {
            Reflect.defineMetadata("ticks", [], target)
        }
        ticks = Reflect.getOwnMetadata("ticks", target)
        
        if(ticks[name] !== undefined) {
            return
        }
        
        ticks[name] = {
            handler: desc.value,
            methodName: mname
        }
    }
}