import { Module } from "../../../../../decorators";
import { ExampleModule } from '../../ex-module/client'


@Module({
  name: "other-module",
  deps: [
    {
      key: 'exampleModule',
      dep: ExampleModule
    }
  ]
})
class Othermodule {

  constructor(public exampleModule: ExampleModule) {

  }
  $onInit() {
    
    //
    setTimeout(() => {
      //this.exampleModule.testValue = "Greetings there!"
    }, 2000)
  }

  $onReady() {
    
    
    setTimeout(() => {
      this.exampleModule.testValue = "Hello There!"
    }, 2000)
  }
}