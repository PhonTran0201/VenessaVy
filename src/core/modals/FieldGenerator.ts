import { faker } from '@faker-js/faker';

export class FieldGenerator {

    //#region basic
    static getEmail(firstName = ``, lastName = ``) {
        if (firstName && lastName) {
            // return faker.address
        }
        return faker.internet.email();
    }

    static getFirstName() {
        return faker.name.firstName();
    }

    static getLastName() {
        return faker.name.lastName();
    }

    static getPhoneNo () {
        return faker.phone.number();
    }

    static getBuildingNo() {
        return faker.address.buildingNumber();
    }

    static getCityName() {
        return faker.address.cityName();
    }

    static getCountryCode() {
        return faker.address.countryCode(`alpha-2`);
    }

    static getState() {
        return faker.address.state();
    }

    static getZipcode() {
        return faker.address.zipCode();
    }

    static getStreetAddress() {
        return faker.address.streetAddress();
    }

    static getStreetName() {
        return faker.address.streetName();
    }

    static getCompanyName() {
        return faker.company.name();
    }

    static getBirthDate() {
        return faker.date.birthdate();
    }

    static getRecentDate() {
        return faker.date.recent();
    }

    static getFutureDate() {
        return faker.date.soon();
    }

    static getDomain() {
        return faker.internet.domainName();
    }

    static getText(lineCount) {
        return faker.lorem.lines();
    }

    static getWords(length=50) {
        return faker.lorem.words(length);
    }

    //#endregion

    //#region default config
    static getQuoteValidityDays() {
        return 30;
    }

    static getSalesDiscountLevel1() {
        return 0;
    }

    static getSalesDiscountLevel2() {
        return 20;
    }

    static getSalesDiscountLevel3() {
        return 30;
    }

    //#endregion

    //#region dynamic accounts
    static getDynamicRef() {

    }



    //#endregion
}