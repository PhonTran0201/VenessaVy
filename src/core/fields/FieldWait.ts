import { By } from "selenium-webdriver";

// use this class to obtain object that need to wait 
// and only return a locator
export class FieldWait {
    private static readonly UPPER_CASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞÄ";
    private static readonly LOWER_CASE = "abcdefghijklmnopqrstuvwxyzæøåöüçğşä";
    static xpathForContainsText(xpath: string, _value: string) {
        return By.xpath(`${xpath}[contains(translate(.,'${this.UPPER_CASE}','${this.LOWER_CASE}'),'${_value.toLowerCase()}')]`);
    }
    
    static xpathForContainsExactlyText(xpath: string, _value: string) {
        return By.xpath(`${xpath}[.='${_value}']`);
    }

    static xpathForAttributeContainsText(attribute: string, _value: string, tag = "*") {
        return By.xpath(`//${tag}[contains(translate(@${attribute},'${this.UPPER_CASE}','${this.LOWER_CASE}'),'${_value.toLowerCase()}')]`);
    }

    static xpathForChildren(xpath: string, childCount: number = 0) {
        return By.xpath(`${xpath}[count(*)=${childCount}]`);
    }

    static xpathParentChildContainsAttribute(attributeParent: string, _valueParent: string, attributeChild: string, _valueChild: string, tagParent = "*", tagChild = "*") {
        return By.xpath(`//${tagParent}[${this.containsAttribute(attributeParent, _valueParent)}]//${tagChild}[${this.containsAttribute(attributeChild, _valueChild)}]`);
    }

    static xpathParentChildContainsExactlyAttribute(attributeParent: string, _valueParent: string, attributeChild: string, _valueChild: string, tagParent = "*", tagChild = "*") {
        return By.xpath(`//${tagParent}[${this.containsExactlyAttribute(attributeParent, _valueParent)}]//${tagChild}[${this.containsExactlyAttribute(attributeChild, _valueChild)}]`);
    }

    private static containsAttribute(attribute: string, _value: string) {
        return `contains(translate(@${attribute},'${this.UPPER_CASE}','${this.LOWER_CASE}'),'${_value.toLowerCase()}')`;
    }

    private static containsExactlyAttribute(attribute: string, _value: string) {
        return `contains(@${attribute},'${_value}')`;
    }
}