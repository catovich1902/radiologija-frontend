import React, { useState } from 'react';
import { registracija } from '../api';

const POLJA = [
  { name: 'first_name', label: 'Ime', placeholder: 'Vaše ime', type: 'text', required: true },
  { name: 'last_name', label: 'Prezime', placeholder: 'Vaše prezime', type: 'text', required: true },
  { name: 'username', label: 'Korisničko ime', placeholder: 'Izaberite korisničko ime', type: 'text', required: true },
  { name: 'email', label: 'Email adresa', placeholder: 'vas@email.com', type: 'email', required: true },
  { name: 'password', label: 'Lozinka', placeholder: 'Minimum 6 karaktera', type: 'password', required: true },
  { name: 'telefon', label: 'Telefon', placeholder: '+381 60 123 4567', type: 'text', required: true },
  { name: 'datum_rodjenja', label: 'Datum rođenja', placeholder: '', type: 'date', required: false },
  { name: 'adresa', label: 'Adresa (opciono)', placeholder: 'Vaša adresa', type: 'text', required: false },
];

function Registracija({ onLogin, setStranica }) {
  const [forma, setForma] = useState({
    username: '', password: '', first_name: '', last_name: '',
    email: '', telefon: '', datum_rodjenja: '', adresa: '', pol: '',
  });
  const [greska, setGreska] = useState('');
  const [ucitava, setUcitava] = useState(false);

  const handleChange = (e) => setForma({ ...forma, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGreska('');
    setUcitava(true);
    try {
      const res = await registracija(forma);
      onLogin(res.data);
    } catch (err) {
      const errors = err.response?.data;
      if (errors) {
        const prva = Object.values(errors)[0];
        setGreska(Array.isArray(prva) ? prva[0] : prva);
      } else {
        setGreska('Greška pri registraciji. Pokušajte ponovo.');
      }
    } finally {
      setUcitava(false);
    }
  };

  const uParu = ['first_name', 'last_name', 'telefon', 'datum_rodjenja'];

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 0' }}>
      <div style={{ width: '100%', maxWidth: 520 }}>

        {/* LOGO */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, overflow: 'hidden', margin: '0 auto 16px' }}>
            <img src="/logo.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: 'var(--tamna)', letterSpacing: -0.5 }}>Kreirajte nalog</h1>
          <p style={{ fontSize: 14, color: 'var(--tekst2)', marginTop: 6 }}>Registrujte se kao pacijent i zakažite pregled</p>
        </div>

        <div className="form-card" style={{ padding: 36, maxWidth: '100%' }}>
          {greska && <div className="error-msg">{greska}</div>}

          <form onSubmit={handleSubmit}>

            {/* IME I PREZIME */}
            <div className="form-row">
              {['first_name', 'last_name'].map(name => {
                const p = POLJA.find(f => f.name === name);
                return (
                  <div className="form-group" key={name}>
                    <label>{p.label}</label>
                    <input type={p.type} name={name} value={forma[name]}
                      onChange={handleChange} placeholder={p.placeholder} required={p.required} />
                  </div>
                );
              })}
            </div>

            {/* RADIO BUTTON — POL */}
            <div className="form-group">
              <label>Pol</label>
              <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
                {['Muški', 'Ženski'].map(p => (
                  <div key={p}
                    onClick={() => setForma({ ...forma, pol: p })}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      cursor: 'pointer', padding: '10px 20px',
                      border: `1.5px solid ${forma.pol === p ? 'var(--tamna)' : 'var(--plava3)'}`,
                      borderRadius: 10, flex: 1, justifyContent: 'center',
                      background: forma.pol === p ? 'var(--plava4)' : '#fff',
                      transition: 'all 0.2s',
                    }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: '50%',
                      border: `2px solid ${forma.pol === p ? 'var(--tamna)' : 'var(--plava2)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.2s',
                    }}>
                      {forma.pol === p && (
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--tamna)' }} />
                      )}
                    </div>
                    <span style={{
                      fontSize: 14,
                      fontWeight: forma.pol === p ? 700 : 500,
                      color: forma.pol === p ? 'var(--tamna)' : 'var(--tekst2)',
                    }}>
                      {p === 'Muški' ? '👨 Muški' : '👩 Ženski'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* OSTALA POLJA */}
            {POLJA.filter(p => !uParu.includes(p.name) || ['username', 'email', 'password', 'adresa'].includes(p.name)).map(p => (
              <div className="form-group" key={p.name}>
                <label>{p.label}</label>
                <input type={p.type} name={p.name} value={forma[p.name]}
                  onChange={handleChange} placeholder={p.placeholder} required={p.required} />
              </div>
            ))}

            {/* TELEFON I DATUM */}
            <div className="form-row">
              {['telefon', 'datum_rodjenja'].map(name => {
                const p = POLJA.find(f => f.name === name);
                return (
                  <div className="form-group" key={name}>
                    <label>{p.label}</label>
                    <input type={p.type} name={name} value={forma[name]}
                      onChange={handleChange} placeholder={p.placeholder} required={p.required} />
                  </div>
                );
              })}
            </div>

            <button type="submit" className="btn btn-primary btn-full"
              style={{ marginTop: 8, padding: 14, fontSize: 15 }} disabled={ucitava}>
              {ucitava ? 'Registracija...' : 'Registruj se →'}
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0', color: '#979dac', fontSize: 13 }}>
            <div style={{ flex: 1, height: 1, background: '#e8eef8' }} />
            već imate nalog?
            <div style={{ flex: 1, height: 1, background: '#e8eef8' }} />
          </div>

          <button className="btn btn-outline btn-full" onClick={() => setStranica('login')}>
            Prijavite se
          </button>
        </div>
      </div>
    </div>
  );
}

export default Registracija;