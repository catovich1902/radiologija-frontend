import React, { useState, useEffect } from 'react';
import { getMojiPregledi, otkaziPregled } from '../api';
import Spinner from './Spinner';

const TABOVI = [
  { key: 'predstojeci', label: 'Predstojeći', status: 'zakazan', ikona: '🗓' },
  { key: 'zavrseni', label: 'Završeni', status: 'zavrsen', ikona: '✔' },
  { key: 'otkazani', label: 'Otkazani', status: 'otkazan', ikona: '✗' },
];

const fmt = (dv) => {
  const d = new Date(dv.replace('Z', '').replace('T', ' '));
  return {
    dan: d.getDate(),
    mesec: d.toLocaleDateString('sr-RS', { month: 'short' }),
    vreme: d.toLocaleTimeString('sr-RS', { hour: '2-digit', minute: '2-digit' }),
  };
};

function PacijentDashboard({ setStranica }) {
  const [pregledi, setPregledi] = useState([]);
  const [ucitava, setUcitava] = useState(true);
  const [greska, setGreska] = useState('');
  const [poruka, setPoruka] = useState('');
  const [aktivniTab, setAktivniTab] = useState('predstojeci');

  const ime = localStorage.getItem('ime');
  const prezime = localStorage.getItem('prezime');

  useEffect(() => { ucitajPreglede(); }, []);

  const ucitajPreglede = async () => {
    try {
      const res = await getMojiPregledi();
      setPregledi(res.data);
    } catch {
      setGreska('Greška pri učitavanju pregleda.');
    } finally {
      setUcitava(false);
    }
  };

  const handleOtkazi = async (id) => {
    if (!window.confirm('Da li ste sigurni da želite da otkažete pregled?')) return;
    try {
      await otkaziPregled(id);
      setPoruka('Pregled je uspešno otkazan.');
      setTimeout(() => setPoruka(''), 4000);
      ucitajPreglede();
    } catch {
      setGreska('Greška pri otkazivanju.');
    }
  };

  const filtrirani = pregledi.filter(p => p.status === TABOVI.find(t => t.key === aktivniTab)?.status);
  const brojevi = Object.fromEntries(TABOVI.map(t => [t.key, pregledi.filter(p => p.status === t.status).length]));

  return (
    <div>
      {/* HEADER */}
      <div style={{
        background: 'linear-gradient(135deg, var(--plava2) 0%, var(--plava3) 100%)',
        borderRadius: 20, padding: '32px 40px', marginBottom: 28,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        border: '1px solid rgba(141,188,199,0.3)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{
            width: 64, height: 64,
            background: 'linear-gradient(135deg, var(--plava1), var(--plava2))',
            border: '2px solid rgba(255,255,255,0.6)',
            borderRadius: '50%', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: 22, fontWeight: 700, color: 'var(--tamna)'
          }}>
            {ime?.[0]}{prezime?.[0]}
          </div>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--tamna)' }}>{ime} {prezime}</h2>
            <p style={{ fontSize: 13, color: 'var(--tekst2)', marginTop: 3 }}>Karton pacijenta</p>
          </div>
        </div>
        <div className="dashboard-dugmad">
  <button className="btn btn-outline" onClick={() => setStranica('promena-lozinke')}>
    🔒︎ Promeni lozinku
  </button>
  <button className="btn btn-primary" onClick={() => setStranica('zakazivanje')}>
    + Zakaži pregled
  </button>
</div>
      </div>

      {greska && <div className="error-msg">{greska}</div>}
      {poruka && <div className="success-msg">{poruka}</div>}

      {/* STATISTIKE */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="val">{pregledi.length}</div>
          <div className="lbl">Ukupno pregleda</div>
        </div>
        <div className="stat-card">
          <div className="val">{brojevi.predstojeci}</div>
          <div className="lbl">Predstojeći</div>
        </div>
        <div className="stat-card">
          <div className="val">{brojevi.zavrseni}</div>
          <div className="lbl">Završenih</div>
        </div>
      </div>

      {/* TABOVI */}
      <div className="tabs">
        {TABOVI.map(t => (
          <button key={t.key}
            className={`tab-btn ${aktivniTab === t.key ? 'active' : ''}`}
            onClick={() => setAktivniTab(t.key)}>
            {t.label} ({brojevi[t.key]})
          </button>
        ))}
      </div>

      {/* PREGLEDI */}
      {ucitava ? <Spinner tekst="Učitavanje pregleda..." /> : filtrirani.length === 0 ? (
        <div style={{ background: '#fff', border: '1px solid rgba(141,188,199,0.2)', borderRadius: 16, padding: '48px 32px', textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>
            {TABOVI.find(t => t.key === aktivniTab)?.ikona}
          </div>
          <p style={{ color: 'var(--tekst2)', fontSize: 15, marginBottom: 20 }}>
            {aktivniTab === 'predstojeci' ? 'Nemate zakazanih pregleda.'
              : aktivniTab === 'zavrseni' ? 'Nemate završenih pregleda.'
              : 'Nemate otkazanih pregleda.'}
          </p>
          {aktivniTab === 'predstojeci' && (
            <button className="btn btn-primary" onClick={() => setStranica('zakazivanje')}>
              Zakaži pregled
            </button>
          )}
        </div>
      ) : (
        filtrirani.map(p => {
          const d = fmt(p.termin.datum_vreme);
          return (
            <div key={p.id} className="pregled-card">
              <div className="pregled-left">
                <div className="date-box">
                  <div className="day">{d.dan}</div>
                  <div className="month">{d.mesec}</div>
                </div>
                <div className="pregled-info">
                  <h4>{p.vrsta_pregleda_display}</h4>
                  <p>◴ {d.vreme} · Dr Martinović · {p.termin.trajanje_minuta} min</p>
                  {p.napomena && <p style={{ color: 'var(--plava1)', marginTop: 4, fontSize: 12 }}>🗒 {p.napomena}</p>}
                  <p style={{ marginTop: 4, color: 'var(--tamna)', fontWeight: 600, fontSize: 13 }}>
                    {p.cena.toLocaleString()} din
                  </p>
                </div>
              </div>
              <div className="pregled-right">
                <span className={`status-badge status-${p.status}`}>{p.status_display}</span>
                {p.status === 'zakazan' && (
                  <button className="btn btn-danger" style={{ fontSize: 12, padding: '7px 14px' }}
                    onClick={() => handleOtkazi(p.id)}>
                    Otkaži
                  </button>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default PacijentDashboard;