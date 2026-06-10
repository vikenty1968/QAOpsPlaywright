const { expect } = require("@playwright/test");

class KoelSongPage {
  constructor(page) {
    this.page = page;
    this.songArtists = page.locator("table tr td.artist");
    this.addPlistBtn=page.locator(".btn-add-to")
    this.placeHolder =page.getByPlaceholder("Playlist name")
    this.bannerLocator=page.locator(".success")
  }
  async findArtist(artistName) {
    await this.songArtists.first().waitFor();
    const allSongs = await this.songArtists.allTextContents();
    //pick the artist name and assert its presence in the all songs page
    await expect(allSongs).toContain(artistName);
    //another way to assert the presence of artist in the all songs page
    const orderRow = this.songArtists.filter({
      hasText: artistName,
    });
    await expect(orderRow).toBeVisible();
  }
  async selectArtist(artistName) {
    const artists = await this.songArtists.allTextContents();
    for (let i = 0; i < artists.length; i++) {
      if (artists[i].includes(artistName)) {
        await this.songArtists.nth(i).click();
        break;
      }
    }
  }
  async openMenuToCreatePlist(){
      await expect(this.addPlistBtn).toBeVisible();
  await this.addPlistBtn.click();
  }
  async createPlayList(playlistName){
 await this.placeHolder.fill(playlistName);
  await this.page.keyboard.press("Enter");
  }
  async successBannerIsDisplayed(playlistName){
     await expect(this.bannerLocator).toContainText(playlistName);
  }
  
}
module.exports = { KoelSongPage };
