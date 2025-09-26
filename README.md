# 📄 DocuMind AI — Document Summary and QA Assistant

DocuMind AI is a full-stack web application that allows users to upload **documents, PDFs, or images** and instantly generate **clear, concise summaries** and ask **questions** related to it. It’s built with a **React + Tailwind frontend** and a **Node.js + Express + MongoDB backend**.

---

## 🔗 Live Demo

🚀 [Live Demo](https://document-summary-one.vercel.app)

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
## Set Up
folders:
  - client/   # Frontend (React + Vite)
  - backend/  # Backend (Express + MongoDB)

setup:
  steps:
    - step: Download/Clone
      description: |
        Download the project ZIP from GitHub or clone the repo.
        Example:
          git clone <repo-url>
          cd <repo-name>
    
    - step: Backend Setup
      commands:
        - cd backend
        - npm install
      env_file: |
        PORT=5000
        ORIGIN=http://localhost:5173
        MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<db_name>
        JWT_SECRET=your_jwt_secret
        JWT_TIMEOUT=your_jwt_timeout
        GOOGLE_CLIENT_ID=your_google_client_id
        GOOGLE_CLIENT_SECRET=your_google_client_secret
        GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/google
      run:
        - npm run dev
      notes: Backend will run on http://localhost:5000
    
    - step: Frontend Setup
      commands:
        - cd client
        - npm install
      run:
        - npm run dev
      notes: Frontend will run on http://localhost:5173

usage:
  - Open http://localhost:5173 in the browser.
  - The frontend will connect to backend at http://localhost:5000.

notes:
  - Ensure MongoDB connection string (MONGO_URI) is valid.
  - Update .env secrets with real values before running.

## 🎯 How to Use
- **Sign Up/Login**: Create an account or login to access the dashboard
- **Upload Document**: Drag and drop or select a PDF or image file
- **Extract Text**: The system will automatically extract text from your document
- **Generate Summary**: Choose your preferred summary length and generate a summary
- **Ask Questions**: Use the Q&A feature to ask specific questions about your document
- **Download/Copy**: Copy or download the generated content for your use

---
## 👨‍💻 Developer
- Name: Mohd Taha Khan
- Email: mohdtahakhan13@gmail.com
- College: IET Lucknow

