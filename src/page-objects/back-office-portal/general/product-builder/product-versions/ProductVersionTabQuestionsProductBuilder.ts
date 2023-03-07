import { By } from "selenium-webdriver";
import { BasePage } from "../../../../../core/BasePage";
import { selectDropdownOption, waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";

export class ProductVersionTabQuestionsProductBuilder extends BasePage {

    //#region Available Question
    protected txtSearchQuestions_AvailableQuestion = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-questions//input[@name='searchText']");
    protected cmbTypeQuestions_AvailableQuestion = By.xpath("(//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-questions//div[contains(@class,'card-added')])[1]//div[@role='combobox']//input");

    protected questionsList = By.xpath("(//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-questions//div[contains(@class,'card-added')])[1]//ul");

    protected txtNameOfQuestion = By.xpath("(//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-questions//div[contains(@class,'card-added')])[1]//input[@id='addQuestionTitle']");
    protected btnAddQuestion = By.xpath("(//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-questions//div[contains(@class,'card-added')])[1]//button[text()=' Add ']");
    protected lblToastSuccessMessage = By.xpath("(//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-questions//div[contains(@class,'card-added')])[1]//span[contains(@class,'text-success')]");
    //#endregion


    //#region Second columns
    //Working on Question
    protected txtTitleAndIdOfQuestion = By.xpath("(//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-questions//div[contains(@class,'card-added')])[2]//div[./label[text()=' Title & ID of question ']]//input");
    protected cmbQuestionTypes = By.xpath("(//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-questions//div[contains(@class,'card-added')])[2]//div[./label[text()=' Question types']]//input");


    //Select Source Of Lookup
    protected cmbSourceLookup: By = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-version-question-details-form//ng-select[contains(@id,'SourceLookup')]`);

    //COMMON QUESTION PROPERTIES
    protected cmbInputRequired: By = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-version-question-details-form//ng-select[contains(@id,'questionRequireSelectionControl')]`);
    protected txtDefaultValue: By = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-version-question-details-form//input[contains(translate(@formcontrolname,'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÜÇĞŞ','abcdefghijklmnopqrstuvwxyzæøåöüçğş'),"defaultvalue")]`);
    protected txtDefaultFromCustomer: By = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-version-question-details-form//input[contains(@id,'DefaultFromCustomer')]`);
    protected txtMinLength: By = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-version-question-details-form//input[contains(@id,'MinLength')]`);
    protected txtMaxLength: By = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-version-question-details-form//input[contains(@id,'MaxLength')]`);

    //Conditional question behaviours
    protected cmbSelectBehaviors: By = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-product-version-question-details-form//app-product-version-question-interactions-form//div[./div[text()='Select behaviors']]//input`);

    //ADVANCED PROPERTIES

    protected sectionAdvancedPropertiesCollapse = By.xpath(`//app-product-version-question-details-form//div[contains(@class,'collapse')]//legend[contains(text(),'Advanced properties')]`)
    protected cmbSensitiveLevel = By.xpath(`//app-product-version-question-details-form//ng-select[@formcontrolname='SensitivityLevel']`);
    protected cmbCreatePolicy = By.xpath(`//app-product-version-question-details-form//ng-select[@id='enableNewBusinessFlowModification']`);
    protected cmbMTAPolicy = By.xpath(`//app-product-version-question-details-form//ng-select[@id='enableMtaFlowModification']`);
    protected cmbRenewPolicy = By.xpath(`//app-product-version-question-details-form//ng-select[@id='enableRenewalFlowModification']`);


    //#endregion


    //#region First column
    public async inputSearchQuestion(value: string) {
        try {
            const element = await this.getFieldType(this.txtSearchQuestions_AvailableQuestion);
            await element.setValue(value);
            return true;
        } catch (error) {
            console.log('inputSearchQuestion');
            console.log(error);
            return false;
        }
    }

    public async inputTypeQuestions(value: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.cmbTypeQuestions_AvailableQuestion);
            await this.driverService.setText(this.cmbTypeQuestions_AvailableQuestion, value);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await selectDropdownOption(value, '', this.driverService);
            return true;
        } catch (error) {
            console.log('inputTypeQuestions');
            console.log(error);
            return false;
        }
    }

    public async clickToSelectQuestion(selectedQuestion: string) {
        try {
            const questionItem = By.xpath(`(//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-questions//div[contains(@class,'card-added')])[1]//ul/li[./span[text()=' ${selectedQuestion} ']]`);
            await this.driverService.waitUntilElementVisible(questionItem);
            await this.driverService.click(questionItem);
            return true;
        } catch (error) {
            console.log('clickToSelectQuestion');
            console.log(error);
            return false;
        }
    }

    public async editCurrentQuestion(selectedQuestion: string, newValue: string) {
        try {
            const questionItem = By.xpath(`(//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-questions//div[contains(@class,'card-added')])[1]//ul/li[./span[text()=' ${selectedQuestion} ']]`);
            await this.driverService.waitUntilElementVisible(questionItem);
            await this.driverService.click(questionItem);

            await this.driverService.waitUntilElementVisible(this.txtTitleAndIdOfQuestion);
            await this.driverService.setText(this.txtTitleAndIdOfQuestion, newValue);
            return true;
        } catch (error) {
            console.log('editCurrentQuestion');
            console.log(error);
            return false;
        }
    }

    public async inputQuestionTypes(value: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.cmbQuestionTypes);
            await this.driverService.setText(this.cmbQuestionTypes, value);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            await selectDropdownOption(value, '', this.driverService);
            return true;
        } catch (error) {
            console.log('inputQuestionTypes');
            console.log(error);
            return false;
        }
    }

    public async getListOfQuestions() {
        try {
            await this.driverService.waitUntilElementVisible(this.questionsList);
            const text = await this.driverService.getAttributeValue(this.questionsList, 'innerText')
            const result = text.split("\n");
            return result;
        } catch (error) {
            console.log('getListOfQuestions');
            console.log(error);
            return [];
        }
    }

    public async dragAndDropQuestion(sourceQuestion: string, destinationQuestion: string) {
        try {
            const lblSource = By.xpath(`(//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-questions//div[contains(@class,'card-added')])[1]//ul/li[./span[text()=' ${sourceQuestion} ']]`);
            const lblDestination = By.xpath(`(//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-questions//div[contains(@class,'card-added')])[1]//ul/li[./span[text()=' ${destinationQuestion} ']]`);
            await this.driverService.waitUntilElementVisible(lblSource);
            await this.driverService.dragAndDrop(lblSource, lblDestination);
            return true;
        } catch (error) {
            console.log('dragAndDropQuestion');
            console.log(error);
            return false;
        }
    }

    public async inputNameOfQuestion(value: string) {
        try {
            const element = await this.getFieldType(this.txtNameOfQuestion);
            await element.setValue(value);
            return true;
        } catch (error) {
            console.log('inputNameOfQuestion');
            console.log(error);
            return false;
        }
    }

    public async pressAddQuestionButton() {
        try {
            const element = await this.getFieldType(this.btnAddQuestion);
            await element.click();
            return true;
        } catch (error) {
            console.log('pressAddQuestionButton');
            console.log(error);
            return false;
        }
    }

    public async validateValueToastMessageUnderQuestionList(expectedValue: string) {
        try {
            await this.waitForAppear(this.lblToastSuccessMessage);
            await this.driverService.waitUntilElementVisible(this.lblToastSuccessMessage);
            const actualValue = await this.driverService.getText(this.lblToastSuccessMessage);
            return await this.driverService.validateRecord('Validate Toast Success Message!',
                [actualValue, expectedValue, 'Incorrect Toast Success Message!']);
        } catch (error) {
            console.log('validateValueToastMessageUnderQuestionList');
            console.log(error);
            return false;
        }
    }

    public async pressDeleteQuestionByName(nameOfQuestion: string) {
        try {
            const btn = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-questions//ul/li[./span[text()=' ${nameOfQuestion} ']]//*[contains(@class,'fa-trash')]`);
            const element = await this.getFieldType(btn);
            await element.click();
            return true;
        } catch (error) {
            console.log('pressDeleteQuestionByName');
            console.log(error);
            return false;
        }
    }

    public async pressCloneQuestionByName(nameOfQuestion: string) {
        try {
            const btn = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-questions//ul/li[./span[text()=' ${nameOfQuestion} ']]//*[contains(@class,'fa-clone')]`);
            const element = await this.getFieldType(btn);
            await element.click();
            return true;
        } catch (error) {
            console.log('pressCloneQuestionByName');
            console.log(error);
            return false;
        }
    }

    public async isQuestionExist(nameOfQuestion: string) {
        await this.driverService.waitForSeconds(1000);
        const btn = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-questions//ul/li[./span[text()=' ${nameOfQuestion} ']]`);
        return await this.driverService.isExisted(btn);
    }
    //#endregion

    //#region Second column

    //WORKING ON QUESTION: LUGGAGEEXCESSTAG
    public async inputTitleAndIdOfQuestionWorkingOnQuestion(value: string) {
        try {
            const element = await this.getFieldType(this.txtTitleAndIdOfQuestion);
            await element.setValue(value);
            return true;
        } catch (error) {
            console.log('inputTitleAndIdOfQuestionWorkingOnQuestion');
            console.log(error);
            return false;
        }
    }

    public async inputQuestionTypesWorkingOnQuestion(value: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.cmbTypeQuestions_AvailableQuestion);
            await this.driverService.setText(this.cmbTypeQuestions_AvailableQuestion, value);
            const option = By.xpath(`//ng-dropdown-panel//*[contains(@class,'option') and (text()=' ${value} ')]`);
            await this.driverService.waitUntilElementVisible(option);
            await this.driverService.click(option);
            return true;
        } catch (error) {
            console.log('inputQuestionTypesWorkingOnQuestion');
            console.log(error);
            return false;
        }
    }

    //Select Lookup Source
    async inputSourceLookup(value) {
        try {
            let ele = await this.getFieldType(this.cmbSourceLookup);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    // Common Question Propreties
    async inputInputRequired(value) {
        try {
            let ele = await this.getFieldType(this.cmbInputRequired);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async inputDefaultValue(value) {
        try {
            let ele = await this.getFieldType(this.txtDefaultValue);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async inputDefaultFromCustomer(value) {
        try {
            let ele = await this.getFieldType(this.txtDefaultFromCustomer);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async inputMinLength(value) {
        try {
            let ele = await this.getFieldType(this.txtMinLength);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async inputMaxLength(value) {
        try {
            let ele = await this.getFieldType(this.txtMaxLength);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    //#region Conditional Question Behaviors
    public async inputSelectBehaviors(value: string) {
        try {
            await this.driverService.waitUntilElementVisible(this.cmbSelectBehaviors);
            await this.driverService.setText(this.cmbSelectBehaviors, value);
            await this.driverService.click(this.cmbSelectBehaviors);
            const option = By.xpath(`//ng-dropdown-panel//div[./*[contains(@class,'option') and (text()=' ${value} ')]]`);
            await this.driverService.waitUntilElementVisible(option);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            await this.driverService.click(option);
            await this.driverService.pressEnterCurrentElement();
            return true;
        } catch (error) {
            console.log('');
            console.log(error);
            return false;
        }
    }

    async inputQuestionIdAtConditionalQuestionBehaviors(sectionName: string, conditionIndex: number, questionIndex: number, value: string) {
        try {
            const cmb = By.xpath(`(//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-interaction-set-value[.//legend[text()='${sectionName}']]//app-standard-condition-param-builder-form)[${conditionIndex}]//div[contains(@class,'flex-center-vertical')][${questionIndex}]//ng-select[@formcontrolname='sourceQuestion']`);
            let ele = await this.getFieldType(cmb);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async inputWhereAtConditionalQuestionBehaviors(sectionName: string, conditionIndex: number, questionIndex: number, value: string) {
        try {
            const cmb = By.xpath(`(//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-interaction-set-value[.//legend[text()='${sectionName}']]//app-standard-condition-param-builder-form)[${conditionIndex}]//div[contains(@class,'flex-center-vertical')][${questionIndex}]//ng-select[@formcontrolname='operation']`);
            let ele = await this.getFieldType(cmb);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async inputAndValueIsAtConditionalQuestionBehaviors(sectionName: string, conditionIndex: number, questionIndex: number, value: string) {
        try {
            const cmb = By.xpath(`(//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-interaction-set-value[.//legend[text()='${sectionName}']]//app-standard-condition-param-builder-form)[${conditionIndex}]//div[contains(@class,'flex-center-vertical')][${questionIndex}]//input[@formcontrolname='targetValue']`);
            let ele = await this.getFieldType(cmb);
            await ele.setValue(value);
            const check = By.xpath(`(//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-interaction-set-value[.//legend[text()='${sectionName}']]//app-standard-condition-param-builder-form)[${conditionIndex}]//div[contains(@class,'flex-center-vertical')][${questionIndex}]//i[contains(text(),'The selected value is the question value.')]`);
            // await this.driverService.waitUntilElementVisible(check);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async pressDeleteButtonQuestionAtConditionalQuestionBehaviors(sectionName: string, conditionIndex: number, questionIndex: number) {
        try {
            const cmb = By.xpath(`(//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-interaction-set-value[.//legend[text()='${sectionName}']]//app-standard-condition-param-builder-form)[${conditionIndex}]//div[contains(@class,'flex-center-vertical')][${questionIndex}]//button[contains(@class,'remove')]`);
            let ele = await this.getFieldType(cmb);
            await ele.click();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async pressAddConditionSubButtonAtConditionalQuestionBehaviors(sectionName: string, conditionIndex: number) {
        try {
            const btn = By.xpath(`(//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-interaction-set-value[.//legend[text()='${sectionName}']]//app-standard-condition-param-builder-form)[${conditionIndex}]//button[@id='btnAddCondition']`);
            let ele = await this.getFieldType(btn);
            await ele.click();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async pressAddConditionMainButtonAtConditionalQuestionBehaviors(sectionName: string) {
        try {
            const btn = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-interaction-set-value[.//legend[text()='${sectionName}']]//button[text()=' Add condition ']`);
            let ele = await this.getFieldType(btn);
            await ele.click();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async inputValueAtConditionalQuestionBehaviors(sectionName: string, conditionIndex: number, value: string) {
        try {
            const cmb = By.xpath(`(//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-interaction-set-value[.//legend[text()='${sectionName}']]//app-standard-condition-param-builder-form)[${conditionIndex}]//input[@formcontrolname='value']`);
            let ele = await this.getFieldType(cmb);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async pressRemoveLastConditionMainButtonAtConditionalQuestionBehaviors(sectionName: string) {
        try {
            const btn = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-interaction-set-value[.//legend[text()='${sectionName}']]//button[text()=' Remove last condition ']`);
            let ele = await this.getFieldType(btn);
            await ele.click();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    //#endregion

    //#region Conditional Question Behaviors: check exist
    async isQuestionIdAtConditionalQuestionBehaviorsExist(sectionName: string, conditionIndex: number, questionIndex: number) {
        try {
            const cmb = By.xpath(`(//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-interaction-set-value[.//legend[text()='${sectionName}']]//app-standard-condition-param-builder-form)[${conditionIndex}]//div[contains(@class,'flex-center-vertical')][${questionIndex}]//ng-select[@formcontrolname='sourceQuestion']`);
            return await this.driverService.isExisted(cmb);
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async isWhereAtConditionalQuestionBehaviorsExist(sectionName: string, conditionIndex: number, questionIndex: number) {
        try {
            const cmb = By.xpath(`(//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-interaction-set-value[.//legend[text()='${sectionName}']]//app-standard-condition-param-builder-form)[${conditionIndex}]//div[contains(@class,'flex-center-vertical')][${questionIndex}]//ng-select[@formcontrolname='operation']`);
            return await this.driverService.isExisted(cmb);
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async isAndValueIsAtConditionalQuestionBehaviorsExist(sectionName: string, conditionIndex: number, questionIndex: number) {
        try {
            const cmb = By.xpath(`(//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-interaction-set-value[.//legend[text()='${sectionName}']]//app-standard-condition-param-builder-form)[${conditionIndex}]//div[contains(@class,'flex-center-vertical')][${questionIndex}]//input[@formcontrolname='targetValue']`);
            return await this.driverService.isExisted(cmb);
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async isAddConditionSubButtonAtConditionalQuestionBehaviorsExist(sectionName: string, conditionIndex: number) {
        try {
            const btn = By.xpath(`(//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-interaction-set-value[.//legend[text()='${sectionName}']]//app-standard-condition-param-builder-form)[${conditionIndex}]//button[@id='btnAddCondition']`);
            return await this.driverService.isExisted(btn);
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async isAddConditionMainButtonAtConditionalQuestionBehaviorsExist(sectionName: string) {
        try {
            const btn = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-interaction-set-value[.//legend[text()='${sectionName}']]//button[text()=' Add condition ']`);
            return await this.driverService.isExisted(btn);
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async isRemoveLastConditionMainButtonAtConditionalQuestionBehaviorsExist(sectionName: string) {
        try {
            const btn = By.xpath(`//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-interaction-set-value[.//legend[text()='${sectionName}']]//button[text()=' Remove last condition ']`);
            return await this.driverService.isExisted(btn);
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    //#endregion



    //#region ADVANCED PROPERTIES
    async expandAdvancedPropertiesSection() {
        try {
            if (await this.driverService.isExisted(this.sectionAdvancedPropertiesCollapse)) {
                await this.driverService.click(this.sectionAdvancedPropertiesCollapse);
            } return true;
        } catch (error) {
            console.log(`expandAdvancedPropertiesSection`);
            console.log(error);
            return false;
        }
    }

    async inputSensivityLevel(value) {
        try {
            let ele = await this.getFieldType(this.cmbSensitiveLevel);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(`inputSensivityLevel`);
            console.log(error);
            return false;
        }
    }

    async inputNewBusinessFlowModification(value) {
        try {
            let ele = await this.getFieldType(this.cmbCreatePolicy);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(`inputNewBusinessFlowModification`);
            console.log(error);
            return false;
        }
    }

    async inputMTABusinessFlowModification(value) {
        try {
            let ele = await this.getFieldType(this.cmbMTAPolicy);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(`inputMTABusinessFlowModification`);
            console.log(error);
            return false;
        }
    }

    async inputRenewBusinessFlowModification(value) {
        try {
            let ele = await this.getFieldType(this.cmbRenewPolicy);
            await ele.setValue(value);
            return true;
        } catch (error) {
            console.log(`inputRenewBusinessFlowModification`);
            console.log(error);
            return false;
        }
    }

    //#endregion

    //#endregion
}