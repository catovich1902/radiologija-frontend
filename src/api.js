import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Token ${token}`;
  return config;
});

// Auth
export const registracija = (data) => API.post('/registracija/', data);
export const login = (data) => API.post('/login/', data);
export const logout = () => API.post('/logout/');
export const getMojProfil = () => API.get('/profil/');
export const zaboravljenaLozinka = (data) => API.post('/zaboravljena-lozinka/', data);
export const resetLozinke = (data) => API.post('/reset-lozinke/', data);
export const promeniLozinku = (data) => API.post('/promeni-lozinku/', data);

// Termini i pregledi
export const getTermini = () => API.get('/termini/');
export const zakaziPregled = (data) => API.post('/zakazi/', data);
export const getMojiPregledi = () => API.get('/moji-pregledi/');
export const otkaziPregled = (id) => API.post(`/otkazi/${id}/`);

// Doktor
export const getDoktorDashboard = () => API.get('/doktor/dashboard/');

export default API;