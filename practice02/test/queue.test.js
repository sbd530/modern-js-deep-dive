import "regenerator-runtime";
import Queue from "../src/queue";

//* 큐의 경우는 Array보다 Queue를 구현하는 것이 월등히 빠르다.
describe("queue", () => {
  test("queue functions", () => {
    // 큐 생성
    const queue = new Queue();
    expect(queue.size).toBe(0);
    expect(queue.isEmpty()).toBe(true);

    // 추가
    queue.push({ num: 0, str: "a" });
    queue.push({ num: 1, str: "b" });
    queue.push({ num: 2, str: "c" });
    queue.push({ num: 3, str: "d" });
    expect(queue.size).toBe(4);
    expect(queue.isEmpty()).toBe(false);

    // 추출
    expect(queue.pop()).toEqual({ num: 0, str: "a" });
    expect(queue.pop()).toEqual({ num: 1, str: "b" });
    expect(queue.pop()).toEqual({ num: 2, str: "c" });
    expect(queue.pop()).toEqual({ num: 3, str: "d" });
    expect(queue.isEmpty()).toBe(true);
  });

  //* 100,000개의 데이터를 메모리에 올리고, 모두 제거할 때까지 걸리는 시간
  test("Queue performance1", () => {
    const queueStart = new Date();
    const queue = new Queue();
    for (let i = 0; i < 100_000; i++) {
      queue.push({ i, j: "str" });
    }
    for (let i = 0; i < 100_000; i++) {
      queue.pop();
    }
    const queueTime = new Date() - queueStart;
    console.log(`########################### Queue: ${queueTime} ms`);

    const arrayStart = new Date();
    const array = [];
    for (let i = 0; i < 100_000; i++) {
      array.push({ i, j: "str" });
    }
    for (let i = 0; i < 100_000; i++) {
      array.shift();
    }
    const arrayTime = new Date() - arrayStart;
    console.log(`########################### Array: ${arrayTime} ms`);

    expect(arrayTime).toBeGreaterThan(queueTime);
  });

  //* 100,000개의 데이터를 메모리에 올려둔 상태에서, push와 pop을 번갈아며 10,000,000번 수행했을 때 걸리는 시간
  test("Queue performance2", () => {
    const queue = new Queue();
    for (let i = 0; i < 100_000; i++) {
      queue.push({ i, j: "str" });
    }

    const queueStart = new Date();
    for (let i = 100_000; i < 200_000; i++) {
      queue.push({ i, j: "str" });
      queue.pop();
    }
    const queueTime = new Date() - queueStart;
    console.log(`########################### Queue: ${queueTime} ms`);

    const array = [];
    for (let i = 0; i < 100_000; i++) {
      array.push({ i, j: "str" });
    }

    const arrayStart = new Date();
    for (let i = 100_000; i < 200_000; i++) {
      array.push({ i, j: "str" });
      array.shift();
    }
    const arrayTime = new Date() - arrayStart;
    console.log(`########################### Array: ${arrayTime} ms`);

    expect(arrayTime).toBeGreaterThan(queueTime);
  });
});
