const { test, expect } = require("@playwright/test");

test("Client App Login", async ({ page }) => {
  // const context = await browser.newContext();
  // const page = await context.newPage();
  const allProducts = page.locator(".card-body");
  const productName = "ZARA COAT 3";
  const email = "anshika@gmail.com";
  await page.goto("https://rahulshettyacademy.com/client/auth/login");
  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").fill("Iamking@000");
  await page.locator("#login").click();
  //await page.waitForLoadState('networkidle');//does not work in this case as there are some api calls which are continuously running in the background
  //await page.locator(".card-body b").first().waitFor();
  const orderRow = page.locator("tbody tr").filter({
    hasText: orderId
  });

  await expect(orderRow).toBeVisible();
  const title = await page.locator(".card-body b").allTextContents();
  //console.log(title);
  let count = await page.locator(".card-body").count();
  for (let i = 0; i < count; i++) {
    if ((await allProducts.nth(i).locator("b").textContent()) === productName) {
      await allProducts.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }
  await page.locator("[routerlink*='cart']").click();
  //check the product in cart
  await page.locator(".cartSection h3").first().waitFor();
  const cartItems = await page.locator(".cartSection h3").allTextContents();
  console.log(cartItems);
  const bool = cartItems.includes(productName);
  expect(bool).toBeTruthy();
  //another way to check the product in cart
  await page.locator("div li").first().waitFor(); // to give time to load the products in cart
  const bool2 = await page
    .locator("h3:has-text('" + productName + "')")
    .isVisible();
  expect(bool2).toBeTruthy();
  //making payment
  await page.locator("ul button[type='button'].btn-primary").click();
  //to type country name letter by letter
  await page
    .locator("[placeholder='Select Country']")
    .pressSequentially("United");
  //wait for the dropdown to appear
  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();
  //select the country from dropdown
  const count1 = await dropdown.locator("button").count();

  for (let i = 0; i < count1; i++) {
    if (
      (await dropdown.locator("button").nth(i).textContent()) ===
      " United Kingdom"
    ) {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }
  //assertion for the email in the order confirmation page
  await expect(page.locator(".user__name>label")).toHaveText(email);
  await page.locator("div a.btnn").click();
  await expect(page.locator(".hero-primary")).toHaveText(
    " Thankyou for the order. ",
  );
  //get the order id and print it
  const orderId = (await page.locator("label.ng-star-inserted").textContent())
    .replaceAll("| ", "")
    .trim();
  console.log(orderId);
  //go to order history page
  await page.locator(".fa-handshake-o").click();
  await page.locator("tbody tr>th").first().waitFor();
  const allOrdersId = await page.locator("tbody tr>th").allTextContents();
  console.log(allOrdersId);
  //check if the order id is present in the order history page
  for (let i = 0; i < allOrdersId.length; i++) {
    if (allOrdersId[i] === orderId) {
      await page.locator("tbody tr td>button.btn-primary").nth(i).click();
      break;
    }
  }
  const shippingOrderId = await page.locator(".col-text").textContent();
  expect(shippingOrderId).toBe(orderId);
  console.log("SUCCESS");
  //await page.pause();
});
