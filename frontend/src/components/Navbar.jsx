import { useAuth } from '../context/AuthContext';

function Navbar({ onMenuClick }) {
  const { admin } = useAuth();

  return (
    <div className="topbar">
      <div className="topbar-left">
        {/* Hamburger menu for mobile */}
        <button
          className="hamburger"
          onClick={onMenuClick}
          style={{ marginRight: '12px' }}
        >
          ☰
        </button>
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back, {admin?.username}! 👋</p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;