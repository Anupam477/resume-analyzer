import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate('/home');
  };

  return (
    <div className="landing-container page-animate">
      {/* Background Decor */}
      <div className="bg-glow-1"></div>
      <div className="bg-glow-2"></div>

      <div className="landing-content">
        <h1 className="landing-title">
          Elevate Your <br/><span className="highlight-text">Resume.</span>
        </h1>
        <p className="landing-subtitle">
          Unlock your career potential with AI-driven resume analysis, precise job matching, and a smart dashboard to track your professional growth.
        </p>
        <div className="landing-buttons">
          <button className="btn-dark btn-glow" onClick={handleEnter}>
            Get Started <span className="arrow">→</span>
          </button>
          <button className="btn-light btn-glow" onClick={() => navigate('/dashboard')}>
            View Dashboard
          </button>
        </div>
      </div>
      
      <div className="landing-cards">
        <div className="card glass-panel" onClick={() => navigate('/analysis')}>
          <div className="icon-wrapper orange">
             <span>📊</span>
          </div>
          <h3>Deep Analysis</h3>
          <p className="card-desc">Get instant, actionable feedback to optimize your CV's impact.</p>
        </div>
        
        <div className="card glass-panel" onClick={() => navigate('/jobs')}>
          <div className="icon-wrapper blue">
             <span>🎯</span>
          </div>
          <h3>Job Matching</h3>
          <p className="card-desc">Discover top roles and opportunities tailored to your skills.</p>
        </div>
        
        <div className="card glass-panel" onClick={() => navigate('/dashboard')}>
          <div className="icon-wrapper green">
             <span>📈</span>
          </div>
          <h3>Smart Dashboard</h3>
          <p className="card-desc">Track your applications, scores, and monitor career progress.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
