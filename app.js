// Allows for the fs module from node.js
const fs = require('fs');

// Calls for the page template js file to generate an HTML file
const generatePage = require('./src/page-template.js');

// Array for the name and github for the links
const profileDataArgs = process.argv.slice(2);

// Creates an array based on captured command line arguments
const [name, github] = profileDataArgs;

// Created index.html in the root directory with added information from command line.
fs.writeFile('./index.html', generatePage(name, github), err => {
    if (err) throw new Error(err);

// Does an alert if portfolio generation is successful
    console.log("Portfolio Complete! Check out index.html to see the output!");
});

// const profileDataArgs = process.argv.slice(2, process.argv.length);
// const fs = require('fs');
// const [name, github] = profileDataArgs;
// // console.log(profileDataArgs);

// // const printProfileData = (profileDataArr) => {
// //     // this...
// //     for (let i = 0; i < profileDataArr.length; i++) {
// //         console.log(profileDataArr[i]);
// //     }

// //     console.log("================");

// //     // is the same as this...

// //     // a good example of an arrow function, which will run multiple tasks using one line of code. Keep it simple when doing this
// //     profileDataArr.forEach(profileItem => console.log(profileItem));
// // };

// // printProfileData(profileDataArgs);

// // Creates an HTML template using information used from name and github from command line arguments
// const generatePage = (name, github) => {
//     return `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//         <meta charset="utf-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <meta http-equiv="X-UA-Compatible" content="ie-edge"
//         <title>Portfolio Demo</title>
//     </head>
    
//     <body>
//     <h1>${name}</h1>
//     <h2><a href="https://github.com/${github}">Github</a></h2>
//     </body>
//     </html>
//     `;
// };

// // generate file in file system using fs.writefile command
// // writefile creates a file, the first argument is the name of the file, the second argument is the data being written from the generate page function, and the third is to report either a success or an error.
// fs.writeFile('index.html', generatePage(name, github), err => {
//     // This command will create an exception and stop the code execution if an error occurs.
//     if (err) throw err;

// // to console log a success message
//     console.log('Portfolio complete! Check out index.html to see the output!')
// });

// // console logs to confirm scripts work
// // console.log(name, github);
// // console.log(generatePage(name, github));