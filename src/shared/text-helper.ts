require('colors');
class Text_Helper {
    // this used to compare pdf content with expected line by line
    // with ignoreDate = true, means if we found diff contains a date
    // it is ignore that diff
    private ignorePartion = ['id', 'reference', 'sourceid', 'payment due date','Försäkringstagare: Lena VarsamFörsäkringsnummer: 1027226'];

    async compare(text1: string, text2: string, ignoreDate = false) {
        try {
            let arrDiff: string[] = [];
            const Diff = await require('diff');
            const diff = await Diff.diffLines(text1, text2, [false, true]);
            diff.forEach((part) => {
                if (part.added || part.removed) {
                    if (ignoreDate && this.hasGoodDate(part.value) || this.hasIgnorePartion(part.value)) {
                        // skip 
                    } else {
                        arrDiff.push(part.value);
                    }
                }
            });
            return await arrDiff;
        } catch (error) {
            throw error;
        }
    }

    // check a value contain a DD/MM/YYYY or YYYY/MM/DD as well as / - .
    private hasGoodDate(value){
        let reGoodDate = /^.*\d{1,4}[\.|\/|-]\d{1,2}[\.|\/|-]\d{1,4}.*$/;
        return reGoodDate.test(value);
    }

    private hasIgnorePartion(value){
        for (const ig of this.ignorePartion){
            if(value.toLowerCase().includes(ig)){
                return true;
            }

        }
        return false;
    }
}

export { Text_Helper }