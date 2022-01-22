import readlineSync from "readline-sync";
import FruitCache from "../cache/fruit.cache";
import { getFruitsFromDB, writeFruitsToDB } from "../util/io.util";

export default function acceptQuery() {
  //* .db data cache
  const cache = new FruitCache();
  getFruitsFromDB().forEach((fruit) => cache.save(fruit));

  //* Ready for user's query
  while (true) {
    const query = readlineSync.question("> ");
    translate(query);
  }

  function translate(query = "") {
    if (query.includes(process.env.FIND)) console.info(findFruit(query));
    else if (query.includes(process.env.DELETE))
      console.info(deleteFruit(query));
    else if (query.trim() === process.env.EXIT) exitProgram();
    else if (query.trim() === process.env.HELP) infoHelp();
    else console.log(process.env.WRONG_GRAMMER);
  }

  function findFruit(query = "") {
    const arr = query.trim().split(/\s+/);
    if (arr.length !== 2) return process.env.WRONG_GRAMMER;

    const target = arr[1];
    if (target === process.env.ALL) return findAllToString();
    else if (target.includes("*")) return findLikeToString(target);

    const fruit = cache.find(arr[1]);
    return fruit === null ? process.env.NO_FRUIT : fruit.toString();
  }

  function findAllToString() {
    return cache
      .findAll()
      .map((fruit) => fruit.toString())
      .join(",\n");
  }

  function findLikeToString(target = "*") {
    const result = cache
      .findLike(target)
      .map((fruit) => fruit.toString())
      .join(",\n");
    return result.trim() === "" ? "No such fruit." : result;
  }

  function deleteFruit(query = "") {
    const arr = query.trim().split(/\s+/);
    if (arr.length !== 2) return process.env.WRONG_GRAMMER;

    const target = arr[1];
    if (target === process.env.ALL) return deleteAllToString();

    const fruit = cache.find(arr[1]);
    if (fruit === null) return "No such fruit.";
    return deleteFruitToString(arr[1]);
  }

  function deleteAllToString() {
    cache.clear();
    cacheToFile();
    return "All data has been deleted.";
  }

  function deleteFruitToString(target) {
    cache.delete(target);
    cacheToFile();
    return `${target} has been deleted.`;
  }

  function cacheToFile() {
    const data = cache.findAll().map((fruit) => toLiteralFruit(fruit));
    writeFruitsToDB(data);
  }

  function toLiteralFruit(fruit) {
    return {
      _id: fruit.id,
      name: fruit.name,
      origins: fruit.origins,
    };
  }

  function exitProgram() {
    console.info("See ya.");
    process.exit(0);
  }

  function infoHelp() {
    console.info("Find one : find [fruit]");
    console.info("Find any : find (*)[fruit](*)");
    console.info("Find all : find --all");
  }
}
