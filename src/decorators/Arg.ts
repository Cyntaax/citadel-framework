export function Arg() {
    return function(target: any, name: string, idx: number) {
        let argdecors = Reflect.getOwnMetadata("argors", target)
        if(argdecors === undefined) {
            Reflect.defineMetadata("argors", {}, target)
        }
        
        argdecors = Reflect.getOwnMetadata("argors", target)
        
        if(argdecors[name] === undefined) {
            Object.defineProperty(argdecors, name, {
                value: [],
                enumerable: true,
                configurable: true,
                writable: true
            })
        }
        
        argdecors[name].push(idx)
    }
}