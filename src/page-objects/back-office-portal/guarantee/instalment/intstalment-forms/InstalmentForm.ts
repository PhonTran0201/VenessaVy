import { By } from "selenium-webdriver";
import { SeleniumWebDriverService } from "../../../../../core/selenium-webdriver.service";
import { waitUntilHorizontalProgressBarLoaded_v2 } from "../../../../../shared/functions";



export class InstalmentForm {

    constructor(protected driverService: SeleniumWebDriverService) { }

    private txtInstalmentNo = By.xpath("//app-instalment-form//label[contains(text(),'Instalment no.')]//following-sibling::*//input");
    private txtPostedDate = By.xpath("//app-instalment-form//label[contains(text(),'Posted date')]//following-sibling::*//input");
    private txtCurrencyCode = By.xpath("//app-instalment-form//label[contains(text(),'Currency code')]//following-sibling::*//input");
    private txtInvoiceNo = By.xpath("//app-instalment-form//label[contains(text(),'Invoice no.')]//following-sibling::*//input");
    private txtOrderNo = By.xpath("//app-instalment-form//label[contains(text(),'Order no.')]//following-sibling::*//input");
    private lblTotalAmount = By.xpath("//app-instalment-form//tbody//td[contains(text(),'Total')]");





    public async validateInstalmentNoOnInstalmentForm(ExpectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtInstalmentNo);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualValue = await this.driverService.getAttributeValue(this.txtInstalmentNo, "value");
            return await this.driverService.validateRecord(`Validate InstalmentNo on form`, [ActualValue, ExpectedValue, `Incorrect InstalmentNo`]);
        } catch (error) {
            console.log(`validateInstalmentNoOnInstalmentForm`);
            console.log(error);
            return false;
        }
    }

    public async validatePostedDateOnInstalmentForm(ExpectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtPostedDate);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualValue = await this.driverService.getAttributeValue(this.txtPostedDate, "value");
            if (ExpectedValue.toLowerCase().includes(ActualValue.toLowerCase())) {
                ExpectedValue = ActualValue;
            }
            return await this.driverService.validateRecord(`Validate Posted Date on form`, [ActualValue, ExpectedValue, `Incorrect Posted Date`]);
        } catch (error) {
            console.log(`validatePostedDateOnInstalmentForm`);
            console.log(error);
            return false;
        }
    }

    public async validateCurrencyCodeOnInstalmentForm(ExpectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtCurrencyCode);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualValue = await this.driverService.getAttributeValue(this.txtCurrencyCode, "value");
            if (ExpectedValue.toLowerCase().includes(ActualValue.toLowerCase())) {
                ExpectedValue = ActualValue;
            }
            return await this.driverService.validateRecord(`Validate Currency Code on form`, [ActualValue, ExpectedValue, `Incorrect Currency Code`]);
        } catch (error) {
            console.log(`validateCurrencyCodeOnInstalmentForm`);
            console.log(error);
            return false;
        }
    }

    public async inputInvoiceNoOnInstalmentForm(InvoiceNo: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtInvoiceNo);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            if (await this.driverService.canBeSetText(this.txtInvoiceNo)) {
                await this.driverService.setText(this.txtInvoiceNo, InvoiceNo);
            }
            return true;
        } catch (error) {
            console.log("inputInvoiceNoOnInstalmentForm");
            console.log(error);
            return false;
        }
    }

    public async inputOrderNoOnInstalmentForm(OrderNo: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.txtOrderNo);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            if (await this.driverService.canBeSetText(this.txtOrderNo)) {
                await this.driverService.setText(this.txtOrderNo, OrderNo);
            }
            return true;
        } catch (error) {
            console.log("inputOrderNoOnInstalmentForm");
            console.log(error);
            return false;
        }
    }

    public async validateValueOnListInstalmentForm(
        Description: string,
        StartDate: string,
        EndDate: string,
        Amount: string
    ) {
        let lblDescription = By.xpath(`//app-instalment-form//tbody//tr[td[contains(text(),'${Description}')]]//td[1]`);
        let lblStartDate = By.xpath(`//app-instalment-form//tbody//tr[td[contains(text(),'${Description}')]]//td[2]`);
        let lblEndDate = By.xpath(`//app-instalment-form//tbody//tr[td[contains(text(),'${Description}')]]//td[3]`);
        let lblAmount = By.xpath(`//app-instalment-form//tbody//tr[td[contains(text(),'${Description}')]]//td[4]`);
        await this.driverService.waitUntilElementLoaded(By.xpath(`//app-instalment-form//tbody`));
        await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
        let ActualDescription = await this.driverService.getText(lblDescription);
        let ActualStartDate = await this.driverService.getText(lblStartDate);
        let ActualEndDate = await this.driverService.getText(lblEndDate);
        let ActualAmount = await this.driverService.getText(lblAmount);

        if (ActualDescription.toLowerCase().includes(Description.toLowerCase())) {
            ActualDescription = Description;
        }

        return await this.driverService.validateRecord(
            `values on List of Instalment Form display correctly on row '${Description}' `,
            // [ActualDescription, Description, "Assert at Description: Incorrect Description"],
            [ActualStartDate, StartDate, "Assert at StartDate: Incorrect StartDate"],
            [ActualEndDate, EndDate, "Assert at EndDate: Incorrect EndDate"],
            [ActualAmount, Amount, "Assert at Amount: Incorrect Amount"]

        );
    }

    public async validateTotalAmountOnListInstalmentForm(ExpectedValue: string) {
        try {
            await this.driverService.waitUntilElementLoaded(this.lblTotalAmount);
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService, 10);
            let ActualValue = await (await this.driverService.getText(this.lblTotalAmount)).substring(7);
            if (ExpectedValue.toLowerCase().includes(ActualValue.toLowerCase())) {
                ActualValue = ExpectedValue;
            }
            return await this.driverService.validateRecord(`Validate Total Amount form`, [ActualValue, ExpectedValue, `Incorrect Total Amount`]);
        } catch (error) {
            console.log(`validateTotalAmountOnListInstalmentForm`);
            console.log(error);
            return false;
        }
    }

    public async closeInstalmentForm() {
        try {
            let btnClose = By.xpath("//app-instalment-form//button[@class='close']//i");
            await waitUntilHorizontalProgressBarLoaded_v2(this.driverService);
            if(await this.driverService.isExisted(btnClose)){
                await this.driverService.click(btnClose);
            }
            return true;
        } catch (error) {
            console.log("closeInstalmentForm");
            console.log(error);
            return false;
        }
    }

}