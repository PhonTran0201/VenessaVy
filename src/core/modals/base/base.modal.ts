import * as fs from 'fs';

export class BaseModal {
    public modal = {};
    constructor(tenant) {
        const path = `src/core/modals/data/${tenant}/`;
        if (this.loadModal(path)==true) {
            return;
        }
        if (tenant === 'seamless') { 
            this.getModelSeamless();
        } else if (tenant === 'varsam') {
            this.getModelVarsam();
        } else if (tenant === 'sample') {
            this.getModelSample();
        }
    }
    protected getModelVarsam() {
        throw new Error('Method not implemented.');
    }
    protected getModelSeamless() {
        throw new Error('Method not implemented.');
    }
    protected getModelSample() {
        throw new Error('Method not implemented.');
    }

    loadModal(path) {
        const file = path + this.constructor.name + '.json';
        if (!fs.existsSync(file)) {
            return false;
        }
        const data = fs.readFileSync(file, 'utf8');
        this.modal = JSON.parse(data);
        return true;
    }

    async save(path) {
        const file = path + this.constructor.name + '.json';
        if (!fs.existsSync(file)) {
            return await fs.writeFileSync(file, JSON.stringify(this.modal));
        } else {
            console.log(`File ${file} already exists.`);
            // throw new Error(`File ${file} already exists.`);
        }
    }

    async dump() {
        await console.log(JSON.stringify(this.modal));
    }
}