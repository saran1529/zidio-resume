import { useState, useRef } from "react";
import ResumeEditor from "./components/ResumeEditor";
import ResumePreview from "./components/ResumePreview";
import mockData from "./data/mockResume.json";
import "./index.css";

export default function App() {
  const [resume, setResume] = useState(mockData);
  const previewRef = useRef(); // Ref to access downloadPDF from ResumePreview

  return (
    <div className="flex flex-col max-h-screen bg-gray-50">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-sm shadow-md z-50 px-6 py-4 flex justify-between items-center">
        <div className="flex justify-between items-center w-full max-w-8xl">
          <h1 className="text-2xl font-bold text-gray-800">Resume Editor</h1>

          {/* Download Button */}
          <button
            onClick={() => previewRef.current?.downloadPDF?.()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-lg text-sm"
          >
            Download PDF
          </button>
        </div>
      </header>
      <div className="text-center text-gray-600 mt-20 text-sm px-2">
        Create your professional resume quickly. Fill in details, add skills and experience, and download as PDF instantly.
      </div>

      {/* Main Content */}
      <div className="flex-1 grid md:grid-cols-2 gap-3 p-2 overflow-auto w-full">
        {/* Resume Editor */}
        <div className="bg-white rounded-lg shadow-md p-10 overflow-auto h-full">
          <ResumeEditor resume={resume} setResume={setResume} />
        </div>

        {/* Resume Preview */}
        <div className="bg-white rounded-lg shadow-md overflow-auto h-full relative">
          <ResumePreview ref={previewRef} resume={resume} />
        </div>
      </div>

      {/* Footer */}
      <footer className=" w-full bg-gray-100 text-gray-600 text-center py-2 border-t-2 border-gray-300 text-sm">
        © 2025 Resume Editor. <br />Need help? Contact us at <a href="mailto:support@resumeeditor.com" className="text-blue-600 hover:underline">support@resumeeditor.com</a>
      </footer>
    </div>
  );
}
