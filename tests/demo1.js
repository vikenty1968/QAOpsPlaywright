"use strict";
let message1 = "Hello World";
message1 = "2";
console.log(message1);
let age1 = 20; //age1="20"; --- IGNORE ---
let isActive = true;
let number1 = [1, 2];
//if you don't know the type of variable then you can use any
let data1 = "Hello World";
//declare a function with type annotations
function add1(a, b) {
    return a + b;
}
add1(3, 4); //output will be 7
//declare a function with type annotations using arrow function
let add2 = (num1, num2) => num1 + num2;
//declare an object with type annotations
let user = { name: "John", age: 30 };
user.location = "Denver"; // --- IGNORE ---
console.log(user);
