import readlineSync from "readline-sync";
import comparePwd from "../util/crypt.util";

export default async function login() {
  const userid = readlineSync.question("Enter userid? ");
  const password = readlineSync.question("Enter password? ", {
    hideEchoBack: true,
    mask: "?",
  });
  if (await loginFailed(userid, password)) {
    console.info("No such user.");
    process.exit(0);
  }
}

async function loginFailed(userid, password) {
  const useridMatch = process.env.USER_ID === userid;
  const passwordMatch = await comparePwd(password, process.env.PASSWORD);
  return useridMatch && !passwordMatch;
}
