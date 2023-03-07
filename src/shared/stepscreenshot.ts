export class StepScreenshot {
    private static instance: StepScreenshot;
    private capture: boolean = false;
    private constructor() {

    }

    public static getInstance(): StepScreenshot {
        if (!StepScreenshot.instance) {
            this.instance = new StepScreenshot();
        }
        return StepScreenshot.instance;
    }

    public async captureThisStep(value = false) {
        this.capture = value;
    }

    public isCaptured() {
        return this.capture === true;
    }

}