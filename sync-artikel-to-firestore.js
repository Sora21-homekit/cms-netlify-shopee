import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();

// DEBUG: Cek apakah env terbaca
console.log("ENV:", process.env.FIREBASE_KEY);

// Init Firebase Admin
const serviceAccount = process.env.FIREBASE_KEY
  ? JSON.parse(process.env.FIREBASE_KEY)
  : JSON.parse(fs.readFileSync('serviceAccountKey.json', 'utf8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Bungkus dengan async IIFE
(async () => {
  const folderPath = './content/artikel';
  const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.md'));
  console.log("File .md ditemukan:", files); // <- cek file .md terbaca dengan benar atau tidak

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { data, content: isiArtikel } = matter(content);

    const docData = {
      judul: data.title,
      slug: data.slug,
      adsense: data.adsense ?? true,
      konten: isiArtikel,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };

    await db.collection('artikel').doc(data.slug).set(docData);
    console.log(`✔ Artikel "${data.title}" diupload.`);
  }
})();