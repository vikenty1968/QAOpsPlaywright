const { expect } = require('@playwright/test');

class CartPage{
    constructor(page){
        this.page=page;
        this.cartProducts=page.locator(".cartSection h3");
        this.checkoutButton=page.locator("ul button[type='button'].btn-primary");
    }
    async checkProductInCart(productName){
    //     await this.cartProducts.first().waitFor();//it doesn't workin CI/CD
        
    //     const cartItems=await this.cartProducts.allTextContents();
    //     console.log(cartItems);
    //     // const bool =await cartItems.includes(productName);
    //     // await expect(bool).toBeTruthy()
    // await expect(
    //     this.page.locator(`h3:has-text("${productName}")`)
    // ).toBeVisible();

    //another way to check the product in cart
        const productInCart = this.page
            .locator(".cartSection h3")
            .filter({ hasText: productName });

        await expect(productInCart).toBeVisible();
    
}
 
        async goToCheckout(){  
        await this.checkoutButton.click();     
}
}
module.exports={CartPage};