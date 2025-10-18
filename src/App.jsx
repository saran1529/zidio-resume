import React, { useState } from "react";
import ResumeEditor from "./components/ResumeEditor";
import ResumePreview from "./components/ResumePreview";
import mockData from "./data/mockResume.json";

export default function App() {
  const [resume, setResume] = useState(mockData);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">Resume Editor</h2>
          <ResumeEditor resume={resume} setResume={setResume} />
        </div>

        <div className="bg-white rounded-lg p-6 shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Live Preview</h2>
          </div>
          <ResumePreview resume={resume} />
        </div>
      </div>
    </div>
  );
}
