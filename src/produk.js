import { db } from "./lib/firebase";
import { logClick } from "./lib/logger";
import { collection, getDocs } from "firebase/firestore";

async function tampilkanProduk() {
  const container = document.getElementById("produk-container");
  const querySnapshot = await getDocs(collection(db, "produk"));

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${data.nama}</h3>
      <img src="${data.gambar}" width="150" />
      <p>${data.deskripsi}</p>
      <button data-url="${data.shopee_url}" data-id="${doc.id}">Beli Sekarang</button>
      <hr/>
    `;
    container.appendChild(div);
  });

  container.addEventListener("click", async (e) => {
    if (e.target.tagName === "BUTTON") {
      const url = e.target.getAttribute("data-url");
      const id = e.target.getAttribute("data-id");
      await logClick(id, url);
      window.open(url, "_blank");
    }
  });
}

tampilkanProduk();
