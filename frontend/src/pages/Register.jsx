import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [error, setError] = useState('');
  const [adminExists, setAdminExists] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Check if any admin already exists
  useEffect(() => {
    axios.get('http://localhost:5000/api/auth/check')
      .then(res => setAdminExists(res.data.exists))
      .catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const payload = { username, password };
      if (adminExists) payload.secretKey = secretKey;

      const res = await axios.post(
        'http://localhost:5000/api/auth/register',
        payload
      );
      login(res.data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-logo">📊</div>
        <h2>Create Admin</h2>
        <p className="auth-subtitle">Mini CRM — Lead Management System</p>

        {adminExists && (
          <div className="secret-key-info">
            🔒 An admin already exists. You need the <strong>Secret Key</strong> to create another admin account.
          </div>
        )}

        {error && <div className="error-msg">⚠️ {error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              placeholder="Choose a username"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="Choose a strong password"
            />
          </div>
          {adminExists && (
            <div className="form-group">
              <label>Secret Key</label>
              <input
                type="password"
                value={secretKey}
                onChange={e => setSecretKey(e.target.value)}
                required
                placeholder="Enter organisation secret key"
              />
            </div>
          )}
          <button className="btn-primary" type="submit">
            Create Account
          </button>
        </form>

        <div className="auth-link">
          Already have account? <Link to="/login">Login here</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;