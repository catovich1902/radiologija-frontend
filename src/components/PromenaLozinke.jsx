import React, { useState } from 'react';
import { promeniLozinku } from '../api';

const USLOVI = [
  { key: 'duzina', tekst: 'Minimum 6 karaktera', proveri: (f) => f.nova_lozinka.length >= 6 },
  { key: 'razlicita', tekst: 'Različita od stare lozinke', proveri: (f) => f.nova_lozinka !== f.stara_lozinka && f.nova_lozinka.length > 0 },
  { key: 'poklapanje', tekst: 'Lozinke se poklapaju', proveri: (f) => f.nova_lozinka === f.ponovi_lozinku && f.nova_lozinka.length > 0 },
];

function PromenaLozinke({ setStranica }) {
  const [forma, setForma] = useState({ stara_lozinka: '', nova_lozinka: '', ponovi_lozinku: '' });
  const [greska, setGreska] = useState('');
  const [uspeh, setUspeh] = useState(false);
  const [ucitava, setUcitava] = useState(false);

  const handleChange = (e) => setForma({ ...forma, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGreska('');
    setUcitava(true);
    try {
      const res = await promeniLozinku(forma);
      localStorage.setItem('token', res.data.token);
      setUspeh(true);
    } catch (err) {
      setGreska(err.response?.data?.error || 'Greška pri promeni lozinke.');
    } finally {
      setUcitava(false);
    }
  };

  if (uspeh) return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', maxWidth: 400 }}>
        <div style={{ width: 80, height: 80, background: 'linear-gradient(135deg, var(--plava3), var(--plava2))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, margin: '0 auto 24px' }}>✓</div>
        <h2 style={{ fontSize: 26, fontWeight: 600, color: 'var(--tamna)', fontFamily: 'Fraunces, serif', marginBottom: 12 }}>Lozinka promenjena!</h2>
        <p style={{ color: 'var(--tekst2)', fontSize: 15, marginBottom: 28 }}>Vaša lozinka je uspešno promenjena.</p>
        <button className="btn btn-primary btn-full" onClick={() => setStranica('dashboard')}>Nazad na karton →</button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 460 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 64, height: 64, background: 'linear-gradient(135deg, var(--plava2), var(--plava1))', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto 16px' }}>🔒︎</div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: 'var(--tamna)', fontFamily: 'Fraunces, serif' }}>Promena lozinke</h1>
          <p style={{ fontSize: 14, color: 'var(--tekst2)', marginTop: 8 }}>Unesite staru i novu lozinku</p>
        </div>

        <div className="form-card">
          {greska && <div className="error-msg">{greska}</div>}
          <form onSubmit={handleSubmit}>
            {['stara_lozinka', 'nova_lozinka', 'ponovi_lozinku'].map((polje, i) => (
              <div className="form-group" key={polje}>
                <label>{['Stara lozinka', 'Nova lozinka', 'Ponovite novu lozinku'][i]}</label>
                <input type="password" name={polje} value={forma[polje]}
                  onChange={handleChange}
                  placeholder={['Unesite staru lozinku', 'Minimum 6 karaktera', 'Unesite lozinku ponovo'][i]}
                  required />
              </div>
            ))}

            {/* USLOVI */}
            <div style={{ background: 'var(--plava4)', border: '1px solid rgba(141,188,199,0.3)', borderRadius: 12, padding: '12px 16px', marginBottom: 20 }}>
              <p style={{ fontSize: 12, color: 'var(--tekst2)', marginBottom: 6, fontWeight: 600 }}>Uslovi za lozinku:</p>
              {USLOVI.map(u => (
                <div key={u.key} style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                  <span style={{ fontSize: 14 }}>{u.proveri(forma) ? '✓' : '●'}</span>
                  <span style={{ fontSize: 12, color: u.proveri(forma) ? 'var(--tamna)' : 'var(--tekst2)', fontWeight: u.proveri(forma) ? 600 : 400 }}>
                    {u.tekst}
                  </span>
                </div>
              ))}
            </div>

            <button type="submit" className="btn btn-primary btn-full"
              style={{ padding: 14, fontSize: 15 }} disabled={ucitava}>
              {ucitava ? 'Čuvanje...' : 'Sačuvaj novu lozinku →'}
            </button>
          </form>
          <button className="btn btn-outline btn-full" style={{ marginTop: 12 }}
            onClick={() => setStranica('dashboard')}>
            ← Nazad na karton
          </button>
        </div>
      </div>
    </div>
  );
}

export default PromenaLozinke;