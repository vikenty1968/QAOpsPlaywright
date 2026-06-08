const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("../utils/APIUtils");

const payLoadLogin = {
  userEmail: "anshika@gmail.com",
  userPassword: "Iamking@000",
};
const orderPayLoad = {
  orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }],
};
const email = "anshika@gmail.com";
const LoginURL = "https://rahulshettyacademy.com/api/ecom/auth/login";
let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, payLoadLogin);
  response = await apiUtils.createOrder(orderPayLoad);
  console.log(response);
});

test("Place an order", async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);
  //login through API and then go to the page directly without login through UI
  await page.goto(LoginURL);
  //create order through API and then verify the order in UI

  //On UI go to order history page
  await page.goto("https://rahulshettyacademy.com/client/myorders");
  await page.locator(".fa-handshake-o").click();
  await page.locator("tbody tr>th").first().waitFor();
  const allOrdersId = await page.locator("tbody tr>th").allTextContents();
  console.log(allOrdersId);
  //check if the order id is present in the order history page
  for (let i = 0; i < allOrdersId.length; i++) {
    if (allOrdersId[i].includes(response.orderId)) {
      await page.locator("tbody tr td>button.btn-primary").nth(i).click();
      break;
    }
  }
  //verify the order id in the order history page
  const shippingOrderId = await page.locator(".col-text").textContent();
 // await page.pause();
  await expect(shippingOrderId).toBe(response.orderId);
  console.log("SUCCESS");
});
