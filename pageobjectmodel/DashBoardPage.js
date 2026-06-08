class DashBoardPage{
    
    constructor(page){
        this.addToCart="text= Add To Cart";
        this.page=page;
        this.allProducts=page.locator(".card-body");
        this.productText=page.locator(".card-body b");
        this.card=page.locator(".card-body");
        this.cartBtn=page.locator("[routerlink*='cart']");
    }
    async addProductToCart(productName){
        await this.productText.first().waitFor()
        const title=await this.productText.allTextContents();
       // console.log(title);
        let count=await this.allProducts.count();
        for(let i=0;i<count;i++){
        if(await this.allProducts.nth(i).locator("b").textContent()===productName){
            //add to card
            await this.allProducts.nth(i).locator(this.addToCart).click();
            break;
        }
}
} 
     async goToCart(){
        await this.cartBtn.click();
     }
}
module.exports={DashBoardPage};