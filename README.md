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

const allowJobs = (...jobs: string[]) => {
    return function() {
        for(const job of jobs) {
            return false
        }
    }
}

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

  /**
   * restrictors: all functions must pass for command to be allowed
   * @Arg(argname, options) - validator takes a function which the first parameter is the value of the arg. must pass
   * argument type validation based on type annotation. i.e. hello: string must be a string. (string, number, boolean)
   * default: default value for the function
   */
  @Command("example", {
    restrictors: [allowJobs("police")]
  })
  exampleCommand(source: number, @Arg("hello", {
    validator: (v: string) => v !== "hello",
    default: "cheese"
  }) hello: string, rest: any[]) {
    console.log(`You rand the example command, specified arg was ${hello}, rest of the args ${rest}`)
  }

  @Tick("someTick")
  exampleTick() {
    console.log(`This will run every frame! Woo!`)
  }

  /**
   * More on @MapSource soon. Essentiall does `ESX.GetPlayerFromId(id) and makes it available in the arg
   * */
  @NetEvent("example:event")
  exampleEvent(@MapSource("module", "function")) {
    console.log(`Client Received an example event!`)
  }

  $onReady() {
    console.log("On ready lifecycle hook")
  }
}


@Module({
  name: 'other-module'
})
export class SvOtherModule {

  @ServerCallback()
  async someCallback(@MapSource("", "") player: PlayerClass) {
    return "called back some data to client"
  }

  @Export()
  someExportedFunction() {
    console.log(`running exported function`)
  }
}
```

### TODO
- [x] Callback system
- ~~[ ] NUI event wrapper~~ No longer doing this due to the nature of the framework
- [ ] Base system modules (player, character, clothes, vehicles etc)
- [x] Implement ORM? (will be available in actual framework. typeorm works!)
