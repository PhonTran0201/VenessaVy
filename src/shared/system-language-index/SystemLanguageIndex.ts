import { scenarioTags } from "../variables";

/**
 * This class store index of language using for system
 * By default: index = 0 (English)
 *       and       1 = Norwegian
 *                 2 = Swedish
 * ....
 * 
 * Tags for language must be used in testcase level: @English, @Norway,...
 */
export class SystemLanguageIndex {
    private static index = 0;
    public static getValue() {
        return this.index;
    }
    public static setValue() {
        if (scenarioTags.has("@English")) {
            this.index = 0;
        }
        else if (scenarioTags.has("@Norway") || scenarioTags.has("@Norsk") || scenarioTags.has("@Norwegian")) {
            this.index = 1;
        }
        else if (scenarioTags.has("@Swedish") || scenarioTags.has("@Svenska")) {
            this.index = 2;
        }
        else {
            this.index = 0;
        }
    }
}