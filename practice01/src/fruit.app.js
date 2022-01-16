import "dotenv/config";
import FruitCache from "./cache/fruit.cache";
import { getFruitsFromDB } from "./util/io.util";
import readlineSync from "readline-sync";
import comparePwd from "./util/crypt.util";

//* User's login
const userid = readlineSync.question("Enter userid? ");
const password = readlineSync.question("Enter password? ", {
  hideEchoBack: true,
  mask: "?",
});

if (await loginFailed(userid, password)) {
  console.info("No such user.");
  process.exit(0);
}

//* .db data cache
const cache = new FruitCache();
getFruitsFromDB().forEach((fruit) => cache.save(fruit));

//* ready for user's query
while (true) {
  const query = readlineSync.question("> ");
  if (query.includes("find")) {
    console.info(findFruit(query));
  } else if (query.includes("delete")) {
  } else if (query.trim() === "exit") {
    console.info("See ya.");
    process.exit(0);
  } else {
    console.log("Wrong grammer.");
  }
}

// TODO : output .db data

async function loginFailed(userid, password) {
  const useridMatch = process.env.USER_ID === userid;
  const passwordMatch = await comparePwd(password, process.env.PASSWORD);
  return useridMatch && !passwordMatch;
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
