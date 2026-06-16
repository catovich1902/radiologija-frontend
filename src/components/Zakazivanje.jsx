import React, { useState, useEffect } from 'react';
import { getTermini, zakaziPregled } from '../api';

const USLUGE = [
  { kod: 'RTG', naziv: 'Rendgen (RTG)', opis: 'Dijagnostika kostiju i pluća', cena: '2.500 din', ikona: '𐂯' },
  { kod: 'UZV', naziv: 'Ultrazvuk (UZV)', opis: 'Pregled abdomena i štitnjače', cena: '3.500 din', ikona: '🕪' },
  { kod: 'CT', naziv: 'CT Sken', opis: 'Detaljna 3D dijagnostika', cena: '8.000 din', ikona: '🖳' },
  { kod: 'MRI', naziv: 'Magnetna rezonanca', opis: 'Najpreciznija dijagnostika', cena: '12.000 din', ikona: '𓍹' },
];

const MESECI = ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun', 'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'];
const DANI = ['Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub', 'Ned'];

const fmt = (dv) => {
  const d = new Date(dv.replace('Z', '').replace('T', ' '));
  return {
    datum: d.toLocaleDateString('sr-RS', { day: '2-digit', month: '2-digit', year: 'numeric' }),
    vreme: d.toLocaleTimeString('sr-RS', { hour: '2-digit', minute: '2-digit' }),
  };
};

const generisiSate = () => {
  const sati = [];
  for (let h = 8; h < 16; h++) {
    sati.push(`${String(h).padStart(2, '0')}:00`);
    sati.push(`${String(h).padStart(2, '0')}:30`);
  }
  return sati;
};

function Zakazivanje({ setStranica }) {
  const [potvrdio, setPotvrdio] = useState(false);
  const [korak, setKorak] = useState(1);
  const [termini, setTermini] = useState([]);
  const [odabraniTermin, setOdabraniTermin] = useState(null);
  const [odabranaUsluga, setOdabranaUsluga] = useState('');
  const [napomena, setNapomena] = useState('');
  const [ucitava, setUcitava] = useState(true);
  const [greska, setGreska] = useState('');
  const [uspeh, setUspeh] = useState(false);
  const [odabraniDatum, setOdabraniDatum] = useState(null);
  const [trenutniMesec, setTrenutniMesec] = useState(new Date().getMonth());
  const [trenutnaGodina, setTrenutnaGodina] = useState(new Date().getFullYear());

  const token = localStorage.getItem('token');
  const danas = new Date();
  const sadTacno = new Date();
  danas.setHours(0, 0, 0, 0);
  useEffect(() => {
    getTermini()
      .then(res => setTermini(res.data))
      .catch(() => setGreska('Greška pri učitavanju termina.'))
      .finally(() => setUcitava(false));
  }, []);

  const handleZakazi = async () => {
    setUcitava(true);
    setGreska('');
    try {
      await zakaziPregled({ termin_id: odabraniTermin.id, vrsta_pregleda: odabranaUsluga, napomena });
      setUspeh(true);
    } catch (err) {
      setGreska(err.response?.data?.error || 'Greška pri zakazivanju.');
    } finally {
      setUcitava(false);
    }
  };

  const parseDatum = (dv) => new Date(dv.replace('Z', '').replace('T', ' '));

  const imaTermina = (datum) => termini.some(t => {
    const d = parseDatum(t.datum_vreme);
    return d.getFullYear() === datum.getFullYear() && d.getMonth() === datum.getMonth() && d.getDate() === datum.getDate();
  });

  const getTermin = (datum, vreme) => termini.find(t => {
  const d = parseDatum(t.datum_vreme);
  const h = String(d.getHours()).padStart(2, '0');
  const m = String(d.getMinutes()).padStart(2, '0');
  const jeIstanDatum = d.getFullYear() === datum.getFullYear() && d.getMonth() === datum.getMonth() && d.getDate() === datum.getDate();
  const jeIstVreme = `${h}:${m}` === vreme;
  const jeProšlo = d <= sadTacno;
  return jeIstanDatum && jeIstVreme && !jeProšlo;
});

  const generisiKalendar = () => {
    const prviDan = new Date(trenutnaGodina, trenutniMesec, 1);
    const zadnjiDan = new Date(trenutnaGodina, trenutniMesec + 1, 0);
    let pocetak = prviDan.getDay() - 1;
    if (pocetak < 0) pocetak = 6;
    return [
      ...Array(pocetak).fill(null),
      ...Array.from({ length: zadnjiDan.getDate() }, (_, i) => new Date(trenutnaGodina, trenutniMesec, i + 1))
    ];
  };

  const promeniMesec = (smer) => {
    if (smer === -1 && trenutniMesec === 0) { setTrenutniMesec(11); setTrenutnaGodina(g => g - 1); }
    else if (smer === 1 && trenutniMesec === 11) { setTrenutniMesec(0); setTrenutnaGodina(g => g + 1); }
    else setTrenutniMesec(m => m + smer);
    setOdabraniDatum(null);
    setOdabraniTermin(null);
  };

  const SumarRedak = ({ label, val }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--plava3)' }}>
      <span style={{ fontSize: 13, color: 'var(--tekst2)' }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--tamna)' }}>{val}</span>
    </div>
  );

  const odabranaUslugaObj = USLUGE.find(u => u.kod === odabranaUsluga);

  if (!token) return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', maxWidth: 400 }}>
        <div style={{ fontSize: 64, marginBottom: 20 }}>🔒︎</div>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--tamna)', marginBottom: 10 }}>Potrebna prijava</h2>
        <p style={{ color: 'var(--tekst2)', marginBottom: 28, fontSize: 15 }}>Morate biti prijavljeni da biste zakazali pregled</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button className="btn btn-primary" onClick={() => setStranica('login')}>Prijavi se</button>
          <button className="btn btn-outline" onClick={() => setStranica('registracija')}>Registruj se</button>
        </div>
      </div>
    </div>
  );

  if (uspeh) return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', maxWidth: 460 }}>
        <div style={{ width: 80, height: 80, background: 'var(--plava4)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, margin: '0 auto 24px' }}>✅</div>
        <h2 style={{ fontSize: 26, fontWeight: 700, color: 'var(--tamna)', marginBottom: 10 }}>Pregled zakazan!</h2>
        <p style={{ color: 'var(--tekst2)', fontSize: 15, marginBottom: 28 }}>Vaš pregled je uspešno zakazan. Vidimo se!</p>
        {odabraniTermin && (
          <div style={{ background: 'var(--plava4)', border: '1px solid var(--plava3)', borderRadius: 16, padding: 24, marginBottom: 28, textAlign: 'left' }}>
            <SumarRedak label="🗓 Datum" val={fmt(odabraniTermin.datum_vreme).datum} />
            <SumarRedak label="⏱ Vreme" val={fmt(odabraniTermin.datum_vreme).vreme} />
            <SumarRedak label="⛨ Pregled" val={odabranaUslugaObj?.naziv} />
            <SumarRedak label="⛁$ Cena" val={odabranaUslugaObj?.cena} />
          </div>
        )}
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setStranica('dashboard')}>Moj karton</button>
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => setStranica('home')}>Početna</button>
        </div>
      </div>
    </div>
  );

  const kalendarDani = generisiKalendar();
  const sviSati = generisiSate();

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--tamna)', letterSpacing: -0.5 }}>Zakazivanje pregleda</h2>
        <p style={{ color: 'var(--tekst2)', marginTop: 6 }}>Izaberite vrstu pregleda i termin</p>
      </div>

      {/* KORACI */}
      <div className="steps">
        {[{ br: 1, label: 'Vrsta pregleda' }, { br: 2, label: 'Datum i termin' }, { br: 3, label: 'Potvrda' }].map((s, i) => (
          <React.Fragment key={s.br}>
            {i > 0 && <div className="step-line" />}
            <div className={`step ${korak === s.br ? 'active' : korak > s.br ? 'done' : 'pending'}`}>
              <div className="step-num">{korak > s.br ? '✓' : s.br}</div>
              <span className="step-label">{s.label}</span>
            </div>
          </React.Fragment>
        ))}
      </div>

      {greska && <div className="error-msg">{greska}</div>}

      {/* KORAK 1 */}
      {korak === 1 && (
        <div className="booking-section">
          <h3>Izaberite vrstu pregleda</h3>
          <div className="service-options">
            {USLUGE.map(u => (
              <div key={u.kod} className={`service-opt ${odabranaUsluga === u.kod ? 'selected' : ''}`} onClick={() => setOdabranaUsluga(u.kod)}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{u.ikona}</div>
                <h4>{u.naziv}</h4>
                <p>{u.opis}</p>
                <p className="price">{u.cena}</p>
              </div>
            ))}
          </div>
          <button className="btn btn-primary btn-full" style={{ marginTop: 24, padding: 14 }} onClick={() => setKorak(2)} disabled={!odabranaUsluga}>
            Dalje →
          </button>
        </div>
      )}

      {/* KORAK 2 */}
      {korak === 2 && (
        <div className="booking-section">
          <h3>Izaberite datum i termin</h3>

          <div style={{ background: 'var(--plava5)', border: '1px solid var(--plava3)', borderRadius: 14, padding: 20, marginBottom: 20 }}>
            {/* NAVIGACIJA */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <button onClick={() => promeniMesec(-1)} style={{ background: 'var(--plava4)', border: 'none', borderRadius: 8, width: 36, height: 36, cursor: 'pointer', fontSize: 16, color: 'var(--tamna)', fontWeight: 700 }}>←</button>
              <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--tamna)' }}>{MESECI[trenutniMesec]} {trenutnaGodina}</span>
              <button onClick={() => promeniMesec(1)} style={{ background: 'var(--plava4)', border: 'none', borderRadius: 8, width: 36, height: 36, cursor: 'pointer', fontSize: 16, color: 'var(--tamna)', fontWeight: 700 }}>→</button>
            </div>

            {/* ZAGLAVLJE */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 8 }}>
              {DANI.map(d => <div key={d} style={{ textAlign: 'center', fontSize: 11, fontWeight: 600, color: 'var(--tekst2)', padding: '4px 0' }}>{d}</div>)}
            </div>

            {/* DANI */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
              {kalendarDani.map((dan, i) => {
                if (!dan) return <div key={i} />;
                const jeProslo = dan < danas;
                const jeVikend = dan.getDay() === 0 || dan.getDay() === 6;
                const jeDanas = dan.toDateString() === new Date().toDateString();
                const jeOdabran = odabraniDatum?.toDateString() === dan.toDateString();
                const imaSlobodnih = imaTermina(dan);
                const disabled = jeProslo || jeVikend || !imaSlobodnih;

                return (
                  <div key={i} onClick={() => !disabled && setOdabraniDatum(dan)} style={{
                    aspectRatio: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    borderRadius: 10, cursor: disabled ? 'default' : 'pointer', fontSize: 13, fontWeight: 500, transition: 'all 0.15s',
                    background: jeOdabran ? 'var(--tamna)' : jeDanas ? 'var(--plava4)' : 'transparent',
                    color: jeOdabran ? '#fff' : disabled ? 'var(--plava3)' : jeDanas ? 'var(--tamna)' : 'var(--tamna)',
                    border: jeDanas && !jeOdabran ? '2px solid var(--tamna)' : '2px solid transparent',
                    position: 'relative',
                  }}>
                    {dan.getDate()}
                    {imaSlobodnih && !disabled && !jeOdabran && (
                      <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--plava1)', position: 'absolute', bottom: 4 }} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* LEGENDA */}
            <div style={{ display: 'flex', gap: 16, marginTop: 14, flexWrap: 'wrap' }}>
              {[
                { boja: 'var(--tamna)', label: 'Odabrani dan', tackica: false },
                { boja: 'var(--plava3)', label: 'Nema termina / Vikend', tackica: false },
                { boja: 'var(--plava1)', label: 'Slobodni termini', tackica: true },
              ].map((l, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: l.tackica ? 8 : 14, height: l.tackica ? 8 : 14, borderRadius: l.tackica ? '50%' : 4, background: l.boja }} />
                  <span style={{ fontSize: 11, color: 'var(--tekst2)' }}>{l.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* TERMINI */}
          {odabraniDatum ? (
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--tamna)', marginBottom: 12 }}>
                Termini za {odabraniDatum.getDate()}. {MESECI[odabraniDatum.getMonth()]} {odabraniDatum.getFullYear()}:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                {sviSati.map(vreme => {
                  const termin = getTermin(odabraniDatum, vreme);
                  const jeOdabran = odabraniTermin?.id === termin?.id && !!termin;
                  const dostupan = !!termin;
                  return (
                    <div key={vreme} onClick={() => dostupan && setOdabraniTermin(termin)} style={{
                      padding: '10px 8px', textAlign: 'center', borderRadius: 10,
                      fontSize: 13, fontWeight: 600, cursor: dostupan ? 'pointer' : 'default', transition: 'all 0.15s',
                      border: jeOdabran ? '2px solid var(--tamna)' : dostupan ? '2px solid var(--plava3)' : '2px solid var(--plava4)',
                      background: jeOdabran ? 'var(--tamna)' : dostupan ? 'var(--plava5)' : 'var(--plava4)',
                      color: jeOdabran ? '#fff' : dostupan ? 'var(--tamna)' : 'var(--plava2)',
                      textDecoration: !dostupan ? 'line-through' : 'none',
                    }}>
                      {vreme}
                      <div style={{ fontSize: 9, marginTop: 2, color: jeOdabran ? 'rgba(255,255,255,0.7)' : dostupan ? 'var(--plava1)' : 'var(--plava2)' }}>
                        {dostupan ? 'slobodno' : 'zauzeto'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--tekst2)', fontSize: 14 }}>
              ↑ Izaberite datum iz kalendara
            </div>
          )}

          <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
            <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setKorak(1)}>← Nazad</button>
            <button className="btn btn-primary" style={{ flex: 1, padding: 14 }} onClick={() => setKorak(3)} disabled={!odabraniTermin}>Dalje →</button>
          </div>
        </div>
      )}

      {/* KORAK 3 */}
      {korak === 3 && (
        <div className="booking-section">
          
          <h3>Potvrdite zakazivanje</h3>
          <div style={{ background: 'var(--plava5)', border: '1px solid var(--plava3)', borderRadius: 12, padding: 20, marginBottom: 20 }}>
            <SumarRedak label="⛨ Pregled" val={odabranaUslugaObj?.naziv} />
            <SumarRedak label="🗓 Datum" val={odabraniTermin && fmt(odabraniTermin.datum_vreme).datum} />
            <SumarRedak label="⏱ Vreme" val={odabraniTermin && fmt(odabraniTermin.datum_vreme).vreme} />
            <SumarRedak label="⛁ $ Cena" val={odabranaUslugaObj?.cena} />
          </div>
          <div className="form-group">
            <label>Napomena za doktora (opciono)</label>
            <textarea rows="3" placeholder="Unesite napomenu..." value={napomena} onChange={(e) => setNapomena(e.target.value)} style={{ resize: 'none' }} />
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setKorak(2)}>← Nazad</button>
            {/* CHECKBOX */}
<div style={{
  display: 'flex', alignItems: 'center', gap: 10,
  padding: '12px 16px', marginBottom: 16,
  background: 'var(--plava4)',
  border: '1px solid var(--plava3)',
  borderRadius: 12, cursor: 'pointer',
}} onClick={() => setPotvrdio(!potvrdio)}>
  <div style={{
    width: 20, height: 20,
    border: `2px solid ${potvrdio ? 'var(--tamna)' : 'var(--plava1)'}`,
    borderRadius: 5,
    background: potvrdio ? 'var(--tamna)' : '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all 0.2s', flexShrink: 0,
  }}>
    {potvrdio && <span style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>✓</span>}
  </div>
  <span style={{ fontSize: 13, color: 'var(--tamna)', fontWeight: 500 }}>
    Potvrđujem da su podaci tačni i da želim da zakažem pregled
  </span>
</div>
            <button className="btn btn-primary" style={{ flex: 1, padding: 14 }}
  onClick={handleZakazi} disabled={ucitava || !potvrdio}>
  {ucitava ? 'Zakazivanje...' : 'Potvrdi zakazivanje ✓'}
</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Zakazivanje;