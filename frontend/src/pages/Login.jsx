import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import API_URL from '../config';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [adminExists, setAdminExists] = useState(true);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Check if any admin exists
  useEffect(() => {
    axios.get(`${API_URL}/api/auth/check`)
      .then(res => setAdminExists(res.data.exists))
      .catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post(
        `${API_URL}/api/auth/login`,
        { username, password }
      );
      login(res.data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">

        <div className="auth-logo">🔐</div>
        <h2>Admin Login</h2>
        <p className="auth-subtitle">
          Mini CRM — Lead Management System
        </p>

        {error && <div className="error-msg">⚠️ {error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <button
            className="btn-primary"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Logging in...' : '🔐 Login to Dashboard'}
          </button>
        </form>

        {/* Only show if no admin exists yet */}
        {!adminExists && (
          <div className="secret-key-info" style={{ marginTop: '20px' }}>
            👋 First time here? &nbsp;
            <Link
              to="/register"
              style={{ color: '#4f46e5', fontWeight: '700' }}
            >
              Setup Admin Account →
            </Link>
          </div>
        )}

        {/* Back to home */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'none', border: 'none',
              color: '#94a3b8', cursor: 'pointer',
              fontSize: '14px', fontFamily: 'inherit',
              fontWeight: '500'
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#6366f1'}
            onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
          >
            ← Back to Home
          </button>
        </div>

      </div>
    </div>
  );
}

export default Login;