// TODO: Include packages needed for this application
const { rejects } = require('assert');
const fs = require('fs');
const inquirer = require('inquirer');
const { listenerCount } = require('process');
const { resolve } = require('path');
const generateMarkdown = require('./utils/generateMarkdown.js')

// TODO: Create an array of questions for user input
const questions = [
    "What is this project called?", 
    "Give a brief description of this application; what is does, why you made it, how you made it.",
    "How does one go about installing this application?",
    "What is the use case of it?",
    "What license does it use?",
    "Who contributed to it?",
    "What is your GitHub username?",
    "What is your email?"
];

const [titleQ, descriptionQ, installationQ, usageQ, licenseQ, contributionsQ, githubQ, emailQ] = questions;

// TODO: Create a function to write README file
// function writeToFile(fileName, data) {}
const writeToFile = (fileData) => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/README.md', fileData, err => {
            if (err) {
                reject(err);
                return;
            }
            resolve({
                ok: true,
                message: 'README created!'
            });
        });
    });
};

// TODO: Create a function to initialize app
// function init() {}
const init = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: titleQ,
            validate: titleInput => {
                if (titleInput) {
                    return true;
                } else {
                    console.log("Please enter a title!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: descriptionQ,
            validate: descriptionInput => {
                if (descriptionInput) {
                    return true;
                } else {
                    console.log("Please enter a description!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'installation',
            message: installationQ,
        },
        {
            type: 'input',
            name: 'usage',
            message: usageQ,
            validate: usageInput => {
                if (usageInput) {
                    return true;
                } else {
                    console.log("Please describe the usage!");
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmLicense',
            message: 'Would you like to add a license?',
            default: false
        },
        {
            type: 'checkbox',
            name: 'license',
            message: licenseQ,
            choices: [
                'AGPL-3.0', 
                'GPL-3.0', 
                'LGPL-3.0', 
                'MPL-2.0',
                'Apache-2.0',
                'MIT',
                'BSL-1.0',
                'Unlicense'
            ],
            when: ({confirmLicense}) => {
                if (confirmLicense) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'contributions',
            message: contributionsQ,
            validate: contributionsInput => {
                if (contributionsInput) {
                    return true;
                } else {
                    console.log("Please enter the contributors!")
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'githubUsername',
            message: githubQ,
            validate: githubUsernameInput => {
                if (githubUsernameInput) {
                    return true;
                } else {
                    console.log("Please enter your username!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: emailQ,
            validate: emailInput => {
                if (emailQ) {
                    return true;
                } else {
                    console.log("Please enter your email!")
                    return false;
                }
            }
        }

    ])
};


// Function call to initialize app
init()
.then(readmeData => {
    return generateMarkdown(readmeData)
})
.then(markdownData => {
    writeToFile(markdownData);
})
.then(writeToFileResponse => {
    console.log("File created successfully!");
})
.catch(err => {
    console.log(err);
});

