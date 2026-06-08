const {test, expect}=require('@playwright/test');
const { POManager } = require('../pageobjectmodel/POManager');
//JSON->String->Object
const dataSet=JSON.parse(JSON.stringify(require("../utils/placeorderTestData1.json") ));

test('@E2E Client App Login',async({page})=>{
    const poManager=new POManager(page);
// const context = await browser.newContext();
// const page = await context.newPage();
// const username="anshika@gmail.com";
// const password='Iamking@000';
// const productName="ZARA COAT 3";
const loginPage= poManager.getLoginPage();
const dashBoardPage= poManager.getDashBoardPage();
const cartPage=poManager.getCartPage();
const checkOut=poManager.getCheckOutPage();
const myOrdersPage=poManager.getMyOrdersPage();

await loginPage.goToLogin();
await loginPage.validLogin(dataSet.username,dataSet.password);
await dashBoardPage.addProductToCart(dataSet.productName);
//await page.waitForLoadState('networkidle');//does not work in this case as there are some api calls which are continuously running in the background
await dashBoardPage.goToCart();
await cartPage.checkProductInCart(dataSet.productName);
await cartPage.goToCheckout();
//making payment;

//wait for the dropdown to appear
await checkOut.inputCountryName('United');

// //select the country from dropdown
// const count1=await dropdown.locator("button").count();

// for(let i=0;i<count1;i++){
//     if(await dropdown.locator("button").nth(i).textContent()=== " United Kingdom"){
//         await dropdown.locator("button").nth(i).click();
//         break;
//     }
// } 
await checkOut.selectCountryFromDropdown(" United Kingdom",dataSet.username);

await checkOut.goToPayment();

await myOrdersPage.checkOrderConfirmation();
//get the order id and print it

const orderId=await myOrdersPage.getOrderId();
console.log(orderId);
//go to order history page
//await page.locator(".fa-handshake-o").click();
await myOrdersPage.goToOrderHistory();
//check if the order id is present in the order history page
await page.locator("tbody tr>th").first().waitFor();
const allOrdersId =await(page.locator("tbody tr>th").allTextContents());
console.log(allOrdersId);
//check if the order id is present in the order history page
for(let i=0;i<allOrdersId.length;i++){
    if(allOrdersId[i]===orderId){
        await page.locator("tbody tr td>button.btn-primary").nth(i).click();
        break;
    }
}
const shippingOrderId=await page.locator(".col-text").textContent();
expect(shippingOrderId).toBe(orderId);
console.log("SUCCESS");
//await page.pause();
});