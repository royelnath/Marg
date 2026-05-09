import { useParams, Link } from 'react-router-dom';
// import './App.css';

export default function CareerDetails() {
  // useParams extracts the 'careerId' from the URL (e.g., 'data-scientist')
  const { careerId } = useParams();

  // Mock Database: In the future, you will fetch this from your Node/Express backend
  const careerData = {
    'data-scientist': {
      title: 'Data Scientist',
      stream: 'Science',
      description: 'Data Scientists analyze and interpret complex digital data to help businesses make better decisions. They use machine learning, predictive modeling, and statistical analysis.',
      skills: ['Python/R', 'Machine Learning', 'SQL', 'Data Visualization', 'Statistics'],
      outlook: 'Highly demanding with exceptional growth. Average starting salary is very competitive.'
    },
    'aerospace-engineer': {
      title: 'Aerospace Engineer',
      stream: 'Science',
      description: 'Aerospace Engineers design primarily aircraft, spacecraft, satellites, and missiles. In addition, they test prototypes to make sure that they function according to design.',
      skills: ['Thermodynamics', 'Aerodynamics', 'AutoCAD', 'Propulsion', 'Mathematics'],
      outlook: 'Steady growth with opportunities in defense, space exploration (like ISRO/NASA), and commercial aviation.'
    },
    'psychologist': {
      title: 'Psychologist',
      stream: 'Arts',
      description: 'Psychologists study cognitive, emotional, and social processes and behavior by observing, interpreting, and recording how individuals relate to one another and to their environments.',
      skills: ['Empathy', 'Research', 'Communication', 'Analytical Thinking', 'Patience'],
      outlook: 'Growing rapidly as mental health awareness increases globally and in corporate sectors.'
    },
    'corporate-lawyer': {
      title: 'Corporate Lawyer',
      stream: 'Arts',
      description: 'Corporate lawyers ensure the legality of commercial transactions, advising corporations on their legal rights and duties, including the duties and responsibilities of corporate officers.',
      skills: ['Negotiation', 'Contract Law', 'Analytical Skills', 'Public Speaking', 'Attention to Detail'],
      outlook: 'Highly lucrative. Essential for every growing business, startup, and multinational corporation.'
    },
    'investment-banker': {
      title: 'Investment Banker',
      stream: 'Commerce',
      description: 'Investment bankers help companies, organizations, and even governments raise money by issuing and selling securities. They also provide strategic advice for mergers and acquisitions.',
      skills: ['Financial Modeling', 'Valuation', 'Excel', 'Networking', 'High-Pressure Management'],
      outlook: 'Known for long hours but offers some of the highest financial compensations in the market.'
    },
    'business-analyst': {
      title: 'Business Analyst',
      stream: 'Commerce',
      description: 'Business Analysts help businesses optimize, automate, and analyze their processes. They bridge the gap between IT and the business to improve efficiency.',
      skills: ['Data Analysis', 'Process Mapping', 'SQL', 'Tableau/PowerBI', 'Problem Solving'],
      outlook: 'Excellent. Every tech and non-tech company requires BAs to streamline operations.'
    },
    'software-engineer': {
      title: 'Software Engineer',
      stream: 'Science',
      description: 'Software Engineers apply the principles of software engineering to the design, development, maintenance, testing, and evaluation of computer software.',
      skills: ['Data Structures', 'Algorithms', 'MERN Stack', 'Java/C++', 'System Design'],
      outlook: 'Exponential growth. The backbone of the modern digital economy.'
    },
    'brand-strategist': {
      title: 'Brand Strategist',
      stream: 'Arts',
      description: 'Brand Strategists develop positioning recommendations, guide market research analysis, and define brand elements and tone to ensure consistent communication across all channels.',
      skills: ['Market Research', 'Copywriting', 'Consumer Psychology', 'Creative Direction', 'SEO'],
      outlook: 'Strong demand in marketing agencies and tech startups looking to establish a unique identity.'
    },
    'medical-professional': {
      title: 'Medical Professional',
      stream: 'Science',
      description: 'Medical professionals diagnose and treat illnesses, injuries, and other health conditions.',
      skills: ['Biology', 'Empathy', 'Critical Thinking', 'Anatomy', 'High-Pressure Decision Making'],
      outlook: 'Constant high demand globally with diverse specialization paths.'
    },
    'civil-services': {
      title: 'Civil Services',
      stream: 'Arts', // Or general, depending on how you categorize it
      description: 'Civil servants work in various government departments to administer policies and ensure the smooth running of public services.',
      skills: ['Public Administration', 'Leadership', 'Policy Analysis', 'General Knowledge', 'Ethics'],
      outlook: 'Highly prestigious and stable, offering significant societal impact.'
    },
  };

  // Find the specific career based on the URL parameter
  const career = careerData[careerId];

  // If someone types a random career URL that doesn't exist
  if (!career) {
    return (
      <div className="career-not-found">
        <h2>Career not found!</h2>
        <p>The career path you are looking for does not exist in our database.</p>
        <Link to="/career" className="back-btn">Return to Careers</Link>
      </div>
    );
  }

  return (
    <div className="career-details-container">
      
      {/* Navigation Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/career" className="back-link">← Back to Careers</Link>
      </div>

      {/* Main Header Area */}
      <div className="career-header">
        <span className={`stream-badge ${career.stream.toLowerCase()}`}>{career.stream}</span>
        <h1>{career.title}</h1>
      </div>

      {/* Content Area */}
      <div className="career-content-grid">
        
        <div className="main-info">
          <h2>Overview</h2>
          <p>{career.description}</p>

          <h2>Job Outlook & Salary Trajectory</h2>
          <p>{career.outlook}</p>
        </div>

        <div className="sidebar-info">
          <h2>Core Skills Required</h2>
          <div className="skills-container">
            {career.skills.map((skill, index) => (
              <span key={index} className="skill-pill">
                {skill}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}