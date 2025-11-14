const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const pdf = require("pdf-parse");
const Tesseract = require("tesseract.js");
const Sentiment = require("sentiment");

const app = express();
app.use(cors());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running ✔️");
});

// Multer upload folder
const upload = multer({ dest: "uploads/" });
const sentiment = new Sentiment();

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ error: "No file uploaded" });

    const path = req.file.path;
    const mime = req.file.mimetype;
    let text = "";

    if (mime === "application/pdf") {
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
    if (hashtags < 2) suggestions.push("Add more relevant hashtags.");
    if (words > 50) suggestions.push("Shorten your text.");
    if (sentimentScore < 0)
      suggestions.push("Tone is negative. Use more positive words.");

    res.json({ text, hashtags, mentions, words, sentimentScore, suggestions });

  } catch (e) {
    res.status(500).json({ error: "Processing failed", details: e.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
