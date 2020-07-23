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

    Cache.app = new Cache.app()

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