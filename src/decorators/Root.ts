import {Config, ICitadelConfig} from "../app/Config";
import { Cache } from "../app/Cache";

export const root: { app: any } = {
    app: null
}

export function Root<T extends ICitadelConfig = ICitadelConfig>(config?: T) {
    if(config === undefined) {
        Config.load()
    } else if(typeof config === "object") {
        Object.keys(config).forEach(v => {
            /// @ts-ignore
            Config[v] = config[v]
        })
    }
    
    return function <T extends { new(...args: any[]): {} }>(constructor: T) {
        const tr = class extends constructor {
            
        }
        
        Cache.app = tr
        
    }
}
