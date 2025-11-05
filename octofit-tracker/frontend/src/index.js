import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';

// Construct API base URL from environment variable set at build/run time.
// If REACT_APP_CODESPACE_NAME is provided, use the Codespace-hosted URL
// otherwise default to a relative /api path for local development.
const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
export const API_BASE = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : '/api';

// Expose for debugging in the browser console and for non-module code.
window.OCTOFIT_API_BASE = API_BASE;
console.log('OctoFit API base URL:', API_BASE);

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
