import React, { useState } from 'react';
import { zaboravljenaLozinka } from '../api';

function ZaboravljenaLozinka({ setStranica }) {
  const [email, setEmail] = useState('');
  const [greska, setGreska] = useState('');
  const [ucitava, setUcitava] = useState(false);
  const [poslato, setPoslato] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGreska('');
    setUcitava(true);
    try {
      await zaboravljenaLozinka({ email });
      setPoslato(true);
    } catch {
      setGreska('Greška pri slanju emaila. Pokušajte ponovo.');
    } finally {
      setUcitava(false);
    }
  };

  const Ikona = ({ emoji }) => (
    <div style={{ width: 80, height: 80, background: 'linear-gradient(135deg, var(--plava3), var(--plava2))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, margin: '0 auto 24px' }}>
      {emoji}
    </div>
  );

  if (poslato) return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', maxWidth: 440 }}>
        <Ikona emoji="✉︎" />
        <h2 style={{ fontSize: 26, fontWeight: 600, color: 'var(--tamna)', fontFamily: 'Fraunces, serif', marginBottom: 12 }}>Email je poslat!</h2>
        <p style={{ color: 'var(--tekst2)', fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>
          Ako email postoji u sistemu, poslaćemo vam link za reset lozinke. Proverite inbox i spam folder.
        </p>
        <div style={{ background: 'var(--plava4)', border: '1px solid rgba(141,188,199,0.3)', borderRadius: 16, padding: 20, marginBottom: 28, textAlign: 'left' }}>
          <p style={{ fontSize: 13, color: 'var(--tekst2)', lineHeight: 1.7 }}>
            ✉︎ Poslato na: <strong style={{ color: 'var(--tamna)' }}>{email}</strong><br />
            ⏱ Link važi <strong style={{ color: 'var(--tamna)' }}>24 sata</strong><br />
            🗁 Proverite i <strong style={{ color: 'var(--tamna)' }}>spam folder</strong>
          </p>
        </div>
        <button className="btn btn-primary btn-full" onClick={() => setStranica('login')}>Nazad na prijavu</button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 64, height: 64, background: 'linear-gradient(135deg, var(--plava2), var(--plava1))', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto 16px' }}>🔒︎</div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: 'var(--tamna)', fontFamily: 'Fraunces, serif' }}>Zaboravili ste lozinku?</h1>
          <p style={{ fontSize: 14, color: 'var(--tekst2)', marginTop: 8 }}>Unesite email i poslaćemo vam link za reset.</p>
        </div>

        <div className="form-card">
          {greska && <div className="error-msg">{greska}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email adresa</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vas@email.com" required />
            </div>
            <button type="submit" className="btn btn-primary btn-full" style={{ padding: 14, fontSize: 15 }} disabled={ucitava}>
              {ucitava ? 'Slanje...' : 'Pošalji link za reset →'}
            </button>
          </form>
          <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: 'var(--tekst2)' }}>
            Sećate se lozinke?{' '}
            <span style={{ color: 'var(--tamna)', cursor: 'pointer', fontWeight: 700 }} onClick={() => setStranica('login')}>
              Prijavite se
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ZaboravljenaLozinka;