const fs = require('fs-extra');
const path = require('path');

function copyScaffold() {
    console.log('Copying scaffold files to package...');
    fs.copySync(path.join(__dirname, 'scaffold'), path.join(__dirname, 'package/scaffold'));
}

function createPackageJson() {
    console.log('Writing package.json...');
    const adminUiPackageJson = require(path.join(__dirname, '../admin-ui/package.json'));
    const uiDevkitPackageJson = require(path.join(__dirname, 'package.json'));
    const dependenciesToAdd = Object.fromEntries(Object.entries(adminUiPackageJson.dependencies)
        .filter(([dep]) => !/^@vendure\//.test(dep)));
    const newPackageJson = {
        ...uiDevkitPackageJson,
        dependencies: {
            ...uiDevkitPackageJson.dependencies,
            ...dependenciesToAdd,
        }
    }
    fs.writeFileSync(path.join(__dirname, 'package/package.json'), JSON.stringify(newPackageJson, null, 2), 'utf8');
}

fs.ensureDirSync(path.join(__dirname, 'package'));
copyScaffold();
createPackageJson();
