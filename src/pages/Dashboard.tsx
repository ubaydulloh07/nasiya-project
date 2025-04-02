import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import AddIcon from '@mui/icons-material/Add';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import './Dashboard.css';
import BottomNav from '../components/BottomNav';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAmountVisible, setIsAmountVisible] = useState(true);
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   localStorage.removeItem('authToken');
  //   localStorage.removeItem('userData');
  //   navigate('/login');
  // };

  // Mock data
  const mockData = {
    user: {
      name: "Rahmatulloh Madraximov",
      avatar: "./user.png"
    },
    totalAmount: "50 125 000",
    stats: {
      kechiktirilgan: "12",
      mijozlar: "156"
    },
    wallets: [
      {
        id: 1,
        name: "Asosiy hamyon",
        amount: "1 000 000",
        currency: "UZS",
        status: "paid"
      },
      {
        id: 2,
        name: "Qo'shimcha hamyon",
        amount: "500 000",
        currency: "UZS",
        status: "pending"
      }
    ]
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
          <img src='./user.png' alt="Profile" className="profile-image" />
          <span>{mockData.user.name}</span>
        </div>

        <div className="calendar-icon" onClick={() => navigate('/calendar')}>
          <CalendarTodayOutlinedIcon />
        </div>
      </div>

      {/* Total Amount Card */}
      <div className="total-amount-card">
        <div className="pul">
          {formatAmount(mockData.totalAmount)} so'm
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
        {mockData.wallets.map(wallet => (
          <div key={wallet.id} className="wallet-card">
            <div className="wallet-info">
              <div className="wallet-icon">
                <AccountBalanceWalletOutlinedIcon />
              </div>
              <div className="wallet-details">
                <p className="wallet-label">{wallet.name}</p>
                <p className="wallet-amount">{formatAmount(wallet.amount)} {wallet.currency}</p>
              </div>
            </div>
            <div className="payment-status">
              <p className={`status-${wallet.status}`}>
                {wallet.status === 'paid' ? 'Tolandi' : 'Kutilmoqda'}
              </p>
              <button className="add-button">
                <AddIcon />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
     
     <BottomNav />
     
    </div>
  );
};

export default Dashboard; 

