import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../core/selenium-webdriver.service";
import { CaseForm } from "../../general/case/case-form/CaseForm";


export class FirstNoticeOfLossForm extends CaseForm {
    constructor(driverService: SeleniumWebDriverService) {
        super(driverService);
    }

    //FNOL forms 
    protected cmbOrganization = By.xpath("//div[@role='document']//app-fnol-form//label[contains(text(),' Organization ')]/following-sibling::*//input");
    protected txtCaseTitle = By.xpath("//div[@role='document']//app-fnol-form//*[@id='pgs-fnol-form-title']");
    protected cmbWorkFlow = By.xpath("//app-fnol-form//*[@id='pgs-fnol-form-workflow-model-id']");
    protected cmbCaseType = By.xpath("//div[@role='document']//app-fnol-form//*[@id='pgs-task-form-case-type']");
    protected cmbSelectEntityType = By.xpath("//div[@role='document']//app-fnol-form//*[text()='Select entity type']/following-sibling::div/input");
    protected cmbSearhEntity = By.xpath("//div[@role='document']//app-fnol-form//*[text()='Search Entity']/following-sibling::div/input");
    protected dtpDueDate = By.xpath("//div[@role='document']//app-fnol-form//*[@id='pgs-fnol-form-due-date']");
    protected cmbQueue = By.xpath("//div[@role='document']//app-fnol-form//*[@id='pgs-task-form-queue-id']");
    protected cmbPriority = By.xpath("//div[@role='document']//app-fnol-form//*[@id='pgs-fnol-form-priority']");
    protected cmbAssignedTo = By.xpath("//div[@role='document']//app-fnol-form//*[@id='pgs-fnol-form-assignee' and  not(@disabled)]");
    protected iframeDescrition = By.xpath("//div[@role='document']//app-fnol-form//iframe");
    protected txtDescription = By.xpath("//body/p");


    protected txtValidationMessage = By.xpath("//app-fnol-form//formly-validation-message");

    //xpath of elements value
    protected cmbOrganizationValue = By.xpath("//div[@role='document']//app-fnol-form//label[contains(text(),'Organization')]/following-sibling::*//span[contains(@class,'ng-value-label')]");
    protected cmbWorkflowValue = By.xpath("//app-fnol-form//label[contains(text(),'Workflow')]/following-sibling::*//span[contains(@class,'ng-value-label')]");
    protected cmbCaseTypeValue = By.xpath("//app-fnol-form//label[contains(text(),' Case type ')]/following-sibling::*//span[contains(@class,'ng-value-label')]");
    protected cmbRelatedRecords = By.xpath("//app-fnol-form//label[contains(text(),' Related records ')]/following-sibling::*//span[contains(@class,'text-truncate')]");
    protected cmbQueueValue = By.xpath("//app-fnol-form//label[contains(text(),' Queue ')]/following-sibling::*//span[contains(@class,'ng-value-label')]");
    protected cmbPriorityValue = By.xpath("//div[@role='document']//app-fnol-form//label[contains(text(),' Priority ')]/following-sibling::*//div[@class='ng-value ng-star-inserted']");
    protected cmbAssignedToValue = By.xpath("//div[@role='document'] //app-fnol-form//label[contains(text(),' Assigned to ')]/following-sibling::*//div[./img]/div");

    //xpath of clear old data to Edit 
    protected btnClearOrganization = By.xpath("//div[@role='document']//app-fnol-form//label[contains(text(),' Organization ')]/following-sibling::*//span[@title='Clear all']");
    protected btnClearCaseTitle = By.xpath("//div[@role='document']//app-fnol-form//*[@id='pgs-task-form-description']/preceding-sibling::button");
    protected btnClearWorkflow = By.xpath("//div[@role='document']//app-fnol-form//label[contains(text(),'Workflow')]/following-sibling::*//span[@title='Clear all']");
    protected btnClearCaseType = By.xpath("//div[@role='document']//app-fnol-form//label[contains(text(),' Case type ')]/following-sibling::*//span[@title='Clear all']");
    protected btnClearSelectEntityType = By.xpath("//div[@role='document']//app-fnol-form//label[contains(text(),' Related records ')]/following-sibling::*//span[@title='Clear all']");
    protected btnClearSearchEntity = By.xpath("//div[@role='document']//app-fnol-form//div[contains(@class,'entity-items-select')]/div/i");
    protected btnClearQueue = By.xpath("//div[@role='document']//app-fnol-form//label[contains(text(),'Queue')]/following-sibling::*//span[@title='Clear all']");
    protected btnClearPriority = By.xpath("//div[@role='document']//app-fnol-form//label[contains(text(),'Priority')]/following-sibling::*//span[@title='Clear all']");
    protected btnClearAssignedTo = By.xpath("//div[@role='document']//app-fnol-form//label[contains(text(),' Assigned to ')]/following-sibling::*//span[@title='Clear all']");
}




