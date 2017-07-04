var https = require('https');
var request = require('request');
console.log('Welcome to the GitHub Avatar Downloader!');
var fs = require('fs');

// var GITHUB_USER = process.env.GITHUB_USER;
// var GITHUB_TOKEN = process.env.GITHUB_ACCESS_TOKEN;

// var GITHUB_USER = process.argv[2]
// var GITHUB_TOKEN = process.env[3]


function getRequestOptions(repoOwner, repoName) {
  return {
    url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers: {
      'User-Agent': 'Bobby Conn'
    },
  };
}

function getRepoContributors(repoOwner, repoName, cb) {
  if (!repoOwner || !repoName) {
    // console.error("YOU DID NOT PUT IN A VALID OWNER OR REPO NAME")
    cb(new Error('YOU DID NOT PUT IN A VALID OWNER OR REPO NAME'), null);
  } else {
    request(getRequestOptions(repoOwner, repoName), function (error, response, body) {
      if (error) {
        cb(error, null);
        // console.log('error found in getRequest', error);
      } else {
        try {
          console.log('body:', response.statusCode);
          if (response.statusCode === 200) {
            // Only if we get a success HTTP status, then we do something with the response
            const data = JSON.parse(body);
            // console.log(data);
            cb(null, data);
          } else {
            //
            cb(new Error(response.statusCode + ' ' + response.statusMessage), null);
          }
        } catch (parseErr) {
          // console.log('Failed to parse content body', err);
          cb(parseErr, null);
        }
      }
    });
  }
}

function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', function (err) {
      console.log("ERROR ERROR ERROR!!!! OH DEAR ME, WE SEEM TO HAVE AN ERROR")                                // Note 2
    throw err;

    })
    .on('response', function (response) {                           // Note 3
      console.log('Response Status Code: ', response.statusCode, 'CHECK THE STATUS: ', response.statusMessage, response.headers['THIS IS THE CONTENT TYPE!'])
    })
    .pipe(fs.createWriteStream(filePath));
}

function processContributors(contributor) {
  downloadImageByURL(contributor.avatar_url, `avatars/${contributor.login}.jpg` ) // <------- invokes the downloadImageByURL function with the URL specified in .avatar_url in 'data'
}

getRepoContributors(process.argv[2], process.argv[3], function(err, contributors) {

  if (err) {
    console.log("Errors:", err);
  } else if (contributors) {
    // console.log("Result:", contributors);          <---------- prints the list of the 'data'
    contributors.forEach(processContributors);
  }


});
