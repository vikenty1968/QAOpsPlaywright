const { expect } = require("@playwright/test");

class CheckOutPage{
    constructor(page){
        this.page=page;
        this.inputCountry =page.locator("[placeholder='Select Country']")
        this.dropdownOptions=page.locator(".ta-results")
        this.checkOutBtn=page.locator("div a.btnn");  
        this.userEmail=page.locator(".user__name>label");  

    }
    async inputCountryName(countryName){
        await this.inputCountry.pressSequentially(countryName);
    }
    async selectCountryFromDropdown(countryName,username){
        await this.dropdownOptions.waitFor();
    
        const count = await this.dropdownOptions.locator(".ta-item").count();
        for(let i=0;i<count;i++){
            if(await this.dropdownOptions.locator(".ta-item").nth(i).textContent()=== countryName){
                await this.dropdownOptions.locator(".ta-item").nth(i).click();
                break;
            }
        }
          await expect(this.userEmail).toHaveText(username);
    }
    async goToPayment(){   
        await this.checkOutBtn.click();
    }
}
module.exports={CheckOutPage};