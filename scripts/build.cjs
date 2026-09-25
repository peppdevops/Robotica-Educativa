const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { execFileSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
let html = read('index.html');
const configScript = html.match(/<script id="tailwind-config">([\s\S]*?)<\/script>/);
const context = { tailwind: {} };
vm.runInNewContext(configScript[1], context);
const config = context.tailwind.config;
config.content = ['./index.html', './components/*.html', './sections/*.html', './js/*.js'];
fs.mkdirSync(path.join(root, 'dist'), { recursive: true });
fs.writeFileSync(path.join(root, 'dist/tailwind.config.json'), JSON.stringify(config));
fs.writeFileSync(path.join(root, 'dist/input.css'), '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n');
execFileSync(process.execPath, [require.resolve('tailwindcss/lib/cli.js'), '-c', 'dist/tailwind.config.json', '-i', 'dist/input.css', '-o', 'dist/tailwind.css', '--minify'], { cwd: root, stdio: 'inherit' });
html = html.replace(/<script src="https:\/\/cdn\.tailwindcss\.com[^\"]*"><\/script>/, '<link rel="stylesheet" href="tailwind.css">')
  .replace(configScript[0], '')
  .replace('<div id="navbar"></div>', '<div id="navbar">' + read('components/navbar.html') + '</div>')
  .replace('<main id="main-content" class="site-main"></main>', '<main id="main-content" class="site-main">' + ['hero', 'grid', 'kits', 'cta', 'profile'].map(name => read(`sections/${name}.html`)).join('\n') + '</main>')
  .replace('<div id="footer"></div>', '<div id="footer">' + read('components/footer.html') + '</div>')
  .replace('<body ', '<body data-static="true" ');
fs.writeFileSync(path.join(root, 'dist/index.html'), html);
for (const dir of ['assets', 'css', 'js']) fs.cpSync(path.join(root, dir), path.join(root, 'dist', dir), { recursive: true });
for (const file of ['input.css', 'tailwind.config.json']) fs.unlinkSync(path.join(root, 'dist', file));
console.log('Sitio listo en dist/');
