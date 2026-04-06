import { useLocation, useNavigate } from "react-router-dom";
import "./AnalysisPage.css";

function AnalysisPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  if (!data) {
    return <h2 style={{ textAlign: "center" }}>No data found</h2>;
  }

  return (
    <div className="analysis-container">
      <h1>Resume Analysis</h1>

      {/* Score */}
      <div className="score-box">
        <h2>{data.score}</h2>
        <p>ATS Score</p>
      </div>

      {/* Skills */}
      <div className="section">
        <h3>Detected Skills</h3>
        <div className="skills">
          {data.skills.length > 0 ? (
            data.skills.map((skill, i) => (
              <span key={i}>{skill}</span>
            ))
          ) : (
            <p>No skills detected</p>
          )}
        </div>
      </div>

      {/* Suggestions */}
      <div className="section">
        <h3>Suggestions</h3>
        <ul>
          {data.suggestions.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>

      {/* Button */}
      <button
        className="next-btn"
        onClick={() =>
          navigate("/jobs", {
            state: {
              jobs: data.jobs,
              skills: data.skills,
            },
          })
        }
      >
        View Matched Jobs →
      </button>
    </div>
  );
}

export default AnalysisPage;