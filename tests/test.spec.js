const {test, expect,request}=require('@playwright/test');
const payLoadLogin = {userEmail:"anshika@gmail.com", userPassword: "Iamking@000"}
const orderPayLoad={orders: [{country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}]}   
const email="anshika@gmail.com";
const LoginURL='https://rahulshettyacademy.com/client/auth/login';
let token;
let orderId;
test("test token", async ({page}) => {
    //login through API and get the token
const apiContext = await request.newContext();
const loginResponse = await apiContext
.post('https://rahulshettyacademy.com/api/ecom/auth/login',
    {
    data:
        payLoadLogin
      
    })
    //console.log(await loginResponse);
   await expect(loginResponse.ok()).toBeTruthy();//expect(loginResponse.status()).toBe(200);
    
const loginResponseJson=await loginResponse.json();//json parse the response to get the token
console.log(loginResponseJson);
await expect(loginResponseJson.token).toBeDefined();
token=loginResponseJson.token;
//console.log(token);
//create order through API and then verify the order in UI
const orderResponse = await apiContext
.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
{data:orderPayLoad,
    headers:{'Authorization': token,
    'Content-Type': 'application/json'}
    }
)
await expect(orderResponse.ok()).toBeTruthy();
const orderResponseJson=await orderResponse.json();
await expect(orderResponseJson.orders).toBeDefined();
 orderId= await orderResponseJson.orders[0];
 console.log("orderId: " + orderId);





//go to order history page
//firs add token to local storage and then go to the order history page
await page.addInitScript(value=>{
    window.localStorage.setItem('token',value);
},token);
await page.goto('https://rahulshettyacademy.com/client/myorders');
await page.locator(".fa-handshake-o").click();
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

