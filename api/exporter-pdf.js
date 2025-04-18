import express from 'express';
import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { texte, couvertureBase64 } = req.body;

    // ✅ Vérification minimale du texte reçu
    if (!texte || typeof texte !== 'string' || texte.trim().length < 100) {
      return res.status(400).json({ error: 'Texte insuffisant pour générer un PDF.' });
    }

    if (texte.length > 800_000) {
      return res.status(413).json({ error: 'Texte trop long pour la génération PDF.' });
    }

    // 📄 Chargement du template HTML
    const templatePath = path.resolve('templates', 'template.html');
    let html = await fs.readFile(templatePath, 'utf-8');

    // 🖋️ Sécuriser et formatter le contenu en HTML
    const contenu = texte
      .split(/\n+/)
      .map(p => {
        const safe = p.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim();
        if (/^Chapitre\\s+\\d+/i.test(safe)) {
          return `<h2 class="chapitre">${safe}</h2>`;
        }
        return `<p>${safe}</p>`;
      })
      .join("\n");

    // 📸 Préparation éventuelle de la couverture
    let couvertureHTML = '';
    if (couvertureBase64 && typeof couvertureBase64 === 'string' && couvertureBase64.startsWith('data:image/')) {
      couvertureHTML = `
        <div style="page-break-after: always; text-align: center;">
          <img src="${couvertureBase64}" style="max-width: 100%; height: auto;">
        </div>
      `;
    }

    // 🧩 Injection dans le template
    html = html.replace('<!-- contenu injecté dynamiquement -->', `${couvertureHTML}${contenu}`);

    // 🖨️ Génération du PDF via Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A5',
      printBackground: true,
      margin: { top: '25mm', bottom: '25mm', left: '25mm', right: '25mm' }
    });

    await browser.close();

    // 📤 Envoi du PDF généré
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename=lifebook.pdf');
    res.send(pdfBuffer);

  } catch (error) {
    console.error('❌ Erreur serveur exporter-pdf :', error);
    res.status(500).json({ error: 'Erreur serveur pendant la génération du PDF.' });
  }
});

export default router;
