# 📄 DocuMind AI — Document Summary and QA Assistant

DocuMind AI is a full-stack web application that allows users to upload **documents, PDFs, or images** and instantly generate **clear, concise summaries** and ask **questions** related to it. It’s built with a **React + Tailwind frontend** and a **Node.js + Express + MongoDB backend**.

---

## 🔗 Live Demo

🚀 [Live Demo](document-summary-one.vercel.app)

---

## 🚀 Features

- 📂 **Upload documents, PDFs, or images** for quick processing
- ✂️ **Choose summary length** — short, medium, or long
- ❓ **Ask questions** about your documents with AI-powered Q&A
- 🔐 **User authentication** (JWT-based sessions)
- 🖥️ **Responsive UI** with smooth animations
- 🛠️ **MERN-based architecture** for scalability and speed
- 🔍 **OCR technology** for text extraction from images and scanned PDFs

---

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS, Framer Motion, React Router
- **Backend:** Node.js, Express.js, JWT authentication
- **Database:** MongoDB with Mongoose
- **OCR**: Tesseract.js for text extraction
- **AI Model:** Google Generative AI (Gemini)
- **PDF Processing**: PDF.js for PDF text extraction
- **Other Tools:** bcrypt, cookie-parser, cors, dotenv

---

## 📂 Project Structure

```bash
Document-Summary-Assistant/
├── client/               # React frontend
│   ├── public/           # Static files (favicon, etc.)
│   ├── src/              # React components & pages
│   └── dist/             # Production build output
├── server/               # Express backend
│   ├── routes/           # API routes
│   ├── controllers/      # Controller logic
│   └── models/           # Database models
├── .env                  # Environment variables
├── package.json          # Project scripts & dependencies
└── README.md
```
---

## 🎯 How to Use
- **Sign Up/Login**: Create an account or login to access the dashboard
- **Upload Document**: Drag and drop or select a PDF or image file
- **Extract Text**: The system will automatically extract text from your document
- **Generate Summary**: Choose your preferred summary length and generate a summary
- **Ask Questions**: Use the Q&A feature to ask specific questions about your document
- **Download/Copy**: Copy or download the generated content for your use

---
## 👨‍💻 Developer
-Name: Mohd Taha Khan
-Email: mohdtahakhan13@gmail.com
-College: IET Lucknow

