export const pi = Math.PI; // ES6

export function power(x, y) {
  return x ** y; // ES7
}

//ES6
export class Foo {
  #private = 10; // latest

  foo() {
    const { a, b, ...x } = { ...{ a: 1, b: 2 }, c: 3, d: 4 }; // latest
    return { a, b, x };
  }

  bar() {
    return this.#private;
  }
}
