import { faker } from '@faker-js/faker';

export const STAGING_VARSAM_LOGIN_DEFAULT = {
    username: `terry.truong.contemi@productbuilding`,
    password: `QEFuaGRlcHRyYWkyMDIwIw==`
}

export const COMMON = {
    EMAIL: faker.internet.email(),
    FIRST_NAME: faker.name.firstName(),
    LAST_NAME: faker.name.lastName(),
    PHONE_NO: faker.phone.number(),
    BUILD_NO: faker.address.buildingNumber(),
    RANDOM_TEXT: faker.lorem.lines(),
    RECENT_DATE: faker.date.recent(),
    FUTURE_DATE: faker.date.soon(),
    BIRTH_DATE: faker.date.birthdate()
}

export const STAGING_VARSAM_TARGET_GROUP = {
    Target_Group_Create_Name: `Auto Target Group`,
    Target_Group_Edit: `Auto Target Group Edited ${123}`,
    
}

