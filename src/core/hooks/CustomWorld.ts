import { setWorldConstructor, World } from "@cucumber/cucumber"

export class CustomWorld extends World {
    constructor(options: any) {
        super(options)
    }

    public context: any = {};
}

setWorldConstructor(CustomWorld)