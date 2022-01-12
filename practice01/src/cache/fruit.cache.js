export default class FruitCache {
  #cache;
  constructor() {
    this.#cache = new Map();
  }
  save(fruit) {
    this.#cache.set(fruit.name || "noname", fruit);
  }

  async find(name) {
    return this.#cache.has(name) ? await this.#cache.get(name) : null;
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
