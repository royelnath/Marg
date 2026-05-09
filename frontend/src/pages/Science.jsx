import { Link } from 'react-router-dom';

export default function Science() {
  const scienceCareers = [
    { id: 'data-scientist', title: 'Data Scientist', desc: 'Extract meaningful insights from vast amounts of data using machine learning and algorithms.' },
    { id: 'aerospace-engineer', title: 'Aerospace Engineer', desc: 'Design, test, and manufacture aircraft, spacecraft, and missiles.' },
    { id: 'software-engineer', title: 'Software Engineer', desc: 'Build the applications, systems, and digital infrastructure of the future.' }
  ];

  return (
    <div className="stream-page-container">
      <div className="stream-hero science-bg">
        <h1>Science</h1>
        <p>Innovate & Engineer. Dive into the mechanics of the future, from writing algorithms that power modern tech to engineering sustainable solutions for human health and space exploration.</p>
      </div>

      <h2 className="section-title">Explore Science Trajectories</h2>
      
      <div className="career-options-grid">
        {scienceCareers.map(career => (
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