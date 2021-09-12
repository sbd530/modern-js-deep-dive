import "@babel/polyfill"; // @babel/polyfill 를 로드한다.
import { pi, power, Foo } from "./lib";

console.log(pi);
console.log(power(pi, pi));

const f = new Foo();
console.log(f.foo());
console.log(f.bar());
