const path = require('path');
const fs = require('fs');
// Copies the main package.json file into the lib directory so that
// ng-packagr can use it when generating the library bundle

console.log('Copying main package.json to library...');
const packageJson = require('../package.json');
const depsToRemove = [
    '@angular/core',
    '@angular/forms',
    '@angular/router',
    'rxjs',
    '@vendure/common',
    '@vendure/ui-devkit',
];
const deps = Object.fromEntries(
    Object.entries(packageJson.dependencies).filter(([dep]) => !depsToRemove.includes(dep)),
);
const subset = {
    name: packageJson.name,
    version: packageJson.version,
    license: packageJson.license,
    dependencies: deps,
};
fs.writeFileSync(path.join(__dirname, '/../src/lib/package.json'), JSON.stringify(subset, null, 2), 'utf8');
