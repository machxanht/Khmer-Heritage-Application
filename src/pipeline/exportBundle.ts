/**
 * CLI runner for Content Bundle Exporter
 * Command: npm run content:export
 */

import { exportContentBundle } from './exporter.ts';

function main() {
  console.log('\n╔═══════════════════════════════════════════════════════════════════════════╗');
  console.log('║           KHMER HERITAGE — PRODUCTION CONTENT BUNDLE EXPORTER             ║');
  console.log('╚═══════════════════════════════════════════════════════════════════════════╝\n');

  const startTime = performance.now();
  const result = exportContentBundle();
  const durationMs = +(performance.now() - startTime).toFixed(2);

  console.log(`📁 Output Bundle Directory : ${result.outputDir}`);
  console.log(`📦 Manifest Version        : ${result.manifest.version} (schema v${result.manifest.schemaVersion})`);
  console.log(`🔒 Content Hash (SHA-256)  : ${result.contentHash}`);
  console.log(`📑 Exported Categories     : ${result.exportedCategoriesCount}`);
  console.log(`🏛️ Exported Entries        : ${result.exportedEntriesCount}`);
  console.log(`📄 Total Exported Files    : ${result.exportedFiles.length}`);
  console.log(`⏱️ Export Execution Time   : ${durationMs} ms\n`);

  console.log('Generated Files:');
  result.exportedFiles.forEach((file) => {
    console.log(`  - ${file.replace(process.cwd(), '.')}`);
  });

  console.log('\n✅ Content bundle export completed successfully.\n');
}

main();
