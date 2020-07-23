export const Wait = (ms: number) => new Promise(res => setTimeout(res, ms))

export function jsonToClass<T, U = any>(entity: new (...args: any[]) => T, json: string | U): T {
    let jobj: U
    if(typeof json === "string") {
        jobj = JSON.parse(json)
    }
    
    const obj: T = Object.assign(new entity(), jobj)
    
    return obj
}

export function jsonBlanket<T, U>(entity: T, json: string | U): T {
    let jobj: U
    if(typeof json === "string") {
        jobj = JSON.parse(json)
    } else {
        jobj = json
    }
    try {
        console.log(`number of assign ${Object.keys(jobj).length}`)
        Object.keys(jobj).forEach(v => {
            console.log(`assigning`)
            /// @ts-ignore
            Object.defineProperty(entity, v, {
                configurable: true,
                enumerable: true,
                /// @ts-ignore
                value: jobj[v],
                writable: true
            })
        })
    } catch(e) {
        console.log(e.message)
    }

    return entity
}

export const toHHMMSS = (time: string | number, short: boolean = false) => {
    let sec_num: any = parseInt(time as any, 10); // don't forget the second param
    let hours: any   = Math.floor(sec_num / 3600);
    let minutes: any = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds: any = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return short ? `${hours}h${minutes}m${seconds}s` : `${hours}:${minutes}:${seconds}`
    return ;
}