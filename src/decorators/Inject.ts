import 'reflect-metadata'

export function Injector(name: string) {
  return function (target: any, pname: string, idx: number) {
    let ijdecors = Reflect.getOwnMetadata("ijdecors", target)
        if(ijdecors === undefined) {
            Reflect.defineMetadata("ijdecors", {}, target)
        }
    ijdecors = Reflect.getOwnMetadata("ijdecors", target)
    Object.defineProperty(ijdecors, name, {
      value: {
        idx: idx
      }
    })

    Reflect.defineMetadata("ijdecors", ijdecors, target)
  }
}