import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import OOrdinaciji from './components/OOrdinaciji';
import Login from './components/Login';
import Registracija from './components/Registracija';
import Zakazivanje from './components/Zakazivanje';
import PacijentDashboard from './components/PacijentDashboard';
import DoktorDashboard from './components/DoktorDashboard';
import PromenaLozinke from './components/PromenaLozinke';
import ZaboravljenaLozinka from './components/ZaboravljenaLozinka';
import ResetLozinke from './components/ResetLozinke';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [stranica, setStranica] = useState('home');
  const [korisnik, setKorisnik] = useState(null);
  const [resetParams, setResetParams] = useState(null);
  const [pokaziScroll, setPokaziScroll] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setKorisnik({
      token,
      user_type: localStorage.getItem('user_type'),
      ime: localStorage.getItem('ime'),
      prezime: localStorage.getItem('prezime'),
    });
  }, []);

  useEffect(() => {
    const parts = window.location.pathname.split('/');
    if (parts[1] === 'reset-lozinka' && parts.length >= 4) {
      setResetParams({ uid: parts[2], token: parts[3] });
      setStranica('reset-lozinka');
    }
  }, []);
  useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [stranica]);

  useEffect(() => {
    const handler = () => setPokaziScroll(window.scrollY > 300);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleLogin = (podaci) => {
    ['token', 'user_type', 'ime', 'prezime'].forEach(k => localStorage.setItem(k, podaci[k]));
    setKorisnik(podaci);
    setStranica(podaci.user_type === 'doktor' ? 'doktor-dashboard' : 'dashboard');
  };

  const handleLogout = () => {
    localStorage.clear();
    setKorisnik(null);
    setStranica('home');
  };

  const STRANICE = {
    'home': <Home setStranica={setStranica} />,
    'o-ordinaciji': <OOrdinaciji setStranica={setStranica} />,
    'login': <Login onLogin={handleLogin} setStranica={setStranica} />,
    'registracija': <Registracija onLogin={handleLogin} setStranica={setStranica} />,
    'zakazivanje': <Zakazivanje setStranica={setStranica} />,
    'dashboard': <PacijentDashboard setStranica={setStranica} />,
    'doktor-dashboard': <DoktorDashboard />,
    'zaboravljena-lozinka': <ZaboravljenaLozinka setStranica={setStranica} />,
    'promena-lozinke': <PromenaLozinke setStranica={setStranica} />,
    'reset-lozinka': <ResetLozinke setStranica={setStranica} resetParams={resetParams} />,
  };

  return (
    <div className="app">
      <Navbar korisnik={korisnik} setStranica={setStranica} onLogout={handleLogout} />
      <main className="main-content">
        {STRANICE[stranica] || STRANICE['home']}
      </main>
      <Footer setStranica={setStranica} />
      {pokaziScroll && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            position: 'fixed', bottom: 32, left: 32,
            width: 48, height: 48, background: 'var(--tamna)',
            color: '#fff', border: 'none', borderRadius: '50%',
            cursor: 'pointer', fontSize: 20, fontWeight: 700,
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            zIndex: 998, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>↑</button>
      )}
    </div>
  );
}

export default App;