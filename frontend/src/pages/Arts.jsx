import { Link } from 'react-router-dom';

export default function Arts() {
  const artsCareers = [
    { id: 'psychologist', title: 'Psychologist', desc: 'Study the human mind and behavior to help individuals navigate mental health and emotional challenges.' },
    { id: 'corporate-lawyer', title: 'Corporate Lawyer', desc: 'Navigate complex legal frameworks to advise businesses on transactions, mergers, and corporate governance.' },
    { id: 'brand-strategist', title: 'Brand Strategist', desc: 'Shape the identity and public perception of companies through creative vision and market research.' }
  ];

  return (
    <div className="stream-page-container">
      <div className="stream-hero arts-bg">
        <h1>Arts & Humanities</h1>
        <p>Create & Connect. Shape how the world thinks, feels, and interacts by combining creative vision with a deep understanding of human behavior and social policy.</p>
      </div>

      <h2 className="section-title">Explore Arts Trajectories</h2>
      
      <div className="career-options-grid">
        {artsCareers.map(career => (
          <Link to={`/career/${career.id}`} key={career.id} className="career-card">
            <h3>{career.title}</h3>
            <p>{career.desc}</p>
            <span className="explore-btn">View Path Details →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}