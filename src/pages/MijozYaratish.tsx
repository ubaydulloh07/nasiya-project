import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import './MijozYaratish.css';

const generateNewId = () => {
  const clients = localStorage.getItem('clients') ? JSON.parse(localStorage.getItem('clients')!) : [];
  return clients.length > 0 ? Math.max(...clients.map((client: any) => client.id)) + 1 : 1;
};

const MijozYaratish = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const clientToEdit = location.state?.clientToEdit;
  const clientId = location.state?.clientId;
  const isEditing = !!clientToEdit;

  const [formData, setFormData] = useState({
    name: '',
    phone_number: '',
    jami_nasiya: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  // Agar tahrirlash rejimida bo'lsa, formani to'ldirish
  useEffect(() => {
    if (clientToEdit) {
      setFormData({
        name: clientToEdit.name || '',
        phone_number: clientToEdit.phone_number || '',
        jami_nasiya: clientToEdit.jami_nasiya?.toString() || ''
      });
    }
  }, [clientToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // API so'rovini simulyatsiya qilish (keyinchalik API bilan ishlaganda o'zgartiriladi)
    setTimeout(() => {
      // LocalStorage dan mijozlar ro'yxatini olish
      const existingClients = localStorage.getItem('clients')
        ? JSON.parse(localStorage.getItem('clients')!)
        : [];

      if (isEditing && clientId) {
        // Mijozni yangilash
        const updatedClients = existingClients.map((client: any) => {
          if (client.id === Number(clientId)) {
            return {
              ...client,
              name: formData.name,
              phone_number: formData.phone_number,
              jami_nasiya: formData.jami_nasiya
            };
          }
          return client;
        });
        
        // Yangilangan ro'yxatni saqlash
        localStorage.setItem('clients', JSON.stringify(updatedClients));
        
        // Mijoz ma'lumotlari sahifasiga qaytish
        navigate(`/mijoz/${clientId}`);
      } else {
        // Yangi mijoz yaratish
        const newClient = {
          id: generateNewId(),
          name: formData.name,
          phone_number: formData.phone_number,
          jami_nasiya: formData.jami_nasiya,
          is_favorite: false
        };

        // LocalStorage ga saqlash
        localStorage.setItem('clients', JSON.stringify([newClient, ...existingClients]));
        
        // Mijozlar ro'yxatiga qaytish
        navigate('/mijozlar', { state: { newClient } });
      }

      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="mijoz-yaratish">
      <header className="form-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </button>
        <h1>{isEditing ? 'Mijozni tahrirlash' : 'Mijoz yaratish'}</h1>
      </header>

      <form onSubmit={handleSubmit}>
        <div className="photo-upload">
          <div className="upload-placeholder">
            <AddPhotoAlternateIcon />
            <span>Rasm qo'shish</span>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="name">To'liq ism</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Ism familiya"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone_number">Telefon raqami</label>
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            placeholder="+998 _ _  _ _ _  _ _  _ _"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="jami_nasiya">Nasiya summasi</label>
          <input
            type="text"
            id="jami_nasiya"
            name="jami_nasiya"
            placeholder="0 so'm"
            value={formData.jami_nasiya}
            onChange={handleChange}
            required
          />
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={isLoading}
        >
          {isLoading ? 'Saqlanmoqda...' : isEditing ? 'Saqlash' : 'Yaratish'}
        </button>
      </form>
    </div>
  );
};

export default MijozYaratish; 