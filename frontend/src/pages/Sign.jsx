import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export default function Sign() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate(); 
  const location = useLocation();
  const redirectMessage = location.state?.redirectMessage;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isLogin) {
      try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('userToken', data.token);
          localStorage.setItem('userName', data.name);
          
          alert(`Welcome back, ${data.name}!`);
          navigate('/');
        } else {
          alert("Login Failed: " + data.message);
        }
      } catch {
        alert("Server error. Ensure your backend is running.");
      }

    } else {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          alert("Registration Successful! Please sign in.");
          setIsLogin(true);
          setFormData({ name: '', email: '', password: '', confirmPassword: '' });
        } else {
          alert("Registration Failed: " + data.message);
        }
      } catch {
        alert("Server error. Ensure your backend is running.");
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);
      
      const response = await fetch('http://localhost:5000/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('userToken', data.token);
        localStorage.setItem('userName', data.name);
        alert(`Welcome, ${data.name}!`);
        navigate('/'); 
      } else {
        alert("Google Login Failed: " + data.message);
      }
    } catch (error) {
      console.error("Firebase Error:", error);
      alert("Could not complete Google Sign In.");
    }
  };

  return (
    <div className="sign-page-container">
      <div className="auth-card">
        
        <div className="auth-branding">
          {redirectMessage && (
            <div className="redirect-alert">
              {redirectMessage}
            </div>
          )}
          <h2>{isLogin ? 'Welcome Back!' : 'Join Marg'}</h2>
          <p>
            {isLogin 
              ? 'Sign in to continue mapping your unique career trajectory and accessing your personalized dashboard.'
              : 'Create an account to take our precision-based assessment and build a definitive roadmap for your future.'}
          </p>
          <button 
            type="button"
            className="toggle-mode-btn" 
            onClick={() => {
              setIsLogin(!isLogin);
              setFormData({ name: '', email: '', password: '', confirmPassword: '' });
            }}
          >
            {isLogin ? "Create an Account" : "I already have an account"}
          </button>
        </div>

        <div className="auth-form-section">
          <h2>{isLogin ? 'Sign In' : 'Create Account'}</h2>
          
          <button type="button" className="google-auth-btn" onClick={handleGoogleSignIn}>
            <FontAwesomeIcon icon={faGoogle} className="google-icon" />
            Continue with Google
          </button>

          <div className="auth-divider">
            <span>or continue with email</span>
          </div>

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