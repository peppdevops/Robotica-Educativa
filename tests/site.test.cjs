const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');

test('La publicación contiene las secciones y todos sus recursos locales', () => {
    const html = fs.readFileSync(path.join(root, 'dist/index.html'), 'utf8');
    for (const id of ['hero', 'grid', 'projects', 'cta', 'profile']) assert.ok(html.includes(`id="${id}"`));
    assert.ok(!html.includes('cdn.tailwindcss.com'));
    for (const [, resource] of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
        if (/^https?:/.test(resource)) continue;
        assert.ok(!resource.startsWith('/'), `Ruta incompatible con subcarpetas: ${resource}`);
        assert.ok(fs.existsSync(path.join(root, 'dist', resource)), `Recurso ausente: ${resource}`);
    }
});

test('El modo estático no hace peticiones de fragmentos', async () => {
    let fetchCount = 0;
    const context = {
        document: { body: { dataset: { static: 'true' } }, getElementById: () => null },
        fetch: () => { fetchCount++; throw new Error('No debe ejecutarse'); }, console
    };
    vm.createContext(context);
    vm.runInContext(fs.readFileSync(path.join(root, 'js/main.js'), 'utf8'), context);
    await new Promise(resolve => setImmediate(resolve));
    assert.equal(fetchCount, 0);
});

test('Un 404 o error de red en desarrollo no elimina las otras secciones', async () => {
    let rendered = '';
    const containers = { navbar: {}, footer: {} };
    const errors = [];
    const context = {
        document: {
            body: { dataset: {} },
            getElementById: id => containers[id] || null,
            querySelector: () => ({ insertAdjacentHTML: (_, html) => { rendered += html; } })
        },
        location: { hash: '' },
        console: { error: error => errors.push(error) },
        fetch: async file => {
            if (file.includes('grid')) return { ok: false, status: 404 };
            if (file.includes('kits')) throw new Error('Sin conexión');
            return { ok: true, text: async () => `<p>${file}</p>` };
        }
    };
    vm.createContext(context);
    vm.runInContext(fs.readFileSync(path.join(root, 'js/main.js'), 'utf8'), context);
    await new Promise(resolve => setImmediate(resolve));
    assert.ok(rendered.includes('sections/profile.html'));
    assert.ok(rendered.includes('id="grid"'));
    assert.ok(rendered.includes('id="projects"'));
    assert.equal(errors.length, 2);
});
