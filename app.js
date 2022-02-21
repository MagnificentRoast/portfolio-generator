// imports generate-site.js as a substitute for fs
const { writeFile, copyFile } = require('./utils/generate-site.js')
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

// captures data from promptUser to use in promptProject for as many projects as what is needed to add
promptUser()
  // retroactively calls the promptProject function
  .then(promptProject)
  // All captured data is brought down to portfolioData, which then moves it to generatePage, which generates the HTML code into pageHTML
  .then(portfolioData => {
    return generatePage(portfolioData);
  })
  //Imports captured data from portfolioData and does a page template for HTML
  .then(pageHTML => {
      return writeFile(pageHTML);
  })
  // This returns a promise, it's why you use return, so the promise is then returned into next then method
  .then(writeFileResponse => {
      console.log(writeFileResponse);
      return copyFile();
  })
  // it lets us know if copying the file was successful
  .then(copyFileResponse => {
      console.log(copyFileResponse);
  })
  // catches an error and gives an error message if it occurs
  .catch(err => {
      console.log(err);
  });
  
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
