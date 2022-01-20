import "regenerator-runtime";
import FruitCache from "../src/cache/fruit.cache";
import { DBError } from "../src/error/db.error";
import { Fruit } from "../src/schema/fruit.schema";

describe("the fruit-cache works", () => {
  let cache;

  beforeEach(() => {
    const aFruit = new Fruit(0, "apple", [
      { origin: "korea", price: 1000 },
      { origin: "japan", price: 2000 },
    ]);
    const anotherFruit = new Fruit(1, "banana", [
      { origin: "korea", price: 1000 },
      { origin: "japan", price: 2000 },
    ]);

    cache = new FruitCache();
    cache.save(aFruit);
    cache.save(anotherFruit);
  });

  test("if the cache can be read", () => {
    const expectApple = cache.find("apple");
    const expectBanana = cache.find("banana");

    expect(expectApple.id).toBe(0);
    expect(expectApple.origins[0].origin).toBe("korea");
    expect(expectBanana.id).toBe(1);
    expect(expectBanana.origins[1].origin).toBe("japan");
  });

  test("if fruits can be delete from the cache", () => {
    const originSize = cache.size;
    cache.delete("apple");
    const apple = cache.find("apple");

    expect(originSize - cache.size).toBe(1);
    expect(apple).toBeNull();
  });

  test("if the cache can be cleared", () => {
    cache.clear();

    expect(cache.size).toBe(0);
  });
});

describe("the fruit-schema", () => {
  it("should throws an error if id is strange", () => {
    function stringIdApple() {
      return new Fruit("stringId", "apple", [{ origin: "korea", price: 1000 }]);
    }
    function nanIdBanana() {
      return new Fruit("string" * 2, "apple", [
        { origin: "korea", price: 1000 },
      ]);
    }
    expect(stringIdApple).toThrowError(DBError);
    expect(nanIdBanana).toThrowError(DBError);
  });
});
