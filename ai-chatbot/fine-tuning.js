const { createReadStream, existsSync } = require("fs");
const { resolve } = require("path");
const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI(process.env.OPENAI_API_KEY);

async function uploadAndFineTune() {
  try {
    const prodFilePath = resolve(__dirname, "dataset.jsonl");
    const devFilePath = resolve(
      __dirname,
      "..",
      "..",
      "src",
      "modules",
      "ai",
      "dataset.jsonl"
    );
    let filePath;

    if (existsSync(prodFilePath)) {
      filePath = prodFilePath;
    } else if (existsSync(devFilePath)) {
      filePath = devFilePath;
    } else {
      throw new Error(`File not found: ${prodFilePath} or ${devFilePath}`);
    }

    console.log("Resolved file path:", filePath);

    const uploadResponse = await openai.files.create({
      file: createReadStream(filePath),
      purpose: "fine-tune",
    });

    console.log("File uploaded successfully:", uploadResponse);

    const fineTuneResponse = await openai.fineTuning.jobs.create({
      training_file: uploadResponse.id,
      model: "gpt-3.5-turbo",
    });

    console.log("Fine-tuning job created successfully:", fineTuneResponse);
  } catch (error) {
    console.error("Error during file upload and fine-tuning:", error.message);
  }
}

uploadAndFineTune();
