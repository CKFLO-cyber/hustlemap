const fs = require('fs');
const path = require('path');

function makeOfflineIndex() {
  const outDir = path.join(process.cwd(), 'out');
  const outIndexPath = path.join(outDir, 'index.html');
  const rootIndexPath = path.join(process.cwd(), 'index.html');

  // Check if out/ directory exists
  if (!fs.existsSync(outDir)) {
    console.error('❌ out/ directory not found. Please run "npm run export" first.');
    process.exit(1);
  }

  // Check if out/index.html exists
  if (!fs.existsSync(outIndexPath)) {
    console.error('❌ out/index.html not found. Please run "npm run export" first.');
    process.exit(1);
  }

  try {
    // Read the exported index.html
    let html = fs.readFileSync(outIndexPath, 'utf8');

    // Rewrite root-absolute asset links to relative
    html = html.replace(/href="\/_next/g, 'href="_next');
    html = html.replace(/src="\/_next/g, 'src="_next');
    html = html.replace(/href="\/public/g, 'href="public');
    html = html.replace(/src="\/public/g, 'src="public');

    // Inject base href for relative paths
    const baseTag = '<base href="./">';
    if (!html.includes('<base')) {
      html = html.replace('<head>', `<head>\n    ${baseTag}`);
    }

    // Write the processed HTML to project root
    fs.writeFileSync(rootIndexPath, html, 'utf8');

    console.log('✅ Successfully created offline index.html at project root');
    console.log('📁 You can now double-click index.html to open the site offline');
    
  } catch (error) {
    console.error('❌ Error processing index.html:', error.message);
    process.exit(1);
  }
}

// Run the script
makeOfflineIndex();
