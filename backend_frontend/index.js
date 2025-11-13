// backend/index.js
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const pdf = require("pdf-parse-fixed");
const Tesseract = require("tesseract.js");
const cors = require("cors");
const Sentiment = require("sentiment");

const app = express();
app.use(cors());
const upload = multer({ dest: "uploads/" });
const sentiment = new Sentiment();

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const path = req.file.path;
    const mime = req.file.mimetype;
    let text = "";

    if (mime === "application/pdf" || req.file.originalname.endsWith(".pdf")) {
      const data = await pdf(fs.readFileSync(path));
      text = data.text;
    } else if (mime.startsWith("image/")) {
      const result = await Tesseract.recognize(path, "eng");
      text = result.data.text;
    } else {
      return res.status(400).json({ error: "Unsupported file type" });
    }

    fs.unlinkSync(path);

    const hashtags = (text.match(/#\w+/g) || []).length;
    const mentions = (text.match(/@\w+/g) || []).length;
    const words = text.split(/\s+/).filter(Boolean).length;
    const sentimentScore = sentiment.analyze(text).score;

    const suggestions = [];
    if (!/follow|click|visit|subscribe|dm|link/i.test(text))
      suggestions.push("Add a call-to-action (e.g., 'Follow', 'Click the link').");
    if (hashtags < 2) suggestions.push("Add 2–3 relevant hashtags.");
    if (words > 50) suggestions.push("Shorten the post for better readability.");
    if (sentimentScore < -1)
      suggestions.push("Tone seems negative — try making it more positive.");

    res.json({ text, hashtags, mentions, words, sentimentScore, suggestions });
  } catch (err) {
    res.status(500).json({ error: "Processing failed", details: err.message });
  }
});

app.listen(process.env.PORT || 4000, () =>
  console.log("Server running on Render")
);

