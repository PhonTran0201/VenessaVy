import UserProfile from "./user-profile-object.json"

// export const USERNAME_USER_PROFILE = userProfileObject.data.attributes.username;
// export const DISPLAY_NAME_USER_PROFILE = userProfileObject.data.attributes.displayName;
// export const EMAIL_USER_PROFILE = userProfileObject.data.attributes.email;
// export const PHONE_NUMBER_USER_PROFILE = userProfileObject.data.attributes.phoneNumber;
// export const TENANT_ID_USER_PROFILE= userProfileObject.data.attributes.tenantId;
// export const UserProfileInfo.getOrganization()= userProfileObject.data.attributes.organizationId;

export class UserProfileInfo {
    private static _username: string = UserProfile.data.attributes.username;
    private static _displayName: string = UserProfile.data.attributes.displayName;
    private static _email: string = UserProfile.data.attributes.email;
    private static _phoneNumber: string = UserProfile.data.attributes.phoneNumber || "";
    private static _tenantId: string= UserProfile.data.attributes.tenantId;
    private static _organizationId: string= UserProfile.data.attributes.organizationId;


    public static getUsername(): string {
        return this._username;
    }
    public static getDisplayName(): string {
        return this._displayName;
    }
    public static getEmail(): string {
        return this._email;
    }
    public static getPhoneNumber(): string {
        return this._phoneNumber;
    }
    public static getTenantId(): string {
        return this._tenantId;
    }
    public static getOrganization(): string {
        return this._organizationId;
    }

    public static resetNewAttributes(userProfileObject: any) {
        UserProfileInfo._username = userProfileObject.data.attributes.username;
        UserProfileInfo._displayName = userProfileObject.data.attributes.displayName;
        UserProfileInfo._email = userProfileObject.data.attributes.email;
        UserProfileInfo._phoneNumber = userProfileObject.data.attributes.phoneNumber || "";
        UserProfileInfo._tenantId = userProfileObject.data.attributes.tenantId;
        UserProfileInfo._organizationId = userProfileObject.data.attributes.organizationId;
    }
}