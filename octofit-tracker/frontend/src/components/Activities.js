import React, { useEffect, useState } from 'react';
import { API_BASE } from '../index';

export default function Activities() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const fetchData = () => {
    setLoading(true);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
  console.log('Fetching Activities from', endpoint);

    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Activities response:', data);
        const list = Array.isArray(data) ? data : data.results || [];
        setItems(list);
      })
      .catch(err => console.error('Activities fetch error:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4">Activities</h2>
        <div>
          <button className="btn btn-outline-secondary me-2" onClick={fetchData} disabled={loading}>
            Refresh
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-body p-0">
          <table className="table table-striped mb-0">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Type</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it, idx) => (
                <tr key={it.id || idx}>
                  <th scope="row">{it.id || idx + 1}</th>
                  <td>{it.name || it.title || JSON.stringify(it)}</td>
                  <td>{it.type || it.category || '-'}</td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2" onClick={() => { setSelected(it); setModalOpen(true); }}>
                      Details
                    </button>
                    <a className="btn btn-sm btn-link" href={`${API_BASE}/activities/${it.id || ''}`} target="_blank" rel="noreferrer">
                      API
                    </a>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4">{loading ? 'Loading...' : 'No activities found'}</td>
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
                <h5 className="modal-title">Activity Details</h5>
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
