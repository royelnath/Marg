import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser, faCircleExclamation, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export default function Sign() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate(); 
  const location = useLocation();
  const redirectMessage = location.state?.redirectMessage;
  
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotStep, setForgotStep] = useState(1);
  const [resetData, setResetData] = useState({ email: '', otp: '', newPassword: '' });

  const [inlineError, setInlineError] = useState('');
  const [popup, setPopup] = useState({ message: '', type: '' });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (inlineError) setInlineError('');
  };

  const clearFormsAndErrors = () => {
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setInlineError('');
    setPopup({ message: '', type: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInlineError('');
    setPopup({ message: '', type: '' });
    
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
          navigate('/'); 
        } else {
          setInlineError(data.message || "Invalid email or password.");
        }
      } catch {
        setPopup({ message: "Server error. Please ensure your backend is running.", type: "error" });
      }

    } else {
      if (formData.password !== formData.confirmPassword) {
        setInlineError("Passwords do not match!");
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
          // NEW: Trigger the success popup, switch to Login view, and clear the inputs
          setPopup({ message: "Account created successfully! Please sign in.", type: "success" });
          
          // 2. Switch to Login view
          setIsLogin(true); 
          
          // 3. Clear ONLY the form inputs and inline errors (leaving the popup alone!)
          setFormData({ name: '', email: '', password: '', confirmPassword: '' });
          setInlineError('');
        }
        // if (response.ok) {
        //   localStorage.setItem('userToken', data.token);
        //   localStorage.setItem('userName', data.name);
        //   navigate('/'); 
        // } else {
        //   setInlineError(data.message || "Registration failed.");
        // }
      } catch {
        setPopup({ message: "Server error. Please ensure your backend is running.", type: "error" });
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
        navigate('/'); 
      } else {
        setPopup({ message: "Google Login Failed: " + (data.message || "Unknown error."), type: "error" });
      }
    } catch (error) {
      console.error("Firebase Error:", error);
      setPopup({ message: "Could not complete Google Sign In. Please try again.", type: "error" });
    }
  };

  const handleForgotRequest = async (e) => {
    e.preventDefault();
    setInlineError('');
    try {
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetData.email })
      });
      const data = await response.json();
      if (response.ok) {
        setForgotStep(2); 
      } else {
        setInlineError(data.message);
      }
    } catch {
      setPopup({ message: "Server error. Please try again.", type: "error" });
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setInlineError('');
    try {
      const response = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: resetData.email, 
          otp: resetData.otp, 
          password: resetData.newPassword 
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setPopup({ message: "Password Reset Successful! You can now log in.", type: "success" }); 
        setIsForgotPassword(false); 
        setForgotStep(1);
        setResetData({ email: '', otp: '', newPassword: '' });
      } else {
        setInlineError(data.message);
      }
    } catch {
      setPopup({ message: "Server error. Please try again.", type: "error" });
    }
  };

  return (
    <div className="sign-page-container">
      
      {/* Custom Dynamic Popup Component */}
      {popup.message && (
        <div className="custom-popup-overlay">
          <div className="custom-popup-box">
            {popup.type === 'success' ? (
              <>
                <FontAwesomeIcon icon={faCheckCircle} className="popup-icon-success" />
                <h3 style={{ color: '#004d40' }}>Success!</h3>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faCircleExclamation} className="popup-icon-error" />
                <h3>Oops! Something went wrong.</h3>
              </>
            )}
            <p>{popup.message}</p>
            <button onClick={() => setPopup({ message: '', type: '' })} className="popup-close-btn">
              Close
            </button>
          </div>
        </div>
      )}

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
              setIsForgotPassword(false); 
              clearFormsAndErrors();
            }}
          >
            {isLogin ? "Create an Account" : "I already have an account"}
          </button>
        </div>

        <div className="auth-form-section">
          
          {isForgotPassword ? (
            <div className="auth-form">
              <h2>Reset Password</h2>
              <p style={{ marginBottom: '20px', color: '#666', fontSize: '0.9rem' }}>
                {forgotStep === 1 
                  ? "Enter your email address and we will send you a 6-digit verification code."
                  : `We sent a code to ${resetData.email}. Please enter it below.`}
              </p>

              {forgotStep === 1 && (
                <form onSubmit={handleForgotRequest}>
                  <div className="input-group">
                    <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      value={resetData.email}
                      onChange={(e) => setResetData({...resetData, email: e.target.value})}
                      required 
                    />
                  </div>
                  {inlineError && (
                    <div className="inline-error-message">
                      <FontAwesomeIcon icon={faCircleExclamation} style={{ marginRight: '8px' }} />
                      {inlineError}
                    </div>
                  )}
                  <button type="submit" className="auth-submit-btn">Send OTP Code</button>
                </form>
              )}

              {forgotStep === 2 && (
                <form onSubmit={handlePasswordReset}>
                  <div className="input-group">
                    <input 
                      type="text" 
                      placeholder="Enter 6-Digit OTP" 
                      maxLength="6"
                      value={resetData.otp}
                      onChange={(e) => setResetData({...resetData, otp: e.target.value.replace(/\s/g, '')})}
                      required 
                      style={{ letterSpacing: '5px', textAlign: 'center', fontWeight: 'bold' }}
                    />
                  </div>
                  <div className="input-group" style={{ marginTop: '15px' }}>
                    <FontAwesomeIcon icon={faLock} className="input-icon" />
                    <input 
                      type="password" 
                      placeholder="Enter New Password" 
                      value={resetData.newPassword}
                      onChange={(e) => setResetData({...resetData, newPassword: e.target.value})}
                      required 
                    />
                  </div>
                  {inlineError && (
                    <div className="inline-error-message">
                      <FontAwesomeIcon icon={faCircleExclamation} style={{ marginRight: '8px' }} />
                      {inlineError}
                    </div>
                  )}
                  <button type="submit" className="auth-submit-btn" style={{ marginTop: '15px' }}>Reset My Password</button>
                </form>
              )}

              <div className="auth-switch" style={{ marginTop: '20px', textAlign: 'center' }}>
                <button 
                  type="button" 
                  className="switch-btn" 
                  onClick={() => { setIsForgotPassword(false); setForgotStep(1); setInlineError(''); }}
                  style={{ background: 'none', border: 'none', color: '#004d40', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.9rem' }}
                >
                  Back to Sign In
                </button>
              </div>
            </div>
          ) : (

          <>
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

              {inlineError && (
                <div className="inline-error-message">
                  <FontAwesomeIcon icon={faCircleExclamation} style={{ marginRight: '8px' }} />
                  {inlineError}
                </div>
              )}

              {isLogin && (
                <div className="forgot-password" style={{ textAlign: 'right', marginBottom: '10px' }}>
                  <button 
                    type="button" 
                    onClick={() => { setIsForgotPassword(true); setInlineError(''); }}
                    style={{ background: 'none', border: 'none', color: '#004d40', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.85rem' }}
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              <button type="submit" className="auth-submit-btn">
                {isLogin ? 'Sign In' : 'Sign Up'}
              </button>
            </form>
          </>
          )}

        </div>
      </div>
    </div>
  );
}