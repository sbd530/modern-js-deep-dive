import "regenerator-runtime";
import comparePwd from "../src/util/crypt.util";
import { getFruitsFromDB } from "../src/util/io.util";

describe("encryption", () => {
  test("if the encrypt module works", async () => {
    const isTrue = await comparePwd(
      "press",
      "$2b$10$eXLSDnG3jDYCkT3Bp9yvd.sP.077hS.87rgpsR./2zlh3fDHBdd3W"
    );
    const isFalse = await comparePwd("press", "press");
    expect(isTrue).toBe(true);
    expect(isFalse).toBeFalsy();
  });
});

describe("file system", () => {
  test("if file reader works", () => {
    const fruits = getFruitsFromDB();
    expect(fruits.length).toBeGreaterThan(0);
  });
});
