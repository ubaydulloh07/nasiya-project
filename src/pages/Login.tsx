import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Container, Paper, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MAX_ATTEMPTS = 3;
const BLOCK_DURATION = 60 * 1000; // 1 minute in milliseconds

// Default credentials
const DEFAULT_USERNAME = "admin";
const DEFAULT_PASSWORD = "12345";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockEndTime, setBlockEndTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }

    // Check if user is blocked from localStorage
    const storedBlockEndTime = localStorage.getItem('blockEndTime');
    if (storedBlockEndTime) {
      const endTime = parseInt(storedBlockEndTime);
      if (endTime > Date.now()) {
        setIsBlocked(true);
        setBlockEndTime(endTime);
      } else {
        localStorage.removeItem('blockEndTime');
        localStorage.removeItem('loginAttempts');
      }
    }

    // Get stored attempts
    const storedAttempts = localStorage.getItem('loginAttempts');
    if (storedAttempts) {
      setAttempts(parseInt(storedAttempts));
    }
  }, [navigate]);

  useEffect(() => {
    if (isBlocked && blockEndTime) {
      const timer = setInterval(() => {
        const now = Date.now();
        if (now >= blockEndTime) {
          setIsBlocked(false);
          setBlockEndTime(null);
          localStorage.removeItem('blockEndTime');
          localStorage.removeItem('loginAttempts');
          setAttempts(0);
          clearInterval(timer);
        } else {
          const seconds = Math.ceil((blockEndTime - now) / 1000);
          setTimeLeft(`${seconds} soniya`);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isBlocked, blockEndTime]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (isBlocked) {
      return;
    }

    // Check against default credentials
    if (username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD) {
      localStorage.setItem('token', 'mock-token-12345');
      localStorage.removeItem('loginAttempts');
      navigate('/dashboard');
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      localStorage.setItem('loginAttempts', newAttempts.toString());

      if (newAttempts >= MAX_ATTEMPTS) {
        const endTime = Date.now() + BLOCK_DURATION;
        setIsBlocked(true);
        setBlockEndTime(endTime);
        localStorage.setItem('blockEndTime', endTime.toString());
        setError('Kirish vaqtincha bloklandi. Iltimos, keyinroq qayta urinib ko\'ring.');
      } else {
        setError(`Login yoki parol xato. Qolgan urinishlar soni: ${MAX_ATTEMPTS - newAttempts}`);
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={3} sx={{ width: '100%', p: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
            Dasturga kirish
          </Typography>
          {isBlocked ? (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              <Typography variant="body1">
                Ko'p marta noto'g'ri urinish.
              </Typography>
              <Typography variant="body2">
                Iltimos, {timeLeft} kutib turing
              </Typography>
            </Alert>
          ) : (
            <>
              {error && (
                <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                  {error}
                </Alert>
              )}
              <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Login"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  sx={{ mb: 3 }}
                  disabled={isBlocked}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Parol"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ mb: 4 }}
                  disabled={isBlocked}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={isBlocked}
                  sx={{ 
                    mt: 2, 
                    mb: 3,
                    py: 1.5,
                    fontSize: '1.1rem',
                    backgroundColor: '#1976d2',
                    '&:hover': {
                      backgroundColor: '#1565c0'
                    }
                  }}
                >
                  Kirish
                </Button>
                <Typography variant="body1" color="text.secondary" align="center">
                  Dasturga kirish huquqiga ega bo'lish uchun administrator bilan bog'laning
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Login; 