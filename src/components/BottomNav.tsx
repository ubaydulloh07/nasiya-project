import { useNavigate, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import FolderIcon from '@mui/icons-material/Folder';
import SettingsIcon from '@mui/icons-material/Settings';
import './BottomNav.css';

const BottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { path: '/', label: 'Asosiy', icon: <HomeIcon /> },
        { path: '/mijozlar', label: 'Mijozlar', icon: <GroupIcon /> },
        { path: '/hisobot', label: 'Hisobot', icon: <FolderIcon /> },
        { path: '/sozlama', label: 'Sozlama', icon: <SettingsIcon /> }
    ];

    return (
        <div className="bottom-nav">
            {navItems.map((item) => (
                <div
                    key={item.path}
                    className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                    onClick={() => navigate(item.path)}
                >
                    {item.icon}
                    <span>{item.label}</span>
                </div>
            ))}
        </div>
    );
};

export default BottomNav; 