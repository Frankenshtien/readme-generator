// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
// function renderLicenseBadge(license) {}
// const renderLicenseBadge = license => {
//     if (license === undefined) {
//         return ""
//     } else {
//         licenseType = JSON.stringify(license.license);
//         return `
// [${licenseType}]
//         `;
//     };
// };
// // TODO: Create a function that returns the license link
// // If there is no license, return an empty string
// // function renderLicenseLink(license) {}
// const renderLicenseLink = license => {
//     if (license === undefined) {
//         return "";
//     } else {
//          `
// (http://choosealicense.com/licenses/${license}/)
//         `;
//     };
// };
// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
// function renderLicenseSection(license) {}
// const renderLicenseSection = license => {
//     if (license === undefined) {
//         return ""
//     } else {
//         return `
// ## License:
// ${renderLicenseBadge(license)}${renderLicenseLink(license)}
//         `;
//     };
// };

const renderLicenseSection = license => {
    if (license === undefined) {
        return ""
    } else {
        let licenseType = JSON.stringify(license).toLowerCase();
        return `
## License:
[${licenseType}](http://choosealicense.com/licenses/${licenseType}/)
        `;
    }
}

// TODO: Create a function to generate markdown for README
// function generateMarkdown(data) {
//   return `# ${data.title}
const generateMarkdown = readmeData => {
    const {title, description, installation, license, contributions, githubUsername, email} = readmeData;
    return `
# ${title}

## Description:

${description}

## Table of Contents

* [installation](#installation)
* [usage](#usage)
* [contributions](#contributions)
* [license](#license)

## Installation:

${installation}

## Contributions:

Built by:
${contributions}

${renderLicenseSection(license)}

### Questions:

Please direct any questions to ${githubUsername} on GitHub or email ${email}.
    `;
};
// `;
// }

module.exports = generateMarkdown;
