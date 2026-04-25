import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at top left, #6366f1 0%, transparent 50%), radial-gradient(ellipse at bottom right, #8b5cf6 0%, transparent 50%), #0f172a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* Background decoration */}
      <div style={{
        position: 'absolute', width: '500px', height: '500px',
        borderRadius: '50%', background: 'rgba(99,102,241,0.08)',
        top: '-150px', right: '-150px', pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', width: '350px', height: '350px',
        borderRadius: '50%', background: 'rgba(139,92,246,0.08)',
        bottom: '-100px', left: '-100px', pointerEvents: 'none'
      }} />

      {/* Logo */}
      <div style={{
        width: '72px', height: '72px',
        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        borderRadius: '20px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '32px', marginBottom: '24px',
        boxShadow: '0 8px 32px rgba(99,102,241,0.4)',
        animation: 'fadeInUp 0.4s ease'
      }}>
        📊
      </div>

      {/* Title */}
      <h1 style={{
        color: 'white', fontSize: '42px', fontWeight: '800',
        textAlign: 'center', marginBottom: '12px',
        letterSpacing: '-1px', lineHeight: '1.2',
        animation: 'fadeInUp 0.5s ease'
      }}>
        Mini CRM
      </h1>

      <p style={{
        color: 'rgba(255,255,255,0.6)', fontSize: '17px',
        textAlign: 'center', marginBottom: '56px',
        maxWidth: '400px', lineHeight: '1.6',
        animation: 'fadeInUp 0.6s ease'
      }}>
        Client Lead Management System —
        Track your business leads professionally
      </p>

      {/* Two Cards */}
      <div style={{
        display: 'flex', gap: '20px',
        flexWrap: 'wrap', justifyContent: 'center',
        width: '100%', maxWidth: '700px',
        animation: 'fadeInUp 0.7s ease'
      }}>

        {/* Customer Card */}
        <div
          onClick={() => navigate('/contact')}
          style={{
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '20px',
            padding: '36px 32px',
            flex: '1',
            minWidth: '260px',
            maxWidth: '320px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textAlign: 'center'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <div style={{
            width: '64px', height: '64px',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            borderRadius: '16px',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '28px',
            margin: '0 auto 20px',
            boxShadow: '0 8px 20px rgba(16,185,129,0.4)'
          }}>
            📬
          </div>
          <h2 style={{
            color: 'white', fontSize: '20px',
            fontWeight: '800', marginBottom: '10px'
          }}>
            Submit Inquiry
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.55)',
            fontSize: '14px', lineHeight: '1.6',
            marginBottom: '24px'
          }}>
            Fill out the contact form to get in touch with us.
            We'll respond within 24 hours.
          </p>
          <div style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: 'white', padding: '12px 24px',
            borderRadius: '10px', fontWeight: '700',
            fontSize: '14px', display: 'inline-block',
            boxShadow: '0 4px 12px rgba(16,185,129,0.4)'
          }}>
            Contact Us →
          </div>
        </div>

        {/* Track Status Card */}
        <div
          onClick={() => navigate('/track')}
          style={{
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '20px',
            padding: '36px 32px',
            flex: '1',
            minWidth: '260px',
            maxWidth: '320px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textAlign: 'center'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <div style={{
            width: '64px', height: '64px',
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            borderRadius: '16px',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '28px',
            margin: '0 auto 20px',
            boxShadow: '0 8px 20px rgba(245,158,11,0.4)'
          }}>
            🔍
          </div>
          <h2 style={{
            color: 'white', fontSize: '20px',
            fontWeight: '800', marginBottom: '10px'
          }}>
            Track Status
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.55)',
            fontSize: '14px', lineHeight: '1.6',
            marginBottom: '24px'
          }}>
            Already submitted? Check your application
            status using your email address.
          </p>
          <div style={{
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            color: 'white', padding: '12px 24px',
            borderRadius: '10px', fontWeight: '700',
            fontSize: '14px', display: 'inline-block',
            boxShadow: '0 4px 12px rgba(245,158,11,0.4)'
          }}>
            Check Status →
          </div>
        </div>

      </div>

      {/* Admin Link */}
      <div style={{
        marginTop: '48px',
        display: 'flex', alignItems: 'center', gap: '12px',
        animation: 'fadeInUp 0.8s ease'
      }}>
        <div style={{
          height: '1px', width: '60px',
          background: 'rgba(255,255,255,0.15)'
        }} />
        <button
          onClick={() => navigate('/login')}
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.5)',
            padding: '10px 20px',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: '600',
            fontFamily: 'inherit',
            transition: 'all 0.2s'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
            e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
          }}
        >
          🔐 Admin Panel
        </button>
        <div style={{
          height: '1px', width: '60px',
          background: 'rgba(255,255,255,0.15)'
        }} />
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

export default Landing;