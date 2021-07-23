const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/*
To add environment variables (that need to be injected at run time) to be used in the React App:
- Add your variable as a key value pair to src/app/host/tmp_config.js as: "YOUR_VAR_NAME": $env.YOUR_VAR_NAME
- Add your variable in your Octupus deployment plan for each specific environment (dev, qa, prod)
- Add your variable declaration to /deploy/application/content/openshift-deployment.yml under "env" section.
*/
module.exports = async (filePath, outputPath) => {
    const hash = crypto.randomBytes(16).toString('hex');

    await fs.readFile(filePath, 'utf8', (err,data) => {
        if (err) throw err;

        let result = data;
        const envMatches = data.match(/\$env([^,\n\r}{}]+)/g);
        for(let i in envMatches) {
            const envVar = envMatches[i].replace(/\$env\./g, '');
            result = result.replace(envMatches[i], `"${process.env[envVar]}"`);
        }
        fs.writeFile(path.join(outputPath, `config${hash}.js`) , result, 'utf8', (err) => {
            if (err) throw err;
        });
    });

    return hash;
}
