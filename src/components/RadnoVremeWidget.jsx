import React, { useState, useEffect } from 'react';

const DANI_RADA = [
  { dan: 'Pon', radi: true },
  { dan: 'Uto', radi: true },
  { dan: 'Sri', radi: true },
  { dan: 'Čet', radi: true },
  { dan: 'Pet', radi: true },
  { dan: 'Sub', radi: false },
  { dan: 'Ned', radi: false },
];

function RadnoVremeWidget() {
  const [vreme, setVreme] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setVreme(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const sat = vreme.getHours();
  const minut = vreme.getMinutes();
  const dan = vreme.getDay();
  const jeRadniDan = dan >= 1 && dan <= 5;
  const jeRadnoVreme = jeRadniDan && sat >= 8 && sat < 16;
  const trenutniDanIndex = dan === 0 ? 6 : dan - 1;

  const odbrojavanje = () => {
    if (dan === 0 || dan === 6) return 'Sledeći radni dan: Ponedeljak';
    if (jeRadnoVreme) {
      const ukupno = (16 - sat) * 60 - minut;
      return `Zatvara se za ${Math.floor(ukupno / 60)}h ${ukupno % 60}min`;
    }
    if (sat < 8) {
      const ukupno = (8 - sat) * 60 - minut;
      return `Otvara se za ${Math.floor(ukupno / 60)}h ${ukupno % 60}min`;
    }
    return 'Otvara se sutra u 08:00';
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, #ffffff, var(--plava5))', border: '1px solid rgba(141,188,199,0.3)', borderRadius: 20, padding: 24, fontFamily: 'Manrope, sans-serif' }}>

      {/* HEADER */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 42, height: 42, background: 'linear-gradient(135deg, var(--plava3), var(--plava2))', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>⏱</div>
          <div>
            <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--tamna)', fontFamily: 'Fraunces, serif' }}>Radno vreme</p>
            <p style={{ fontSize: 11, color: 'var(--tekst2)', marginTop: 2 }}>{odbrojavanje()}</p>
          </div>
        </div>
        <div style={{ background: jeRadnoVreme ? 'rgba(45,154,45,0.1)' : 'rgba(192,57,43,0.1)', border: `1px solid ${jeRadnoVreme ? 'rgba(45,154,45,0.3)' : 'rgba(192,57,43,0.3)'}`, borderRadius: 20, padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: jeRadnoVreme ? '#2d9a2d' : '#c0392b', animation: jeRadnoVreme ? 'pulseDot 2s infinite' : 'none' }} />
          <span style={{ fontSize: 12, fontWeight: 700, color: jeRadnoVreme ? '#2d9a2d' : '#c0392b' }}>
            {jeRadnoVreme ? 'Otvoreno' : 'Zatvoreno'}
          </span>
        </div>
      </div>

      {/* DANI */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {DANI_RADA.map((d, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '8px 12px', borderRadius: 10,
            background: i === trenutniDanIndex ? 'linear-gradient(135deg, var(--plava3), var(--plava4))' : 'transparent',
            border: `1px solid ${i === trenutniDanIndex ? 'rgba(141,188,199,0.4)' : 'transparent'}`,
          }}>
            <span style={{ fontSize: 13, fontWeight: i === trenutniDanIndex ? 700 : 500, color: i === trenutniDanIndex ? 'var(--tamna)' : 'var(--tekst2)' }}>
              {i === trenutniDanIndex ? '→ ' : ''}{d.dan}
            </span>
            <span style={{ fontSize: 13, fontWeight: i === trenutniDanIndex ? 700 : 400, color: d.radi ? (i === trenutniDanIndex ? 'var(--tamna)' : 'var(--tekst2)') : '#c0392b' }}>
              {d.radi ? '08:00 — 16:00' : 'Zatvoreno'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RadnoVremeWidget;