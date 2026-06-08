class APIUtils {
    constructor(apiContext, payLoadLogin) {
        this.apiContext = apiContext;
        this.payLoadLogin = payLoadLogin;
    }
    async getToken() {
    const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
        {
        data:
           this.payLoadLogin
        })
       
        const loginResponseJson=await loginResponse.json();//json parse the response to get the token
      const token=loginResponseJson.token;
       return token;
}
async createOrder(orderPayLoad){
    //create object
   let response ={}
   response.token=await this.getToken();
    const createOrderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
    {data:orderPayLoad,
        headers:{'Authorization': response.token,
        'Content-Type': 'application/json'}
        }
    )
    const createOrderResponseJson=await createOrderResponse.json();
     const orderId=createOrderResponseJson.orders[0];
     response.orderId=orderId;
     return response;;
}
}
module.exports={APIUtils};