import { expect,Locator,Page } from "@playwright/test";
export class LoginPage{
    page:Page;
    signInbtn:Locator;
    userName:Locator;
    password:Locator;

    constructor(page:Page){
        this.page=page;//activate the page object in the constructor so that we can use it in all the methods of this class
        this.signInbtn= page.locator("#login");
        this.userName=page.locator("#userEmail");
        this.password=page.locator("#userPassword");
        
    }
    async validLogin(username:string,password:string){
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.signInbtn.click();
        await this.page.waitForLoadState('networkidle');//wait for the page to load after login
    }
    async goToLogin(){
        await this.page.goto('https://rahulshettyacademy.com/client/auth/login');
    }

}
module.exports={LoginPage};