const { test, expect, request } = require("@playwright/test");
const { UtilsKoel } = require("../utils/UtilsKoel");
const { KoelHomePage } = require("../pageobjectmodel/KoelHomePage");
const { KoelSongPage } = require("../pageobjectmodel/KoelSongPage");
const { KoelPlayListPage } = require("../pageobjectmodel/KoelPlayListPage");
let token = "";
let apiKoelContext;
const artistName = "The Blank Tapes";
const playlistName = "My Weard Playlist";
const payLoadLogin = {
  email: "vikenty.plakhov@testpro.io",
  password: "MEGAdelta06@",
};
test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const utilsKoel = new UtilsKoel(apiContext, payLoadLogin);
  token = await utilsKoel.getToken();
});
test("@Smoke Create simple playlist through all songs page", async ({
  page,
}) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem("api-token", value);
  }, token);
  const koelHomePage = new KoelHomePage(page);
  const koelSongPage = new KoelSongPage(page);
  const koelPlistPage = new KoelPlayListPage(page)
  await koelHomePage.goToHomePage();
  console.log("User is logged in successfully");

  //go to all songs page
  await koelHomePage.goToAllSongsPage();
  await koelSongPage.findArtist(artistName);
  console.log("Artist is present in the all songs page");
  //click on the artist name to go to open button add playlist
   await koelSongPage.selectArtist(artistName)
  //create  playlist with add button
  await koelSongPage.openMenuToCreatePlist();

 await koelSongPage.createPlayList(playlistName)
  //assertion for the created playlist
  await koelSongPage.successBannerIsDisplayed(playlistName);
  // await expect(page.locator(".success")).toContainText(playlistName);
  await koelPlistPage.isPlistNameDisplayedOnPlistPage(playlistName);
  console.log(`playlist ${playlistName }is created successfully`);

  //clean up- delete the created playlist
  await koelPlistPage.deleteCreatedPlist(playlistName);
 //check if we back on home page
  await expect(page).toHaveURL(/#!\/home/);
console.log(`${playlistName} is deleted`)

});
