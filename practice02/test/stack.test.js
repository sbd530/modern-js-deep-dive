import "regenerator-runtime";
import Stack from "../src/stack";

//* 결론 : 스택 구현보다는 Array.prototype.push 와 pop 을 사용하자
describe("stack", () => {
  test("stack functions", () => {
    // 생성
    const stack = new Stack();
    expect(stack.size).toBe(0);
    expect(stack.isEmpty()).toBe(true);

    // 추가
    stack.push({ num: 0, str: "a" });
    stack.push({ num: 1, str: "b" });
    stack.push({ num: 2, str: "c" });
    stack.push({ num: 3, str: "d" });
    expect(stack.size).toBe(4);
    expect(stack.isEmpty()).toBe(false);

    // 추출
    expect(stack.pop()).toEqual({ num: 3, str: "d" });
    expect(stack.pop()).toEqual({ num: 2, str: "c" });
    expect(stack.pop()).toEqual({ num: 1, str: "b" });
    expect(stack.pop()).toEqual({ num: 0, str: "a" });
    expect(stack.isEmpty()).toBe(true);
  });

  //* 10,000,000개의 데이터를 메모리에 올리고, 모두 제거할 때까지 걸리는 시간
  test("Stack performance1", () => {
    const stackStart = new Date();
    const stack = new Stack();
    for (let i = 0; i < 10_000_000; i++) {
      stack.push({ i, j: "str" });
    }
    for (let i = 0; i < 10_000_000; i++) {
      stack.pop();
    }
    const stackTime = new Date() - stackStart;
    console.log(`########################### Stack: ${stackTime} ms`);

    const arrayStart = new Date();
    const array = [];
    for (let i = 0; i < 10_000_000; i++) {
      array.push({ i, j: "str" });
    }
    for (let i = 0; i < 10_000_000; i++) {
      array.pop();
    }
    const arrayTime = new Date() - arrayStart;
    console.log(`########################### Array: ${arrayTime} ms`);

    expect(stackTime).toBeGreaterThan(arrayTime);
  });

  //* 10,000,000개의 데이터를 메모리에 올려둔 상태에서, push와 pop을 번갈아며 10,000,000번 수행했을 때 걸리는 시간
  test("Stack performance2", () => {
    const stack = new Stack();
    for (let i = 0; i < 10_000_000; i++) {
      stack.push({ i, j: "str" });
    }

    const stackStart = new Date();
    for (let i = 10_000_000; i < 20_000_000; i++) {
      stack.push({ i, j: "str" });
      stack.pop();
    }
    const stackTime = new Date() - stackStart;
    console.log(`########################### Stack: ${stackTime} ms`);

    const array = [];
    for (let i = 0; i < 10_000_000; i++) {
      array.push({ i, j: "str" });
    }

    const arrayStart = new Date();
    for (let i = 10_000_000; i < 20_000_000; i++) {
      array.push({ i, j: "str" });
      array.pop();
    }
    const arrayTime = new Date() - arrayStart;
    console.log(`########################### Array: ${arrayTime} ms`);

    expect(stackTime).toBeGreaterThan(arrayTime);
  });
});
