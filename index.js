var tweets_to_static = function(options) {

  var writeFile = function(file, content) {
    var fs = require('fs');

    fs.writeFile(file, content, function(err) {
      if(err) {
        console.log("File save failed", err);
        return false;
      }

      console.log(file + " saved");
    });
  };

  var processTweets = function(tweets) {
    var twitterText = require("twitter-text");
    for (var i = tweets.statuses.length - 1; i >= 0; i--) {
      var status = tweets.statuses[i];
      status.text = twitterText.autoLink(twitterText.htmlEscape(status.text));
    }

    return tweets;
  };

  var saveFile = function(tweets, template, save_to_file, extra_params, query) {
    var _ = require('lodash');
    var fs = require('fs');

    fs.readFile(template, function (err, template_file) {
      if (err) {
        console.log("Error", err);
        return false;
      }

      var templateData = {
        raw: tweets,
        query: query,
        extra_params: extra_params,
        tweets: processTweets(tweets).statuses
      };

      var content = _.template(template_file)(templateData);

      writeFile(save_to_file, content);

    });
  };

  this.fetch = function(query, template, save_to_file, extra_params) {
    var Twitter = require('twitter');

    if(
      !options.consumer_key ||
      !options.consumer_secret ||
      !options.access_token_key ||
      !options.access_token_secret
    ) {
      console.log("Twitter API keys/secrets missing from options");
      return false;
    }

    var client_options = {
      consumer_key: options.consumer_key,
      consumer_secret: options.consumer_secret,
      access_token_key: options.access_token_key,
      access_token_secret: options.access_token_secret
    };

    var client = new Twitter(client_options);

    client.get('search/tweets', {q: query}, function(error, tweets, response) {

      if(error) {
        console.log("Error", error);
        return false;
      }

      saveFile(tweets, template, save_to_file, extra_params, query);
    });
  };

  this.saveExistingTweets = function(query, tweets, template, save_to_file, extra_params) {
    saveFile(tweets, template, save_to_file, extra_params, query);
  };

};


module.exports = tweets_to_static;
