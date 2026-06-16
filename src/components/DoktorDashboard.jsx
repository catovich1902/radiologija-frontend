import React, { useState, useEffect } from 'react';
import { getDoktorDashboard } from '../api';
import Spinner from './Spinner';

const IKONE = { RTG: '𐂯', UZV: '🕪', CT: '🖳', MRI: '𓍹' };
const MESECI = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Avg', 'Sep', 'Okt', 'Nov', 'Dec'];

const fmt = (dv) => {
  const d = new Date(dv.replace('Z', '').replace('T', ' '));
  return {
    dan: d.getDate(),
    mesec: MESECI[d.getMonth()],
    vreme: d.toLocaleTimeString('sr-RS', { hour: '2-digit', minute: '2-digit' }),
    datumPun: d.toLocaleDateString('sr-RS', { day: '2-digit', month: '2-digit', year: 'numeric' }),
  };
};

const grupisaj = (pregledi) => {
  return pregledi.reduce((grupe, p) => {
    const kljuc = new Date(p.termin.datum_vreme).toDateString();
    if (!grupe[kljuc]) grupe[kljuc] = [];
    grupe[kljuc].push(p);
    return grupe;
  }, {});
};

function DoktorDashboard() {
  const [podaci, setPodaci] = useState(null);
  const [ucitava, setUcitava] = useState(true);
  const [greska, setGreska] = useState('');
  const [aktivniTab, setAktivniTab] = useState('danas');
  const [pretraga, setPretraga] = useState('');

  const ime = localStorage.getItem('ime');
  const prezime = localStorage.getItem('prezime');
  const danas = new Date().toDateString();

  useEffect(() => {
    getDoktorDashboard()
      .then(res => setPodaci(res.data))
      .catch(() => setGreska('Greška pri učitavanju rasporeda.'))
      .finally(() => setUcitava(false));
  }, []);

  const pregledaDanas = podaci?.pregledi?.filter(p =>
    new Date(p.termin.datum_vreme).toDateString() === danas) || [];

  const pregledaBuduci = podaci?.pregledi?.filter(p =>
    new Date(p.termin.datum_vreme).toDateString() !== danas) || [];

  const prikazani = aktivniTab === 'danas' ? pregledaDanas : pregledaBuduci;

  const filtrirani = prikazani.filter(p =>  
    `${p.pacijent.user.first_name} ${p.pacijent.user.last_name}`    
      .toLowerCase()    
      .includes(pretraga.toLowerCase())
  );

  return (
    <div>
      {/* HEADER */}
      <div style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #C4E1E6 100%)',
        borderRadius: 24, padding: '40px 48px', marginBottom: 28,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        border: '1px solid rgba(141,188,199,0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{
            width: 72, height: 72,
            background: 'linear-gradient(135deg, #A4CCD9, #8DBCC7)',
            borderRadius: '50%', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: 28,
            border: '3px solid rgba(255,255,255,0.8)'
          }}>👨‍⚕️</div>
          <div>
            <h2 style={{ fontSize: 26, fontWeight: 600, color: '#0f2b33', fontFamily: 'Fraunces, serif' }}>
              Dr {ime} {prezime}
            </h2>
            <p style={{ fontSize: 14, color: '#4a6b75', marginTop: 4 }}>
              Specijalista radiologije · Tutin
            </p>
          </div>
        </div>

        {podaci && (
          <div style={{ display: 'flex', gap: 16 }}>
            {[
              { val: pregledaDanas.length, lbl: 'Danas' },
              { val: pregledaBuduci.length, lbl: 'Predstojeći' },
              { val: podaci.pregledi.length, lbl: 'Ukupno' },
            ].map((s, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.7)',
                border: '1px solid rgba(255,255,255,0.9)',
                borderRadius: 16, padding: '14px 20px', textAlign: 'center', minWidth: 80
              }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: '#0f2b33', fontFamily: 'Fraunces, serif' }}>{s.val}</div>
                <div style={{ fontSize: 11, color: '#4a6b75', marginTop: 2 }}>{s.lbl}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {greska && <div className="error-msg">{greska}</div>}

      {ucitava ? <Spinner tekst="Učitavanje rasporeda..." /> : podaci ? (
        <>
          {/* TABOVI */}
          <div className="tabs">
            {[
              { key: 'danas', label: `🗓 Danas (${pregledaDanas.length})` },
              { key: 'budući', label: `🗓 Predstojeći (${pregledaBuduci.length})` },
            ].map(t => (
              <button key={t.key}
                className={`tab-btn ${aktivniTab === t.key ? 'active' : ''}`}
                onClick={() => setAktivniTab(t.key)}>
                {t.label}
              </button>
            ))}
          </div>

          {/* COMBOBOX PRETRAGA */}
          <div style={{ position: 'relative', marginBottom: 20 }}>  
            <input    
              type="text"    
              value={pretraga}    
              onChange={(e) => setPretraga(e.target.value)}    
              placeholder="🔍 Pretražite pacijenta..."    
              style={{      
                width: '100%', padding: '12px 16px',      
                border: '1.5px solid var(--plava3)',      
                borderRadius: 12, fontSize: 14,      
                fontFamily: 'Manrope, sans-serif',      
                color: 'var(--tamna)', background: '#fff',      
                outline: 'none', transition: 'all 0.2s',    
              }}    
              onFocus={e => e.target.style.borderColor = 'var(--plava1)'}    
              onBlur={e => e.target.style.borderColor = 'var(--plava3)'}  
            />  
            {/* DROPDOWN LISTA */}  
            {pretraga && (    
              <div style={{      
                position: 'absolute', top: '110%', left: 0,      
                width: '100%', background: '#fff',      
                border: '1px solid var(--plava3)',      
                borderRadius: 12, zIndex: 100,      
                boxShadow: '0 8px 24px rgba(141,188,199,0.2)',      
                maxHeight: 200, overflowY: 'auto',    
              }}>      
                {filtrirani.length === 0 ? (        
                  <div style={{ padding: '12px 16px', fontSize: 13, color: 'var(--tekst2)' }}>          
                    Nema rezultata        
                  </div>      
                ) : (        
                  filtrirani.map((p, i) => (          
                    <div key={i}            
                      onClick={() => setPretraga(`${p.pacijent.user.first_name} ${p.pacijent.user.last_name}`)}            
                      style={{              
                        padding: '10px 16px', fontSize: 13,              
                        cursor: 'pointer', color: 'var(--tamna)',              
                        borderBottom: '1px solid var(--plava4)',              
                        transition: 'background 0.15s',            
                      }}            
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--plava4)'}            
                      onMouseLeave={e => e.currentTarget.style.background = '#fff'}          
                    >            
                      👤 {p.pacijent.user.first_name} {p.pacijent.user.last_name}          
                    </div>        
                  ))      
                )}    
              </div>  
            )}
          </div>

          {/* PREGLEDI */}
          {filtrirani.length === 0 ? (
            <div style={{ background: '#fff', border: '1px solid rgba(141,188,199,0.2)', borderRadius: 20, padding: '56px 32px', textAlign: 'center' }}>
              <div style={{ fontSize: 52, marginBottom: 16 }}>{aktivniTab === 'danas' ? '' : '🗓'}</div>
              <h3 style={{ color: '#0f2b33', fontSize: 18, fontWeight: 600, fontFamily: 'Fraunces, serif', marginBottom: 8 }}>
                {aktivniTab === 'danas' ? 'Slobodan dan!' : 'Nema predstoječih pregleda'}
              </h3>
              <p style={{ color: '#4a6b75', fontSize: 14 }}>
                {aktivniTab === 'danas' ? 'Nemate zakazanih pregleda za danas.' : 'Nemate zakazanih pregleda u narednim danima.'}
              </p>
            </div>
          ) : (
            Object.entries(grupisaj(filtrirani)).map(([datum, pregledi]) => {
              const d = fmt(pregledi[0].termin.datum_vreme);
              const jeDanas = datum === danas;
              return (
                <div key={datum} style={{ marginBottom: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <div style={{
                      background: jeDanas ? '#0f2b33' : 'linear-gradient(135deg, #C4E1E6, #A4CCD9)',
                      borderRadius: 10, padding: '6px 16px',
                      fontSize: 13, fontWeight: 700,
                      color: jeDanas ? '#ffffff' : '#0f2b33'
                    }}>
                      {jeDanas ? '🗓 Danas' : d.datumPun}
                    </div>
                    <div style={{ height: 1, flex: 1, background: 'rgba(141,188,199,0.3)' }} />
                    <span style={{ fontSize: 12, color: '#4a6b75', fontWeight: 600 }}>
                      {pregledi.length} pregled{pregledi.length > 1 ? 'a' : ''}
                    </span>
                  </div>

                  {pregledi.map((p, index) => {
                    const pd = fmt(p.termin.datum_vreme);
                    return (
                      <div key={p.id} className="pregled-card">
                        <div className="pregled-left">
                          <div style={{
                            width: 36, height: 36,
                            background: 'linear-gradient(135deg, #C4E1E6, #A4CCD9)',
                            borderRadius: '50%', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#0f2b33'
                          }}>{index + 1}</div>
                          <div className="date-box">
                            <div className="day">{pd.dan}</div>
                            <div className="month">{pd.mesec}</div>
                          </div>
                          <div className="pregled-info">
                            <h4>{IKONE[p.vrsta_pregleda]} {p.vrsta_pregleda_display}</h4>
                            <p>◴ {pd.vreme} · ⏱ {p.termin.trajanje_minuta} min</p>
                            <p style={{ marginTop: 3 }}>👤 {p.pacijent.user.first_name} {p.pacijent.user.last_name}</p>
                            {p.napomena && <p style={{ color: '#4a6b75', marginTop: 4, fontSize: 12 }}>🗒 {p.napomena}</p>}
                          </div>
                        </div>
                        <div className="pregled-right">
                          <span className="status-badge status-zakazan">Zakazano</span>
                          <span style={{ fontSize: 13, color: '#0f2b33', fontWeight: 700 }}>
                            {p.cena.toLocaleString()} din
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })
          )}
        </>
      ) : null}
    </div>
  );
}

export default DoktorDashboard;