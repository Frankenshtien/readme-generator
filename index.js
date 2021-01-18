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
    "What are the usage instructions?",
    "What license does it use?",
    "What are the contribution guidelines?",
    "What tests can you run to make sure it's working?",
    "What is your GitHub username?",
    "What is your email?"
];

const [titleQ, descriptionQ, installationQ, usageQ, licenseQ, contributionsQ, testQ, githubQ, emailQ] = questions;

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
            validate: installationInput => {
                if (installationInput) {
                    return true;
                } else {
                    console.log("Please enter the installation instructions!")
                }
            }
        },
        {
            type: 'input',
            name: 'usage',
            message: usageQ,
            validate: usageInput => {
                if (usageInput) {
                    return true;
                } else {
                    console.log("Please describe the applications usage!");
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
                'agpl-3.0', 
                'gpl-3.0', 
                'lgpl-3.0', 
                'mpl-2.0',
                'apache-2.0',
                'mit',
                'bsl-1.0',
                'unlicense'
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
                    console.log("Please enter the contribution guidelines!")
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'tests',
            message: testQ,
            validate: (testsInput) => {
                if (testsInput) {
                    return true;
                } else {
                    console.log("Please enter the test that can be run!");
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
                if (emailInput) {
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
    console.log("File created successfully! Find it in the 'dist' folder of this application!");
})
.catch(err => {
    console.log(err);
});

