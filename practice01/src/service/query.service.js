import readlineSync from "readline-sync";
import FruitCache from "../cache/fruit.cache";
import { getFruitsFromDB } from "../util/io.util";

export default function acceptQuery() {
  //* .db data cache
  const cache = new FruitCache();
  getFruitsFromDB().forEach((fruit) => cache.save(fruit));

  //* Ready for user's query
  while (true) {
    const query = readlineSync.question("> ");
    translate(query);
  }

  function translate(query) {
    if (query.includes("find")) {
      console.info(findFruit(query));
    } else if (query.includes("delete")) {
    } else if (query.trim() === "exit") {
      console.info("See ya.");
      process.exit(0);
    } else if (query.trim() === "help") {
      console.log("Find one : find [fruit]");
      console.log("Find all : find --all");
    } else {
      console.log("Wrong grammer.");
    }
  }

  function findFruit(query) {
    const arr = query.trim().split(/\s+/);
    if (arr.length !== 2) return "Wrong grammer.";
    if (arr[1] === "--all") {
      return cache
        .findAll()
        .map((fruit) => fruit.toString())
        .join(",\n");
    }
    const fruit = cache.find(arr[1]);
    return fruit === null ? "No such fruit." : fruit.toString();
  }
}
