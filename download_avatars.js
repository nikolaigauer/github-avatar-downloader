var https = require('https');
var request = require('request');
console.log('Welcome to the GitHub Avatar Downloader!');

var GITHUB_USER = process.env.GITHUB_USER;
var GITHUB_TOKEN = process.env.GITHUB_ACCESS_TOKEN;

function getRequestOptions(repoOwner, repoName) {
  return {
    url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers: {
      'User-Agent': 'Bobby Conn'
    },
  };
}

var login = [];
var avatarURL = [];
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


getRepoContributors("jquery", "jquery", function(err, contributors) {

  console.log("Errors:", err);
  console.log("Result:", contributors);
  contributors.forEach((contributor) => {
     // console.log(contributor.avatar_url);
     downloadImageByURL(contributor.avatar_url, `avatars/${contributor.login}.jpg` )
      });


});



  var request = require('request');
  var fs = require('fs');


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
