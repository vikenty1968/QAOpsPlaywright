
//prepareTea(prepareCoffee)
//PROMISES
 function fetchData(url){
    // fetch data from server resolve,reject,pending
    return new Promise((resolve,reject)=>{
        console.log("Fetching data from server...");
setTimeout(()=>{
    const num=(Math.floor(Math.random()*10));
 if(num>9){
    resolve(`Url: ${url} is fetched successfully`);
 }else{
    reject(new Error(`Failed to fetch data from ${url}`+ " Number : "+num));
 }

}
,2000);
})}

const url="https://google.com";

fetchData(url).then((resole)=>{
    console.log(resole);
}).catch((error)=>{
    console.log(error.message);
}).finally(()=>{
    console.log("Fetch data operation is completed");
});



const promise1=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        const num=Math.floor(Math.random()*10);
        if(num>=2){
            resolve(num);
        }else{reject("Promise 1 rejected with number: "+num);}
       
    
    },2000);        
});
// promise1.then((num)=>{
//     console.log("Promise 1 resolved with number: "+num);
// }).catch((error)=>{
//     console.log("Promise is rejected "+error);
// });
// promise1.finally(()=>{
//     console.log("Promise 1 is settled");
// });
// console.log("This will be printed before the promise is settled because of asynchronous nature of promises");