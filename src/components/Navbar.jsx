import React, { useState, useRef, useEffect } from 'react';

const tipKorisnika = (type) => ({
  pacijent: '👤 Pacijent',
  doktor: '👨‍⚕️ Doktor',
}[type] || '🔧 Admin');

const PACIJENT_LINKS = [
  { tekst: 'Moj karton', str: 'dashboard' },
  { tekst: 'Zakaži pregled', str: 'zakazivanje' },
];

const DOKTOR_LINKS = [
  { tekst: 'Raspored', str: 'doktor-dashboard' },
];

function Navbar({ korisnik, setStranica, onLogout }) {
  const [dropdown, setDropdown] = useState(false);
  const [mobilni, setMobilni] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setDropdown(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const nav = (str) => { setStranica(str); setDropdown(false); setMobilni(false); };

  const linkovi = korisnik?.user_type === 'pacijent' ? PACIJENT_LINKS
    : korisnik?.user_type === 'doktor' ? DOKTOR_LINKS : [];

  return (
    <>
      <style>{`
        .hamburger { display: none !important; }
        @media (max-width: 768px) {
          .nav-linkovi { display: none !important; }
          .hamburger { display: flex !important; }
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <nav className="navbar">
        {/* LOGO */}
        <div className="navbar-logo" onClick={() => nav('home')}>
          <img src="/logo.png" alt="Logo" onError={(e) => e.target.style.display = 'none'} />
          <div>
            <div className="navbar-logo-text">Dr Martinović</div>
            <div className="navbar-logo-sub">Radiološka ordinacija · Tutin</div>
          </div>
        </div>

        {/* DESKTOP */}
        <div className="navbar-links nav-linkovi">
          <button className="nav-btn" onClick={() => nav('home')}>Početna</button>
          <button className="nav-btn" onClick={() => nav('o-ordinaciji')}>O ordinaciji</button>

          {!korisnik ? (
            <>
              <button className="nav-btn" onClick={() => nav('login')}>Prijava</button>
              <button className="nav-btn primary" onClick={() => nav('registracija')}>Registracija</button>
            </>
          ) : (
            <>
              {korisnik.user_type === 'pacijent' && (
                <button className="nav-btn primary" onClick={() => nav('zakazivanje')}>+ Zakaži pregled</button>
              )}
              {korisnik.user_type === 'doktor' && (
                <button className="nav-btn" onClick={() => nav('doktor-dashboard')}>Raspored</button>
              )}

              {/* DROPDOWN */}
              <div style={{ position: 'relative' }} ref={ref}>
                <button className="nav-btn"
                  style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1.5px solid', borderColor: dropdown ? 'var(--plava1)' : 'transparent', borderRadius: 20 }}
                  onClick={() => setDropdown(!dropdown)}>
                  <div style={{ width: 28, height: 28, background: 'linear-gradient(135deg, var(--plava2), var(--plava1))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>
                    {korisnik.ime?.[0]}{korisnik.prezime?.[0]}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{korisnik.ime}</span>
                  <span style={{ fontSize: 10, transition: '0.2s', transform: dropdown ? 'rotate(180deg)' : 'none' }}>▼</span>
                </button>

                {dropdown && (
                  <div style={{ position: 'absolute', top: '110%', right: 0, background: '#fff', border: '1px solid rgba(141,188,199,0.3)', borderRadius: 16, padding: 8, minWidth: 220, boxShadow: '0 8px 32px rgba(15,43,51,0.12)', zIndex: 200, animation: 'dropIn 0.15s ease' }}>
                    <div style={{ padding: '12px 14px', borderBottom: '1px solid rgba(141,188,199,0.2)', marginBottom: 6 }}>
                      <p style={{ fontSize: 13, fontWeight: 700 }}>{korisnik.ime} {korisnik.prezime}</p>
                      <p style={{ fontSize: 11, color: 'var(--tekst2)', marginTop: 2 }}>{tipKorisnika(korisnik.user_type)}</p>
                    </div>

                    {linkovi.map(l => (
                      <DItem key={l.str} tekst={l.tekst} onClick={() => nav(l.str)} />
                    ))}
                    <DItem tekst="Promeni lozinku" onClick={() => nav('promena-lozinke')} />

                    <div style={{ borderTop: '1px solid rgba(141,188,199,0.2)', marginTop: 6, paddingTop: 6 }}>
                      <DItem tekst="Odjava" onClick={onLogout} danger />
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* HAMBURGER */}
        <button className="hamburger" onClick={() => setMobilni(!mobilni)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 24, alignItems: 'center', justifyContent: 'center' }}>
          {mobilni ? '✕' : '☰'}
        </button>
      </nav>

      {/* MOBILNI MENI */}
      {mobilni && (
        <div style={{ background: '#fff', borderBottom: '1px solid rgba(141,188,199,0.3)', padding: '12px 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <MItem tekst="Početna" onClick={() => nav('home')} />
          <MItem tekst="O ordinaciji" onClick={() => nav('o-ordinaciji')} />
          {!korisnik ? (
            <>
              <MItem tekst="Prijava" onClick={() => nav('login')} />
              <MItem tekst="Registracija" onClick={() => nav('registracija')} primary />
            </>
          ) : (
            <>
              {linkovi.map(l => <MItem key={l.str} tekst={l.tekst} onClick={() => nav(l.str)} />)}
              <MItem tekst="Promeni lozinku" onClick={() => nav('promena-lozinke')} />
              <MItem tekst="Odjava" onClick={onLogout} danger />
            </>
          )}
        </div>
      )}
    </>
  );
}

const DItem = ({ tekst, onClick, danger }) => {
  const [hover, setHover] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ width: '100%', padding: '10px 14px', background: hover ? (danger ? '#fff0f0' : 'var(--plava4)') : 'transparent', border: 'none', borderRadius: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, fontWeight: 500, color: danger ? '#c0392b' : 'var(--tamna)', fontFamily: 'Manrope, sans-serif', textAlign: 'left' }}>
      {tekst}
    </button>
  );
};

const MItem = ({ tekst, onClick, primary, danger }) => (
  <button onClick={onClick}
    style={{ width: '100%', padding: '12px 16px', background: primary ? 'var(--tamna)' : danger ? '#fff0f0' : 'var(--plava4)', border: 'none', borderRadius: 12, cursor: 'pointer', fontSize: 14, fontWeight: 600, color: primary ? '#fff' : danger ? '#c0392b' : 'var(--tamna)', fontFamily: 'Manrope, sans-serif', textAlign: 'left' }}>
    {tekst}
  </button>
);

export default Navbar;