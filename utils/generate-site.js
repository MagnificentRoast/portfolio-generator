// imports fs from node.js
const fs = require('fs');

// promise function
const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/index.html', fileContent, err => {
            // if there's an error, reject the Promise and sent the error to the Promise's 'catch()' method
            if (err) {
                reject(err);
                // return out of the function here to make sure the Promise doesn't accidentally execute the resolve() function as well
                return;
            }

            // if everything went well resolve the Promise and send the successful data to the '.then()' method
            resolve({
                ok: true,
                message: 'File created!'
            });
        });
    });
};

const copyFile = () => {
    return new Promise((resolve, reject) => {
         fs.copyFile('./src/style.css', './dist/style.css', err => {
          // stops the function if there is an error
          if (err) {
              reject(err);
              return;
          }
          resolve({
              ok: true,
              message: 'File copied successfully!'
          });
      });
    });
}

module.exports = { writeFile, copyFile};