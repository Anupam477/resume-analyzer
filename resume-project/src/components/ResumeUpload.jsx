import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a resume first");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData);
      localStorage.setItem("analysisData", JSON.stringify(response.data));
      navigate("/analysis");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed");
    }
  };

  return (
    <div className="text-center">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">
        Upload Resume
      </h2>

      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="mb-4 block w-full rounded-lg border border-gray-300 p-2"
      />

      <button
        onClick={handleUpload}
        className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700"
      >
        Analyze Resume
      </button>
    </div>
  );
}

export default ResumeUpload;