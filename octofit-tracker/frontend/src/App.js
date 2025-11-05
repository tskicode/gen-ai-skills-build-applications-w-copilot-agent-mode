import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function Home() {
  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h1 className="h3 card-title">OctoFit Tracker</h1>
          <p className="card-text">Welcome to the frontend. Use the navigation to view resources.</p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary app-navbar">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src={process.env.PUBLIC_URL + '/octofitapp-small.svg'} alt="OctoFit" className="app-logo me-2" />
            <span className="app-title">OctoFit</span>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu" aria-controls="navMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navMenu">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link" to="/activities">Activities</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/workouts">Workouts</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/teams">Teams</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/users">Users</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/leaderboard">Leaderboard</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
