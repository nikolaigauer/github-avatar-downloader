var https = require('https');
var request = require('request');
console.log('Welcome to the GitHub Avatar Downloader!');
var fs = require('fs');

var GITHUB_USER = process.env.GITHUB_USER;
var GITHUB_TOKEN = process.env.GITHUB_ACCESS_TOKEN;

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
  request(getRequestOptions(repoOwner, repoName), function (error, response, body) {
    try {
      const data = JSON.parse(body);

      // console.log(data);
      cb(null, data)

    } catch (err) {
      console.log('Failed to parse content body');
      cb(err, null);
    }
  });
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

getRepoContributors(process.argv[2], process.argv[3], function(err, contributors) {

  console.log("Errors:", err);
  // console.log("Result:", contributors);          <---------- prints the list of the 'data'
  contributors.forEach((contributor) => {         //<---------- sifts through the 'data'
     // console.log(contributor.avatar_url);
    downloadImageByURL(contributor.avatar_url, `avatars/${contributor.login}.jpg` ) // <------- invokes the downloadImageByURL function with the URL specified in .avatar_url in 'data'
  });


});
