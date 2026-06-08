const{test,expect,request}=require("@playwright/test");
const { UtilsKoel } = require("../utils/UtilsKoel");

let token = "";
let apiKoelContext;
 const payLoadLogin={email:"vikenty.plakhov@testpro.io",password:"MEGAdelta06@"};

test.beforeAll(async ()=>{
    console.log("User is logging...");
    //wait for context and page to be created
   apiKoelContext= await request.newContext();
  
    const utilsKoel=new UtilsKoel(apiKoelContext,payLoadLogin);
    token = await utilsKoel.getToken();
//  const response = await apiKoelContext.post("https://qa.koel.app/api/me",
//      { data: payLoadLogin });
//   await expect(response.status()).toBe(200);
//   await expect (response.ok()).toBeTruthy;//another way to assert
//   const responseJson=await response.json();
//    token = responseJson.token;
//   console.log(token);


});
test('@Smoke Koel Login And Create Playlist API Test',async({page  })=>{
       await page.addInitScript(value=>{
        window.localStorage.setItem('api-token', value);
    }, token);
     await page.goto('https://qa.koel.app/#!/home')
    // const res=await page.title()
    // console.log(res)
    // await page.locator('[type="email"]').fill('vikenty.plakhov@testpro.io');
    // await page.locator('[type="password"]').fill('MEGAdelta06@');
    // await page.locator('[type="submit"]').click();
    // await page.waitForLoadState('networkidle');



    await expect(page.locator('i.fa-sign-out')).toBeVisible();
      //create playlist through API-+
     const createPlistResponse = await apiKoelContext.post("https://qa.koel.app/api/playlist",
     { data: {name:"My NEXT Playlist"},
     headers:{'Authorization': "Bearer " + token,
     'Content-Type': 'application/json'}        
     });
     const createPlistResponseJson = await createPlistResponse.json();
      console.log(createPlistResponseJson.id);
    
      //get playlist through API
     const getPlaylistResponse = await apiKoelContext.get("https://qa.koel.app/api/playlist",
     { headers:{'Authorization': "Bearer " + token,
     'Content-Type': 'application/json'}        
     });
     await expect(getPlaylistResponse.ok()).toBeTruthy();
    const getPlaylistJson = await getPlaylistResponse.json();
  //   console.log(getPlaylistJson);
    for(let i=0;i<getPlaylistJson.length;i++){
        if(getPlaylistJson[i].id===createPlistResponseJson.id){
            console.log("Playlist is created successfully");
            break;
        }
    }
    //trening purpose only
    const allPlistsId = getPlaylistJson.map(plist=>plist.id);
   
        //another way to find the playlist in the list of all playlists
     const playList = getPlaylistJson.find(//object
    p => p.id === createPlistResponseJson.id
);
//assert fields of created plist(might be not all fields)
expect(playList).toMatchObject({
    id: createPlistResponseJson.id,
    name: createPlistResponseJson.name
});
    await expect(allPlistsId).toContain(createPlistResponseJson.id);

});
   
   
    
     
   
