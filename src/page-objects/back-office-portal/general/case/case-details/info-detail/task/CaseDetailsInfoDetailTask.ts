import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2, selectDropdownOption } from "../../../../../../../shared/functions";

export class CaseDetailsInfoDetailTask {
  //Element at Task widget
  private btnAddTask = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-sub-task-no-paging-list//button/i[contains(@class,'fa-plus')]");

  //Element at Task form
  private taskForm = By.xpath("//ngb-modal-window//app-sub-task-form");
  private txtTitleTask = By.xpath("//ngb-modal-window//app-sub-task-form//*[@id='pgs-sub-task-form-title']");
  private txtDescriptionTask = By.xpath("//ngb-modal-window//app-sub-task-form//*[@id='pgs-sub-task-form-description']");
  private cmbQueueTask = By.xpath("//ngb-modal-window//app-sub-task-form//*[@id='pgs-sub-task-form-queue-id']");
  private cmbAssignedToTask = By.xpath("//ngb-modal-window//app-sub-task-form//*[@id='pgs-sub-task-form-assignee']");
  private cmbStatusTask = By.xpath("//ngb-modal-window//app-sub-task-form//*[@id='pgs-sub-task-form-status']");
  private cmbPriorityTask = By.xpath("//ngb-modal-window//app-sub-task-form//*[@id='pgs-sub-task-form-priority']");
  private dtpDueDateTask = By.xpath("//ngb-modal-window//app-sub-task-form//*[@id='pgs-sub-task-form-due-date']");

  //Elements at Task list
  private lblTitleTask = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-sub-task-no-paging-list//div[contains(@class,'card')]//h5");
  private lblDescriptionTask = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-sub-task-no-paging-list//div[contains(@class,'card')]//p");
  private lblCreateByTask = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-sub-task-no-paging-list//div[contains(@class,'card')]//small[1]");
  private lblAssignedToTask = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-sub-task-no-paging-list//div[contains(@class,'card')]//small[2]");
  private lblPriorityTask = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-sub-task-no-paging-list//div[contains(@class,'card')]//div/span[1]");
  private lblStatusTask = By.xpath("//div[contains(@class,'tab-pane') and contains(@class,'active')]//app-sub-task-no-paging-list//div[contains(@class,'card')]//div/span[2]");

  constructor(private driverService: SeleniumWebDriverService) { }

  public async openFirstTaskAtCase() {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblTitleTask);
      await this.driverService.click(this.lblTitleTask);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      return true;
    } catch (error) {
      console.log("openFirstTaskAtCase");
      console.log(error);
      return false;
    }
  }

  public async openTaskForm() {
    try {
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      await this.driverService.click(this.btnAddTask);
      await this.driverService.waitUntilElementLoaded(this.taskForm);
      return true;
    } catch (error) {
      console.log("openTaskForm");
      console.log(error);
      return false;
    }
  }

  public async inputDataToCreateTaskAtCase(
    title: string,
    description: string,
    queue: string = "",
    assignedTo: string,
    status: string,
    priority: string,
    dueDate: string
  ) {
    try {
      await this.driverService.waitUntilElementLoaded(this.taskForm);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      if (title) await this.driverService.setText(this.txtTitleTask, title);
      if (description) await this.driverService.setText(this.txtDescriptionTask, description);
      if (queue && await this.driverService.canBeSetText(this.cmbQueueTask)) await this.driverService.setText(this.cmbQueueTask, queue);
      if (assignedTo) {
        await this.driverService.setText(this.cmbAssignedToTask, assignedTo);
        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
        await selectDropdownOption(assignedTo, "", this.driverService);
        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      }
      if (status) {
        await this.driverService.setText(this.cmbStatusTask, status);
        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
        await selectDropdownOption(status, "", this.driverService);
        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      }
      if (priority) {
        await this.driverService.setText(this.cmbPriorityTask, priority);
        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
        await this.driverService.pressEnterCurrentElement();
        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
      }
      if (dueDate) await this.driverService.setText(this.dtpDueDateTask, dueDate);
      return true;
    } catch (error) {
      console.log("inputDataToTaskForm");
      console.log(error);
      return false;
    }
  }

  public async assertTaskAtList(
    title: string,
    description: string,
    createdBy: string,
    assignedTo: string,
    priority: string,
    status: string
  ) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblTitleTask);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 3000);
      await this.driverService.waitUntilElementLoaded(this.lblTitleTask);
      const actualTitle = await this.driverService.getText(this.lblTitleTask);
      const actualDescription = await this.driverService.getText(this.lblDescriptionTask);
      const actualCreatedBy = await this.driverService.getText(this.lblCreateByTask);
      const AssignedTo = await this.driverService.getText(this.lblAssignedToTask);
      const actualAssignedTo = AssignedTo.substring(12);
      const actualPriority = await this.driverService.getText(this.lblPriorityTask);
      const actualStatus = await this.driverService.getText(this.lblStatusTask);

      return await this.driverService.validateRecord("Assert at Task list",
        [actualTitle, title, "Incorrect title"],
        [actualDescription, description, "Incorrect description"],
        // [actualCreatedBy, createdBy, "Incorrect created by"],
        [actualAssignedTo, assignedTo, "Incorrect assigned to"],
        [actualPriority, priority, "Incorrect priority"],
        [actualStatus, status.toUpperCase(), "Incorrect status"]
      );
    } catch (error) {
      console.log("assertTaskAtList");
      console.log(error);
      return false;
    }
  }
}
