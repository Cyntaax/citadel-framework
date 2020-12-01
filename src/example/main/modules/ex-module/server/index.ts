import { Module, Command, Arg } from '../../../../..'

@Module({
    name: "example-module"
})
class ExampleModule {

    $onInit() {
        
    }

    @Command("excomm")
    exampleCommand(source: number, @Arg() arg1: string, restArgs: any[]) {
        
    }
}