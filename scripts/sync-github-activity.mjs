// scripts/sync-github-activity.mjs
// Automated daily synchronization of GitHub contribution data for ArtemRivnyi

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

async function syncActivity() {
    console.log('[INFO] Fetching live GitHub contributions for ArtemRivnyi (2026)...');
    const res = await fetch('https://github-contributions-api.jogruber.de/v4/ArtemRivnyi?y=2026');
    if (!res.ok) {
        throw new Error(`Failed to fetch contributions: HTTP ${res.status}`);
    }

    const data = await res.json();
    const rawTotal = data?.total?.[2026];
    const parsedTotal = Number.parseInt(rawTotal, 10);

    // Security check: validate that API response is a legitimate positive integer
    if (Number.isNaN(parsedTotal) || parsedTotal < 0 || parsedTotal > 1000000) {
        throw new Error(`Invalid or suspicious contribution total received from API: ${rawTotal}`);
    }

    const formattedTotal = parsedTotal.toLocaleString('en-US');
    console.log(`[SUCCESS] Total contributions in 2026 (validated): ${formattedTotal}`);

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
    console.log('[SUCCESS] Updated index.html counters.');

    // Compute REAL_CONTRIBUTIONS_2026 array matching verified API data
    const jan1 = new Date('2026-01-01T00:00:00Z');
    const jan1Day = jan1.getUTCDay();
    const entries = [];

    if (Array.isArray(data.contributions)) {
        data.contributions.forEach((day) => {
            if (day.count > 0) {
                const dt = new Date(`${day.date}T00:00:00Z`);
                const diffDays = Math.round((dt - jan1) / (1000 * 60 * 60 * 24));
                const w = Math.floor((diffDays + jan1Day) / 7);
                const d = dt.getUTCDay();
                const lvl = day.level > 0 ? day.level : (day.count >= 30 ? 4 : day.count >= 15 ? 3 : day.count >= 5 ? 2 : 1);
                const dateFormatted = dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
                entries.push({ w, d, lvl, c: day.count, date: dateFormatted });
            }
        });
    }

    const entriesFormatted = entries.map((e) => {
        const wStr = String(e.w).padStart(2, ' ');
        const cStr = String(e.c).padStart(2, ' ');
        return `    { w: ${wStr}, d: ${e.d}, lvl: ${e.lvl}, c: ${cStr}, date: '${e.date}' },`;
    }).join('\n');
    const replacementBlock = `const REAL_CONTRIBUTIONS_2026 = [\n${entriesFormatted}\n];`;

    // Update script.js and script.exports.js
    for (const file of ['script.js', 'script.exports.js']) {
        const targetPath = path.join(rootDir, file);
        if (fs.existsSync(targetPath)) {
            let fileContent = fs.readFileSync(targetPath, 'utf8');
            if (entries.length > 0) {
                fileContent = fileContent.replace(/const REAL_CONTRIBUTIONS_2026 = \[([\s\S]*?)\];/, replacementBlock);
            }
            fileContent = fileContent.replace(
                /'2026':\s*\{\s*total:\s*'[^']+',\s*countText:\s*'[^']+'\s*\}/,
                `'2026': { total: '${formattedTotal}', countText: '${formattedTotal} contributions in 2026' }`
            );
            fs.writeFileSync(targetPath, fileContent, 'utf8');
            console.log(`[SUCCESS] Updated ${file} total and ${entries.length} heatmap data points.`);
        }
    }

    console.log('[SUCCESS] GitHub activity sync completed successfully!');
}

syncActivity().catch(err => {
    console.error('[ERROR] Error during sync:', err.message);
    process.exit(1);
});
