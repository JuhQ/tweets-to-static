"use strict";

var tweetsToStaticPages = require("../index.js");
var chai = require("chai");
chai.should();

describe('Check methods', function() {

  it('Should have fetch method', function() {
    var tweets = new tweetsToStaticPages();
    tweets.should.have.property("fetch");
  });

  it('Should have saveExistingTweets method', function() {
    var tweets = new tweetsToStaticPages();
    tweets.should.have.property("saveExistingTweets");
  });

});