import path from "path";
import dotenv from "dotenv";

dotenv.config({
    path: path.resolve(".env"),
});

console.log(process.env.CLOUDINARY_CLOUD_NAME);
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});