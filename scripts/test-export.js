const fs = require('fs');
const path = require('path');

console.log('🧪 Testing static export setup...\n');

// Check if next.config.js has the right settings
const nextConfigPath = path.join(process.cwd(), 'next.config.js');
if (fs.existsSync(nextConfigPath)) {
  const config = fs.readFileSync(nextConfigPath, 'utf8');
  const hasExport = config.includes("output: 'export'");
  const hasUnoptimized = config.includes('unoptimized: true');
  
  console.log('✅ next.config.js exists');
  console.log(`   - Static export: ${hasExport ? '✅' : '❌'}`);
  console.log(`   - Images unoptimized: ${hasUnoptimized ? '✅' : '❌'}`);
} else {
  console.log('❌ next.config.js not found');
}

// Check if package.json has the right scripts
const packagePath = path.join(process.cwd(), 'package.json');
if (fs.existsSync(packagePath)) {
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const scripts = packageJson.scripts || {};
  
  console.log('\n✅ package.json exists');
  console.log(`   - export script: ${scripts.export ? '✅' : '❌'}`);
  console.log(`   - preview:static script: ${scripts['preview:static'] ? '✅' : '❌'}`);
  console.log(`   - offline:index script: ${scripts['offline:index'] ? '✅' : '❌'}`);
} else {
  console.log('\n❌ package.json not found');
}

// Check if the offline index script exists
const offlineScriptPath = path.join(process.cwd(), 'scripts', 'makeOfflineIndex.js');
if (fs.existsSync(offlineScriptPath)) {
  console.log('\n✅ makeOfflineIndex.js script exists');
} else {
  console.log('\n❌ makeOfflineIndex.js script not found');
}

// Check if .gitignore has the right entries
const gitignorePath = path.join(process.cwd(), '.gitignore');
if (fs.existsSync(gitignorePath)) {
  const gitignore = fs.readFileSync(gitignorePath, 'utf8');
  const hasOut = gitignore.includes('/out');
  const hasIndexHtml = gitignore.includes('/index.html');
  
  console.log('\n✅ .gitignore exists');
  console.log(`   - Ignores /out: ${hasOut ? '✅' : '❌'}`);
  console.log(`   - Ignores /index.html: ${hasIndexHtml ? '✅' : '❌'}`);
} else {
  console.log('\n❌ .gitignore not found');
}

console.log('\n🎯 Next steps:');
console.log('1. Run: npm install');
console.log('2. Run: npm run export');
console.log('3. Run: npm run preview:static');
console.log('4. Or run: npm run offline:index to create file-openable version');
console.log('\n✨ Static export setup complete!');
