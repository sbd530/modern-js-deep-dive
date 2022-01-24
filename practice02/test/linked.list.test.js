import LinkedList from "../src/linked.list";

describe("LinkedList", () => {
  test("LinkedList functions", () => {
    // 링크드리스트 생성
    let list = new LinkedList();
    expect(list.size).toBe(0);
    expect(list.isEmpty()).toBe(true);

    // 추가 1
    list.appendLast({ num: 0, str: "a" });
    list.appendLast({ num: 1, str: "b" });
    list.appendLast({ num: 2, str: "c" });
    list.appendLast({ num: 3, str: "d" });
    expect(list.size).toBe(4);

    list.appendFirst({ num: -1, str: "-b" });
    list.appendFirst({ num: -2, str: "-c" });
    list.appendFirst({ num: -3, str: "-d" });
    list.appendFirst({ num: -4, str: "-e" });
    expect(list.size).toBe(8);

    // 인덱스
    expect(list.indexOf({ num: 0, str: "a" })).toBe(4);
    expect(list.indexOf({ number: 0, str: "a" })).toBe(-1);

    // 추출 1
    expect(list.removeAt(-2)).toBe(null);
    expect(list.removeAt(4)).toEqual({ num: 0, str: "a" });
    expect(list.size).toBe(7);
    expect(list.indexOf({ num: 1, str: "b" })).toBe(4);

    // 추가 2
    list = new LinkedList();
    list.appendFirst("foo");
    list.appendFirst("bar");
    expect(list.size).toBe(2);
    expect(list.indexOf("foo")).toBe(1);

    // 추출 2
    expect(list.removeAt(0)).toEqual("bar");
  });
});
