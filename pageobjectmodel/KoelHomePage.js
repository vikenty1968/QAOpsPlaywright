const { expect } = require('@playwright/test');
class KoelHomePage {
    constructor(page) {
        this.page = page;
        this.allSongsMenu = page.locator('.menu .songs');
 
    }   
    async goToHomePage() {
        await this.page.goto('https://qa.koel.app/#!/home');
        await expect(this.page.locator("i.fa-sign-out")).toBeVisible();
    }
    async goToAllSongsPage() {
        await this.allSongsMenu.click();
    }
}
module.exports = {KoelHomePage};