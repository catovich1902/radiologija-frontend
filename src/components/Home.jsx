import React, { useState } from 'react';
import RadnoVremeWidget from './RadnoVremeWidget';

const USLUGE = [
  { ikona: '𐂯', naziv: 'Rendgensko snimanje (RTG)', opis: 'Brza dijagnostika kostiju i pluća', cena: '2.500 din' },
  { ikona: '🕪', naziv: 'Ultrazvuk (UZV)', opis: 'Pregled abdomena i štitnjače', cena: '3.500 din' },
  { ikona: '🖳', naziv: 'CT Sken', opis: 'Detaljna 3D dijagnostika', cena: '8.000 din' },
  { ikona: '𓍹', naziv: 'Magnetna rezonanca (MRI)', opis: 'Najpreciznija dijagnostika mekih tkiva', cena: '12.000 din' },
];

const RECENZIJE = [
  { ime: 'Amra K.', tekst: 'Odlična usluga, rezultati isti dan. Preporučujem svima!', ocena: 5 },
  { ime: 'Lejla Ć.', tekst: 'Profesionalan pristup i moderna oprema. Veoma zadovoljan.', ocena: 5 },
  { ime: 'Fatima H.', tekst: 'Brzo i efikasno. Dr Martinović je izuzetno stručan.', ocena: 5 },
];

function Home({ setStranica }) {
  const [aktivnaUsluga, setAktivnaUsluga] = useState(null);

  return (
    <div>

      {/* HERO */}
      <div style={{ background: 'linear-gradient(135deg, var(--plava2) 0%, var(--plava3) 50%, #fff 100%)', borderRadius: 28, padding: '80px 64px', marginBottom: 32, position: 'relative', overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center', minHeight: 460, border: '1px solid rgba(141,188,199,0.3)' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 320, height: 320, background: 'radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <span style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.9)', color: '#0f2b33', fontSize: 12, fontWeight: 600, padding: '6px 14px', borderRadius: 20, marginBottom: 20 }}>✦ Radiološka ordinacija · Tutin</span>
          <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 58, fontWeight: 600, color: '#0f2b33', lineHeight: 1.1, marginBottom: 20, letterSpacing: -0.5 }}>
            Precizna<br /><span style={{ color: 'rgba(15,43,51,0.45)' }}>radiološka</span><br />dijagnostika
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(15,43,51,0.7)', lineHeight: 1.7, marginBottom: 36, maxWidth: 460 }}>
            Dr Edin Martinović i njegov tim pružaju vrhunsku dijagnostičku uslugu u Tutinu.
          </p>
          <div style={{ display: 'flex', gap: 14 }}>
            <button className="btn btn-primary" onClick={() => setStranica('zakazivanje')}>Zakaži pregled →</button>
            <button className="btn btn-light" onClick={() => setStranica('o-ordinaciji')}>Saznaj više</button>
          </div>
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <img src="/radiolodija-home.jpg" alt="Radiološka ordinacija" style={{ width: '100%', maxWidth: 420, borderRadius: 24, objectFit: 'cover', height: 320, border: '3px solid rgba(255,255,255,0.8)', boxShadow: '0 20px 60px rgba(141,188,199,0.4)', display: 'block' }} />
          <div style={{ position: 'absolute', bottom: 16, left: 16, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.9)', borderRadius: 16, padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 28 }}>★</span>
            <div>
              <div style={{ color: '#0f2b33', fontWeight: 700, fontSize: 16 }}>4.9/5</div>
              <div style={{ color: '#4a6b75', fontSize: 11 }}>Ocena pacijenata</div>
            </div>
          </div>
        </div>
      </div>

      {/* USLUGE */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <p className="section-title" style={{ margin: 0 }}>Naše usluge</p>
        <button className="btn btn-outline" style={{ padding: '8px 20px', fontSize: 13 }} onClick={() => setStranica('o-ordinaciji')}>Sve usluge →</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 32 }}>
        {USLUGE.map((u, i) => (
          <div key={i} onClick={() => setAktivnaUsluga(aktivnaUsluga === i ? null : i)}
            style={{ padding: '20px 24px', borderRadius: 20, cursor: 'pointer', border: `1.5px solid ${aktivnaUsluga === i ? 'var(--plava1)' : 'rgba(141,188,199,0.25)'}`, background: aktivnaUsluga === i ? 'linear-gradient(135deg, var(--plava4), var(--plava5))' : 'linear-gradient(135deg, #fff, var(--plava5))', display: 'flex', alignItems: 'center', gap: 16, transition: 'all 0.2s', boxShadow: aktivnaUsluga === i ? '0 4px 20px rgba(141,188,199,0.3)' : 'none' }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: aktivnaUsluga === i ? 'linear-gradient(135deg, var(--plava2), var(--plava1))' : 'linear-gradient(135deg, var(--plava3), var(--plava4))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0, transition: 'all 0.2s' }}>{u.ikona}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0f2b33' }}>{u.naziv}</div>
              <div style={{ fontSize: 12, color: '#4a6b75', marginTop: 2 }}>{u.opis}</div>
              {aktivnaUsluga === i && (
                <button className="btn btn-primary" style={{ marginTop: 12, padding: '8px 18px', fontSize: 13 }} onClick={(e) => { e.stopPropagation(); setStranica('zakazivanje'); }}>
                  Zakaži →
                </button>
              )}
            </div>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#0f2b33', whiteSpace: 'nowrap' }}>{u.cena}</span>
          </div>
        ))}
      </div>

      {/* RECENZIJE */}
      <p className="section-title">Šta kažu pacijenti?</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
        {RECENZIJE.map((r, i) => (
          <div key={i} style={{ background: 'linear-gradient(135deg, #fff, var(--plava5))', border: '1px solid rgba(141,188,199,0.25)', borderRadius: 20, padding: 24 }}>
            <div style={{ fontSize: 16, color: '#f0a500', marginBottom: 10 }}>{'★'.repeat(r.ocena)}</div>
            <p style={{ fontSize: 14, color: '#4a6b75', lineHeight: 1.7, marginBottom: 14 }}>"{r.tekst}"</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, var(--plava2), var(--plava1))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#0f2b33' }}>{r.ime[0]}</div>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#0f2b33' }}>{r.ime}</span>
            </div>
          </div>
        ))}
      </div>

      {/* RADNO VREME WIDGET */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <RadnoVremeWidget />
        <div style={{ background: 'linear-gradient(135deg, var(--plava3) 0%, var(--plava4) 100%)', borderRadius: 20, padding: 24, border: '1px solid rgba(141,188,199,0.3)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12 }}>
          <h3 style={{ fontSize: 20, fontWeight: 600, color: '#0f2b33', fontFamily: 'Fraunces, serif' }}>Cenovnik usluga</h3>
          {USLUGE.map((u, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#0f2b33', borderBottom: '1px solid rgba(141,188,199,0.3)', paddingBottom: 8 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span>{u.ikona}</span>{u.naziv}</span>
              <span style={{ fontWeight: 700 }}>{u.cena}</span>
            </div>
          ))}
          <button className="btn btn-primary" style={{ marginTop: 4 }} onClick={() => setStranica('zakazivanje')}>Zakaži pregled →</button>
        </div>
      </div>

    </div>
  );
}

export default Home;