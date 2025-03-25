import { useState } from 'react';
import { IconButton } from '@mui/material';
import { Visibility, VisibilityOff, Home, People, Description, Settings } from '@mui/icons-material';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [isAmountVisible, setIsAmountVisible] = useState(true);
  const navigate = useNavigate();
  
  const mockData = {
    name: 'Testuchun',
    avatar: '/avatar.jpg',
    totalAmount: '135 214 200',
    walletAmount: '300 000',
    stats: {
      delayedPayments: 26,
      totalCustomers: 151
    }
  };

  const toggleAmountVisibility = () => {
    setIsAmountVisible(!isAmountVisible);
  };

  const formatAmount = (amount: string) => {
    return isAmountVisible ? amount : '*'.repeat(amount.length / 2);
  };

  const handleCalendarClick = () => {
    navigate('/calendar');
  };

  return (
    <div className="dashboard">
      <div className="container">
        <div className="content">
          {/* Header */}
          <header className="header">
            <div className="user-info">
              <img src="./user.png" alt="User avatar" className="avatar" />
              <span className="username">{mockData.name}</span>
            </div>
            <div className="calendar" onClick={handleCalendarClick}>
              <img src="./kalendar.png" alt="" />
            </div>
          </header>

          {/* Total Amount Card */}
          <div className="card total-amount">
            <span className="label">Umumiy nasiya:</span>
            <div className="amount-row">
              <h2 className="amount">{formatAmount(mockData.totalAmount)} so'm</h2>
              <IconButton 
                size="small" 
                className="visibility-icon"
                onClick={toggleAmountVisibility}
              >
                {isAmountVisible ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </div>
          </div>

          {/* Statistics */}
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-label">Kechiktirilgan to'lovlar</span>
              <h3 className="stat-value error">{mockData.stats.delayedPayments}</h3>
            </div>
            <div className="stat-card">
              <span className="stat-label">Mijozlar soni</span>
              <h3 className="stat-value primary">{mockData.stats.totalCustomers}</h3>
            </div>
          </div>

          {/* Wallet Section */}
          <section className="wallet-section">
            <h2 className="section-title">Hamyoningiz</h2>
            <div className="wallet-card">
              <div className="wallet-info">
                <div className="wallet-icon-wrapper">
                  <WalletIcon className="wallet-icon" />
                </div>
                <div className="wallet-balance">
                  <span className="balance-label">Hisobingizda</span>
                  <span className="balance-amount">{formatAmount(mockData.walletAmount)} so'm</span>
                </div>
              </div>
              <IconButton className="add-button">
                <span>+</span>
              </IconButton>
            </div>

            <div className="payment-status">
              <span className="status-label">Bu oy uchun to'lov:</span>
              <span className="status-value">To'lov qilingan</span>
            </div>
          </section>

          {/* Bottom Navigation */}
          <nav className="bottom-nav">
            <div className="nav-content">
              <IconButton className="nav-button active">
                <Home />
              </IconButton>
              <IconButton className="nav-button">
                <People />
              </IconButton>
              <IconButton className="nav-button">
                <Description />
              </IconButton>
              <IconButton className="nav-button">
                <Settings />
              </IconButton>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 