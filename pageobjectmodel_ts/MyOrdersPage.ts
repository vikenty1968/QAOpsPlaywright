import { expect,Locator,Page } from "@playwright/test";

export class MyOrdersPage{
    page:Page;
    confirmText:Locator;
    orderId:Locator;
    oredersBtn:Locator;

    constructor(page:Page   ){
        this.page=page;
        this.confirmText=page.locator(".hero-primary")
        this.orderId=page.locator("label.ng-star-inserted")
        this.oredersBtn=page.locator(".fa-handshake-o");
    }
    async checkOrderConfirmation(){
        await expect(this.confirmText).toHaveText(" Thankyou for the order. ");
}
    async getOrderId():Promise<string>{
         const orderId=(await this.orderId.textContent())!//! means return type will not be null
        .replaceAll('| ','').trim();
        return orderId;
}
    async goToOrderHistory(){
        await this.oredersBtn.click();
}
}
module.exports={MyOrdersPage};