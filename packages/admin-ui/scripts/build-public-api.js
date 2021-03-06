// @ts-check
const fs = require('fs');
const path = require('path');
// This script finds all app sources and then generates a "public-api.ts" file exporting their
// contents. This is then used as the public API entrypoint for the Angular CLI's library
// builder process.

console.log('Generating public apis...');
const SOURCES_DIR = path.join(__dirname, '/../src/lib');
const APP_SOURCE_FILE_PATTERN = /\.ts$/;
const EXCLUDED_PATTERN = /(public_api|spec|mock)\.ts$/;

const MODULES = [
    'catalog',
    'core',
    'customer',
    'vendor',
    'dashboard',
    'login',
    'marketing',
    'order',
    'settings',
];

for (const moduleDir of MODULES) {
    const modulePath = path.join(SOURCES_DIR, moduleDir, 'src');

    const files = [];
    forMatchingFiles(modulePath, APP_SOURCE_FILE_PATTERN, filename => {
        if (!EXCLUDED_PATTERN.test(filename)) {
            const relativeFilename = '.' + filename.replace(modulePath, '')
                .replace(/\\/g, '/')
                .replace(/\.ts$/, '');
            files.push(relativeFilename);
        }
    });
    const header = `// This file was generated by the build-public-api.ts script\n`;
    // Update to prevent type duplicated
    const fileContents = header + files.map(f => {
        if (['./common/generated-vendor-types'].indexOf(f) >= 0) {
            return `import * as VT from '${f}';` + '\n' + `export {VT};`
        }
        if (['./common/introspection-vendor-result'].indexOf(f) >= 0) {
            return `import * as IVR from '${f}';` + '\n' + `export {IVR};`
        }
        return `export * from '${f}';`
    }).join('\n') + '\n';
    const publicApiFile = path.join(modulePath, 'public_api.ts');
    fs.writeFileSync(publicApiFile, fileContents, 'utf8');
    console.log(`Created ${publicApiFile}`);
}

/**
 *
 * @param startPath {string}
 * @param filter {RegExp}
 * @param callback {(filename: string) => void}
 */
function forMatchingFiles(startPath, filter, callback) {
    if (!fs.existsSync(startPath)) {
        console.log('Starting path does not exist ', startPath);
        return;
    }

    const files = fs.readdirSync(startPath);
    for (let i = 0; i < files.length; i++) {
        const filename = path.join(startPath, files[i]);
        const stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            forMatchingFiles(filename, filter, callback); // recurse
        } else if (filter.test(filename)) {
            callback(filename);
        }
    }
}
