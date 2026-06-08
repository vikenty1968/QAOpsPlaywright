//const { expect } = require('@playwright/test');
import { expect,Locator,Page } from "@playwright/test";
export class CartPage{
    page:Page;
    cartProducts:Locator;
    checkoutButton:Locator;     
    constructor(page:Page){
        this.page=page;
        this.cartProducts=page.locator(".cartSection h3");
        this.checkoutButton=page.locator("ul button[type='button'].btn-primary");
    }
    async checkProductInCart(productName:string){
        await this.cartProducts.first().waitFor();
        const cartItems=await this.cartProducts.allTextContents();
        console.log(cartItems);
        // const bool =await cartItems.includes(productName);
        // await expect(bool).toBeTruthy()
    await expect(
        this.page.locator(`h3:has-text("${productName}")`)
    ).toBeVisible();
}
 
        async goToCheckout(){  
        await this.checkoutButton.click();     
}
}
//module.exports={CartPage};