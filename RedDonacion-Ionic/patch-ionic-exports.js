const fs = require('fs');
const path = require('path');

const pkgPath = path.resolve(__dirname, 'node_modules/@ionic/angular/package.json');
if (fs.existsSync(pkgPath)) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  
  if (!pkg.exports['./directives/*']) {
    pkg.exports['./directives/*'] = {
      "types": "./directives/*.d.ts",
      "esm2022": "./esm2022/directives/*.mjs",
      "esm": "./esm2022/directives/*.mjs",
      "default": "./esm2022/directives/*.mjs"
    };
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
    console.log('Successfully patched @ionic/angular/package.json to fix Angular deep imports issues.');
  }
}
