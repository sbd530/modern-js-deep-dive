import { DBError } from "../error/db.error";

export class Fruit {
  #id;
  #name;
  #origins = [];

  constructor(id, name = "noname", origins = []) {
    if (isNotValid(id)) throw new DBError("invalid id.");
    this.#id = id;
    this.#name = name;
    this.#origins = origins;
    Object.freeze(this);
  }

  get id() {
    return this.#id;
  }
  get name() {
    return this.#name;
  }
  get origins() {
    return this.#origins;
  }

  toString() {
    const originsString = this.#origins
      .map((obj) => `{origin:"${obj.origin}",price:"${obj.price}"}`)
      .join(",");
    return `{name:"${this.#name}",origins:[${originsString}]}`;
  }
}

export class OriginFactory {
  static origin(origin = "nowhere", price = 0) {
    return { origin, price };
  }
}

function isNotValid(id) {
  return typeof id !== "number" || isNaN(id);
}
