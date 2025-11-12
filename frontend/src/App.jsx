import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onDrop = async (acceptedFiles) => {
    setError("");
    setResult(null);
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await axios.post("https://social-media-analyzer-vq5m.onrender.com", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Upload failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", textAlign: "center" }}>
      <h2>📄 Social Media Content Analyzer</h2>
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #888",
          padding: "40px",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop your file here...</p>
        ) : (
          <p>Drag or click to upload a PDF or Image file</p>
        )}
      </div>

      {loading && <p>⏳ Processing...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div style={{ textAlign: "left", marginTop: "20px" }}>
          <h3>Extracted Text</h3>
          <pre
            style={{
              background: "#f8f8f8",
              padding: "10px",
              borderRadius: "5px",
              whiteSpace: "pre-wrap",
            }}
          >
            {result.text}
          </pre>

          <h3>Analysis</h3>
          <ul>
            <li>Hashtags: {result.hashtags}</li>
            <li>Mentions: {result.mentions}</li>
            <li>Word Count: {result.words}</li>
            <li>Sentiment Score: {result.sentimentScore}</li>
          </ul>

          <h3>Suggestions</h3>
          <ul>
            {result.suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
