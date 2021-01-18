const renderLicenseSection = license => {
    if (license === undefined) {
        return ""
    } else {
        return `
## License:
[${license}](http://choosealicense.com/licenses/${license}/)
        `;
    }
}

// TODO: Create a function to generate markdown for README
// function generateMarkdown(data) {
//   return `# ${data.title}
const generateMarkdown = readmeData => {
    const {title, description, installation, license, contributions, tests, githubUsername, email} = readmeData;
    return `
# ${title}

## Description:

${description}

## Table of Contents

* [installation](#installation)
* [usage](#usage)
* [contributions](#contributions)
* [testing](#tests)
* [questions](#questions)

## Installation:

${installation}

## Contributions:

${contributions}

## Tests:

${tests}

${renderLicenseSection(license)}

## Questions:

Please direct any questions to ${githubUsername} on GitHub or email ${email}.
    `;
};
// `;
// }

module.exports = generateMarkdown;
