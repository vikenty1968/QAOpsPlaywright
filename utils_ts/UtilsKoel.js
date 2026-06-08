class UtilsKoel{
constructor(apiKoelContext,payLoadLogin){
    this.apiKoelContext=apiKoelContext;
    this.payLoadLogin=payLoadLogin;
}





async getToken(){

 const response = await this.apiKoelContext.post("https://qa.koel.app/api/me",
     { data: this.payLoadLogin });
   const responseJson=await response.json();
  const token = responseJson.token;
  console.log(token);
  return token;

}
}
module.exports={UtilsKoel};