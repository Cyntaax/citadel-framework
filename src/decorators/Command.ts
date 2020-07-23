let RegisterCommand: any

if (RegisterCommand === undefined) {
    RegisterCommand = (name: string, handler: (...args: any[]) => void, restrict: boolean) => {
    }
}



export const Command = (commandName: string, options?: { restrictors?: any[] }) => {
    return (target: any, name: string, desc: PropertyDescriptor) => {
        const method = desc.value

        options = options || {}

        desc.value = function(...args: any[]) {
            const res = method.apply(this, args)
            return res
        }

        let commands = Reflect.getOwnMetadata("commands", target)

        if(commands === undefined) {
            Reflect.defineMetadata("commands", [], target)
        }

        commands = Reflect.getOwnMetadata("commands", target)

        commands.push({
            command: commandName,
            handler: name,
            restrictors: options.restrictors
        })
    }
}