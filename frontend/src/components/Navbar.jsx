import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Navbar({ onMenuClick }) {
  const { admin } = useAuth();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button className="hamburger" onClick={onMenuClick}>☰</button>
        <div className="topbar-left">
          <h1>Dashboard</h1>
          <p>Welcome back, {admin?.username}! 👋</p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;