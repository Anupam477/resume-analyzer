import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminPage.css";

const API_URL = "http://localhost:5000";

function AdminPage() {
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    skillsRequired: "",
    applyLink: "",
  });

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${API_URL}/jobs`);
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddJob = async (e) => {
    e.preventDefault();
    const skillsArray = formData.skillsRequired.split(",").map((s) => s.trim().toLowerCase());
    try {
      await axios.post(`${API_URL}/jobs`, {
        ...formData,
        skillsRequired: skillsArray,
      });
      setFormData({ title: "", company: "", skillsRequired: "", applyLink: "" });
      fetchJobs();
    } catch (err) {
      console.error(err);
      alert("Failed to add job.");
    }
  };

  const handleDeleteJob = async (id) => {
    if (!window.confirm("Delete this job?")) return;
    try {
      await axios.delete(`${API_URL}/jobs/${id}`);
      fetchJobs();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-container page-animate">
      <div className="admin-content">
        <h1 className="admin-title">Admin Dashboard</h1>
        <p className="admin-subtitle">Secure area for adding and managing jobs on the platform. Users cannot see this page.</p>

        <div className="admin-grid">
          <div className="admin-card">
            <h2>Add New Job</h2>
            <form onSubmit={handleAddJob} className="admin-form">
              <div className="input-group">
                <label>Job Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
              </div>
              <div className="input-group">
                <label>Company</label>
                <input type="text" name="company" value={formData.company} onChange={handleInputChange} required />
              </div>
              <div className="input-group">
                <label>Skills Required (comma separated)</label>
                <input type="text" name="skillsRequired" value={formData.skillsRequired} onChange={handleInputChange} required placeholder="e.g. react, node, sql" />
              </div>
              <div className="input-group">
                <label>Apply Link</label>
                <input type="url" name="applyLink" value={formData.applyLink} onChange={handleInputChange} required placeholder="https://..." />
              </div>
              <button type="submit" className="admin-btn btn-glow">Add Job</button>
            </form>
          </div>

          <div className="admin-card lists">
            <h2>Active Jobs</h2>
            <div className="jobs-list">
              {jobs.length === 0 ? <p>No jobs added. They will appear here once added in the DB.</p> : jobs.map((job) => (
                <div key={job._id} className="admin-job-item">
                  <div className="job-info">
                    <h3>{job.title}</h3>
                    <p className="job-company">{job.company}</p>
                    <p className="job-skills">{job.skillsRequired.join(", ")}</p>
                  </div>
                  <button type="button" className="del-btn" onClick={() => handleDeleteJob(job._id)}>Delete</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
