import pactum from 'pactum';
import jsonPath from 'jsonpath';
import * as fs from 'fs';
import { DataConfig } from './data_config';

export class DataAccess {
    spec = pactum.spec();
    accessToken: string = "";
    DEFAULT_DOMAIN = "https://api.staging.contemisaasdev.com";
    
    readonly DEFAULT_ACCEPT_HEADER = "application/vnd.api+json"
    readonly DEFAULT_CONTENT_TYPE_HEADER = "application/vnd.api+json"
    readonly DEFAULT_TIMEOUT = 5000;
    readonly pathToken = `src/core/modals/data/access.token`;
    readonly DEFAULT_BODY = `{"Criteria":{"Order":{"Type":"ASC"},"Keyword":""},"IgnoreStatus":true,"Page":1,"ItemsPerPage":10}`;

    EndPoints = {
        Users: ``,

    };

    //#region constructor
    constructor() {
        if (DataConfig.ENV === "staging") {
            this.DEFAULT_DOMAIN = "https://api.staging.contemisaasdev.com";
        } else {
            this.DEFAULT_DOMAIN = "https://api.seamless.insure";
        }
        pactum.request.setBaseUrl(this.DEFAULT_DOMAIN);
        pactum.request.setDefaultTimeout(this.DEFAULT_TIMEOUT);
        pactum.request.setDefaultHeaders(`Accept`, this.DEFAULT_ACCEPT_HEADER);
        pactum.request.setDefaultHeaders(`Content-Type`, this.DEFAULT_CONTENT_TYPE_HEADER);
    }
    //#endregion

    //#region support methods for Token
    async loadAccessToken(resetToken: boolean = false) {
        if (!fs.existsSync(this.pathToken)) {
            return false;
        }
        if (resetToken) {
            await fs.writeFileSync(this.pathToken, ``);
        }
        let token = fs.readFileSync(this.pathToken, 'utf8');
        if (!token) {
            token = await this.requestToken();
        }
        this.accessToken = token;
        await fs.writeFileSync(this.pathToken, token);
        pactum.request.setDefaultHeaders(`Authorization`, `Bearer ${token}`);
        console.log("AccessToken " + this.accessToken);
    }

    private async requestToken(): Promise<string> {
        if (DataConfig.ENV != 'staging') return "Unsupported environment";
        const jBody = {
            "AuthParameters": {
                "USERNAME": DataConfig.DEFAULT_ACCOUNT,
                "PASSWORD": DataConfig.DEFAULT_PASSWORD
            },
            "AuthFlow": `USER_PASSWORD_AUTH`,
            "ClientId": `4v243m8dn2munspvf6un70mtn6`
        }
        const res = await pactum.spec()
            .post(DataConfig.AWS_URL)
            .withHeaders('X-Amz-Target', `AWSCognitoIdentityProviderService.InitiateAuth`)
            .withHeaders('Content-Type', `application/x-amz-json-1.1`)
            .withBody(jBody)
            .expectStatus(200)
            .returns("AuthenticationResult.AccessToken");
        return String(res);
    }

    private async dump(jsonObj) {
        const jsonString = JSON.stringify(jsonObj, undefined, 4);
        console.log(jsonString);
    }

    public async send_request(method, endpoint, bodyJson = "", queryParams = {}, inspect = false) {
        let spec = pactum.spec();
        spec[method.toLowerCase()](endpoint);
        if (bodyJson) {
            spec.withBody(bodyJson);
        }
        for (let key in queryParams) {
            let value = queryParams[key];
            spec.withQueryParams(key, value);
        }
        if (inspect) {
            spec.inspect();
        }
        try {
            const response = await spec.toss();
            if (await response.body.message ===`Unauthorized`) {
                throw new Error(`Unauthorized...`);
            }
            if (await response.statusCode === 500) {
                throw new Error(`Internal Server Error ${endpoint}: ${response.body.Message}`);
            }
            
            //console.log(response.body);
            //await this.dump(response.body);
            return await response.body;
            // const jsonObj = JSON.parse(response.body);
            // const jsonString = JSON.stringify(jsonObj, undefined, 4);
            // console.log(jsonString);
            // return jsonObj;
        } catch (error) {
            throw error;
        }
    }

    // https://www.npmjs.com/package/jsonpath
    public async getJsonValue(obj, pathExpression) {
        return await jsonPath.value(obj, pathExpression);
    }

    //#endregion

    //#region get 
    async getUserData() {
        // const bodyJson = `{
        // "data": {
        //         "type": "retrieveUserDetailsRequests",
        //         "id": "liam.nguyen@contemi-testing"
        //     }
        // }`;
        // const result = await this.send_request(`post`, `/users/api/v1/users/retrieveUserDetailsRequest`, bodyJson);
        const result = await this.send_request(`get`, `/configuration/api/v1/agencies?include=salesChannels`);
        console.log(result);
    }

    async getSalesChannels() {
        const result = await this.send_request(`get`, `/configuration/api/v1/agencies?include=salesChannels`);
    }

    async getUsers() {
        const result = await this.send_request(`post`, `/search-api/insurance/user/search`, this.DEFAULT_BODY);
    }

    async getUserList() {
        const result = await this.send_request(`get`, `/api/v1/users`);
        this.dump(result);
    }

    async getDetailsRequest() {
        const queryParams = { include: `roles,organization,signatureData`};
        const result = await this.send_request(`post`, `/users/api/v1/users/retrieveUserDetailsRequest`, `{"data":{"type":"retrieveUserDetailsRequests","id":"terry.contemi@varsam-staging"}}`, queryParams, false);
        console.log(result);
    }

    async getEntities() {
        const result = await this.send_request(`post`, `/entity-api/entity/search`, this.DEFAULT_BODY);
    }

    async getProductsList() {
        const result = await this.send_request(`get`, `/configuration/api/v1/products?page%5Bsize%5D=10&page%5Bnumber%5D=1&sort=-createdDate&filter%5BincludeArchived%5D=false`);
        console.log(result);
    }

    async getProductInfo(productId: string =`product-484e6182-9ba1-08da-f1ce-c807e91532c8`) {
        const result = await this.send_request(`get`, `/configuration/api/v1/products/${productId}`);
        console.log(result);
    }

    async getProductProperty(productId: string) {

    }

    async getChildOrganization() {
        return await this.send_request(`get`, `/search-api/insurance/user/organization/varsam-staging/getChildrenOrganizations`);
    }

    async getOrganization() {
        const organizationId = `organization-1bc1afd2-a83f-08da-84c2-f4dcf84716c1`;
        const result = await this.send_request(`get`, `/users/api/v1/organizations/${organizationId}?include=users.roles`);
        console.log(result);
    }
    //#endregion

    //#region post
    async addSalesChannels() {
        const bodyJson = `{"data":{"relationships":{"agency":{"data":{"type":"agencies","id":"agency-7e23041f-52f9-56fa-b131-495ab264183c"}},"products":{"data":[{"type":"products","id":"product-60c0ae24-3402-08da-9c42-339cd2e1edcd"},{"type":"products","id":"product-4a9564cd-af4e-08d9-fec4-f280c57a27cb"},{"type":"products","id":"product-722a1705-7aac-08da-c395-81cfd0c376c1"},{"type":"products","id":"product-b55d737e-49ee-08da-0424-5e0f9cb686c6"},{"type":"products","id":"product-3d9847b9-5b1d-08da-9d72-640c4e62c4c1"},{"type":"products","id":"product-31c7d6af-aa69-08d9-d7dc-67fc4c914bc2"},{"type":"products","id":"product-786da843-526d-08d9-f44a-7b5805ee1bcb"},{"type":"products","id":"product-f7d0d28c-fc29-08d9-4cde-430f9e85e6cb"},{"type":"products","id":"product-6ee15afa-70f0-08d9-372b-0138525589ce"},{"type":"products","id":"product-7ef805a9-3a42-08da-a64a-223ad4582cc5"},{"type":"products","id":"product-7b01a2c6-3a3d-08da-9cda-340e91bdd9ca"},{"type":"products","id":"product-be35463e-3a3b-08da-25c5-aa0c0b75e1cc"},{"type":"products","id":"product-51775631-a8b1-08d9-ec43-a5754c1f08c1"},{"type":"products","id":"product-c43bb720-526d-08d9-9f80-b1f57dda7ec6"},{"type":"products","id":"product-3e0061a0-5272-08d9-ec60-72aeba49dac6"},{"type":"products","id":"product-73deb79e-527e-08d9-df9d-54d695b709c3"},{"type":"products","id":"product-fa6e4f3d-527d-08d9-7287-ae0ab90d47c5"},{"type":"products","id":"product-83b28b97-7460-08da-6308-145cab7d84c1"},{"type":"products","id":"product-4772f1e6-7b4b-08da-2b65-d1f8535fe6c5"},{"type":"products","id":"product-967869f1-43db-08da-5f01-a076aa8185ca"},{"type":"products","id":"product-40414e96-bacc-08d9-7da9-8a6798aba8cb"},{"type":"products","id":"product-b28e414f-4f3d-08da-2f92-08ec677161c4"},{"type":"products","id":"product-0bd89b42-662a-08d9-58dc-d37f91d143c9"},{"type":"products","id":"product-6c9b59f1-63af-08d9-8477-d4f1fc8649ca"},{"type":"products","id":"product-41fe777a-52fb-08d9-783b-6180736e2bc1"},{"type":"products","id":"product-c563be99-52fb-08d9-7772-14aba2e1efcf"},{"type":"products","id":"product-28ef623a-9ab8-08d9-ba9d-1b9ba6a1edc7"},{"type":"products","id":"product-cd9104ee-cb44-08d9-10f8-489b5c66edc7"},{"type":"products","id":"product-93536e27-1eb0-08da-d164-83c80d4436ca"},{"type":"products","id":"product-1a62ab4d-70f6-08d9-83d6-75bf1cf119c2"},{"type":"products","id":"product-474f30af-5403-08da-e8d1-640a0b7e1bcc"},{"type":"products","id":"product-b7e49d98-4469-08da-9f31-3535eefa7ac0"},{"type":"products","id":"product-7113d6a2-4df1-08da-d851-858ca53472c1"},{"type":"products","id":"product-f050698b-6324-08da-0ae3-1e9cd320ddc7"},{"type":"products","id":"product-165ba0c7-630d-08da-00ed-2274b08133c5"},{"type":"products","id":"product-3650cb43-60a6-08d9-b879-61277263f3cb"},{"type":"products","id":"product-e852dd70-736f-08da-2e89-53b593722fc2"},{"type":"products","id":"product-59cf2721-739d-08da-28ce-4a5ee2ab78c8"},{"type":"products","id":"product-fbd85d73-3a3e-08da-29ad-285562649bc3"},{"type":"products","id":"product-a7e7f058-70f5-08d9-ad92-d3bef8d815c0"},{"type":"products","id":"product-ede56247-6932-08d9-2bc6-986dc18a5ec8"},{"type":"products","id":"product-4c27307f-9562-08da-0cde-dc6aebff13cc"},{"type":"products","id":"product-b36da7ce-a832-08d9-4622-37db4feb55cb"},{"type":"products","id":"product-ea6c0541-a838-08d9-7a69-9c56edb9f5cb"},{"type":"products","id":"product-e4f625cc-70f5-08d9-e2ec-0758cad438c5"},{"type":"products","id":"product-92587daa-7368-08da-29a6-11c30a1f41cc"},{"type":"products","id":"product-ff726a91-afdd-08d9-e838-42580e81efc4"},{"type":"products","id":"product-e58b9c0d-7ce1-08d9-3a0a-36455c1f2bc9"},{"type":"products","id":"product-3079c587-b875-08d9-ddde-557895d0a4cc"},{"type":"products","id":"product-3bc154ac-70f5-08d9-38bc-6941ed98e0c7"},{"type":"products","id":"product-99bdd884-c048-08d9-4582-d8b6e7803bc1"},{"type":"products","id":"product-1aba30be-a39d-08d9-aed1-6d81c57d30cc"},{"type":"products","id":"product-697f8305-5267-08d9-48d8-f36116c90ac2"},{"type":"products","id":"product-4460e6b4-62f3-08da-8775-0a21737faac1"},{"type":"products","id":"product-38b7ba5e-4930-08da-a917-90f78228c0c6"},{"type":"products","id":"product-04d31062-52fc-08d9-73d2-b420ebbde0cd"},{"type":"products","id":"product-43b3d367-52fc-08d9-0e3b-d0ea6a5069c9"},{"type":"products","id":"product-81bd54a8-6c38-08d9-96e1-3f4037fbe7c9"},{"type":"products","id":"product-5addd1c9-fc36-08d9-a3bf-2cedb611c3c2"},{"type":"products","id":"product-f7699e96-61c1-08d9-648c-728d9ee870c9"},{"type":"products","id":"product-505398a1-623e-08d9-8433-bebab329a6c3"},{"type":"products","id":"product-3624bcbc-0572-08da-e8f2-4ee16b9262cb"},{"type":"products","id":"product-b5b09433-c6aa-08d9-762c-d19c0c4550ca"},{"type":"products","id":"product-8dd530a8-6c6b-08d9-e7f7-2e4fd73209c0"},{"type":"products","id":"product-08b213f5-8fb3-08da-7efe-31e0a16463c2"},{"type":"products","id":"product-264921a7-526a-08d9-afed-b19575546bcb"},{"type":"products","id":"product-ed556e18-3c64-08da-6334-8ce972476bc9"},{"type":"products","id":"product-7236976f-526b-08d9-7da8-c5c3abca03ce"},{"type":"products","id":"product-c2a5fb0d-526b-08d9-b5f8-13b2404b44cd"},{"type":"products","id":"product-8d416ba0-526c-08d9-5691-65c5e3b5cec7"},{"type":"products","id":"product-7a7c134f-a00f-08d9-27eb-1b6f2cd59bc3"},{"type":"products","id":"product-9e139f4c-90c3-08da-2ed7-acf0e1883dca"},{"type":"products","id":"product-a9484394-8fc4-08da-ddc3-944d1bfe5fca"},{"type":"products","id":"product-e4606c94-8fb4-08da-ac99-e70c514dccc5"},{"type":"products","id":"product-d01f529c-8199-08da-eb92-d7183fda96cd"},{"type":"products","id":"product-b501e02d-cf6f-08d9-d8cb-467ef928f3c4"},{"type":"products","id":"product-96c1d062-cf6e-08d9-91f8-a298f8447bca"},{"type":"products","id":"product-5964c093-cf6f-08d9-df05-f0882210d1c3"},{"type":"products","id":"product-ff920444-55d0-08da-c5a4-57e94af718cb"},{"type":"products","id":"product-948da6b3-4e77-08da-8432-e0eedf59dccd"},{"type":"products","id":"product-7aa9b2a1-cf6c-08d9-f376-f20826f628ca"},{"type":"products","id":"product-054c5650-cf6d-08d9-6ffc-6ef601c45fc3"},{"type":"products","id":"product-8fc0fd45-242b-08da-66dd-eb84369ac3c1"},{"type":"products","id":"product-3c00e675-8687-08da-e7d3-8ea6448529c2"},{"type":"products","id":"product-cff920c3-a00b-08d9-5f6d-00188961e7cb"},{"type":"products","id":"product-7868bd00-0591-08da-5b93-d9a902e388cd"},{"type":"products","id":"product-14dc7b08-5501-08da-dc7d-dd4ea4b338ca"},{"type":"products","id":"product-e09960a5-4ff2-08d9-df35-e65963194dc6"},{"type":"products","id":"product-f6394d8b-78bb-08d9-2c29-bcad8ee15ecc"},{"type":"products","id":"product-f62240e2-623d-08d9-4e33-9b95d4b00bc9"},{"type":"products","id":"product-ea40a7ee-2216-08da-1020-26710f74e9c8"},{"type":"products","id":"product-015ac737-a5d8-08da-df1d-56afb34160ca"},{"type":"products","id":"product-afb05b0c-0b64-08da-2486-48215e1033c8"},{"type":"products","id":"product-200d96bd-0b89-08da-3fc8-b3fdda01bccd"},{"type":"products","id":"product-f888f2d6-7c43-08da-131a-c8f5a18a6ec4"},{"type":"products","id":"product-b3e1d25a-955b-08da-8404-b018d1bcc6c1"},{"type":"products","id":"product-923bd2c6-6242-08d9-eb0a-046bfd30aace"},{"type":"products","id":"product-da948409-621e-08d9-f74f-8a39b0f99bc4"},{"type":"products","id":"product-7ee0f095-ec7d-08d9-47b1-f23ab0dc13ce"},{"type":"products","id":"product-d3caf4bd-9d54-08d9-f13c-e5641addf1c1"},{"type":"products","id":"product-0d6749e7-08b5-08da-7717-5f157009ebc7"},{"type":"products","id":"product-fa34eb72-08c4-08da-0876-eda967e27cc0"},{"type":"products","id":"product-e0ca9f2e-dfc3-08d9-0986-9afea71ba4cc"},{"type":"products","id":"product-a79507f9-bf56-08d9-26a1-8d90e164dec6"},{"type":"products","id":"product-75dcf888-52fc-08d9-eb5e-ec299b4bb9c9"},{"type":"products","id":"product-82c6585d-be82-08d9-4dac-24814a84b0c2"},{"type":"products","id":"product-4eb04f23-6f83-08da-3e55-1b1ccd1cfecf"},{"type":"products","id":"product-6f49c521-84e8-08da-940f-aaff87de43c5"},{"type":"products","id":"product-418de9d8-b55c-08d9-2b12-3320f78e58c0"},{"type":"products","id":"product-1428365c-a294-08da-5c94-c8091778a7c7"},{"type":"products","id":"product-fc8cbe4c-ec7d-08d9-cf30-79418f1f91c1"}]}},"type":"salesChannels","attributes":{"name":"[A] Vip Channel","organizationId":"organization-d1b7c56e-7c15-08da-01b3-49c6bc2ec8c8"}}}`;
        const result = await this.send_request(`post`, `/configuration/api/v1/salesChannels`, bodyJson);
    }
    //#endregion

    //#region put

    //#endregion
}