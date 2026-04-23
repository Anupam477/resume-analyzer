const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("MongoDB Error:", err.message));

const resumeSchema = new mongoose.Schema(
  {
    filename: String,
    userEmail: String,
    userName: String,
    skills: [String],
    score: Number,
    jobs: Array,
    suggestions: [String],
    aiAnalysis: String,
  },
  { timestamps: true }
);

const Resume = mongoose.model("Resume", resumeSchema);

// New Job Schema & Model
const jobSchema = new mongoose.Schema(
  {
    title: String,
    company: String,
    skillsRequired: [String],
    applyLink: String,
  },
  { timestamps: true }
);
const Job = mongoose.model("Job", jobSchema);

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 2 * 1024 * 1024 },
});

const skillDatabase = [
  "java",
  "python",
  "c",
  "c++",
  "javascript",
  "react",
  "node",
  "express",
  "mongodb",
  "mysql",
  "html",
  "css",
  "bootstrap",
  "sql",
  "git",
  "github",
];

function extractSkills(text) {
  const lowerText = text.toLowerCase();
  return skillDatabase.filter((skill) =>
    lowerText.includes(skill.toLowerCase())
  );
}

function calculateScore(skills) {
  return Math.min(skills.length * 10, 100);
}

function matchJobs(skills, availableJobs) {
  return availableJobs.map((job) => {
    const matchedSkills = job.skillsRequired.filter((skill) =>
      skills.includes(skill.toLowerCase())
    );

    const matchPercent =
      job.skillsRequired.length > 0
        ? Math.round((matchedSkills.length / job.skillsRequired.length) * 100)
        : 0;

    return {
      title: job.title,
      company: job.company,
      skillsRequired: job.skillsRequired,
      applyLink: job.applyLink,
      matchedSkills,
      matchPercent,
    };
  });
}

function generateSuggestions(skills) {
  const suggestions = [];

  if (!skills.includes("react")) suggestions.push("Add React");
  if (!skills.includes("node")) suggestions.push("Learn Node.js");
  if (!skills.includes("mongodb")) suggestions.push("Add MongoDB");
  if (!skills.includes("git")) suggestions.push("Use Git & GitHub");
  if (!skills.includes("sql")) suggestions.push("Learn SQL");

  return suggestions;
}

function generateAIAnalysis(skills, score) {
  let analysis = "";

  if (score >= 80) {
    analysis += "Your resume looks strong and fairly well-optimized for ATS screening.\n\n";
  } else if (score >= 60) {
    analysis += "Your resume is decent, but it still needs some improvement to become more competitive.\n\n";
  } else {
    analysis += "Your resume currently needs significant improvement to perform better in ATS screening.\n\n";
  }

  if (skills.includes("html") || skills.includes("css") || skills.includes("javascript")) {
    analysis += "You already have a base in development skills, which is a good sign.\n";
  }

  if (!skills.includes("react")) {
    analysis += "- Add React to improve your frontend profile.\n";
  }

  if (!skills.includes("node")) {
    analysis += "- Learn Node.js to strengthen backend development skills.\n";
  }

  if (!skills.includes("mongodb")) {
    analysis += "- Add MongoDB knowledge or projects to improve your full-stack profile.\n";
  }

  if (!skills.includes("git")) {
    analysis += "- Mention Git and GitHub to show version control experience.\n";
  }

  if (!skills.includes("sql")) {
    analysis += "- Add SQL to improve database fundamentals.\n";
  }

  analysis += "\nTry adding strong projects, tools, and measurable achievements in your resume.";

  return analysis;
}

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Resume Endpoints
app.get("/resumes", async (req, res) => {
  try {
    const { email } = req.query;
    let query = {};
    if (email) {
      query.userEmail = email;
    }
    const resumes = await Resume.find(query).sort({ createdAt: -1 });
    res.json(resumes);
  } catch (error) {
    console.log("Fetch resumes error:", error.message);
    res.status(500).json({ error: "Failed to fetch resumes" });
  }
});
app.delete("/resumes/:id", async (req, res) => {
  try {
    const deletedResume = await Resume.findByIdAndDelete(req.params.id);

    if (!deletedResume) {
      return res.status(404).json({ error: "Resume not found" });
    }

    res.json({ message: "Resume deleted successfully" });
  } catch (error) {
    console.log("Delete error:", error.message);
    res.status(500).json({ error: "Delete failed" });
  }
});
app.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { userEmail, userName } = req.body;

    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(dataBuffer);

    const text = pdfData.text || "";
    const skills = extractSkills(text);
    const score = calculateScore(skills);
    
    // Dynamically fetch jobs for matching
    const availableJobs = await Job.find();
    const jobs = matchJobs(skills, availableJobs);
    
    const suggestions = generateSuggestions(skills);
    const aiAnalysis = generateAIAnalysis(skills, score);

    const newResume = new Resume({
      filename: req.file.originalname,
      userEmail: userEmail || "anonymous",
      userName: userName || "User",
      skills,
      score,
      jobs,
      suggestions,
      aiAnalysis,
    });

    await newResume.save();

    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.json({
      skills,
      score,
      jobs,
      suggestions,
      aiAnalysis,
    });
  } catch (error) {
    console.log("Upload error:", error.message);

    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({ error: "Upload failed" });
  }
});

// Jobs Admin Endpoints
app.get("/jobs", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    console.log("Fetch jobs error:", error.message);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

app.post("/jobs", async (req, res) => {
  try {
    const { title, company, skillsRequired, applyLink } = req.body;
    const newJob = new Job({ title, company, skillsRequired, applyLink });
    await newJob.save();
    res.json(newJob);
  } catch (error) {
    console.log("Add job error:", error.message);
    res.status(500).json({ error: "Failed to add job" });
  }
});

app.delete("/jobs/:id", async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted" });
  } catch (error) {
    console.log("Delete job error:", error.message);
    res.status(500).json({ error: "Delete job failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running 🚀 on port ${PORT}`));