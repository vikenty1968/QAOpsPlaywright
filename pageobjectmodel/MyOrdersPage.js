const { expect } = require('@playwright/test');

class MyOrdersPage{
    constructor(page){
        this.page=page;
        this.confirmText=page.locator(".hero-primary")
        this.orderId=page.locator("label.ng-star-inserted")
        this.oredersBtn=page.locator(".fa-handshake-o");
    }
    async checkOrderConfirmation(){
        await expect(this.confirmText).toHaveText(" Thankyou for the order. ");
}
    async getOrderId(){
        const orderId=(await this.orderId.textContent())
        .replaceAll('| ','').trim();
        return orderId;
}
    async goToOrderHistory(){
        await this.oredersBtn.click();
}
}
module.exports={MyOrdersPage};