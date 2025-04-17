import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';

export default async (req, res) => {
  try {
    const { texte, couvertureBase64 } = req.body;

    if (!texte || texte.trim().length < 100) {
      return res.status(400).json({ error: 'Texte insuffisant pour générer un PDF.' });
    }

    if (texte.length > 800_000) {
      return res.status(413).json({ error: 'Texte trop long pour la génération PDF. Essayez de le réduire.' });
    }

    const templatePath = path.resolve('templates', 'template.html');
    let html = await fs.readFile(templatePath, 'utf-8');

    const contenu = texte
      .split(/\n+/)
      .map((p) => {
        const safe = p.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim();
        if (/^Chapitre\\s+\\d+/i.test(safe)) {
          return `<h2 class="chapitre">${safe}</h2>`;
        }
        return `<p>${safe}</p>`;
      })
      .join("\\n");

    let couvertureHTML = '';
    if (couvertureBase64) {
      couvertureHTML = `
        <div style="page-break-after: always; text-align: center;">
          <img src="${couvertureBase64}" style="max-width: 100%; height: auto;">
        </div>
      `;
    }

    html = html.replace("<!-- contenu injecté dynamiquement -->", `${couvertureHTML}${contenu}`);

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

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename=lifebook.pdf');
    res.send(pdfBuffer);

  } catch (err) {
    console.error("❌ Erreur export PDF :", err);
    res.status(500).json({ error: "Erreur serveur lors de la génération du PDF." });
  }
}
