// create the about section
const generateAbout = aboutText => {
  if (!aboutText) {
    return '';
  }

  return `
    <section class="my-3" id="about">
      <h2 class="text-dark bg-primary p-2 display-inline-block">About Me</h2>
      <p>${aboutText}</p>
    </section
    `;
};

// look at previous versions I'm not typing it 3 times in one hour. added map and join i guess.
const generateProjects = projectsArr => {
  return `
    <section class="my-3" id="portfolio">
      <h2 class="text-dark bg-primary p-2 display-inline-block">Work</h2>
      <div class="flex-row justify-space-between">
      ${projectsArr
        .filter(({ feature }) => feature)
        .map(({ name, description, languages, link }) => {
          return `
          <div class="col-12 mb-2 bg-dark text-light p-3">
            <h3 class="portfolio-item-title text-light">${name}</h3>
            <h5 class="portfolio-languages">
              Built With:
              ${languages.join(', ')}
            </h5>
            <p>${description}</p>
            <a href="${link}" class="btn"><i class="fab fa-github mr-2"></i>View Project on GitHub</a>
          </div>
        `;
        })
        .join('')}

      ${projectsArr
        .filter(({ feature }) => !feature)
        .map(({ name, description, languages, link }) => {
          return `
          <div class="col-12 col-md-6 mb-2 bg-dark text-light p-3 flex-column">
            <h3 class="portfolio-item-title text-light">${name}</h3>
            <h5 class="portfolio-languages">
              Built With:
              ${languages.join(', ')}
            </h5>
            <p>${description}</p>
            <a href="${link}" class="btn mt-auto"><i class="fab fa-github mr-2"></i>View Project on GitHub</a>
          </div>
        `;
        })
        .join('')}
      </div>
    </section>
  `;
};

// // generate the projects array for a section
// const generateProjects = projectsArr => {
//   // get array of just featured projects
//   const featuredProjects = projectsArr.filter(project => {
//     if (project.feature) {
//       return true;
//     } else {
//       return false;
//     }
//   });

//   // get array of all non-featured projects
//   const nonFeaturedProjects = projectsArr.filter(project => {
//     if (!project.feature) {
//       return true;
//     } else {
//       return false;
//     }
//   });

//   const featuredProjectHtmlArr = featuredProjects.map(({ name, description, languages, link }) => {
//     return `
//       <div class=col-12 mb-2 bg-dark text-light p-3 flex-column">
//         <h3 class="portfolio item-title text-light p-3 flex-column">
//         <h5 class="portfolio-languages">
//           Built With:
//           ${languages.join(', ')}
//         </h5>
//         <p>${description}</p>
//         <a href="${link}" class="btn mt-auto"><i class="fab fa-github mr-2"></i>View Project on GitHub</a>
//       </div>
//     `;
//   });

//   const nonFeaturedProjectHtmlArr = nonFeaturedProjects.map(
//     ({ name, description, languages, link }) => {
//       return `
//         <div class="col-12 col-md-6 mb-2 bg-dark text-light p-3 flex-column">
//           <h3 class="portfolio item-title text-light">${name}</h3>
//           <h5 class="portfolio-languages">
//             Built With:
//             ${languages.join(', ')}
//           </h5>
//           <p>${description}</p>
//           <a href="${link}" class="btn mt-auto"><i class="fab fa-github mr-2"></i>View Project on GitHub</a>
//         </div>
//       `;
//     }
//   );

//     return `
//     <section class="my-3" id="portfolio">
//       <h2 class="text-dark bg-primary p-2 display-inline-block">Work</h2>
//       <div class="flex-row justify-space-between">
//       ${featuredProjectHtmlArr.join('')}
//       ${nonFeaturedProjectHtmlArr.join('')}
//       </div>
//     </section>
//     `;
// };

// generate projects array and makes section for projects
// const generateProjects = projectsArr => {
//   const projectHtmlArr = projectsArr.map(({ name, description, languages, link }) => {
//     return `
//       <div class="col-12 col-md-6 mb-2 bg-dark text-light p-3 flex-column">
//         <!-- Shows the name of the project -->
//         <h3 class="portfolio-item-title text-light">${name}</h3>
//         <h5 class="portfolio-languages">
//         <!-- Shows what languages the project was built with -->
//           Built With:
//           ${languages.join(', ')}
//         </h5>
//         <!-- Shows the description of the project -->
//         <p>${description}</p>
//         <!-- generates a link in the form of a button that will take you to the github project link -->
//         <a href="${link}" class="btn mt-auto"><i class="fab fa-github mr-2"></i>View Project on GitHub</a>
//       </div>
//     `;
//   });

//   return `
//     <section class="my-3" id="portfolio">
//       <h2> class="text-dark bg-primary p-2 display-inline-block">Work</h2>
//       <div class="flex-row justify-space-between">
//       ${projectHtmlArr.join('')}
//       </div>
//     </section>
//   `;
// };

// projects array creation, so when you put your prject information in, it will make a new section.
// const generateProjects = projectsArr => {
//   return `
//     <section class="my-3" id="portfolio">
//       <h2 class="text-dark bg-primary p-2 display-inline-block">Work</h2>
//       <div class="flex-row justify-space-between">
//       <!-- Leaving this empty as we'll dynamically insert project HTML here -->
//       </div>
//     </section>
//   `;
// };

module.exports = templateData => {
  // destructure page data by section
  const { projects, about, ...header } = templateData;

  return `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Portfolio Demo</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
    <link href="https://fonts.googleapis.com/css?family=Public+Sans:300i,300,500&display=swap" rel=stylesheet">
    <link rel="stylesheet" href="style.css">
  </head>

  <body>
    <header>
      <div class="container flex-row justify-space-between align-center py-3">
        <h1 class="page-title text-secondary bg-dark py-2 px-3">${header.name}</h1>
        <nav class="flex-row">
          <a class="ml-2 my-1 px-2 py-1 bg-secondary dext-dark" href="https://github.com/${
            header.github
          }">Github</a>
        </nav>
      </div>
    </header>
    <main class="container my-5">
    <!-- Calls back about for this section -->
      ${generateAbout(about)}
    <!-- Calls back projects for this section -->
      ${generateProjects(projects)}
    </main>

    <footer class="container text-center py-3">
      <h3 class="text-dark">&copy; ${new Date().getFullYear()} by ${header.name}</h3>
    </footer>
  </body>
  </html>
    `;
};

// module.exports = templateData => {

//   console.log(templateData);

// // destructure projects and about data from templateData based on their property key names
// const { projects, about, ...header } = templateData;
//   return `
//   <!DOCTYPE html>
//   <html lang="en">

//   <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <meta http-equiv="X-UA-Compatible" content="ie=edge">
//     <title>Portfolio Demo</title>
//   </head>

//   <body>
//     <h1>${templateData.name}</h1>
//     <h2><a href="https://github.com/${templateData.github}">Github</a></h2>
//   </body>
//   </html>
//   `;
// };

// .filter() filters out specific parts of an array and shows them to the user

// .