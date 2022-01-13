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

  builder() {
    return new FruitBuilder();
  }

  toString() {
    return `{_id:${this.id},_name:"${this.#name}"}`;
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
