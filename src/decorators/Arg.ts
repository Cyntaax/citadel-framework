

export function Arg(arg_name?: string, options?: { validator?: (v: string | boolean | number) => void, default?: any }) {
    return function(target: any, name: string, idx: number) {
        options = options || {
            validator: null,
            default: null,
        }
        let argdecors = Reflect.getOwnMetadata("argors", target)
        if(argdecors === undefined) {
            Reflect.defineMetadata("argors", {}, target)
        }
        argdecors = Reflect.getOwnMetadata("argors", target)
        var t = Reflect.getMetadata("design:type", target, name);

        const types = Reflect.getMetadata('design:paramtypes', target, name)
        const s = types.map((a: any) => a.name).join()
        if(argdecors[name] === undefined) {
            Object.defineProperty(argdecors, name, {
                value: [],
                enumerable: true,
                configurable: true,
                writable: true
            })
        }
        argdecors[name].push({
            index: idx,
            expectedType: types[idx].name,
            name: arg_name || idx,
            options: options
        })
    }
}