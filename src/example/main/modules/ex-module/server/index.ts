import { Module, Command, Arg } from '../../../../..'

@Module({
    name: "example-module"
})
class ExampleModule {

    $onInit() {
        
    }

    @Command("excomm", false)
    exampleCommand(source: number, @Arg() arg1: string, restArgs: any[]) {
        
    }
}