const person={
    name: "John",
    age:39,
    greet:function () {
        return "Hello, my name is " + this.name + " and I am " + this.age + " years old.";
    }
}
const greeting=person.greet();
console.log(greeting);
const me= ()=> {
    const name="anshika";
    const age=24; 
    return {name,age};      
}
const greet=(name)=>{
    return "Hello, my name is "+name;
}
console.log(greet("anshika"));
console.log(me().age);
console.log(me().name+" is " + me().age + " years old.");
// for(var x=0;x<5;x++){ 
//   setTimeout(()=>{console.log(x);},0)  // prints 5 five times because of var scope
// }
// for(var i=0;i<5;i++){}
// console.log(i); //prints 5 because of var scope
// let y=0;
// y=true;//can be reassigned because of let but cannot be redeclared in the same scope
// console.log(y);

//_call back functions__________________________________________________
function prepareTea(callback){
    console.log("Lets drink  tea...");
    setTimeout(()=>{
       console.log("Tea is ready!")
       const cap=2;
        callback(cap);
    },2000);
} 
function drinkTea(cap){
    console.log("Drinking tea with " + cap + " cups");
}
function prepareCoffee(){
    console.log("I want coffee...");
}
prepareTea(drinkTea);
let arr =[1,2,6,4,30,5];
//arr.forEach((num)=> console.log(num*2));
arr.forEach((num)=>{
    if(num%2===0){
        return
} else{
    console.log(num);
}
})
const arr2=arr.filter(num=>num%3===0);
console.log(arr2);
function fun1(num){
    return num%3===0;

}
setTimeout(()=>{
    const arr3=arr.filter(fun1);//all the elements which are divisible by 3
    const arr4=arr.find(num=>num%3===0);//first element which is divisible by 3
    const exist =arr.some(num=>num%3===0);//true if there is at least one element which is divisible by 3
    console.log(arr3);
    console.log(arr4);
    console.log(exist);
},2000);
