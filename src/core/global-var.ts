export class GlobalVar {
    private dict = [
        { key: "", value: "" }
    ]
    public addValue(k: string, v: string) {
        this.dict.push({ key: k, value: v });
    }
    public updateValue(k: string, v: string) {
        this.dict[k] = v;
    }
    public getValue(k: string) {
        for (const i of this.dict) {
            if (i.key === k) {
                return i.value;
            }
        }
        return "NotFound";
    }



    private constructor() {

    }

    private static instance: GlobalVar;

    public static getInstance(): GlobalVar {
        if (!GlobalVar.instance) {
            GlobalVar.instance = new GlobalVar();
        }
        return GlobalVar.instance;
    }

}