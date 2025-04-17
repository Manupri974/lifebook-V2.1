import express from 'express';
import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { texte } = req.body;

    // ❌ Cas : texte vide ou trop court
    if (!texte || texte.trim().length < 100) {
      return res.status(400).json({ error: 'Texte insuffisant pour générer un PDF.' });
    }

    // ❌ Cas : texte trop long pour Puppeteer/render
    if (texte.length > 800_000) {
      return res.status(413).json({ error: 'Texte trop long pour la génération PDF. Essayez de le réduire.' });
    }

    // 📄 Charger le template HTML
    const templatePath = path.resolve('templates', 'template.html');
    let html = await fs.readFile(templatePath, 'utf-8');

    // ✍️ Formatter le contenu en HTML
    const contenu = texte
      .split(/\n+/)
      .map((p) => {
        const safe = p.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim();
        if (/^Chapitre\s+\d+/i.test(safe)) {
          return `<h2 class="chapitre">${safe}</h2>`;
        }
        return `<p>${safe}</p>`;
      })
      .join("\n");

    // 🧩 Injecter le contenu dans le template
    html = html.replace("<!-- contenu injecté dynamiquement -->", contenu);

    // 🖨️ Génération PDF avec Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A5',
      printBackground: true,
      margin: {
        top: '25mm',
        bottom: '25mm',
        left: '25mm',
        right: '25mm',
      }
    });

    await browser.close();

    // 📤 Envoyer le PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename=lifebook.pdf');
    res.send(pdfBuffer);

  } catch (err) {
    console.error("❌ Erreur export PDF :", err);
    res.status(500).json({ error: "Erreur serveur lors de la génération du PDF." });
  }
});

export default router;
