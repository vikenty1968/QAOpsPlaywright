


let message1 : string ="Hello World";
message1="2";
console.log(message1);
let age1 : number =20;//age1="20"; --- IGNORE ---
let isActive : boolean = true;
let number1 : number[] =[1,2];
//if you don't know the type of variable then you can use any
let data1 : any = "Hello World";
//declare a function with type annotations
function add1(a: number, b: number): number {
    return a + b;
}
add1(3, 4);//output will be 7
//declare a function with type annotations using arrow function
let add2 = (num1: number, num2: number): number => num1 + num2;
//declare an object with type annotations
//let user : {name: string, age: number} = {name: "John", age: 30};
//user.location = "Denver";// --- IGNORE ---
//all properties of the object should be defined in the type annotations
let user : {name: string, age: number, location: string} = {
    name: "John", age: 30, location: "Denver"};

    //Classes in TypeScript
import { expect, type Locator, type Page } from '@playwright/test';

class CartPage{
      page: Page;
      cartProducts: Locator;
      checkoutButton: Locator;
    constructor(page: Page){
        this.page=page;
        this.cartProducts=page.locator(".cartSection h3");
        this.checkoutButton=page.locator("ul button[type='button'].btn-primary");
    }
}