var https = require('https');
var request = require('request');
console.log('Welcome to the GitHub Avatar Downloader!');

var GITHUB_USER = process.env.GITHUB_USER;
var GITHUB_TOKEN = process.env.GITHUB_ACCESS_TOKEN;

function getRequestOptions(repoOwner, repoName) {
  return {
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
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

       data.forEach((contributor) => {
    console.log(contributor.avatar_url);
      });


    } catch (err) {
      console.log('Failed to parse content body');
        }


  });
}


getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});



