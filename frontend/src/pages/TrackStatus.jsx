import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config';

function TrackStatus() {
  const [email, setEmail] = useState('');
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSearch = async (e) => {
    e?.preventDefault();
    const searchEmail = email || searchParams.get('email');
    if (!searchEmail) return;

    setLoading(true);
    setError('');
    setSearched(false);

    try {
      const res = await axios.get(
        `${API_URL}/api/leads/track/${searchEmail}`
      );
      setLeads(res.data);
      setSearched(true);
    } catch (err) {
      setError('No applications found with this email address.');
      setLeads([]);
      setSearched(true);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (status) => {
    const styles = {
      New:       { bg: '#eff6ff', color: '#1d4ed8', border: '#bfdbfe', icon: '🆕' },
      Contacted: { bg: '#fffbeb', color: '#b45309', border: '#fde68a', icon: '📞' },
      Converted: { bg: '#f0fdf4', color: '#166534', border: '#bbf7d0', icon: '✅' }
    };
    return styles[status] || styles.New;
  };

  const getProgressWidth = (status) => {
    const widths = { New: '33%', Contacted: '66%', Converted: '100%' };
    return widths[status] || '33%';
  };

  const getProgressColor = (status) => {
    const colors = { New: '#6366f1', Contacted: '#f59e0b', Converted: '#10b981' };
    return colors[status] || '#6366f1';
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at top left, #6366f1 0%, transparent 50%), radial-gradient(ellipse at bottom right, #8b5cf6 0%, transparent 50%), #0f172a',
      display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: '24px'
    }}>
      <div style={{
        background: 'white', borderRadius: '20px',
        padding: '48px 44px', width: '100%',
        maxWidth: '560px',
        boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
        animation: 'fadeInUp 0.4s ease'
      }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{
            width: '68px', height: '68px',
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            borderRadius: '16px', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            fontSize: '30px', margin: '0 auto 18px',
            boxShadow: '0 8px 20px rgba(245,158,11,0.4)'
          }}>🔍</div>
          <h2 style={{
            fontSize: '26px', fontWeight: '800',
            color: '#0f172a', marginBottom: '8px'
          }}>
            Track Your Application
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '15px' }}>
            Enter your email to check your application status
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="Enter the email you used to apply"
            />
          </div>
          <button
            className="btn-primary"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Track My Application 🔍'}
          </button>
        </form>

        {/* Error */}
        {error && (
          <div className="error-msg" style={{ marginTop: '20px' }}>
            ⚠️ {error}
          </div>
        )}

        {/* Results */}
        {searched && leads.length > 0 && (
          <div style={{ marginTop: '32px' }}>
            <h3 style={{
              fontSize: '16px', fontWeight: '700',
              color: '#1e293b', marginBottom: '16px'
            }}>
              Found {leads.length} application{leads.length > 1 ? 's' : ''}
            </h3>

            {leads.map((lead) => {
              const s = getStatusStyle(lead.status);
              return (
                <div key={lead._id} style={{
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '14px', padding: '24px',
                  marginBottom: '16px', background: '#fafbff'
                }}>
                  {/* Lead Header */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '16px',
                    flexWrap: 'wrap', gap: '8px'
                  }}>
                    <div>
                      <div style={{
                        fontWeight: '700', fontSize: '15px',
                        color: '#1e293b'
                      }}>
                        {lead.name}
                      </div>
                      <div style={{
                        fontSize: '12px', color: '#94a3b8',
                        marginTop: '3px'
                      }}>
                        Submitted {new Date(lead.createdAt)
                          .toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                      </div>
                    </div>
                    <div style={{
                      background: s.bg, color: s.color,
                      border: `1.5px solid ${s.border}`,
                      padding: '6px 14px', borderRadius: '20px',
                      fontSize: '13px', fontWeight: '700'
                    }}>
                      {s.icon} {lead.status}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '8px'
                    }}>
                      {['New', 'Contacted', 'Converted'].map((step) => (
                        <span key={step} style={{
                          fontSize: '11px', fontWeight: '600',
                          color: lead.status === step
                            ? getProgressColor(step)
                            : '#94a3b8'
                        }}>
                          {step}
                        </span>
                      ))}
                    </div>
                    <div style={{
                      height: '6px', background: '#e2e8f0',
                      borderRadius: '10px', overflow: 'hidden'
                    }}>
                      <div style={{
                        height: '100%',
                        width: getProgressWidth(lead.status),
                        background: getProgressColor(lead.status),
                        borderRadius: '10px',
                        transition: 'width 0.5s ease'
                      }} />
                    </div>
                  </div>

                  {/* Notes from admin */}
                  {lead.notes && (
                    <div style={{
                      background: 'white',
                      border: '1px solid #e2e8f0',
                      borderLeft: '4px solid #6366f1',
                      borderRadius: '0 10px 10px 0',
                      padding: '12px 16px'
                    }}>
                      <p style={{
                        fontSize: '11px', fontWeight: '700',
                        color: '#94a3b8', textTransform: 'uppercase',
                        letterSpacing: '0.8px', marginBottom: '6px'
                      }}>
                        Message from our team
                      </p>
                      <p style={{
                        fontSize: '14px', color: '#475569',
                        lineHeight: '1.6', margin: '0'
                      }}>
                        {lead.notes}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Back Button */}
        <div style={{ textAlign: 'center', marginTop: '28px' }}>
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

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default TrackStatus;