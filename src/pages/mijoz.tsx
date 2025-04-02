import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FilterListIcon from '@mui/icons-material/FilterList';
import BottomNav from '../components/BottomNav';
import './mijoz.css';

interface Client {
    id: number;
    name: string;
    phone_number: string;
    jami_nasiya: string;
    is_favorite: boolean;
}

// Initial mock data
const initialMockClients: Client[] = [
    { id: 1, name: "Rahmatulloh Madraximov", phone_number: "+998 91 123 45 67", jami_nasiya: "-800000", is_favorite: true },
    { id: 2, name: "Lutfulloh To'rayev", phone_number: "+998 91 123 45 67", jami_nasiya: "-56861000", is_favorite: true },
    { id: 3, name: "Avazbek Solijonov", phone_number: "+998 91 123 45 67", jami_nasiya: "-14786000", is_favorite: false },
    { id: 4, name: "Madina Mavlonova", phone_number: "+998 91 123 45 67", jami_nasiya: "-14786000", is_favorite: false },
];

function Mijoz() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState('');
    const [clients, setClients] = useState<Client[]>(() => {
        const savedClients = localStorage.getItem('clients');
        return savedClients ? JSON.parse(savedClients) : initialMockClients;
    });

    // Add new client if coming from create page
    useEffect(() => {
        if (location.state?.newClient) {
            const newClient = location.state.newClient;
            setClients(prev => {
                // Check if client already exists
                const exists = prev.some(client => client.id === newClient.id);
                if (!exists) {
                    // Save to localStorage immediately
                    const updatedClients = [newClient, ...prev];
                    localStorage.setItem('clients', JSON.stringify(updatedClients));
                    return updatedClients;
                }
                return prev;
            });
            // Clear the navigation state
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location.state, navigate]);

    const toggleFavorite = (id: number, event: React.MouseEvent) => {
        event.stopPropagation(); // Prevent navigation when clicking favorite button
        setClients(prev => {
            const updated = prev.map(client => 
                client.id === id ? {...client, is_favorite: !client.is_favorite} : client
            );
            localStorage.setItem('clients', JSON.stringify(updated));
            return updated;
        });
    };

    const handleClientClick = (clientId: number) => {
        navigate(`/mijoz/${clientId}`);
    };

    const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.phone_number.includes(searchQuery)
    );

    return (
        <div className="mijoz-container">
            <div className="search-header">
                <div className="search-bar">
                    <SearchIcon />
                    <input
                        type="text"
                        placeholder="Mijozlarni qidirish..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className='search-mijoz'
                    />
                </div>
                <button className="filter-button">
                    <FilterListIcon />
                </button>
            </div>

            <div className="clients-list">
                {filteredClients.map(client => (
                    <div 
                        key={client.id} 
                        className="client-card"
                        onClick={() => handleClientClick(client.id)}
                    >
                        <div className="client-info">
                            <div className="client-details">
                                <div className="client-name-row">
                                    <h3>{client.name}</h3>
                                    <button 
                                        className="favorite-button"
                                        onClick={(e) => toggleFavorite(client.id, e)}
                                    >
                                        {client.is_favorite ? <StarIcon className="star-filled" /> : <StarBorderIcon />}
                                    </button>
                                </div>
                                <p className="phone">{client.phone_number}</p>
                                <p className="jami">Jami nasiya:</p>
                                <p className="amount">{new Intl.NumberFormat('uz-UZ').format(parseInt(client.jami_nasiya))} so'm</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button className="create-button" onClick={() => navigate('/mijoz-yaratish')}>
                Yaratish
            </button>

            <BottomNav />
        </div>
    );
}

export default Mijoz;