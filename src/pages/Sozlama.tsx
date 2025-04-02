import "./Sozlama.css"
import BottomNav from '../components/BottomNav'
import PersonIcon from '@mui/icons-material/Person'
import NotificationsIcon from '@mui/icons-material/Notifications'
import SecurityIcon from '@mui/icons-material/Security'
import HelpIcon from '@mui/icons-material/Help'
import LogoutIcon from '@mui/icons-material/Logout'

function Sozlama() {
    const menuItems = [
        { icon: <PersonIcon />, label: 'Profil', onClick: () => {} },
        { icon: <NotificationsIcon />, label: 'Bildirishnomalar', onClick: () => {} },
        { icon: <SecurityIcon />, label: 'Xavfsizlik', onClick: () => {} },
        { icon: <HelpIcon />, label: 'Yordam', onClick: () => {} },
        { icon: <LogoutIcon />, label: 'Chiqish', onClick: () => {}, danger: true },
    ]

    return (
        <div className="sozlama-container">
            <div className="sozlama-header">
                <h1>Sozlama</h1>
            </div>
            
            <div className="sozlama-menu">
                {menuItems.map((item, index) => (
                    <div 
                        key={index} 
                        className={`menu-item ${item.danger ? 'danger' : ''}`}
                        onClick={item.onClick}
                    >
                        <div className="menu-icon">
                            {item.icon}
                        </div>
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>
            
            <BottomNav />
        </div>
    )
}

export default Sozlama 