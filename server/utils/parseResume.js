import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse/lib/pdf-parse");

const parseResume = async (fileBuffer) => {
    try {
        const data = await pdfParse(fileBuffer);

        const cleanedText = data.text
            .replace(/\r\n/g, "\n")
            .replace(/\n{2,}/g, "\n")
            .replace(/[ \t]+/g, " ")
            .trim();

        return cleanedText;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to parse resume PDF.");
    }
};

export default parseResume;