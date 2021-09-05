// Symbol() + "";

console.log({} + "");
console.log([] + "");
console.log([10, 20] + "");
console.log(function () {} + "");
console.log(Array + "");

console.log(+"zero");

if ([]) console.log("[] is Truthy");
if ({}) console.log("{} is Truthy");
if (!"") console.log("'' is not Truthy");
