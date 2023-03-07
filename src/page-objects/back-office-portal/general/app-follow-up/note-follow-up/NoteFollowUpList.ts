import { fail } from "assert";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { logInfoMessage, logFailTestcase, logWarningMessage } from "../../../../../shared/functions";
import { AccountList } from "../../account/account-list/AccountList";
import { AccountSearchFilter } from "../../account/account-search-filter/AccountSearchFilter";
import { CaseDetailsInfoDetailNotes } from "../../case/case-details/info-detail/notes/CaseDetailsInfoDetailNotes";
import { CaseList } from "../../case/case-list/CaseList";
import { ContactList } from "../../contact/contact-list/ContactList";
import { ContactSearchFilter } from "../../contact/contact-search-filter/ContactSearchFilter";
import { GlobalPageObject } from "../../GlobalPageObject/GlobalPageObject";
import { GlobalPeripherals } from "../../GlobalPageObject/GlobalPeripherals";
import { GlobalSearchAndFilter } from "../../GlobalPageObject/GlobalSearchAndFilter";
import { LeadTabSummary } from "../../lead/lead-details/tabs/lead-summary/LeadTabSummary";
import { LeadList } from "../../lead/lead-list/LeadList";
import { LeadSearchFilter } from "../../lead/lead-search-filter/LeadSearchFilter";
import { NoteList } from "../../note/note-list/NoteList";
import { SaleList } from "../../sale/sale-list/SaleList";
import { SaleSearchFilter } from "../../sale/sale-search-filter/SaleSearchFilter";



/**
 * This Class use for validating result after create note form Global
 */
export class NoteFollowUpList {
  constructor(private driverService: SeleniumWebDriverService) { }

  public async assertCreateGlobalNote(entityType: string, title: string, description: string, modifiedDate: string) {
    logInfoMessage("Wait for loading 10s...");
    await this.driverService.waitForSeconds(10000);
    switch (entityType) {
      case 'Account':
      case 'Contact':
      case 'Sales':
        const noteList = new NoteList(this.driverService);
        await noteList.assertNote(title, description, modifiedDate);
        break;
      case 'Lead':
        const leadTabSummary = new LeadTabSummary(this.driverService);
        let temp = await leadTabSummary.assertNoteWidget(title, description);
        logFailTestcase(temp, "Creat global Note at Lead failed!");
        break;
      case 'Case':
        const caseDetailsInfoDetailNotes = new CaseDetailsInfoDetailNotes(this.driverService);
        await caseDetailsInfoDetailNotes.assertNoteAtCaseManagement(title, description);
        break;
      default:
        //In case of Lead detail, or Case detail, we don't have nav-item Note List
        //do nothing
        break;
    }
  }

  public async openEntityTypeList(entityType: string) {//Open Account list, Lead list, Contact list,...
    const globalPageObject = new GlobalPageObject(this.driverService);
    switch (entityType) {
      case "Account": {
        await globalPageObject.closeAllOpeningEntities();
        await globalPageObject.navigateToMainAccountList();
        break;
      }
      case "Lead": {
        await globalPageObject.navigateToMainLeadList();
        await globalPageObject.waitForProgressBarLoaded_v2();
        break;
      }
      case "Contact":
        {
          await globalPageObject.closeAllOpeningEntities()
          await globalPageObject.navigateToMainContactList();
          break;
        }
      case "Sales":
        await globalPageObject.navigateToMainSaleList();
        break;
      case "Case":
        await globalPageObject.navigateToMainCaseManagementList();
        break;
      case "Call log":
        logWarningMessage("Currently, we dont't support for validate creating a note of Call log!");
        break;
      default:
        fail(`Can't find ${entityType}!`);
    }
  }

  public async openEntityByName(entityType: string, firstName: string, lastName: string, entityName: string) {
    switch (entityType) {
      case "Account":
        const globalSearchAndFilter = new GlobalSearchAndFilter(this.driverService);
        const accountSearchFilter = new AccountSearchFilter(this.driverService);
        const globalPageObject = new GlobalPageObject(this.driverService);
        const accountList = new AccountList(this.driverService);
        const globalPeripherals = new GlobalPeripherals(this.driverService);

        await globalSearchAndFilter.openSearchAndFilterForm();
        await accountSearchFilter.inputNameOnSearchAndFilterForm(entityName);
        await globalPageObject.pressSearchSearchAndFilter();
        await globalPageObject.waitForProgressBarLoaded_v2();
        await accountList.openDetailAccountByName(entityName);
        break;
      case "Lead":
        entityName = (firstName + " " + lastName).trim();
        const leadSearchFilter = new LeadSearchFilter(this.driverService);
        const leadList = new LeadList(this.driverService);
        await leadSearchFilter.searchAndFilterLeadByFirstNameAndLastName(firstName, lastName);
        await leadList.openDetailLeadByName(entityName);
        break;
      case "Contact":
        const contactSearchFilter = new ContactSearchFilter(this.driverService);
        const contactList = new ContactList(this.driverService);
        await contactSearchFilter.searchAndFilterContactByName(entityName);
        await contactList.openContactByName(entityName);
        break;
      case "Sales":
        const saleSearchFilter = new SaleSearchFilter(this.driverService);
        const saleList = new SaleList(this.driverService);
        await saleSearchFilter.searchAndFilterSaleByName(entityName);
        await saleList.openSaleDetailByName(entityName);
        break;
      case "Case":
        const caseList = new CaseList(this.driverService);
        await caseList.openDetailCaseByName(entityName);
        break;
      case "Call log":
        // logWarningMessage("Currently, we dont't support about creating note for Call log");
        break;
      default:
        fail(`Can't find ${entityType}!`);
    }
  }
}