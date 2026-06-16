import React from 'react';

const LINKOVI_ORDINACIJA = [
  { tekst: 'Početna', str: 'home' },
  { tekst: 'O ordinaciji', str: 'o-ordinaciji' },
  { tekst: 'Usluge', str: 'o-ordinaciji' },
];

const LINKOVI_PACIJENTI = [
  { tekst: 'Zakaži pregled', str: 'zakazivanje' },
  { tekst: 'Registracija', str: 'registracija' },
  { tekst: 'Prijava', str: 'login' },
  { tekst: 'Moj karton', str: 'dashboard' },
];

const KONTAKT = [
  { tekst: 'Tutin, Srbija' },
  { tekst: 'Pon — Pet: 08:00 — 16:00' },
  { tekst: 'Online zakazivanje dostupno' },
  { tekst: 'Dr Edin Martinović' },
];

function Footer({ setStranica }) {
  return (
    <footer className="footer">
      <div className="footer-grid">

        {/* KOLONA 1 */}
        <div>
          <div className="footer-logo" onClick={() => setStranica('home')}>
            <img src="/logo.png" alt="Logo" onError={(e) => e.target.style.display = 'none'} />
            <span className="footer-logo-text">Dr Martinović</span>
          </div>
          <p className="footer-desc">
            Profesionalna radiološka dijagnostika u Tutinu.
            Moderna oprema, brzi rezultati, pouzdani nalazi.
          </p>
          <div style={{
            marginTop: 16, display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(141,188,199,0.15)', border: '1px solid rgba(141,188,199,0.2)',
            borderRadius: 20, padding: '6px 14px', fontSize: 12, color: 'rgba(255,255,255,0.6)'
          }}>
            Radi Pon-Pet 08:00-16:00
          </div>
        </div>

        {/* KOLONA 2 */}
        <div>
          <p className="footer-col-title">Ordinacija</p>
          <ul className="footer-links">
            {LINKOVI_ORDINACIJA.map(l => (
              <li key={l.tekst}><button onClick={() => setStranica(l.str)}>{l.tekst}</button></li>
            ))}
          </ul>
        </div>

        {/* KOLONA 3 */}
        <div>
          <p className="footer-col-title">Pacijenti</p>
          <ul className="footer-links">
            {LINKOVI_PACIJENTI.map(l => (
              <li key={l.tekst}><button onClick={() => setStranica(l.str)}>{l.tekst}</button></li>
            ))}
          </ul>
        </div>

        {/* KOLONA 4 */}
        <div>
          <p className="footer-col-title">Kontakt</p>
          <ul className="footer-contact footer-links">
            {KONTAKT.map(k => (
              <li key={k.tekst}><span>{k.ikona}</span><span>{k.tekst}</span></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div>© {new Date().getFullYear()} Radiološka ordinacija Dr Martinović · Tutin</div>
      </div>
    </footer>
  );
}

export default Footer;