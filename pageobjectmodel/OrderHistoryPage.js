class OrderHistoryPage{
    constructor(page){
        this.page=page;
         this.table=page.locator("tbody tr>th");
         this.orderDetailsBtn=page.locator("tbody tr td>button.btn-primary");
     
    }
    async checkOrderInOrderHistory(orderId){
        await this.table.first().waitFor();
const allOrdersId =await(this.table.allTextContents());
console.log(allOrdersId);
//check if the order id is present in the order history page
for(let i=0;i<allOrdersId.length;i++){
    if(allOrdersId[i]===orderId){
        await this.orderDetailsBtn.nth(i).click();
        break;
    }
}
    }
}
module.exports={OrderHistoryPage};