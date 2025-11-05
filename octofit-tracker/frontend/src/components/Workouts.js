import React, { useEffect, useState } from 'react';
import { API_BASE } from '../index';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const fetchData = () => {
    setLoading(true);
    const endpoint = `${API_BASE}/workouts/`;
    console.log('Fetching Workouts from', endpoint);

    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Workouts response:', data);
        const list = Array.isArray(data) ? data : data.results || [];
        setWorkouts(list);
      })
      .catch(err => console.error('Workouts fetch error:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4">Workouts</h2>
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
                <th>Title</th>
                <th>Duration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((w, i) => (
                <tr key={w.id || i}>
                  <td>{w.id || i + 1}</td>
                  <td>{w.title || w.name || JSON.stringify(w)}</td>
                  <td>{w.duration || w.time || '-'}</td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2" onClick={() => { setSelected(w); setModalOpen(true); }}>Details</button>
                    <a className="btn btn-sm btn-link" href={`${API_BASE}/workouts/${w.id || ''}`} target="_blank" rel="noreferrer">API</a>
                  </td>
                </tr>
              ))}
              {workouts.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4">{loading ? 'Loading...' : 'No workouts found'}</td>
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
                <h5 className="modal-title">Workout Details</h5>
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
