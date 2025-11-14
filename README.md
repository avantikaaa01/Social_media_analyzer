Social Media Content Analyzer

A full-stack web application that extracts and analyzes text from PDF or image files to provide engagement insights for social media posts.

Live Demo
Frontend (Vercel): https://social-media-analyzer-frontend-ten.vercel.app
Backend (Render):https://social-media-analyzer-7a8j.onrender.com


Features

Upload PDF or image files via drag-and-drop
Text extraction using pdf-parse-fixed and Tesseract.js (OCR)
Sentiment analysis of extracted text
Hashtag & Mention detection
Engagement improvement suggestions
Node.js + Express backend
React + Vite frontend with loading states

Tech Stack
Frontend: React, Vite, Axios, React-Dropzone
Backend: Node.js, Express, Multer, pdf-parse-fixed, Tesseract.js, Sentiment, CORS

Setup Instructions
1. Clone the repository:- git clone https://github.com/avantikaaa01/social-media-analyzer.git
2. Run the backend:-    cd social-media-analyzer/backend_frontend
                        npm install
                        node index.js
3. Run the frontend:-   cd ../frontend
                        npm install
                        npm run dev


The Social Media Content Analyzer is designed to extract text from PDFs and image files and provide engagement-related insights. The backend, built with Node.js and Express, uses pdf-parse-fixed for PDF extraction and Tesseract.js for OCR-based text extraction from images. After extracting the text, the system performs sentiment analysis using the Sentiment library and identifies hashtags, mentions, and keywords. Based on these findings, the backend generates suggestions to improve social media engagement, such as adding relevant hashtags, improving tone, or including call-to-action elements.

The frontend is developed using React with Vite, providing a clean and responsive UI. Users can upload files through a drag-and-drop interface, and the application displays loading states, extracted text, and engagement suggestions clearly. Communication between frontend and backend is handled using Axios.

This project demonstrates my ability to build a complete full-stack application with OCR processing, API integration, error handling, and user-friendly interaction — all within the given 8-hour challenge requirement.


License
This project was created as part of a technical assessment for a Software Engineering position.


