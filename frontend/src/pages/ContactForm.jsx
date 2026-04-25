import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ContactForm() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    source: 'Website', notes: ''
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post('http://localhost:5000/api/leads', form);
      setSuccess(true);
      setForm({
        name: '', email: '', phone: '',
        source: 'Website', notes: ''
      });
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-wrapper">
      <div className="contact-card">
        <div className="contact-header">
          <h2>📬 Contact Us</h2>
          <p>Fill the form and we'll get back to you shortly!</p>
        </div>

        {success && (
          <div className="success-msg">
            ✅ Message sent! We'll contact you soon.
          </div>
        )}
        {error && <div className="error-msg">⚠️ {error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name *</label>
            <input
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
              placeholder="Your full name"
            />
          </div>
          <div className="form-group">
            <label>Email Address *</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
              placeholder="your@email.com"
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              placeholder="+91 XXXXX XXXXX"
            />
          </div>
          <div className="form-group">
            <label>How did you find us?</label>
            <select
              value={form.source}
              onChange={e => setForm({ ...form, source: e.target.value })}
            >
              <option>Website</option>
              <option>Social Media</option>
              <option>Referral</option>
              <option>Email</option>
              <option>Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Message / Requirements</label>
            <textarea
              rows="3"
              value={form.notes}
              onChange={e => setForm({ ...form, notes: e.target.value })}
              placeholder="Tell us about your requirements..."
            />
          </div>

          <button
            className="btn-primary"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Message 🚀'}
          </button>
        </form>

        {/* Admin link - subtle, not obvious to customers */}
        <div style={{
          textAlign: 'center',
          marginTop: '24px',
          paddingTop: '20px',
          borderTop: '1px solid #e2e8f0'
        }}>
          <Link
            to="/login"
            style={{
              color: '#94a3b8',
              fontSize: '12px',
              textDecoration: 'none'
            }}
          >
            Admin Access
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;