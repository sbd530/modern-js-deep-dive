export default class FruitCache {
  #cache;

  constructor() {
    this.#cache = new Map();
  }

  save(aFruit) {
    this.#cache.set(aFruit.name || "noname", aFruit);
  }

  find(name) {
    return this.#cache.has(name) ? this.#cache.get(name) : null;
  }

  findAll() {
    return Array.from(this.#cache).map((entry) => entry[1]);
  }
  //*  *some*thing*
  findLike(aWord) {
    aWord = aWord.replace(/\*/g, ".*");
    const regexp = new RegExp(aWord);
    return this.findAll().filter((aFruit) => regexp.test(aFruit.name));
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
