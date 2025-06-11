import { db } from './firebase.js';
import { collection, getDocs } from 'firebase/firestore';

const container = document.getElementById('artikel-container');

const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");

const snapshot = await getDocs(collection(db, "artikel"));

let ditemukan = false;

snapshot.forEach(doc => {
  const data = doc.data();
  if (data.slug === slug) {
    ditemukan = true;
    container.innerHTML = `
      <h1>${data.judul}</h1>
      <img src="${data.gambar}" width="600" />
      <div>${data.konten}</div>
    `;
  }
});

if (!ditemukan) {
  container.innerHTML = "<p>Artikel tidak ditemukan.</p>";
}
