var tweetsToStaticPages = require("../index.js");

var options = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

var tweets = new tweetsToStaticPages(options);

var queries = ["helsinki", "javascript"];
var templateFile = "./example/example-template.html";

var extraParams = {queries: queries};

for (var i = queries.length - 1; i >= 0; i--) {
  var query = queries[i];
  var destinationFile = "./tmp/" + query + ".html";
  tweets.fetch("#" + query, templateFile, destinationFile, extraParams);
};
