import pdf from 'pdf-parse';
import * as fs from 'fs';

class PDF_Extractor {
    
    async extractText(filePath: string): Promise<string> {
        try {
            let result = "";
            const exists = fs.existsSync(filePath);
            console.log(`>>>>>>>>>>> ${exists}`);
            console.log(filePath);
            let dataBuffer = await fs.readFileSync(filePath);
            await pdf(dataBuffer).then(function (data) {
                result = data.text;
            });
            return await result;
        } catch (error){
            throw error;
        }
    }
}

export { PDF_Extractor }