// imports the fs module from node.js
const fs = require('fs');
const { writeFile } = require('fs/promises');
// inports inquirer
const inquirer = require('inquirer');
// imports page-template.js
const generatePage = require('./src/page-template');

// prompts to get basic information
const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name? (Required)',
      // validate function ensures that users will answer this question
      validate: nameInput => {
        if (nameInput) {
          return true;
          // error if field is blank
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
      // validates the github field having content
      validate: githubInput => {
        if (githubInput) {
          return true;
          // error if field is blank
        } else {
          console.log('Please enter your GitHub username!');
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'confirmAbout',
      message: 'Would you like to enter some information about yourself for an "About" section?',
      default: true
    },
    {
      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself:',
      when: ({ confirmAbout }) => confirmAbout
    }
  ]);
};

// additional information function
const promptProject = portfolioData => {
  console.log(`
=================
Add a New Project
=================
`);

  // If there's no 'projects' array property, create one
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your project? (Required)',
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log('You need to enter a project name!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (Required)',
        validate: descriptionInput => {
          if (descriptionInput) {
            return true;
          } else {
            console.log('You need to enter a project description!');
            return false;
          }
        }
      },
      {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you this project with? (Check all that apply)',
        choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project. (Required)',
        validate: linkInput => {
          if (linkInput) {
            return true;
          } else {
            console.log('You need to enter a project GitHub link!');
            return false;
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
        name: 'confirmAddProject',
        message: 'Would you like to enter another project?',
        default: false
      }
    ])
    .then(projectData => {
      portfolioData.projects.push(projectData);
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
      } else {
        return portfolioData;
      }
    });
};

// calls promptUser function
promptUser()
  // calls promptProject
  .then(promptProject)
  // generates page from the portfolio data, then prints
  .then(portfolioData => {
    return generatePage(portfolioData);
  })
  //writes the printed data into a file
  .then(pageHTML => {
      return writeFile(pageHTML);
  })
  // writes the file name
  .then(writeFileResponse => {
      console.log(writeFileResponse);
      return copyFile();
  })
  // response to copying files
  .then(copyFileResponse => {
      console.log(copyFileResponse);
  })
  // catches an error and gives an error message if it occurs
  .catch(err => {
      console.log(err);
  });
// ...yet another functional string they want gone...
//     const pageHTML = generatePage(portfolioData);

//     // creates index.html in the dist folder, showing it to be the final result
//     fs.writeFile('./dist/index.html', pageHTML, err => {
//     // If there's an error, it shows an error and stops the function
//       if (err) {
//           console.log(err);
//           return;
//       }
//       // confirms the page has been created
//       console.log('Page created! Check out index.html in this directory to see it!');

//       // copies style.css from src to dist for final site
//       fs.copyFile('./src/style.css', './dist/style.css', err => {
//           // stops the function if there is an error
//           if (err) {
//               console.log(err);
//               return;
//           }
//           // shows in the console that the style sheet has been copied to dist for final site
//           console.log('Style sheet copied successfully!')
//       })
//   });
// });
  // calls the portfolio data
  // .then(portfolioData => {

  // const pageHTML = generatePage();

  // fs.writefile('/.index.html', pageHTMl, err => {
  //   if (err) throw new Error(err);

  //   console.log('Page created! Check out index.html in this directory to see it!);
  // })
