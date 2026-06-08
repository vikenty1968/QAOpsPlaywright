const{test, expect}=require('@playwright/test');
test('Popup Validation',async({page})=>{

await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
// await page.goto("https://google.com");
// await page.goBack();//return to previous page
// await page.goForward();//go to next page
// await page.reload();//refresh the page
//handling alert -popup
await page.pause();//to see the popup
//hided popup
await expect(page.locator("#displayed-text")).toBeVisible();
await page.locator("#hide-textbox").click();
await expect(page.locator("#displayed-text")).toBeHidden();
//handling popup
//listeners once wiil close after handling one popup so we have to call it again for next popup
page.once('dialog',dialog=>dialog.accept());//call in advance to handle the popup NOTE: no await;
await page.locator("#alertbtn").click();
page.once('dialog',dialog=>dialog.dismiss());
await page.locator("#confirmbtn").click();
//hover on element and click on the sub element
await page.locator("#mousehover").hover();
await page.locator("a:has-text('Reload')").click();
//frame handling
//swithch to frame using name or id
const framePage=page.frameLocator("#courses-iframe");//frame page
//child element inside frame
//await framePage.locator("a[href*='lifetime-access':visible]").click();//visible locatorout of 2 links with same href
await framePage.locator('a.new-navbar-highlighter[href*="lifetime-access"]').click();
const text=await framePage.locator("div.text h2>span").textContent();
console.log(text);
//another way to switch to frame using delimeter and substring of text
const textCheck=await framePage.locator(".text h2").textContent();
console.log(textCheck.split(" ")[1].trim());
//assertion
await expect(framePage.locator("div.text h2>span")).toContainText(text);
});

test('Screenshot visual validation',async({page})=>{

await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
await expect(page.locator("#displayed-text")).toBeVisible();
//screenshot of specific element
await page.locator('div>table#product').screenshot({path:'table.png'});
await page.locator("#hide-textbox").click();
//full page screenshot
await page.screenshot({path:'screenshot.png',fullPage:true});
await expect(page.locator("#displayed-text")).toBeHidden();


});