const bcrypt = require("bcrypt");

export default async function compare(inputPwd = "", savePwd = "") {
  checkSavePwd(savePwd);
  inputPwd = inputPwd || "";
  return await bcrypt.compare(inputPwd, savePwd);
}

function checkSavePwd(savePwd) {
  if (savePwd === "")
    throw new Error("The origin password has not been read properly.");
}
