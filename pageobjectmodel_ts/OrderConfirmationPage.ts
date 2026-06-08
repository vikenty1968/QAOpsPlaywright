import { expect,Locator,Page } from "@playwright/test";
export class OrderConfirmationPage{
    page:Page;
    orderConfirm:Locator;
    thankYouText:Locator;
    constructor(page:Page){
        this.page=page;
        this.orderConfirm=page.locator(".col-text");
        this.thankYouText=page.locator("p.tagline");

    }
async checkOrderIdInConfirmationPage(orderId:any){
   const shippingOrderId=await this.orderConfirm.textContent();
await expect(shippingOrderId).toBe(orderId);

}
async checkThankYouText(){
    await expect(this.thankYouText).toHaveText("Thankyou for the order.");
}
}
module.exports={OrderConfirmationPage};