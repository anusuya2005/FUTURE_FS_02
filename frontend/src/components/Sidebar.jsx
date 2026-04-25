import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Sidebar({ isOpen, onClose }) {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const initial = admin?.username?.charAt(0).toUpperCase();

  return (
    <>
      {/* Dark overlay on mobile */}
      <div
        className={`sidebar-overlay ${isOpen ? 'active' : ''}`}
        onClick={onClose}
      />

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* Logo */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span>📊</span> Mini CRM
          </div>
          <div className="sidebar-subtitle">Lead Management System</div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <div className="nav-label">Main Menu</div>

          <div className="nav-item active">
            <span className="nav-icon">🏠</span>
            Dashboard
          </div>

          <div
            className="nav-item"
            onClick={() => { navigate('/'); onClose(); }}
          >
            <span className="nav-icon">📬</span>
            Contact Form
          </div>
        </nav>

        {/* Admin Info + Logout */}
        <div className="sidebar-footer">
          <div className="admin-info">
            <div className="admin-avatar">{initial}</div>
            <div>
              <div className="admin-name">{admin?.username}</div>
              <div className="admin-role">Administrator</div>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;