import React from 'react';

function Spinner({ tekst = 'Učitavanje...' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', gap: 16 }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{ width: 48, height: 48, border: '4px solid var(--plava3)', borderTop: '4px solid var(--plava1)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <p style={{ color: 'var(--tekst2)', fontSize: 14, fontFamily: 'Manrope, sans-serif' }}>{tekst}</p>
    </div>
  );
}

export default Spinner;