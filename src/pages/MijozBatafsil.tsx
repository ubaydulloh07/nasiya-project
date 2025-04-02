import { useNavigate, useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './MijozBatafsil.css';

export const MijozBatafsil = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { payment, clientName } = location.state || {};

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('uz-UZ').format(amount);
  };

  return (
    <div className="batafsil-container">
      <header className="batafsil-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </button>
        <h1>Batafsil</h1>
        <button className="more-button">
          <MoreVertIcon />
        </button>
      </header>

      <div className="batafsil-content">
        <div className="info-group">
          <div className="info-row">
            <span className="label">Sana</span>
            <span className="value">{payment?.date || '-'}</span>
          </div>
          <div className="info-row">
            <span className="label">Soat</span>
            <span className="value">{payment?.date?.split(' ')[2] || '-'}</span>
          </div>
        </div>

        <div className="info-group">
          <div className="info-row">
            <span className="label">Muddat</span>
            <span className="value">12 oy</span>
          </div>
        </div>

        <div className="info-group">
          <div className="info-row">
            <span className="label">Summa miqdori</span>
            <span className="value">{formatAmount(payment?.amount || 0)} so'm</span>
          </div>
        </div>

        <div className="info-group">
          <div className="info-row">
            <span className="label">Eslatma</span>
            <span className="value">Iphone 14 Pro, boshlanģ'ich to'lovi bor.</span>
          </div>
        </div>

        <div className="rasm-section">
          <h3>Rasm biriktirish</h3>
          <div className="rasm-grid">
            <img src="/rasm1.jpg" alt="Mahsulot rasmi 1" className="rasm-item" />
            <img src="/rasm2.jpg" alt="Mahsulot rasmi 2" className="rasm-item" />
          </div>
        </div>
      </div>

      <button className="nasiya-button" onClick={() => console.log('Nasiya qo\'shish')}>
        Nasiyani so'ndirish
      </button>
    </div>
  );
}; 