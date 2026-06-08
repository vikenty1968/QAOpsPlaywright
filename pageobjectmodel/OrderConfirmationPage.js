const {expect}=require('@playwright/test');
class OrderConfirmationPage{
    constructor(page){
        this.page=page;
        this.orderConfirm=page.locator(".col-text");
        this.thankYouText=page.locator("p.tagline");

    }
async checkOrderIdInConfirmationPage(orderId){
   const shippingOrderId=await this.orderConfirm.textContent();
await expect(shippingOrderId).toBe(orderId);

}
async checkThankYouText(){
    await expect(this.thankYouText).toHaveText("Thankyou for the order.");
}
}
module.exports={OrderConfirmationPage};