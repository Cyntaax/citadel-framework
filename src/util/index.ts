export const Wait = (ms: number) => new Promise(res => setTimeout(res, ms))

export function jsonToClass<T>(entity: new () => T, json: string): T {
    const jobj = JSON.parse(json)
    
    const obj: T = Object.assign(new entity(), jobj)
    
    return obj
}