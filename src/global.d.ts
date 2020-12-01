declare module NodeJS  {
    interface Global {
        exports: any
        source: string
    }
}