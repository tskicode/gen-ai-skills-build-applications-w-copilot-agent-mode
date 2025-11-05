import React, { useEffect, useState } from 'react';
import { API_BASE } from '../index';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const fetchData = () => {
    setLoading(true);
    const endpoint = `${API_BASE}/users/`;
    console.log('Fetching Users from', endpoint);

    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Users response:', data);
        const list = Array.isArray(data) ? data : data.results || [];
        setUsers(list);
      })
      .catch(err => console.error('Users fetch error:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4">Users</h2>
        <div>
          <button className="btn btn-outline-secondary" onClick={fetchData} disabled={loading}>Refresh</button>
        </div>
      </div>

      <div className="card">
        <div className="card-body p-0">
          <table className="table table-striped mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={u.id || i}>
                  <td>{u.id || i + 1}</td>
                  <td>{u.username || u.name || JSON.stringify(u)}</td>
                  <td>{u.email || '-'}</td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2" onClick={() => { setSelected(u); setModalOpen(true); }}>Details</button>
                    <a className="btn btn-sm btn-link" href={`${API_BASE}/users/${u.id || ''}`} target="_blank" rel="noreferrer">API</a>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4">{loading ? 'Loading...' : 'No users found'}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="modal fade show" style={{ display: 'block' }} role="dialog" aria-modal="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">User Details</h5>
                <button type="button" className="btn-close" onClick={() => setModalOpen(false)} aria-label="Close" />
              </div>
              <div className="modal-body">
                <pre>{JSON.stringify(selected, null, 2)}</pre>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>Close</button>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" />
        </div>
      )}
    </div>
  );
}
