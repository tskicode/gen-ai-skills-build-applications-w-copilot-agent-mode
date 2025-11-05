import React, { useEffect, useState } from 'react';
import { API_BASE } from '../index';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const fetchData = () => {
    setLoading(true);
    const endpoint = `${API_BASE}/teams/`;
    console.log('Fetching Teams from', endpoint);

    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Teams response:', data);
        const list = Array.isArray(data) ? data : data.results || [];
        setTeams(list);
      })
      .catch(err => console.error('Teams fetch error:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4">Teams</h2>
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
                <th>Name</th>
                <th>Members</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((t, i) => (
                <tr key={t.id || i}>
                  <td>{t.id || i + 1}</td>
                  <td>{t.name || JSON.stringify(t)}</td>
                  <td>{(t.members && t.members.length) ?? t.member_count ?? '-'}</td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2" onClick={() => { setSelected(t); setModalOpen(true); }}>Details</button>
                    <a className="btn btn-sm btn-link" href={`${API_BASE}/teams/${t.id || ''}`} target="_blank" rel="noreferrer">API</a>
                  </td>
                </tr>
              ))}
              {teams.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4">{loading ? 'Loading...' : 'No teams found'}</td>
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
                <h5 className="modal-title">Team Details</h5>
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
