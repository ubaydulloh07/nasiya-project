import "./Hisobot.css"
import BottomNav from '../components/BottomNav'

function Hisobot() {
    return (
        <div className="hisobot-container">
            <div className="hisobot-header">
                <h1>Hisobot</h1>
            </div>
            
            {/* Hisobot content */}
            <div className="hisobot-content">
                <div className="hisobot-card">
                    <h3>Umumiy mijozlar</h3>
                    <p className="count">24</p>
                </div>
                <div className="hisobot-card">
                    <h3>Umumiy summa</h3>
                    <p className="amount">12,500,000 so'm</p>
                </div>
                <div className="hisobot-card">
                    <h3>Bugungi to'lovlar</h3>
                    <p className="amount">1,500,000 so'm</p>
                </div>
            </div>
            
            <BottomNav />
        </div>
    )
}

export default Hisobot 