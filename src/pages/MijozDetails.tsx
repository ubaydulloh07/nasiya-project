import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './MijozDetails.css';

interface Payment {
  id: number;
  date: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending';
}

export const MijozDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Mock data - keyinchalik API dan olinadi
  const clientData = {
    name: "Avazbek Solijonov",
    totalDebt: 14786000,
    payments: [
      {
        id: 1,
        date: "Noy 1, 2024 14:51",
        amount: 5845000,
        dueDate: "07.11.2024",
        status: 'pending'
      },
      {
        id: 2,
        date: "Iyl 09, 2024 14:51",
        amount: 8941000,
        dueDate: "01.12.2024",
        status: 'pending'
      },
      {
        id: 3,
        date: "Iyl 09, 2024 14:51",
        amount: 0,
        dueDate: "",
        status: 'pending'
      }
    ] as Payment[]
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('uz-UZ').format(amount);
  };

  const handlePaymentClick = (payment: Payment) => {
    navigate(`/mijoz/${id}/batafsil`, { 
      state: { 
        payment,
        clientName: clientData.name
      } 
    });
  };

  const handleEditClient = () => {
    // Mijozni tahrirlash sahifasiga o'tish
    navigate(`/mijoz-yaratish`, { state: { clientToEdit: clientData, clientId: id } });
    setShowMenu(false);
  };

  const handleDeleteClient = () => {
    // O'chirish konfirmatsiyasini ko'rsatish
    setShowMenu(false);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteClient = () => {
    // Mijozni o'chirish logikasi
    const savedClients = localStorage.getItem('clients');
    if (savedClients) {
      const clients = JSON.parse(savedClients);
      const updatedClients = clients.filter((client: any) => client.id !== Number(id));
      localStorage.setItem('clients', JSON.stringify(updatedClients));
    }
    
    // Mijozlar ro'yxatiga qaytish
    navigate('/mijozlar');
    setShowDeleteConfirm(false);
  };

  return (
    <div className="mijoz-details">
      <header className="details-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </button>
        <h1>{clientData.name}</h1>
        <div className="header-actions">
          <button 
            className="favorite-button"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            {isFavorite ? <StarIcon /> : <StarBorderIcon />}
          </button>
          <div className="menu-container">
            <button 
              className="more-button"
              onClick={() => setShowMenu(!showMenu)}
            >
              <MoreVertIcon />
            </button>
            
            {showMenu && (
              <div className="menu-dropdown">
                <button className="menu-item" onClick={handleEditClient}>
                  <EditIcon />
                  <span>Tahrirlash</span>
                </button>
                <button className="menu-item delete" onClick={handleDeleteClient}>
                  <DeleteIcon />
                  <span>O'chirish</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="total-debt">
        <p>Umumiy nasiya:</p>
        <h2>{formatAmount(clientData.totalDebt)} so'm</h2>
      </div>

      <div className="payments-section">
        <h3>Faol nasiyalar</h3>
        <div className="payments-list">
          {clientData.payments.map((payment) => (
            <div 
              key={payment.id} 
              className="payment-item"
              onClick={() => handlePaymentClick(payment)}
            >
              <div className="payment-date">{payment.date}</div>
              <div className="payment-amount">
                {formatAmount(payment.amount)} so'm
              </div>
              {payment.dueDate && (
                <div className="payment-progress">
                  <div className="progress-label">
                    Keyingi to'lov: {payment.dueDate}
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: '30%' }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <button className="add-payment" onClick={() => navigate('/mijoz-yaratish')}>
        <AddIcon />
        Qo'shish
      </button>

      {/* O'chirish konfirmatsiya modali */}
      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Mijozni o'chirish</h3>
            <p>Haqiqatan ham bu mijozni o'chirmoqchimisiz?</p>
            <div className="modal-actions">
              <button 
                className="cancel-button"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Bekor qilish
              </button>
              <button 
                className="confirm-button"
                onClick={confirmDeleteClient}
              >
                O'chirish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

 