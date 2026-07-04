import fs from "fs/promises";
import parseResume from "./utils/parseResume.js";

try {
    const buffer = await fs.readFile("./sample.pdf");

    const text = await parseResume(buffer);

    console.log(text);
} catch (error) {
    console.error(error);
}