import { Cache } from './Cache'
import { Wait } from '../util'

export const bootstrap = async () => {
    console.log(`bootstrapping`)
    for(const [idx, mod] of Object.entries(Cache.modules)) {
        const tmod = new mod()
        /// @ts-ignore
        if (typeof tmod["$onInit"] === "function") {
            /// @ts-ignore
            tmod["$onInit"]()
        }

        Cache.moduleCache[idx] = tmod
    }

    for (const [idx, mod] of Object.entries(Cache.moduleCache)) {
        for (const dep of mod._depsToLoad) {
            for (const k of Object.keys(Cache.moduleCache)) {
                if (Cache.moduleCache[k] instanceof dep.dep) {
                    mod[dep.key] = Cache.moduleCache[k]
                }
            }
        }
    }
    console.log(`inst app ${typeof Cache.app}`)

    try {

    } catch(e) {
        console.log(`error: ${e.message}`)
    }

    console.log(`app inst`)

    if(IsDuplicityVersion()) {
        console.log(`register server callback event`)
        onNet('triggerServerCallback', (name: string, requestId: number, ...args: any[]) => {
            const source = parseInt(global.source)
            console.log(`recv callback request`)
            TriggerServerCallback(name, requestId, source, (...args2: any[]) => {
                emitNet('serverCallback', source, requestId, ...args2)
            }, args)
        })
    } else {
        console.log(`register client callback event`)
        onNet('serverCallback', (requestId: number, ...args: any[]) => {
            if(Cache.pendingCallbacks[requestId] !== undefined) {
                Cache.pendingCallbacks[requestId](...args)
                delete Cache.pendingCallbacks[requestId]
            }
        })
    }

    if(typeof Cache.app["$beforeReady"] === "function") {
        while(Cache.app["$beforeReady"]() !== true) {
            await Wait(1000)
        }
    }

    if(typeof Cache.app["$onReady"] === "function") {
        Cache.app["$onReady"]()
    }

    Object.keys(Cache.moduleCache).forEach(v => {
        if (typeof Cache.moduleCache[v]["$onReady"] === "function") {
            Cache.moduleCache[v]["$onReady"]()
        }
    })

    console.log(`Bootstrap complete!`)
}

on('citadel:registerServerCallback', (resource: string, name: string, exportName: string) => {
    console.log(`registering external callback ${resource}`)
    if(global.exports[resource][exportName] !== undefined) {
        if(Cache.serverCallbacks[resource] === undefined) {
            Cache.serverCallbacks[resource] = {}
        }
        Cache.serverCallbacks[resource][name] = exportName
    } else {
        console.log(`couldnt find export! ${name} ${exportName}`)
    }
})

async function TriggerServerCallback(name: string, requestId: number, _source: number, cb: Function, ...args: any[]) {
    const regex = /^(.*)\.(.*)/gm

    const testStr = name

    const res = testStr.matchAll(regex)
    let module: string = ""
    let method: string = ""
    for(const match of res) {
        module = match[1]
        method = match[2]
        break
    }

    console.log(JSON.stringify(Cache.serverCallbacks))
    if(Cache.serverCallbacks[module] !== undefined) {
        if(Cache.serverCallbacks[module][method] !== undefined) {
            const targetMethod = Cache.serverCallbacks[module][method]
            console.log(`executing ${method} on module ${module}`)
            if(Cache.moduleCache[module] !== undefined) {
                console.log(`performing on something`)
                const res = await Promise.resolve(Cache.moduleCache[module][targetMethod](source, ...args))
                cb(res)
            } else {
                console.log(`looks like it was an external callback`)
                global.exports[module][targetMethod](source, (...args2: any) => {
                    console.log(`value ret from ${module} ${targetMethod} ${args2}`)
                    cb(args2)
                }, ...args)
            }
        } else {
            console.log(`method ${method} does not exist on ${module}`)
        }
    } else {
        console.log(`module ${module} does not exist`)
    }
}

export async function DoServerCallback(name: string, cb: Function, ...args: any[]) {
    emitNet('triggerServerCallback', name, Cache.requestId, ...args)
    Cache.pendingCallbacks[Cache.requestId] = cb
    if(Cache.requestId < 65535) {
        Cache.requestId++
    } else {
        Cache.requestId = 0
    }
}