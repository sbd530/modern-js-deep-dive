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

  function translate(query = "") {
    if (query.includes(process.env.FIND)) console.info(findFruit(query));
    else if (query.includes(process.env.DELETE)) deleteFruit(query);
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
    return cache
      .findLike(target)
      .map((fruit) => fruit.toString())
      .join(",\n");
  }

  function deleteFruit(query = "") {}

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
