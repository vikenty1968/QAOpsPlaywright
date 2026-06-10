const{test,expect,request}=require("@playwright/test");
const { UtilsKoel } = require("../utils/UtilsKoel");
let token = "";
let apiKoelContext;
const artistName="The Blank Tapes";
const playlistName="My Weard Playlist";
 const payLoadLogin={email:"vikenty.plakhov@testpro.io",password:"MEGAdelta06@"};
 test.beforeAll(async ()=>{
 const apiContext = await request.newContext();
    const utilsKoel=new UtilsKoel(apiContext,payLoadLogin);
    token = await utilsKoel.getToken();
 });
 test('@Smoke Create simple playlist through all songs page',async({page  })=>{
      await page.addInitScript(value=>{window.localStorage.setItem('api-token', value);}, token);
     await page.goto('https://qa.koel.app/#!/home');
     await expect(page.locator('i.fa-sign-out')).toBeVisible();
     console.log("User is logged in successfully");
     //go to all songs page
        await page.locator('.menu .songs').click();
        await page.locator('table tr td.artist').first().waitFor();
     const allSongs = await page.locator('table tr td.artist').allTextContents();
      await  expect(allSongs).toContain(artistName);
      console.log("Artist is present in the all songs page");
      for(let i=0;i<allSongs.length;i++){
        if(allSongs[i].includes(artistName)){
            await page.locator('table tr td.artist').nth(i).click();
            break;
        }
      }
     // await page.pause();
      //create smart playlist with add button
      await expect(page.locator('.btn-add-to')).toBeVisible();
      await page.locator('.btn-add-to').click();
      await page.getByPlaceholder('Playlist name').fill(playlistName);
      await page.keyboard.press('Enter');
      //assertion for the created playlist
      await expect(page.locator('.success')).toContainText(playlistName);
      await expect(page.locator('#playlistWrapper h1')).toHaveText(playlistName);
      console.log("Smart playlist is created successfully");
      //clean up- delete the created playlist
      await expect(page.locator('.success')).toBeHidden();
      await page.locator('button.del').click();
      await page.locator('.dialog .ok').click();
        await expect(page.locator('.success'),{hasText:`Deleted playlist  ${playlistName}`}).toBeVisible();
      // await page.pause();
 });