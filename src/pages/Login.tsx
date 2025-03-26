import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

// Default login credentials
const DEFAULT_USERNAME = "admin";
const DEFAULT_PASSWORD = "12345";
const MAX_ATTEMPTS = 3;
const BLOCK_DURATION = 30000;

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockEndTime, setBlockEndTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [showError, setShowError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isBlocked && blockEndTime) {
      const timer = setInterval(() => {
        const now = Date.now();
        if (now >= blockEndTime) {
          setIsBlocked(false);
          setBlockEndTime(null);
          setAttempts(0);
          setShowError(false);
          clearInterval(timer);
        } else {
          setTimeLeft(Math.ceil((blockEndTime - now) / 1000));
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isBlocked, blockEndTime]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isBlocked) return;

    if (username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD) {
    
      setAttempts(0);
      setShowError(false);
      navigate('/dashboard');
    } else {
    
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setShowError(true);

      if (newAttempts >= MAX_ATTEMPTS) {
        setIsBlocked(true);
        setBlockEndTime(Date.now() + BLOCK_DURATION);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <img src="/logo.png" alt="Logo" className="logo" />
        
        <h1>Dasturga kirish</h1>
        <p className="subtitle">Iltimos, tizimga kirish uchun login va parolingizni kiriting.</p>

        {showError && !isBlocked && (
          <div className="error-message">
            <p>Login yoki parol xato. Qolgan urinishlar soni: {MAX_ATTEMPTS - attempts}</p>
          </div>
        )}

        {isBlocked && (
          <div className="block-message">
            <p>Juda ko'p marta noto'g'ri urinish.</p>
            <p>Iltimos, {timeLeft} soniya kuting</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-wrapper">
              <img src="./user-login.png" alt="" className="input-icon" />
              <input
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isBlocked}
              />
            </div>
          </div>

          <div className="input-group">
            <div className="input-wrapper">
              <img src="./qulf.png" alt="" className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="12345"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isBlocked}
              />
              <button 
                type="button" 
                className="show-password"
                onClick={togglePasswordVisibility}
              >
                <img src="./Hide.png" alt="Show password" />
              </button>
            </div>
          </div>

          <Link to="/forgot-password" className="forgot-password">
            Parolni unutdingizmi?
          </Link>

          <button type="submit" className="login-button" disabled={isBlocked}>
            Kirish
          </button>
        </form>

        <p className="register-text">
          Hisobingiz yo'q bo'lsa, tizimga kirish huquqini olish uchun <span className="register-link">do'kon administratori</span> bilan bog'laning.
        </p>
      </div>
    </div>
  );
};

export default Login; 