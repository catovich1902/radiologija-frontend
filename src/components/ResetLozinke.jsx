import React, { useState } from 'react';
import { resetLozinke } from '../api';

function ResetLozinke({ setStranica, resetParams }) {
  const [novaLozinka, setNovaLozinka] = useState('');
  const [ponovoLozinka, setPonovoLozinka] = useState('');
  const [greska, setGreska] = useState('');
  const [ucitava, setUcitava] = useState(false);
  const [uspeh, setUspeh] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGreska('');
    if (novaLozinka !== ponovoLozinka) return setGreska('Lozinke se ne poklapaju!');
    if (novaLozinka.length < 6) return setGreska('Lozinka mora imati minimum 6 karaktera!');

    setUcitava(true);
    try {
      await resetLozinke({ uid: resetParams?.uid, token: resetParams?.token, nova_lozinka: novaLozinka });
      setUspeh(true);
    } catch (err) {
      setGreska(err.response?.data?.error || 'Greška pri resetovanju lozinke.');
    } finally {
      setUcitava(false);
    }
  };

  const ikonaCentar = (ikona) => (
    <div style={{ width: 80, height: 80, background: 'linear-gradient(135deg, var(--plava3), var(--plava2))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, margin: '0 auto 24px' }}>
      {ikona}
    </div>
  );

  if (!resetParams?.uid || !resetParams?.token) return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        {ikonaCentar('✗')}
        <h2 style={{ color: 'var(--tamna)', fontFamily: 'Fraunces, serif' }}>Nevažeći link</h2>
        <p style={{ color: 'var(--tekst2)', marginTop: 8, marginBottom: 24 }}>Link je istekao ili je nevažeći.</p>
        <button className="btn btn-primary" onClick={() => setStranica('zaboravljena-lozinka')}>Traži novi link</button>
      </div>
    </div>
  );

  if (uspeh) return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', maxWidth: 400 }}>
        {ikonaCentar('✔')}
        <h2 style={{ fontSize: 26, fontWeight: 600, color: 'var(--tamna)', fontFamily: 'Fraunces, serif', marginBottom: 12 }}>Lozinka promenjena!</h2>
        <p style={{ color: 'var(--tekst2)', fontSize: 15, marginBottom: 28 }}>Možete se prijaviti sa novom lozinkom.</p>
        <button className="btn btn-primary btn-full" onClick={() => setStranica('login')}>Prijavi se →</button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 64, height: 64, background: 'linear-gradient(135deg, var(--plava2), var(--plava1))', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto 16px' }}>🔒︎</div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: 'var(--tamna)', fontFamily: 'Fraunces, serif' }}>Nova lozinka</h1>
          <p style={{ fontSize: 14, color: 'var(--tekst2)', marginTop: 8 }}>Unesite vašu novu lozinku</p>
        </div>

        <div className="form-card">
          {greska && <div className="error-msg">{greska}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nova lozinka</label>
              <input type="password" value={novaLozinka}
                onChange={(e) => setNovaLozinka(e.target.value)}
                placeholder="Minimum 6 karaktera" required />
            </div>
            <div className="form-group">
              <label>Ponovite lozinku</label>
              <input type="password" value={ponovoLozinka}
                onChange={(e) => setPonovoLozinka(e.target.value)}
                placeholder="Unesite lozinku ponovo" required />
            </div>
            <button type="submit" className="btn btn-primary btn-full"
              style={{ padding: 14, fontSize: 15 }} disabled={ucitava}>
              {ucitava ? 'Čuvanje...' : 'Sačuvaj novu lozinku →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetLozinke;