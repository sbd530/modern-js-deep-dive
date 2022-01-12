export class DBError extends Error {
  constructor(message = "DBError") {
    super(message);
    this.name = "DBError";
  }
}
