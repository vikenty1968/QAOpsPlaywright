const {LoginPage}=require('./LoginPage');
const {DashBoardPage}=require('./DashBoardPage');
const {CartPage}=require('./CartPage');
const{CheckOutPage}=require('./CheckOutPage');
const {MyOrdersPage}=require('./MyOrdersPage');
const {OrderHistoryPage}=require('./OrderHistoryPage');
const {OrderConfirmationPage}=require('./OrderConfirmationPage');
class POManager{
    constructor(page){
        this.page=page;
        this.loginPage=new LoginPage(this.page);
        this.DashBoardPage=new DashBoardPage(this.page);
        this.CartPage=new CartPage(this.page);
        this.CheckOutPage=new CheckOutPage(this.page);
        this.MyOrdersPage=new MyOrdersPage(this.page);
        this.OrderHistoryPage=new OrderHistoryPage(this.page);
        this.OrderConfirmationPage=new OrderConfirmationPage(this.page);
    }
    getLoginPage(){
        return this.loginPage
}   
    getDashBoardPage(){
        return this.DashBoardPage;
    }
    getCartPage(){
        return this.CartPage;
    }
    getCheckOutPage(){
        return this.CheckOutPage;
    }
    getMyOrdersPage(){
        return this.MyOrdersPage;
    }
    getOrderHistoryPage(){
        return this.OrderHistoryPage;
    }
    getOrderConfirmationPage(){
        return this.OrderConfirmationPage;
    }
}

module.exports={POManager};