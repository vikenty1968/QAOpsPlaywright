const { expect } = require("@playwright/test");
class KoelPlayListPage {
  constructor(page) {
    this.page = page;
    this.pListNameLocator = page.locator("#playlistWrapper h1");
    this.deleteBtn = page.locator("button.del");
    this.dialogOk = page.locator(".dialog .ok");
    this.banner=page.locator(".success");

  }
  async isPlistNameDisplayedOnPlistPage(playlistName) {
    await expect(this.pListNameLocator).toHaveText(playlistName);
  }
  async deleteCreatedPlist(playlistName) {
    await expect(this.banner).toBeHidden();
    await this.deleteBtn.click();
    await this.dialogOk.click();
    await expect(this.banner, {
      hasText: `Deleted playlist  ${playlistName}`,
    }).toBeVisible();
  }
}
module.exports = { KoelPlayListPage };
