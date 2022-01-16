export default class FruitCache {
  #cache;

  constructor() {
    this.#cache = new Map();
  }

  save(fruit) {
    this.#cache.set(fruit.name || "noname", fruit);
  }

  find(name) {
    return this.#cache.has(name) ? this.#cache.get(name) : null;
  }

  findAll() {
    return Array.from(this.#cache).map((entry) => entry[1]);
  }

  delete(name) {
    this.#cache.delete(name);
  }

  clear() {
    this.#cache.clear();
  }

  get size() {
    return this.#cache.size;
  }
}
