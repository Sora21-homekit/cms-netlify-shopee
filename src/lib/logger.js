import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export async function logClick(productId, shopeeUrl) {
  try {
    await addDoc(collection(db, "click_logs"), {
      productId,
      shopeeUrl,
      timestamp: serverTimestamp(),
      source: document.referrer || "direct",
    });
    console.log("✅ Klik dicatat");
  } catch (e) {
    console.error("❌ Gagal mencatat klik:", e);
  }
}
