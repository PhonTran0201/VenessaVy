import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../../shared/functions";

export class ContactDetailsLeftSide {
  private lblDtHeaderName = By.xpath(`//app-contact-details-left-side//h4`);
  private lblDtHeaderEmail = By.xpath(`//app-contact-details-left//small`);
  private lblDtFirstName = By.xpath(`//app-contact-details-left-side//div[@class="form-group"]//label[text()="First name"]/following::p[1]`);
  private lblDtLastName = By.xpath(`//app-contact-details-left-side//div[@class="form-group"]//label[text()="Last name"]/following::p[1]`);
  private lblDtDateOfBirth = By.xpath(`//app-contact-details-left-side//div[@class="form-group"]//label[text()="Date of birth"]/following::p[1]`);
  private lblDtEmail = By.xpath(`//app-contact-details-left-side//div[@class="form-group"]//label[text()="Email"]/following::p[1]`);
  private lblDtPhone = By.xpath(`//app-contact-details-left-side//div[@class="form-group"]//label[text()="Phone"]/following::p[1]`);
  private lblDtRole = By.xpath(`//app-contact-details-left-side//div[@class="form-group"]//label[text()="Role"]/following::p[1]`);
  private lblDtTitle = By.xpath(`//app-contact-details-left-side//div[@class="form-group"]//label[text()="Title"]/following::p[1]`);
  private lblDtAddress = By.xpath(`//app-contact-details-left-side//div[@class="form-group"]//label[text()="Address"]/following::p[1]`);
  private lblDtPostcode = By.xpath(`//app-contact-details-left-side//div[@class="form-group"]//label[text()="Postcode"]/following::p[1]`);
  private lblDtCity = By.xpath(`//app-contact-details-left-side//div[@class="form-group"]//label[text()="City"]/following::p[1]`);
  private lblDtCountry = By.xpath(`//app-contact-details-left-side//div[@class="form-group"]//label[text()="Country"]/following::p[1]`);
  private lblDtRelatedAccount = By.xpath(`//app-contact-details-left-side//div[@class="form-group"]//label[text()="Related Account"]/following::p[1]`);

  constructor(private driverService: SeleniumWebDriverService) { }

  public async validateHeaderName(FirstName: string, LastName: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblDtHeaderName);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let temp = await this.driverService.getText(this.lblDtHeaderName);
      let actualName = FirstName + " " + LastName;
      if (temp === actualName) {
        return true;
      }
    } catch (error) {
      console.log("validateHeaderName");
      console.log(error);
      return false;
    }
  }

  public async validateHeaderEmail(Email: string) {
    try {
      await this.driverService.waitUntilElementLoaded(this.lblDtHeaderEmail);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      let temp = await this.driverService.getText(this.lblDtHeaderEmail);

      if (temp === Email) {
        return true;
      }
    } catch (error) {
      console.log("validateHeaderEmail");
      console.log(error);
      return false;
    }
  }

  public async enterEditContactForm() {
    try {
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 500);
      let editBtn = By.xpath(`//button[@id="pgs-contact-de-ls-edit"]`);
      await this.driverService.click(editBtn);
      return true;
    } catch (error) {
      console.log("enterEditContactForm");
      console.log(error);
      return false;
    }
  }


  public async validateDetailsLeftSide(expectedValue: string, nameOfField: string) {
    try {
      let temp = By.xpath(`//div`);
      switch (nameOfField) {
        case "First Name": {
          temp = this.lblDtFirstName;
          break;
        }
        case "Last Name": {
          temp = this.lblDtLastName;
          break;
        }
        case "Date Of Birth": {
          temp = this.lblDtDateOfBirth;
          break;
        }
        case "Email": {
          temp = this.lblDtEmail;
          break;
        }
        case "Phone": {
          temp = this.lblDtPhone;
          break;
        }
        case "Role": {
          temp = this.lblDtRole;
          break;
        }
        case "Title": {
          temp = this.lblDtTitle;
          break;
        }
        case "Address": {
          temp = this.lblDtAddress;
          break;
        }

        case "Postcode": {
          temp = this.lblDtPostcode;
          break;
        }
        case "City": {
          temp = this.lblDtCity;
          break;
        }
        case "Country": {
          temp = this.lblDtCountry;
          break;
        }
        case "Related Account": {
          temp = this.lblDtRelatedAccount;
          break;
        }
      }
      await this.driverService.waitUntilElementLoaded(temp);
      await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
      const actualValue = await this.driverService.getText(temp);
      return await this.driverService.validateRecord(`Validate field "${nameOfField}"`, [actualValue, expectedValue, `Incorrect "${nameOfField}"!`]);
    } catch (error) {
      console.log("validateContactDetails");
      console.log(error);
      return false;
    }
  }
}
