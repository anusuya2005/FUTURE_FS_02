import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function Dashboard() {
  const { token } = useAuth();
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [editLead, setEditLead] = useState(null);
  const [form, setForm] = useState({ status: '', notes: '' });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchLeads = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/leads', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLeads(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchLeads(); }, []);

  const openEdit = (lead) => {
    setEditLead(lead);
    setForm({ status: lead.status, notes: lead.notes || '' });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/leads/${editLead._id}`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditLead(null);
      fetchLeads();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this lead?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/leads/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchLeads();
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = leads.filter(l => {
    const matchSearch =
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'All' || l.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'New').length,
    contacted: leads.filter(l => l.status === 'Contacted').length,
    converted: leads.filter(l => l.status === 'Converted').length,
  };

  return (
    <div className="app-layout">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="main-content">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <div className="page-content">
          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-card total">
              <div className="stat-icon">📋</div>
              <div className="stat-info">
                <h3>{stats.total}</h3>
                <p>Total Leads</p>
              </div>
            </div>
            <div className="stat-card new">
              <div className="stat-icon">🆕</div>
              <div className="stat-info">
                <h3>{stats.new}</h3>
                <p>New Leads</p>
              </div>
            </div>
            <div className="stat-card contacted">
              <div className="stat-icon">📞</div>
              <div className="stat-info">
                <h3>{stats.contacted}</h3>
                <p>Contacted</p>
              </div>
            </div>
            <div className="stat-card converted">
              <div className="stat-icon">✅</div>
              <div className="stat-info">
                <h3>{stats.converted}</h3>
                <p>Converted</p>
              </div>
            </div>
          </div>

          {/* Leads Table */}
          <div className="leads-card">
            <div className="leads-card-header">
              <h2>All Leads ({filtered.length})</h2>
              <div className="leads-controls">
                <input
                  className="search-input"
                  placeholder="🔍 Search name or email..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                <select
                  className="filter-select"
                  value={filterStatus}
                  onChange={e => setFilterStatus(e.target.value)}
                >
                  <option>All</option>
                  <option>New</option>
                  <option>Contacted</option>
                  <option>Converted</option>
                </select>
              </div>
            </div>

            <div className="table-wrapper">
              {filtered.length === 0 ? (
                <div className="empty-state">
                  <div style={{ fontSize: '48px' }}>📭</div>
                  <p>No leads found.</p>
                </div>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Lead</th>
                      <th className="hide-mobile">Phone</th>
                      <th className="hide-mobile">Source</th>
                      <th>Status</th>
                      <th className="hide-mobile">Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(lead => (
                      <tr key={lead._id}>
                        <td>
                          <div className="lead-name">{lead.name}</div>
                          <div className="lead-email">{lead.email}</div>
                        </td>
                        <td className="hide-mobile">{lead.phone || '—'}</td>
                        <td className="hide-mobile">{lead.source}</td>
                        <td>
                          <span className={`badge ${lead.status}`}>
                            {lead.status === 'New' && '🆕'}
                            {lead.status === 'Contacted' && '📞'}
                            {lead.status === 'Converted' && '✅'}
                            {' '}{lead.status}
                          </span>
                        </td>
                        <td className="hide-mobile">
                          {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric', month: 'short', year: 'numeric'
                          })}
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="btn-edit"
                              onClick={() => openEdit(lead)}
                            >
                              ✏️ Edit
                            </button>
                            <button
                              className="btn-delete"
                              onClick={() => handleDelete(lead._id)}
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editLead && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Edit Lead</h3>
              <button
                className="modal-close"
                onClick={() => setEditLead(null)}
              >✕</button>
            </div>

            <div style={{
              background: '#f8fafc',
              padding: '12px 16px',
              borderRadius: '10px',
              marginBottom: '20px'
            }}>
              <div style={{ fontWeight: 600 }}>{editLead.name}</div>
              <div style={{ color: '#94a3b8', fontSize: '13px' }}>
                {editLead.email}
              </div>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                value={form.status}
                onChange={e => setForm({ ...form, status: e.target.value })}
              >
                <option>New</option>
                <option>Contacted</option>
                <option>Converted</option>
              </select>
            </div>

            <div className="form-group">
              <label>Follow-up Notes</label>
              <textarea
                rows="4"
                value={form.notes}
                onChange={e => setForm({ ...form, notes: e.target.value })}
                placeholder="e.g. Called client on 25 Apr, will follow up next week..."
              />
            </div>

            <div className="modal-buttons">
              <button
                className="btn-cancel"
                onClick={() => setEditLead(null)}
              >
                Cancel
              </button>
              <button className="btn-save" onClick={handleUpdate}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;