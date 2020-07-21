import "reflect-metadata"
import 'reflect-metadata'
let setTick: any

if (setTick === undefined) {
    setTick = (handler: () => void) => {
    }
}

let RegisterCommand: any

if (RegisterCommand === undefined) {
    RegisterCommand = (name: string, handler: (...args: any[]) => void, restrict: boolean) => {
    }
}


import { Cache } from '../app/Cache'

interface IModuleOptions {
    name: string
    deps?: {
        key: string,
        dep: any
    }[]
}

export function Module(options: IModuleOptions) {

    return function <T extends { new(...args: any[]): {} }>(constructor: T) {

        const commands = Reflect.getOwnMetadata("commands", constructor.prototype) as any[] || []

        const argors = Reflect.getOwnMetadata("argors", constructor.prototype) as any || {}
        
        const ticks = Reflect.getOwnMetadata("ticks", constructor.prototype) as any || {}

        const injectables = Reflect.getOwnMetadata("ijdecors", constructor.prototype) as any || {}
        
        let events = Reflect.getOwnMetadata("events", constructor.prototype) as any || {}
        
        if(events === undefined) {
            Reflect.defineMetadata("events", {}, constructor.prototype)
        }
        
        events = Reflect.getOwnMetadata("events", constructor.prototype) as any || {}
        
        
        
        let enabled = Reflect.getOwnMetadata("enabled", constructor.prototype)
        
        if(enabled === undefined) {
            Reflect.defineMetadata("enabled", true, constructor.prototype)
        }
        
        enabled = Reflect.getOwnMetadata("enabled", constructor.prototype)


        let ident: string

        ident = options.name
        const tr = class extends constructor {
            ident = ident
            _depsToLoad: any = options.deps || []
            constructor(...args: any[]) {
                super(...args)
                commands.forEach(v => {
                    /// @ts-ignore
                    RegisterCommand(v.command, (...args: any[]) => {
                        const enabled = Reflect.getMetadata("enabled", this)
                        if(!enabled) {
                            return
                        }
                        /// @ts-ignore
                        this[v.handler](args[0], [...args[1]])
                    }, false)
                })


                Object.keys(events).forEach(v => {
                    /// @ts-ignore
                    onNet(v, this[events[v].handler])
                })
                
                
                
                Object.keys(ticks).forEach(v => {
                    const tick = setTick(() => {
                        /// @ts-ignore
                        this[ticks[v].methodName]()
                    })
                    
                    Cache.ticks[v] = {
                        name: v,
                        id: tick
                    }
                })
                
                

                Object.keys(argors).forEach(v => {
                    /// @ts-ignore
                    if (typeof this[v] === "function") {
                        /// @ts-ignore
                        const method = this[v]

                        const newmethod = function (...args: string[]) {
                            const enabled = Reflect.getMetadata("enabled", this)
                            if(!enabled) {
                                return
                            }
                            const unpacked: any[] = []
                            unpacked.push(args[0])
                            
                            
                            argors[v].sort((a: number, b: number) => a - b)
                            argors[v].forEach((b: number) => {
                                if (arguments[1] !== undefined) {
                                    
                                    
                                    unpacked.push(arguments[1][b - 1])
                                    arguments[1][b - 1] = null
                                }
                            })
                            
                            const tmp2: any[] = []
                            arguments[1].forEach((v: any) => {
                                if(v !== null) {
                                    tmp2.push(v)
                                }
                            })

                            unpacked.push(tmp2)

                            

                            return method.apply(this, unpacked)
                        }

                        /// @ts-ignore
                        this[v] = newmethod
                    }
                })
                
            }
            
        }
        
        
        Cache.modules[ident.toLowerCase()] = tr
    }
    
}

interface Type<T> {
    new(...args: any[]): T;
}