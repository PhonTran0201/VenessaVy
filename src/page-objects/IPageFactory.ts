export interface IPageFactory {
    createQuotePage(client: string);
    createPolicyPage(client: string);
    createClaimPage(client: string);
}