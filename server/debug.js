console.log("Debug started");

import dotenv from "dotenv";
dotenv.config();

console.log("PORT:", process.env.PORT);
console.log("MONGODB_URI exists:", !!process.env.MONGODB_URI);

console.log("Debug finished");