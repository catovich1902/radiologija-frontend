import React, { useState } from 'react';

const USLUGE = [
  { ikona: '𐂯', naziv: 'Rendgensko snimanje', opis: 'Brza dijagnostika kostiju, pluća i zglobova', cena: '2.500 din', trajanje: '15 min' },
  { ikona: '🕪', naziv: 'Ultrazvuk', opis: 'Pregled abdomena, štitnjače, vaskularni UZV', cena: '3.500 din', trajanje: '20 min' },
  { ikona: '🖳', naziv: 'CT Sken', opis: 'Detaljna trodimenzionalna dijagnostika', cena: '8.000 din', trajanje: '30 min' },
  { ikona: '𓍹', naziv: 'Magnetna rezonanca', opis: 'Najpreciznija dijagnostika mekih tkiva', cena: '12.000 din', trajanje: '45 min' },
];

const RAZLOZI = [
  { ikona: '🏆', naziv: 'Iskustvo', opis: 'Specijalizovana praksa u dijagnostičkoj radiologiji' },
  { ikona: '⚡︎', naziv: 'Brzi rezultati', opis: 'Nalazi dostupni isti dan — bez čekanja' },
  { ikona: '🖳', naziv: 'Moderna oprema', opis: 'Najsavremenija dijagnostička tehnologija' },
  { ikona: '👤', naziv: 'Pažnja prema pacijentu', opis: 'Individualni pristup svakom pacijentu' },
  { ikona: '🗓', naziv: 'Online zakazivanje', opis: 'Zakažite termin za nekoliko sekundi' },
  { ikona: '🏠︎', naziv: 'Dostupnost', opis: 'Lako dostupna lokacija u centru Tutina' },
];

const TIMELINES = [
  { korak: '01', naziv: 'Zakažite online', opis: 'Izaberite vrstu pregleda i slobodan termin.' },
  { korak: '02', naziv: 'Dođite na pregled', opis: 'Pojavite se u ordinaciji u zakazano vreme.' },
  { korak: '03', naziv: 'Pregled', opis: 'Dr Martinović obavlja pregled uz modernu opremu.' },
  { korak: '04', naziv: 'Preuzmite nalaze', opis: 'Nalazi su dostupni isti dan.' },
];

const S = {
  card: { background: 'rgba(255,255,255,0.7)', borderRadius: 12, padding: '12px 16px', flex: 1, textAlign: 'center', border: '1px solid rgba(255,255,255,0.9)' },
  val: { fontSize: 18, fontWeight: 700, color: '#0f2b33' },
  lbl: { fontSize: 11, color: '#4a6b75', marginTop: 2 },
};

function OOrdinaciji({ setStranica }) {
  const [aktivnaUsluga, setAktivnaUsluga] = useState(0);

  return (
    <div className="o-ordinaciji">

      {/* HERO */}
      <div style={{ background: 'linear-gradient(135deg, var(--plava2) 0%, var(--plava3) 100%)', borderRadius: 28, padding: '60px 48px', marginBottom: 48, position: 'relative', overflow: 'hidden', border: '1px solid rgba(141,188,199,0.4)' }}>
        <div style={{ position: 'absolute', top: -80, right: -80, width: 300, height: 300, background: 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)' }} />
        <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 32 }}>
          <div>
            <span style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.9)', color: '#0f2b33', fontSize: 12, fontWeight: 600, padding: '6px 14px', borderRadius: 20, marginBottom: 20 }}>✦ O nama</span>
            <h1 style={{ fontSize: 38, fontWeight: 600, color: '#0f2b33', marginBottom: 14, fontFamily: 'Fraunces, serif', lineHeight: 1.2 }}>Radiološka ordinacija<br />Dr Martinović</h1>
            <p style={{ fontSize: 16, color: '#4a6b75', lineHeight: 1.7, maxWidth: 520, marginBottom: 28 }}>Vrhunska dijagnostička usluga sa najmodernijom opremom u Tutinu. Brzi nalazi, pažljiv pristup, pouzdani rezultati.</p>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <button className="btn btn-primary" onClick={() => setStranica('zakazivanje')}>Zakaži pregled →</button>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.6)', borderRadius: 30, padding: '10px 20px', border: '1px solid rgba(255,255,255,0.9)' }}>
                <span style={{ fontSize: 18 }}>★</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#0f2b33' }}>4.9/5</div>
                  <div style={{ fontSize: 11, color: '#4a6b75' }}>Ocena pacijenata</div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[['500+', 'Zadovoljnih pacijenata'], ['4', 'Vrste pregleda'], ['1 dan', 'Rezultati istog dana']].map(([br, lbl], i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.9)', borderRadius: 16, padding: '14px 20px', textAlign: 'center', minWidth: 140 }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#0f2b33', fontFamily: 'Fraunces, serif' }}>{br}</div>
                <div style={{ fontSize: 11, color: '#4a6b75', marginTop: 2 }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DOKTOR */}
      <div className="doktor-card" style={{ marginBottom: 48 }}>
        <div className="doktor-avatar">EM</div>
        <div className="doktor-info">
          <h2>Dr Edin Martinović</h2>
          <p className="title">Specijalista radiologije · Tutin</p>
          <p>Iskusni specijalista radiologije sa dugogodišnjim iskustvom, posvećen pružanju vrhunske usluge pacijentima.</p>
          <ul className="info-list">
            <li>✎𓂃 Specijalista dijagnostičke radiologije</li>
            <li>🏠︎ Tutin, Srbija</li>
            <li>◴ Pon — Pet: 08:00 — 16:00</li>
            <li>✙ Rendgen, Ultrazvuk, CT, MRI</li>
          </ul>
        </div>
      </div>

      {/* TIMELINE */}
      <p className="section-title">Kako funkcioniše?</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, marginBottom: 48, position: 'relative' }}>
        <div style={{ position: 'absolute', top: 28, left: '12.5%', right: '12.5%', height: 2, background: 'linear-gradient(90deg, var(--plava2), var(--plava3))', zIndex: 0 }} />
        {TIMELINES.map((t, i) => (
          <div key={i} style={{ textAlign: 'center', padding: '0 16px', position: 'relative', zIndex: 1 }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg, var(--plava2), var(--plava1))', border: '3px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 4px 16px rgba(141,188,199,0.4)' }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: '#0f2b33', fontFamily: 'Fraunces, serif' }}>{t.korak}</span>
            </div>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: '#0f2b33', marginBottom: 6 }}>{t.naziv}</h4>
            <p style={{ fontSize: 12, color: '#4a6b75', lineHeight: 1.6 }}>{t.opis}</p>
          </div>
        ))}
      </div>

      {/* USLUGE */}
      <p className="section-title">Usluge i cene</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 48 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {USLUGE.map((u, i) => (
            <div key={i} onClick={() => setAktivnaUsluga(i)} style={{ padding: '18px 20px', borderRadius: 16, cursor: 'pointer', border: `1.5px solid ${aktivnaUsluga === i ? 'var(--plava1)' : 'rgba(141,188,199,0.25)'}`, background: aktivnaUsluga === i ? 'linear-gradient(135deg, var(--plava4), var(--plava5))' : 'linear-gradient(135deg, #fff, var(--plava5))', display: 'flex', alignItems: 'center', gap: 14, transition: 'all 0.2s', boxShadow: aktivnaUsluga === i ? '0 4px 20px rgba(141,188,199,0.3)' : 'none' }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: aktivnaUsluga === i ? 'linear-gradient(135deg, var(--plava2), var(--plava1))' : 'linear-gradient(135deg, var(--plava3), var(--plava4))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{u.ikona}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0f2b33' }}>{u.naziv}</div>
                <div style={{ fontSize: 12, color: '#4a6b75', marginTop: 2 }}>{u.opis}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#0f2b33' }}>{u.cena}</div>
                <div style={{ fontSize: 11, color: '#4a6b75' }}>{u.trajanje}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: 'linear-gradient(135deg, var(--plava3) 0%, var(--plava4) 100%)', borderRadius: 20, padding: 32, border: '1px solid rgba(141,188,199,0.4)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>{USLUGE[aktivnaUsluga].ikona}</div>
          <h3 style={{ fontSize: 22, fontWeight: 600, color: '#0f2b33', fontFamily: 'Fraunces, serif', marginBottom: 10 }}>{USLUGE[aktivnaUsluga].naziv}</h3>
          <p style={{ fontSize: 14, color: '#4a6b75', lineHeight: 1.7, marginBottom: 24 }}>{USLUGE[aktivnaUsluga].opis}</p>
          <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
            <div style={S.card}><div style={S.val}>{USLUGE[aktivnaUsluga].cena}</div><div style={S.lbl}>Cena pregleda</div></div>
            <div style={S.card}><div style={S.val}>{USLUGE[aktivnaUsluga].trajanje}</div><div style={S.lbl}>Trajanje</div></div>
          </div>
          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setStranica('zakazivanje')}>
            Zakaži {USLUGE[aktivnaUsluga].naziv} →
          </button>
        </div>
      </div>

      {/* ZASTO MI */}
      <p className="section-title">Zašto izabrati nas?</p>
      <div className="cards-grid" style={{ marginBottom: 48 }}>
        {RAZLOZI.map((k, i) => (
          <div className="card" key={i}>
            <div className="card-icon">{k.ikona}</div>
            <h3>{k.naziv}</h3>
            <p>{k.opis}</p>
          </div>
        ))}
      </div>

      {/* LOKACIJA + MAPA */}
      <p className="section-title">Kontakt i lokacija</p>
      <div style={{ background: 'linear-gradient(135deg, var(--plava3) 0%, var(--plava4) 100%)', borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(141,188,199,0.3)', marginBottom: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, padding: '28px 40px' }}>
          {[['🏠︎', 'Adresa', 'Tutin, Srbija'], ['◴', 'Radno vreme', 'Pon–Pet: 08:00–16:00'], ['🗓', 'Zakazivanje', 'Online ili telefonom']].map(([ikona, naziv, vrednost], i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{ikona}</div>
              <p style={{ color: '#4a6b75', fontSize: 12, marginBottom: 4, fontWeight: 600 }}>{naziv}</p>
              <p style={{ color: '#0f2b33', fontWeight: 700, fontSize: 15 }}>{vrednost}</p>
            </div>
          ))}
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23347.783705627295!2d20.312215979875404!3d42.98937455301572!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135327f61a99caeb%3A0xadf5b829117a6c4f!2sTutin!5e0!3m2!1sen!2srs!4v1778948049070!5m2!1sen!2srs"
          width="100%" height="340" style={{ border: 0, display: 'block' }}
          allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          title="Lokacija ordinacije"
        />
      </div>

      {/* CTA */}
      <div style={{ background: 'linear-gradient(135deg, var(--plava2) 0%, var(--plava3) 100%)', borderRadius: 24, padding: '40px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid rgba(141,188,199,0.4)' }}>
        <div>
          <h3 style={{ color: '#0f2b33', fontSize: 24, fontWeight: 600, marginBottom: 8, fontFamily: 'Fraunces, serif' }}>Zakažite pregled danas</h3>
          <p style={{ color: '#4a6b75', fontSize: 14 }}>Brzo, jednostavno i pouzdano — rezultati isti dan</p>
        </div>
        <button className="btn btn-primary" style={{ padding: '14px 32px', whiteSpace: 'nowrap' }} onClick={() => setStranica('zakazivanje')}>Zakaži pregled →</button>
      </div>

    </div>
  );
}

export default OOrdinaciji;