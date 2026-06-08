const {test, expect}=require('@playwright/test')

test('Client App Login',async({page})=>{
// const context = await browser.newContext();
// const page = await context.newPage();
const allProducts=page.locator(".card-body");
const productName="ZARA COAT 3";
const email="anshika@gmail.com";
await page.goto('https://rahulshettyacademy.com/client/auth/login');
await page.getByPlaceholder("email@example.com").fill(email);
await page.getByPlaceholder("enter your passsword").fill('Iamking@000');
await page.getByRole("button",{name:"Login"}).click();
//await page.waitForLoadState('networkidle');//does not work in this case as there are some api calls which are continuously running in the background
await page.locator(".card-body").first().waitFor();
await page.locator(".card-body").filter({hasText:(productName)})
                           .getByRole("button",{name:"Add To Cart"}).click();
await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click();

//check the product in cart
await page.locator(".cartSection h3").first().waitFor();
await expect(page.getByText(productName)).toBeVisible();  
await page.getByRole("button",{name:"Checkout"}).click();
// const cartItems=await page.locator(".cartSection h3").allTextContents();
// console.log(cartItems);
// const bool =cartItems.includes(productName);
// expect(bool).toBeTruthy();
// //another way to check the product in cart
// await page.locator("div li").first().waitFor();// to give time to load the products in cart
// const bool2=await page.locator("h3:has-text('" + productName + "')").isVisible();
// expect(bool2).toBeTruthy();
// //making payment
// await page.locator("ul button[type='button'].btn-primary").click();

//to type country name letter by letter
await page.getByPlaceholder("Select Country").pressSequentially("United");

//wait for the dropdown to appear
//const dropdown=page.locator(".ta-results");
//await dropdown.waitFor();
//select the country from dropdown
// const count1=await dropdown.locator("button").count();

// for(let i=0;i<count1;i++){
//     if(await dropdown.locator("button").nth(i).textContent()=== " United Kingdom"){
//         await dropdown.locator("button").nth(i).click();
//         break;
//     }
// } 
//another way to select the country from dropdown
//await page.locator(".ta-results button").filter({hasText:" United Kingdom"}).click();
await page.getByRole("button",{name:"United Kingdom"}).click();

//assertion for the email in the order confirmation page
//await expect(page.locator(".user__name>label")).toHaveText(email);
await page.getByText("Place Order ").click();//use getByText instead of locator because tagName is a not a button and it is not working with locator
await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();
//await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
//get the order id and print it
const orderId=(await page.locator("label.ng-star-inserted").textContent())
.replaceAll('| ','').trim();
console.log(orderId);

//go to order history page
await page.getByRole("button",{name:"  ORDERS"}).click();
await page.locator("tbody tr>th").first().waitFor();
await page.locator("tbody tr").filter({hasText:orderId})
.getByRole("button",{name:"View"}).click();

await expect(page.locator(".col-text")).toContainText(orderId);

console.log("SUCCESS");
//await page.pause();
});