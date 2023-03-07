import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { CaseForm } from "../../case/case-form/CaseForm";

/**
 * Global case on bottom right corner of the screen
 */
export class CaseFollowUpForm extends CaseForm {
  //Xpath bên dưới chưa đúng, cần cập nhật lại
  protected txtCaseTitle = By.xpath("//div[@role='document']//app-task-form//*[@id='pgs-task-form-description']");
  protected cmbWorkFlow = By.xpath("//div[@role='document']//app-task-form//*[@id='pgs-task-form-ref-type']");
  protected cmbCaseType = By.xpath("//div[@role='document']//app-task-form//*[@id='pgs-task-form-case-type']");
  protected cmbSelectEntityType = By.xpath("//div[@role='document']//app-task-form//*[text()='Select entity type']/following-sibling::div/input");
  protected cmbSearhEntity = By.xpath("//div[@role='document']//app-task-form//*[text()='Search Entity']/following-sibling::div/input");
  protected dtpDueDate = By.xpath("//div[@role='document']//app-task-form//*[@id='pgs-task-form-due-date']");
  protected cmbQueue = By.xpath("//div[@role='document']//app-task-form//*[@id='pgs-task-form-queue-id']");
  protected cmbPriority = By.xpath("//div[@role='document']//app-task-form//*[@id='pgs-task-form-priority']");
  protected cmbAssignedTo = By.xpath("//div[@role='document']//app-task-form//*[@id='pgs-task-form-assignee' and  not(@disabled)]");
  protected iframeDescrition = By.xpath("//div[@role='document']//app-task-form//iframe");
  protected txtDescription = By.xpath("//body/p");

  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }

  // We just override attributes in subclass (CaseFollowUpForm) and maintain methods of super class CaseForm

}
