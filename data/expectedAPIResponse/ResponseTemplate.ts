import { GetPRTSPolicy } from './VAR-6322';
export class ResponseTemplate {

    async initGetPRTSPolicy(quoteRef) {
        return new GetPRTSPolicy(quoteRef)
    }

}