const inquirer = require('inquirer');

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?'
        }
    ]);
};

promptUser().then(answers => console.log(answers));
// // Allows for the fs module from node.js
// const fs = require('fs');

// // Calls for the page template js file to generate an HTML file
// const generatePage = require('./src/page-template.js');

// const pageHTML = generatePage(name, github);

// // Created index.html in the root directory with added information from command line.
// fs.writeFile('./index.html', generatePage(name, github), err => {
//     if (err) throw new Error(err);

// // Does an alert if portfolio generation is successful
//     console.log("Portfolio Complete! Check out index.html to see the output!");
// });

