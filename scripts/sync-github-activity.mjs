// scripts/sync-github-activity.mjs
// Automated daily synchronization of GitHub contribution data for ArtemRivnyi

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

async function syncActivity() {
    console.log('🔄 Fetching live GitHub contributions for ArtemRivnyi (2026)...');
    const res = await fetch('https://github-contributions-api.jogruber.de/v4/ArtemRivnyi?y=2026');
    if (!res.ok) {
        throw new Error(`Failed to fetch contributions: HTTP ${res.status}`);
    }

    const data = await res.json();
    const total2026 = data.total?.[2026] || 1034;
    const formattedTotal = total2026.toLocaleString('en-US');
    console.log(`✅ Total contributions in 2026: ${formattedTotal}`);

    // Update index.html counter badges
    const indexPath = path.join(rootDir, 'index.html');
    let indexHtml = fs.readFileSync(indexPath, 'utf8');
    indexHtml = indexHtml.replace(
        /(id="activity-summary-badge">)[^<]+(<\/span>)/,
        `$1${formattedTotal} contributions in 2026$2`
    );
    indexHtml = indexHtml.replace(
        /(id="activity-contrib-count">)[^<]+(<\/span>)/,
        `$1${formattedTotal} contributions in 2026$2`
    );
    fs.writeFileSync(indexPath, indexHtml, 'utf8');
    console.log('✅ Updated index.html counters.');

    // Update script.js and script.exports.js
    for (const file of ['script.js', 'script.exports.js']) {
        const filePath = path.join(rootDir, file);
        if (fs.existsSync(filePath)) {
            let content = fs.readFileSync(filePath, 'utf8');
            content = content.replace(
                /'2026':\s*\{\s*total:\s*'[^']+',\s*countText:\s*'[^']+'\s*\}/,
                `'2026': { total: '${formattedTotal}', countText: '${formattedTotal} contributions in 2026' }`
            );
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Updated ${file} total.`);
        }
    }

    console.log('🎉 GitHub activity sync completed successfully!');
}

syncActivity().catch(err => {
    console.error('❌ Error during sync:', err.message);
    process.exit(1);
});
