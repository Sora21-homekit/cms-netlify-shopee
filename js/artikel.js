import { db } from './firebase.js';
import { collection, getDocs } from 'firebase/firestore';

const daftar = document.getElementById('daftar-artikel');

const snapshot = await getDocs(collection(db, "artikel"));

snapshot.forEach(doc => {
  const data = doc.data();
  const div = document.createElement("div");
  div.innerHTML = `
    <h3><a href="/artikel-view.html?slug=${data.slug}">${data.judul}</a></h3>
    <img src="${data.gambar}" width="300" />
    <hr />
  `;
  daftar.appendChild(div);
});
