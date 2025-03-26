import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowBack, ChevronLeft, ChevronRight } from '@mui/icons-material';
import './Calendar.css';

const Calendar = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  
  
  const totalAmount = "50 125 000";
  const payments = [
    { id: 1, name: "Avazbek Jahongirov", amount: "UZS 1 000 000" },
    { id: 2, name: "Otabek Sulaymonov", amount: "UZS 1 000 000" }
  ];
  const paymentDays = [1, 15, 22, 29];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
  };

  const generateCalendarDays = () => {
    const days = [];
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isWeekend = (day + firstDay) % 7 === 0 || (day + firstDay) % 7 === 1;
      const isToday = day === 1;
      const hasPayment = paymentDays.includes(day);
      const isSelected = selectedDay === day;
      
      days.push(
        <div 
          key={day} 
          className={`day ${isWeekend ? 'weekend' : ''} ${isToday ? 'active' : ''} ${hasPayment ? 'has-payment' : ''} ${isSelected ? 'selected' : ''}`}
          onClick={() => handleDayClick(day)}
        >
          {day < 10 ? `0${day}` : day}
        </div>
      );
    }

    return days;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    setSelectedDay(null);
  };

  const formatMonth = () => {
    return currentDate.toLocaleString('default', { month: 'long' });
  };

  return (
    <div className="kere">

    <div className="calendar-page">
      <header>
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowBack />
        </button>
        <h1>Kalendar</h1>
      </header>

      <div className="month-selector">
        <h2 className="month-year">
          {formatMonth()}, {currentDate.getFullYear()}
        </h2>
        <div className="month-navigation">
          <button className="nav-button prev" onClick={handlePrevMonth}>
            <ChevronLeft />
          </button>
          <button className="nav-button next" onClick={handleNextMonth}>
            <ChevronRight />
          </button>
        </div>
      </div>

      <section className="total-amount-section">
        <p className="total-amount-label">Oylik jami:</p>
        <p className="total-amount-2">{totalAmount} so'm</p>
      </section>

      <section className="calendar-grid">
        <div className="weekdays">
          <div>DU</div>
          <div>SE</div>
          <div>CH</div>
          <div>PA</div>
          <div>JU</div>
          <div>SH</div>
          <div>YA</div>
        </div>

        <div className="days">
          {generateCalendarDays()}
        </div>
      </section>

      <section className="summary-section">
        <h3 className="summary-label">1-Oktabr kuni to'lov kutilmoqda</h3>
        <div className="summary-items">
          {payments.map(payment => (
            <div key={payment.id} className="summary-item">
              <p className="name">{payment.name}</p>
              <p className="amount">{payment.amount}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
    </div>
  );
};

export default Calendar; 