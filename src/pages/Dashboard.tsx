import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import AddIcon from '@mui/icons-material/Add';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import './Dashboard.css';
import BottomNav from '../components/BottomNav';

interface UserProfile {
  id: string;
  login: string;
  phone_number: string;
  wallet: string;
  image: string | null;
  pin_code: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAmountVisible, setIsAmountVisible] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('Authentication token not found');
        }
        
        const response = await fetch('https://nasiya.takedaservice.uz/api/auth/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkMTQwYmYzMC1lNjc1LTRkMDgtOTJiNC01YTJiN2RjMTE0YzMiLCJsb2dpbiI6InNtYXJ0IiwiaXNfYWN0aXZlIjp0cnVlLCJpYXQiOjE3NDM2MDA3MzYsImV4cCI6MTc0NjE5MjczNn0.i4tIY3wVZP-0sYcv8Xo09WMpsxdDPjoSTkJWheFdHVI`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch user profile');
        }
        
        setUserProfile(data.data);
      } catch (err: any) {
        setError(err.message || 'Ma\'lumotlarni yuklashda xatolik yuz berdi');
        console.error('Error fetching user profile:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserProfile();
  }, []);

  // Mock data for stats and wallets (can be replaced with API calls later)
  const mockData = {
    stats: {
      kechiktirilgan: "12",
      mijozlar: "156"
    }
  };

  const formatAmount = (amount: string) => {
    return new Intl.NumberFormat('uz-UZ').format(parseInt(amount.replace(/\s/g, '')));
  };

  if (isLoading) {
    return (
      <div className="dashboard-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Ma'lumotlar yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-container">
          <div className="error-message">{error}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="retry-button"
            disabled={isLoading}
          >
            Qayta urinish
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="user-profile">
          <img src={userProfile?.image || './user.png'} alt="Profile" className="profile-image" />
          <span>{userProfile?.login || 'Foydalanuvchi'}</span>
        </div>

        <div className="calendar-icon" onClick={() => navigate('/calendar')}>
          <CalendarTodayOutlinedIcon />
        </div>
      </div>

      {/* Total Amount Card */}
      <div className="total-amount-card">
        <div className="pul">
          {isAmountVisible ? formatAmount(userProfile?.wallet || "0") : '********'} so'm
        </div>
        <div className="subtitle">Umumiy nasiya:</div>
        <div 
          className="visibility-icon"
          onClick={() => setIsAmountVisible(!isAmountVisible)}
        >
          {isAmountVisible ? 
            <VisibilityOutlinedIcon /> : 
            <VisibilityOffOutlinedIcon />
          }
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stat-item">
          <div className="stat-label">Kechiktirilgan to'lovlar</div>
          <div className="stat-value red">{mockData.stats.kechiktirilgan}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Mijozlar soni</div>
          <div className="stat-value green">{mockData.stats.mijozlar}</div>
        </div>
      </div>

      {/* Wallet Section */}
      <h2 className="wallet-title">Hamyoningiz</h2>
      <div className="wallet-section">
        <div className="wallet-card">
          <div className="wallet-info">
            <div className="wallet-icon">
              <AccountBalanceWalletOutlinedIcon />
            </div>
            <div className="wallet-details">
              <p className="wallet-label">Asosiy hamyon</p>
              <p className="wallet-amount">{formatAmount(userProfile?.wallet || "0")} UZS</p>
            </div>
          </div>
          <div className="payment-status">
            <p className="status-active">Aktiv</p>
            <button className="add-button">
              <AddIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
     
    </div>
  );
};

export default Dashboard; 

