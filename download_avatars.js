var https = require('https');
var request = require('request');
console.log('Welcome to the GitHub Avatar Downloader!');

var GITHUB_USER = process.env.GITHUB_USER;
var GITHUB_TOKEN = process.env.GITHUB_ACCESS_TOKEN;

// var requestOptions = {
//   host: 'api.github.com',
//   path: '/@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors'
// }

// function getRequestOptions(path) {
//   return {
//     url: 'https://api.github.com' + path,
//     headers: {
//       'User-Agent': 'Bobby Conn'
//     },
//     qs: {
//       access_token: GITHUB_TOKEN
//     }
//   };
// }

// var repoName = "jquery"
// var repoOwner = "jquery"


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




// function getRequest(requestURL) {
//   console.log(requestURL);
// }

// var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
// // console.log(requestURL);

// function getRepoContributors(repoOwner, repoName, cb) {

//   https.get(repoOwner,)
//   getRepoContributors("jquery", "jquery", function(err, result) {
//   console.log("Errors:", err);
//   console.log("Result:", result);
// });
//   // ...

//   var requestOptions = {
//   host: 'api.github.com',
//   path: '/@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors'

// };

// return getRepoContributors("jquery", "jquery", getRequest);