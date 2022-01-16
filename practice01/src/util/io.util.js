import fs from "fs";
import { Fruit } from "../schema/fruit.schema";

export function getFruitsFromDB() {
  const content = fs.readFileSync("./mango.db", "utf8");
  const rawFruits = JSON.parse(content).data;
  return rawFruits.map(
    (rawFruit) => new Fruit(rawFruit._id, rawFruit.name, rawFruit.origins)
  );
}
