export class LoginError extends Error {
  constructor(message = "The login data is not valid.") {
    super(message);
    this.name = "LoginError";
  }
}

export class NoSuchUserError extends LoginError {
  constructor(userid) {
    super(`${userid} does not exist.`);
    this.name = "NoSuchUserError";
  }
}

export class WrongPasswordError extends LoginError {
  constructor() {
    super("Password is wrong.");
    this.name = "WrongPasswordError";
  }
}
