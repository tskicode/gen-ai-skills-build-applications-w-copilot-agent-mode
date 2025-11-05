import React, { useEffect, useState } from 'react';
import { API_BASE } from '../index';

export default function Leaderboard() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const fetchData = () => {
    setLoading(true);
    const endpoint = `${API_BASE}/leaderboard/`;
    console.log('Fetching Leaderboard from', endpoint);

    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Leaderboard response:', data);
        const list = Array.isArray(data) ? data : data.results || [];
        setRows(list);
      })
      .catch(err => console.error('Leaderboard fetch error:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4">Leaderboard</h2>
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
                <th>Player</th>
                <th>Score</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.id || i}>
                  <td>{i + 1}</td>
                  <td>{r.display_name || r.name || JSON.stringify(r)}</td>
                  <td>{r.score ?? r.points ?? '-'}</td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2" onClick={() => { setSelected(r); setModalOpen(true); }}>Details</button>
                    <a className="btn btn-sm btn-link" href={`${API_BASE}/leaderboard/${r.id || ''}`} target="_blank" rel="noreferrer">API</a>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4">{loading ? 'Loading...' : 'No leaderboard entries'}</td>
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
                <h5 className="modal-title">Leaderboard Entry</h5>
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
