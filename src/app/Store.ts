class Store<T extends any = any> {
  data: { [key: string]: any } = {}
  get(name: string) {
    return this.data[name]
  }

  set<T = any>(name: string, val: T) {
    this.data[name] = val
  }
}