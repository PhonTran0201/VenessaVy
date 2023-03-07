import { DataLoad } from "./data_load";

//#region start generate data
async function generate() {
    console.log("Generating...");
    const data = new DataLoad();
    await data.generate();
    console.log("Done!");
}

(async () => {
    await generate();
})()
//#endregion