import { SeleniumWebDriverService } from "../../../../../../../core/selenium-webdriver.service";
import { ContactForm } from "../../../../contact/contact-forms/ContactForm";

export class AccountTabContactForm extends ContactForm {
  //Element at Contact form Global Contact & Entity's contact

  constructor(driverService: SeleniumWebDriverService) {
    super(driverService);
  }

}

