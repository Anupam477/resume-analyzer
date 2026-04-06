import React from "react";

function JobCard({ title, company, location, salary, matchPercentage, matchedSkills }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "20px",
        margin: "20px auto",
        width: "400px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2>{title}</h2>
      <p><strong>Company:</strong> {company}</p>
      <p><strong>Location:</strong> {location}</p>
      <p><strong>Salary:</strong> {salary}</p>
      <p><strong>Match:</strong> {matchPercentage}%</p>
      <p><strong>Matched Skills:</strong> {matchedSkills.join(", ")}</p>
      <button>Apply Now</button>
    </div>
  );
}

export default JobCard;