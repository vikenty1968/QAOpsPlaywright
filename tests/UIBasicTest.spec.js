const {test, expect}=require('@playwright/test')

test('First Browser Playwright Test',async({browser})=>{
const context = await browser.newContext()
const page =await context.newPage();
await page.goto('https://qa.koel.app/#!/profile');
expect(await page.title()).toContain('Koel');
await page.locator("[type='email']").fill('vikenty.plakhov@testpro.io');
await page.locator("[type='password']").fill('MEGAdelta06@');
await page.locator("[type='submit']").click();
await expect(await page.locator('.fa-sign-out')).toBeVisible();

});
test('Page Browser Playwright Test',async({page})=>{
await page.goto('https://google.com');
const pageTitle = await page.title();
await expect(pageTitle).toBe('Google');//toHaveTitle('Google');
await console.log(pageTitle);

});
test('First Negative Login Playwright Test',async({browser})=>{
const context = await browser.newContext()
const page =await context.newPage();
await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
await page.locator("#username").fill('rahulshetty')
await page.locator("#password").fill('learning')
await page.locator("#signInBtn").click();
console.log(await page.locator("form>.alert").textContent());
 //wait until the alert is visible
await expect(page.locator("form>.alert")).toHaveText('Incorrect username/password.');
await expect(page.locator("form>.alert")).toContainText('Incorrect ');
});

test('Positive Login Playwright Test',async({browser})=>{
const context = await browser.newContext()
const page =await context.newPage();
await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
await page.locator("#username").fill('rahulshettyacademy')
await page.locator("#password").fill('Learning@830$3mK2')
await page.locator("#signInBtn").click();
console.log(await page.locator(".card-body a").first().textContent());
console.log(await page.locator(".card-body a").nth(1).textContent());
console.log(await page.locator("app-card:first-child .card-title>a").textContent());
});



test('UI controls Playwright Test',async({browser})=>{
const context = await browser.newContext()
const page =await context.newPage();
await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
const Username=page.locator("#username");
const Password=page.locator("#password");
const SignInBtn=page.locator("#signInBtn");
const DocumentLink = page.locator("div.float-right a:first-child");
const dropdown=page.locator("select.form-control");
//select dropdown value
await dropdown.selectOption('consult');
//select radio button
const radioBtn=page.locator(".form-check-inline label:nth-child(2)>.checkmark");
await radioBtn.click();
//playWright aproach to find locator
//await page.locator(".radiotextsty").nth(1).click();
await page.locator("#okayBtn").click();
//checkbox control
const checkbox=page.locator("[type = 'checkbox']");
await checkbox.check();
//assertion
await expect(checkbox).toBeChecked();
await checkbox.uncheck();
//Two approaches to assert that checkbox is not checked
await expect(checkbox).not.toBeChecked();
expect(await checkbox.isChecked()).toBeFalsy();
// assert that link is blinkng
await expect(DocumentLink).toHaveAttribute('class','blinkingText');
page.pause();
});
test('Child window Playwright Test',async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    const Username=page.locator("#username");
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const DocumentLink = page.locator("div.float-right a:first-child");
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),          //listen for new page pending,rejected,fulfilled
        DocumentLink.click()                    //new page will open
    ]);
    //new page will open and we can perform action on new page
    const text = await newPage.locator('.col-md-8>.red').textContent();
    //getting out domain from text
    const arrayText = text.split('@')[1];//right part from @
    const domain = arrayText.split(' ')[0];//first part from first space
  //  console.log(domain);
    await Username.fill(domain);//enter domain in username field in parent page
    await page.pause();
    console.log(await Username.inputValue());
});