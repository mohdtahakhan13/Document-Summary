import React, { useCallback, useState, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import {
  Upload,
  FileText,
  Image as ImageIcon,
  MessageSquare,
  X,
  Send,
  BookOpen,
} from "lucide-react";
import Navbar from "./Navbar";
import Tesseract from "tesseract.js";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"; // code syntax theme
import Footer from "./Footer";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const Dashboard = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  const [extracting, setExtracting] = useState(false);
  const [extractedText, setExtractedText] = useState("");
  const [extractedOk, setExtractedOk] = useState(false);

  const [progress, setProgress] = useState(null);

  const [summaryLength, setSummaryLength] = useState("short");
  const [summarizing, setSummarizing] = useState(false);
  const [summary, setSummary] = useState("");

  // New state for Q&A feature
  const [activeView, setActiveView] = useState("summary"); // 'summary' or 'qa'
  const [question, setQuestion] = useState("");
  const [asking, setAsking] = useState(false);
  const [qaHistory, setQAHistory] = useState([]);

  const summaryRef = useRef(null);
  const summaryOptionsRef = useRef(null);
  const qaPanelRef = useRef(null);
  const questionInputRef = useRef(null);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      const previewUrl = URL.createObjectURL(selectedFile);

      setFile(selectedFile);
      setFilePreview(previewUrl);
      setExtractedText("");
      setExtractedOk(false);
      setSummary("");
      setProgress(null);
      setActiveView("summary");
      setQAHistory([]);

      extractText(selectedFile, previewUrl).catch((err) =>
        console.error("Extraction failed:", err)
      );
    }
  }, []);

  useEffect(() => {
    return () => {
      if (filePreview) URL.revokeObjectURL(filePreview);
    };
  }, [filePreview]);

  useEffect(() => {
    fetch("http://localhost:5000/api/check-auth", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setLoggedIn(data.loggedIn))
      .catch((err) => console.error("Auth check failed:", err));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    multiple: false,
    disabled: !loggedIn,
  });

  // runOCR optionally suppresses inner logging; if suppressInnerProgress=true,
  // it will NOT update progress via Tesseract logger (we'll manage overall progress externally).
  const runOCR = async (imageSrc, suppressInnerProgress = false) => {
    return new Promise(async (resolve, reject) => {
      try {
        await Tesseract.recognize(imageSrc, "eng", {
          logger: (m) => {
            if (!suppressInnerProgress) {
              if (m.status === "recognizing text") {
                setProgress(Math.round(m.progress * 100));
              }
            }
          },
        })
          .then((result) => {
            if (!suppressInnerProgress) setProgress(100);
            resolve(result.data?.text || "");
          })
          .catch((err) => reject(err));
      } catch (err) {
        reject(err);
      }
    });
  };

  // Core extraction function: extracts text from PDF or image.
  // For PDFs it shows overall progress as pagesCompleted/totalPages * 100.
  const extractText = async (fileParam, previewUrl) => {
    if (!fileParam) return;
    setExtracting(true);
    setExtractedOk(false);
    setExtractedText("");
    setSummary("");
    setProgress(0);

    try {
      if (fileParam.type === "application/pdf") {
        const arrayBuffer = await fileParam.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const totalPages = pdf.numPages || 1;
        let textAccum = "";

        setProgress(0);

        for (let i = 1; i <= totalPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();

          if (content && content.items && content.items.length > 0) {
            const strings = content.items.map((item) => item.str || "");
            textAccum += strings.join(" ") + "\n\n";
          } else {
            const viewport = page.getViewport({ scale: 2 });
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = Math.floor(viewport.width);
            canvas.height = Math.floor(viewport.height);
            await page.render({ canvasContext: ctx, viewport }).promise;
            const dataUrl = canvas.toDataURL();
            const ocrText = await runOCR(dataUrl, true);
            textAccum += ocrText + "\n\n";
          }

          const pct = Math.round((i / totalPages) * 100);
          setProgress(pct);
        }

        const finalText = textAccum.trim();
        setExtractedText(finalText);
        setExtractedOk(Boolean(finalText && !finalText.startsWith("❌")));
        setProgress(100);
      } else if (fileParam.type.startsWith("image/")) {
        setProgress(0);
        const imageSrc = previewUrl || URL.createObjectURL(fileParam);
        const ocrText = await runOCR(imageSrc, false);
        setExtractedText(ocrText);
        setExtractedOk(Boolean(ocrText && !ocrText.startsWith("❌")));
        setProgress(100);
      } else {
        setExtractedText("❌ Error: Unsupported file type.");
        setExtractedOk(false);
        setProgress(null);
      }
    } catch (err) {
      console.error("Text extraction failed", err);
      setExtractedText("❌ Error: Could not extract text.");
      setExtractedOk(false);
      setProgress(null);
    } finally {
      // short delay so UI can display 100% briefly
      setTimeout(() => setProgress(null), 600);
      setExtracting(false);
    }
  };

  // Send extracted text + summary length to backend
  const handleSummarize = async () => {
    if (!extractedText || !extractedOk) return;
    setSummarizing(true);
    setSummary("");
    try {
      const res = await fetch("http://localhost:5000/api/dashboard/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: extractedText, length: summaryLength }),
      });
      if (!res.ok) throw new Error("Summarization failed");
      const data = await res.json();
      setSummary(data.summary || JSON.stringify(data));
    } catch (err) {
      console.error("Summarization error", err);
      setSummary("❌ Error: Could not summarize text.");
    } finally {
      setSummarizing(false);
    }
  };

  // Handle asking a question about the document
  const handleAskQuestion = async () => {
    if (!question.trim() || !extractedText) return;

    setAsking(true);
    const userQuestion = question.trim();
    setQuestion("");

    // Add user question to history immediately
    const newQAItem = { question: userQuestion, answer: "", isAnswering: true };
    setQAHistory((prev) => [...prev, newQAItem]);

    try {
      const res = await fetch("http://localhost:5000/api/dashboard/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: extractedText,
          question: userQuestion,
          history: qaHistory.slice(-5), // Send last 5 Q&A pairs for context
        }),
      });

      if (!res.ok) throw new Error("Question answering failed");

      const data = await res.json();

      // Update the last item in history with the answer
      setQAHistory((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          question: userQuestion,
          answer: data.answer || "No answer provided.",
          isAnswering: false,
        };
        return updated;
      });
    } catch (err) {
      console.error("Question answering error", err);

      // Update with error message
      setQAHistory((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          question: userQuestion,
          answer: "❌ Error: Could not get an answer.",
          isAnswering: false,
        };
        return updated;
      });
    } finally {
      setAsking(false);
    }
  };

  // Scroll to bottom of Q&A panel when new messages are added
  useEffect(() => {
    if (activeView === "qa" && qaPanelRef.current) {
      qaPanelRef.current.scrollTop = qaPanelRef.current.scrollHeight;
    }
  }, [qaHistory, activeView]);

  // Scroll summary into view when it appears
  useEffect(() => {
    if (summary && summaryRef.current) {
      setTimeout(() => {
        summaryRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        try {
          summaryRef.current.focus({ preventScroll: true });
        } catch (e) {}
      }, 120);
    }
  }, [summary]);

  // Scroll summary options into view when extraction completes
  useEffect(() => {
    if (extractedOk && summaryOptionsRef.current) {
      setTimeout(() => {
        summaryOptionsRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 120);
    }
  }, [extractedOk]);

return (
    <>
    <Navbar/>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 text-gray-200 flex flex-col items-center justify-start p-4 md:p-6 font-sans">
        <h1 className="text-3xl font-bold mt-6 mb-6 text-white font-poppins tracking-tight">
          Document Summary Assistant
        </h1>

        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={`w-full max-w-4xl border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-all duration-300 ${
            isDragActive
              ? "border-green-400 bg-gray-800/50 shadow-lg"
              : "border-gray-600/50 bg-gray-800/30 backdrop-blur-sm"
          } ${!loggedIn ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-green-500/70"}`}
        >
          <input {...getInputProps()} />
          <div className="p-3 mb-3 rounded-full bg-green-900/30 border border-green-700/30">
            <Upload className="w-8 h-8 text-green-400" />
          </div>
          {!loggedIn ? (
            <p className="text-lg text-red-400">Please log in to upload files</p>
          ) : isDragActive ? (
            <p className="text-lg text-green-300">Drop your file here...</p>
          ) : (
            <p className="text-lg text-gray-400 text-center">
              Drag & drop PDF or Image here, or <span className="text-green-400 font-medium">click to select</span>
            </p>
          )}
        </div>

        {file && (
          <div className="mt-8 w-full max-w-6xl flex flex-col lg:flex-row gap-6 items-stretch">
            {/* Left side - Document Preview */}
            <div className="w-full lg:w-2/6 flex flex-col">
              <div className="flex items-center gap-3 bg-gray-800/60 backdrop-blur-sm px-4 py-3 rounded-lg w-full mb-4 border border-gray-700/50">
                {file.type === "application/pdf" ? (
                  <FileText className="w-5 h-5 text-red-400" />
                ) : (
                  <ImageIcon className="w-5 h-5 text-green-400" />
                )}
                <span className="text-sm break-all font-medium">{file.name}</span>
                <div className="ml-auto text-xs px-2 py-1 rounded-md bg-gray-700/50">
                  {extracting ? "Processing..." : extractedOk ? "Ready" : "Pending"}
                </div>
              </div>

              {/* PDF/Image Viewer */}
              <div className="w-full bg-gray-800/40 backdrop-blur-sm rounded-xl overflow-hidden flex justify-center items-center h-[400px] lg:h-[60vh] xl:h-[70vh] border border-gray-700/30">
                {file.type === "application/pdf" ? (
                  <iframe
                    src={`/pdfjs/viewer.html?file=${encodeURIComponent(filePreview)}&name=${encodeURIComponent(file.name)}`}
                    className="w-full h-full rounded-lg"
                    title="PDF Preview"
                  />
                ) : (
                  <img
                    src={filePreview}
                    alt="Preview"
                    className="w-full h-full object-contain rounded-lg"
                  />
                )}
              </div>

              {/* Progress bar */}
              {progress !== null && (
                <div className="mt-4 w-full bg-gray-800/60 backdrop-blur-sm p-4 rounded-xl border border-gray-700/30">
                  <div className="flex justify-between items-center mb-2 text-sm text-gray-300">
                    <span>Extracting text</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden">
                    <div
                      className="h-2 bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Right side - Summary/QA Container */}
            <div className="w-full lg:w-4/6 flex flex-col">
              {extractedOk && (
                <div className="w-full bg-gray-800/40 backdrop-blur-sm rounded-xl shadow-lg min-h-[500px] flex flex-col border border-gray-700/30 overflow-hidden">
                  {/* Toggle buttons */}
                  <div className="flex border-b border-gray-700/50">
                    <button
                      onClick={() => setActiveView("summary")}
                      className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 transition-all duration-200 ${
                        activeView === "summary"
                          ? "bg-gray-700/50 text-white border-b-2 border-green-400"
                          : "bg-transparent text-gray-400 hover:bg-gray-700/20"
                      }`}
                    >
                      <BookOpen size={18} />
                      Summary
                    </button>
                    <button
                      onClick={() => setActiveView("qa")}
                      className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 transition-all duration-200 ${
                        activeView === "qa"
                          ? "bg-gray-700/50 text-white border-b-2 border-green-400"
                          : "bg-transparent text-gray-400 hover:bg-gray-700/20"
                      }`}
                    >
                      <MessageSquare size={18} />
                      Ask Questions
                    </button>
                  </div>

                  {/* Content area */}
                  <div className="flex-1 p-6 overflow-y-auto">
                    {activeView === "summary" ? (
                      <>
                        <div ref={summaryOptionsRef} className="mb-6">
                          <h2 className="text-xl font-semibold mb-4 text-white">
                            Generate Summary
                          </h2>

                          {/* Summary Options */}
                          <div className="flex flex-wrap gap-4 mb-6">
                            {[
                              { value: "short", label: "Short" },
                              { value: "medium", label: "Medium" },
                              { value: "long", label: "Detailed" }
                            ].map(({ value, label }) => (
                              <label
                                key={value}
                                className="flex items-center gap-2 cursor-pointer group"
                              >
                                <div className="relative">
                                  <input
                                    type="radio"
                                    name="summaryLength"
                                    value={value}
                                    checked={summaryLength === value}
                                    onChange={(e) =>
                                      setSummaryLength(e.target.value)
                                    }
                                    className="sr-only"
                                  />
                                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                                    summaryLength === value 
                                      ? "border-green-400 bg-green-400/10" 
                                      : "border-gray-500 group-hover:border-green-500/70"
                                  }`}>
                                    {summaryLength === value && (
                                      <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                    )}
                                  </div>
                                </div>
                                <span className="text-gray-300 group-hover:text-white transition-colors">
                                  {label}
                                </span>
                              </label>
                            ))}
                          </div>

                          <button
                            onClick={handleSummarize}
                            disabled={summarizing}
                            className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 rounded-lg text-white font-medium shadow-md disabled:opacity-50 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2"
                          >
                            {summarizing ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Summarizing...
                              </>
                            ) : (
                              <>
                                <BookOpen size={16} />
                                Generate Summary
                              </>
                            )}
                          </button>
                        </div>

                        {/* Show summary once returned */}
                       {summary && (
  <div ref={summaryRef} tabIndex={-1} className="mt-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold text-white flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-400"></div>
        Summary ({summaryLength})
      </h2>
      <button
        onClick={() =>
          navigator.clipboard.writeText(summary)
        }
        className="text-sm text-green-400 hover:text-green-300 transition-colors flex items-center gap-1"
      >
        Copy Text
      </button>
    </div>
    <div className="bg-gray-800/50 backdrop-blur-sm p-5 rounded-xl border border-gray-700/30 max-h-72 overflow-y-auto">
      <p className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">
        {summary.replace(/^TL;DR\s*/i, '')}
      </p>
    </div>
  </div> 
)}
                      </>
                    ) : (
                      /* Q&A Panel */
                      <div className="h-full flex flex-col">
                        {/* Q&A History */}
                        <div
                          ref={qaPanelRef}
                          className="flex-1 overflow-y-auto mb-4 space-y-4"
                        >
                          {qaHistory.length === 0 ? (
                            <div className="text-center text-gray-400 py-8 h-full flex items-center justify-center flex-col">
                              <MessageSquare
                                size={40}
                                className="mx-auto mb-2 opacity-50 text-green-400/50"
                              />
                              <p className="mt-2">
                                Ask a question about your document to get started.
                              </p>
                            </div>
                          ) : (
                            qaHistory.map((item, index) => (
                              <div key={index} className="space-y-3">
                                {/* User Question */}
                                <div className="flex justify-end">
                                  <div className="bg-green-900/30 text-white rounded-xl p-3 max-w-[80%] border border-green-800/30">
                                    <p>{item.question}</p>
                                  </div>
                                </div>

                                {/* AI Answer */}
                                <div className="flex justify-start">
                                  <div className="bg-gray-700/50 text-gray-200 rounded-xl p-3 max-w-[80%] border border-gray-600/30">
                                    {item.isAnswering ? (
                                      <div className="flex items-center gap-2">
                                        <div className="animate-pulse text-green-400/70">
                                          Thinking...
                                        </div>
                                        <div className="flex space-x-1">
                                          <div className="h-1 w-1 bg-green-400 rounded-full animate-bounce"></div>
                                          <div
                                            className="h-1 w-1 bg-green-400 rounded-full animate-bounce"
                                            style={{ animationDelay: "0.2s" }}
                                          ></div>
                                          <div
                                            className="h-1 w-1 bg-green-400 rounded-full animate-bounce"
                                            style={{ animationDelay: "0.4s" }}
                                          ></div>
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="prose prose-invert max-w-none text-sm">
                                        <ReactMarkdown
                                          remarkPlugins={[remarkGfm]}
                                          rehypePlugins={[rehypeHighlight]}
                                        >
                                          {item.answer}
                                        </ReactMarkdown>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))
                          )}
                        </div>

                        {/* Question Input */}
                        <div className="pt-4 border-t border-gray-700/50">
                          <div className="flex gap-2">
                            <input
                              ref={questionInputRef}
                              type="text"
                              value={question}
                              onChange={(e) => setQuestion(e.target.value)}
                              placeholder="Ask a question about your document..."
                              className="flex-1 bg-gray-700/40 backdrop-blur-sm text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500/50 border border-gray-600/30"
                              disabled={asking}
                              onKeyPress={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                  e.preventDefault();
                                  handleAskQuestion();
                                }
                              }}
                            />
                            <button
                              onClick={handleAskQuestion}
                              disabled={asking || !question.trim()}
                              className="bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg px-4 py-3 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:from-green-500 hover:to-green-400 transition-all duration-300"
                            >
                              {asking ? (
                                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                <Send size={18} />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;