import {Menu, Point} from "fivem-js";

export function ModMenu(options: UIMenuOptions) {
    return function <T extends { new (...args: any[]): {} }>(constructor: T) {
        return class extends constructor {
            menu = new Menu(options.title, options.description, options.offset, options.spriteLib, options.spriteName)
        }
    }
}

export interface UIMenuOptions {
    title: string
    description: string
    offset?: Point,
    spriteLib?: string
    spriteName?: string
}