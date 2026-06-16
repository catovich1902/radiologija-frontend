import React, { useState } from 'react';
import { login } from '../api';

function Login({ onLogin, setStranica }) {
  const [forma, setForma] = useState({ username: '', password: '' });
  const [greska, setGreska] = useState('');
  const [ucitava, setUcitava] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGreska('');
    setUcitava(true);
    try {
      const res = await login(forma);
      onLogin(res.data);
    } catch (err) {
      setGreska(err.response?.data?.error || 'Greška pri prijavi.');
    } finally {
      setUcitava(false);
    }
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 440 }}>

        {/* LOGO */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, overflow: 'hidden', margin: '0 auto 16px' }}>
            <img src="/logo.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: 'var(--tamna)', letterSpacing: -0.5 }}>
            Dobrodošli nazad
          </h1>
          <p style={{ fontSize: 14, color: 'var(--tekst2)', marginTop: 6 }}>
            Prijavite se na vaš nalog
          </p>
        </div>

        <div className="form-card" style={{ padding: 36 }}>
          {greska && <div className="error-msg">{greska}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Korisničko ime</label>
              <input type="text" name="username" value={forma.username}
                onChange={(e) => setForma({ ...forma, username: e.target.value })}
                placeholder="Unesite korisničko ime" required />
            </div>
            <div className="form-group">
              <label>Lozinka</label>
              <input type="password" name="password" value={forma.password}
                onChange={(e) => setForma({ ...forma, password: e.target.value })}
                placeholder="Unesite lozinku" required />
            </div>
            <button type="submit" className="btn btn-primary btn-full"
              style={{ marginTop: 8, padding: 14, fontSize: 15 }} disabled={ucitava}>
              {ucitava ? 'Prijava...' : 'Prijavi se →'}
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0', color: '#979dac', fontSize: 13 }}>
            <div style={{ flex: 1, height: 1, background: '#e8eef8' }} />
            ili
            <div style={{ flex: 1, height: 1, background: '#e8eef8' }} />
          </div>

          <button className="btn btn-outline btn-full" onClick={() => setStranica('registracija')}>
            Kreiraj novi nalog
          </button>
        </div>

        <p style={{ textAlign: 'center', marginTop: 16, fontSize: 13 }}>
          <span style={{ color: 'var(--tamna)', cursor: 'pointer', fontWeight: 600 }}
            onClick={() => setStranica('zaboravljena-lozinka')}>
            Zaboravili ste lozinku?
          </span>
        </p>
        <p style={{ textAlign: 'center', marginTop: 8, fontSize: 13, color: 'var(--tekst2)' }}>
          Nemate nalog?{' '}
          <span style={{ color: 'var(--tamna)', cursor: 'pointer', fontWeight: 600 }}
            onClick={() => setStranica('registracija')}>
            Registrujte se
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;