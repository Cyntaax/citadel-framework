# [WIP] Citadel FiveM/RedM Framework

This is a framework for FiveM/RedM that is intended to be very universal.
Currently a work in progress, but expect a release candidate soon!

### Dependencies

- [webpack-cli](https://www.npmjs.com/package/webpack-cli)
- Knowledge of working with Typescript
- [fivem-js](https://github.com/d0p3t/fivem-js) **May be removed as a dependency later**

> Working example can be found in the `/example` directory

### Project Structure

```
.
| main/
|     client /
|      // Call this client-entry
|      index.ts
|     server /
|       index.ts
|     modules/
|       // Call this client-module-entry
|       index.ts
|       example-module/
|        client/
|         // Call this client-module
|         index.ts
|        server/
|         index.ts
```

### Client-entry

```typescript
@Root()
class App {
    $onReady() {
        console.log(`The client app is ready!`)
    }
}
```

### Client-module-entry
```typescript
// We bootstrap here because of the way webpack loads things.
bootstrap()
```

### Client-module
```typescript
@Module({
  // The name of the module for referencing elsewhere
  name: "other-module",
  // Inject other modules here. This will put the one and only instance
  // in the module
  deps: [
    {
      key: 'exampleModule',
      dep: ExampleModule
    }
  ]
})
class Othermodule {

  // Declaration of dependent module for intellisense reasons
  constructor(public exampleModule: ExampleModule) { }
  $onInit() {
    console.log("Module init functionality. App is not ready yet")
  }

  @Command("example", false)
  exampleCommand(source: number, @Arg() hello: string, rest: any[]) {
    console.log(`You rand the example command, specified arg was ${hello}, rest of the args ${rest}`)
  }

  @Tick("someTick")
  exampleTick() {
    console.log(`This will run every frame! Woo!`)
  }

  @NetEvent("example:event")
  exampleEvent() {
    console.log(`Client Received an example event!`)
  }

  $onReady() {
    console.log("On ready lifecycle hook")
  }
}
```

### TODO
- [ ] Callback system
- [ ] NUI event wrapper
- [ ] Base system modules (player, character, clothes, vehicles etc)
- [ ] Implement ORM?
