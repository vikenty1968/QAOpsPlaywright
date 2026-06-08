//const {LoginPage}=require('./LoginPage');
import { LoginPage } from "./LoginPage";
//const {DashBoardPage}=require('./DashBoardPage');
import { DashBoardPage } from "./DashBoardPage";
import { CartPage } from "./CartPage";
import { CheckOutPage } from "./CheckOutPage";
import { MyOrdersPage } from "./MyOrdersPage";
import { OrderHistoryPage } from "./OrderHistoryPage";
import { OrderConfirmationPage } from "./OrderConfirmationPage";
//import fixture
import {Page} from "@playwright/test";

export class POManager{
    page:Page;
    loginPage:LoginPage;
    DashBoardPage:DashBoardPage;
    CartPage:CartPage;
    CheckOutPage:CheckOutPage;
    MyOrdersPage:MyOrdersPage;
    OrderHistoryPage:OrderHistoryPage;
    OrderConfirmationPage:OrderConfirmationPage;
    constructor(page:Page){
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