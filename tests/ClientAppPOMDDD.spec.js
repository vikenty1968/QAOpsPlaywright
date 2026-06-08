const { test, expect } = require("@playwright/test");
const { POManager } = require("../pageobjectmodel/POManager");
//JSON->String->Object
const dataSet = JSON.parse(
  JSON.stringify(require("../utils/placeorderTestData.json")),
);
for (const data of dataSet) {
  test(`Client App Login for ${data.productName}`, async ({ page }) => {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    const dashBoardPage = poManager.getDashBoardPage();
    const cartPage = poManager.getCartPage();
    const checkOut = poManager.getCheckOutPage();
    const myOrdersPage = poManager.getMyOrdersPage();
    const orderHistoryPage = poManager.getOrderHistoryPage();
    const orderConfirmationPage = poManager.getOrderConfirmationPage();

    await loginPage.goToLogin();
    await loginPage.validLogin(data.username, data.password);
    await dashBoardPage.addProductToCart(data.productName);
    //await page.waitForLoadState('networkidle');//does not work in this case as there are some api calls which are continuously running in the background
    await dashBoardPage.goToCart();
    await cartPage.checkProductInCart(data.productName);
    await cartPage.goToCheckout();
    //making payment;

    //wait for the dropdown to appear
    await checkOut.inputCountryName(data.countryLetter);

    await checkOut.selectCountryFromDropdown(data.countryName, data.username);

    await checkOut.goToPayment();

    await myOrdersPage.checkOrderConfirmation();
    //get the order id and print it

    const orderId = await myOrdersPage.getOrderId();
    console.log(orderId);
    //go to order history page
    //await page.locator(".fa-handshake-o").click();
    await myOrdersPage.goToOrderHistory();
    //check if the order id is present in the order history page
    await orderHistoryPage.checkOrderInOrderHistory(orderId);

    await orderConfirmationPage.checkOrderIdInConfirmationPage(orderId);

    console.log("SUCCESS");
    
  });
}
