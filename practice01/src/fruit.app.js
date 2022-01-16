import "dotenv/config";
import login from "./service/login.service";
import acceptQuery from "./service/query.service";

//* User's login
await login();

//* Ready for user's query
acceptQuery();
