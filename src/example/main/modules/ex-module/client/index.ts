import { Module } from "../../../../..";
@Module({
    name: "example-module"
})
export class ExampleModule {
    testValue = "Example test value!"

    constructor() {
        /// @ts-ignore
        
    }
    $onInit() {
        
        setTimeout(() => {
            
        }, 5000)
    }
}