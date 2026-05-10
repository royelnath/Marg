import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

export default function Sign() {
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Logging in with:', formData.email, formData.password);
      // Add your standard Login API call here
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      console.log('Registering with:', formData);
      // Add your standard Registration API call here
    }
  };

  // New handler for Google Sign In
  const handleGoogleSignIn = () => {
    console.log('Initiating Google OAuth flow...');
    // Later, you will integrate Firebase Auth or Google Identity Services here
  };

  return (
    <div className="sign-page-container">
      <div className="auth-card">
        
        <div className="auth-branding">
          <h2>{isLogin ? 'Welcome Back!' : 'Join Future Marg'}</h2>
          <p>
            {isLogin 
              ? 'Sign in to continue mapping your unique career trajectory and accessing your personalized dashboard.'
              : 'Create an account to take our precision-based assessment and build a definitive roadmap for your future.'}
          </p>
          <button 
            className="toggle-mode-btn" 
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Create an Account" : "I already have an account"}
          </button>
        </div>

        <div className="auth-form-section">
          <h2>{isLogin ? 'Sign In' : 'Create Account'}</h2>
          
          {/* --- NEW GOOGLE AUTH SECTION --- */}
          <button type="button" className="google-auth-btn" onClick={handleGoogleSignIn}>
            <FontAwesomeIcon icon={faGoogle} className="google-icon" />
            Continue with Google
          </button>

          <div className="auth-divider">
            <span>or continue with email</span>
          </div>
          {/* ------------------------------- */}

          <form onSubmit={handleSubmit} className="auth-form">
            
            {!isLogin && (
              <div className="input-group">
                <FontAwesomeIcon icon={faUser} className="input-icon" />
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Full Name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </div>
            )}

            <div className="input-group">
              <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
              <input 
                type="email" 
                name="email" 
                placeholder="Email Address" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="input-group">
              <FontAwesomeIcon icon={faLock} className="input-icon" />
              <input 
                type="password" 
                name="password" 
                placeholder="Password" 
                value={formData.password}
                onChange={handleChange}
                required 
              />
            </div>

            {!isLogin && (
              <div className="input-group">
                <FontAwesomeIcon icon={faLock} className="input-icon" />
                <input 
                  type="password" 
                  name="confirmPassword" 
                  placeholder="Confirm Password" 
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required 
                />
              </div>
            )}

            {isLogin && (
              <div className="forgot-password">
                <a href="#forgot">Forgot Password?</a>
              </div>
            )}

            <button type="submit" className="auth-submit-btn">
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}