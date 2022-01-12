import "regenerator-runtime";
import FruitCache from "../src/cache/fruit.cache";
import { Fruit } from "../src/schema/fruit.schema";

test("The fruit-cache works", async () => {
  const aFruit = new Fruit(0, "apple", [
    { origin: "korea", price: 1000 },
    { origin: "japan", price: 2000 },
  ]);
  const anotherFruit = new Fruit(1, "banana", [
    { origin: "korea", price: 1000 },
    { origin: "japan", price: 2000 },
  ]);

  console.log(aFruit.toString());

  const cache = new FruitCache();
  await cache.save(aFruit);
  await cache.save(anotherFruit);

  const expectApple = await cache.find("apple");
  const expectBanana = await cache.find("banana");

  expect(expectApple.id).toBe(0);
  expect(expectApple.origins[0].origin).toBe("korea");
  expect(expectBanana.id).toBe(1);
  expect(expectBanana.origins[1].origin).toBe("japan");
});
