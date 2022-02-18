const inquirer = require('inquirer');
// const fs = require('fs');
// const generatePage = require('./src/page-template');

const promptUser = () => {
    //Asks for basic user information
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name? (Required)',
            // validate function makes sure that you enter a valid name instead of leaving it blank. Validate evaluates the boolean 'true'
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username (Required)',
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log('Please enter your GitHub user-name!');
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an about section?',
            default: true
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "about" section?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            when: ({ confirmAbout }) => {
                if (confirmAbout) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ]);
};

// To ask about projects from the user
const promptProject = portfolioData => {
    portfolioData.projects = [];
    // if there's no 'projects' array property, create one
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }
    console.log(`
    =================
    Add a New Project
    =================
    `);
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project? (Required)',
            validate: projectNameInput => {
                if (projectNameInput) {
                    return true;
                } else {
                    console.log('Please enter the name of your github project');
                };
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'What is the description of your project? (Required)',
            validate: descriptionInput => {
                if (descriptionInput) {
                    return true;
                } else {
                    console.log('Please enter the description of your project!');
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            messaage: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'bootstrap', 'node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)',
            validate: linkInput => {
                if (linkInput) {
                    return true;
                } else {
                    console.log('Please enter the link to your GitHub Project!')
                }
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmProject',
            message: 'Would you like to enter another project?',
            default: false
        }
        // .then(projectData => {
        //     portfolioData.projects.push(projectData);
        //     // This condition evaluates the user response to whether they wish to add more projects, the portfolioData was passed as an argument to prevent array overwrite.
        //     if (projectData.confirmAddProject) {
        //         return promptProject(portfolioData);
        //     // If user selects false, it will not ask for further input and just show the one featured project instead
        //     } else {
        //         return portfolioData;
        //     }
        // })
        // .then(projectData => {
        //     portfolioData.projects.push(projectData);
        //     if (projectData.confirmAddProject) {
        //         return promptProject(portfolioData);
        //     } else {
        //         return portfolioData;
        //     }
        // })
    ]);
};
//calls the function and shows the console log of your answer
promptUser()
    .then(promptProject)
    .then(portfolioData => {
        console.log(portfolioData);
    });

// const pageHTML = generatePage(name, github);

// fs.writeFile('./index.html', pageHTML, err => {
//     if (err) throw err;

//     console.log('Portfolio Complete! Check out index.html to see the output!');
// })