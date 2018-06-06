'use strict';

let articles = [];

// DONE: What is the purpose of the following function? Why is its name capitalized? Explain the context of "this" within the function. What does "rawDataObj" represent?
// It is capitalized because it's a constructor function and its purpose is to create a consistent template for creating new object instances. While building an object, 'this' refers to the current object being built. "rawDataObj" reperesents whatever is passed into the constructor function.

function Article (rawDataObj) {
  // DONE: Use the JS object that is passed in to complete this constructor function:
  
  // Save ALL the properties of `rawDataObj` into `this`
  this.title = rawDataObj.title;
  this.category = rawDataObj.category;
  this.author = rawDataObj.author;
  this.authorUrl = rawDataObj.authorUrl;
  this.publishedOn = rawDataObj.publishedOn;
  this.body = rawDataObj.body;
}

Article.prototype.toHtml = function() {
  // DONE: What is the benefit of cloning the article? (see the jQuery docs)
  // Cloning allows you to make a detail copy of matched elements. In this case, it made it easy to just use the existing HTML formatting to input the data.

  let $newArticle = $('article.template').clone();
  // GUESS: change the class of $newArticle to anything besides .template. 
  $newArticle.removeClass('template'); 
  /* DONE: This cloned article still has a class of template. In our modules.css stylesheet, we should give all elements with a class of template a display of none so that our template does not display in the browser. But, we also need to make sure we're not accidentally hiding our cloned article. */

  if (!this.publishedOn) $newArticle.addClass('draft');
  $newArticle.attr('data-category', this.category);

  /* DONE: Now use jQuery traversal and setter methods to fill in the rest of the current template clone with values of the properties of this particular Article instance.
    We need to fill in:
      1. author name,
      2. author url,
      3. article title,
      4. article body, and
      5. publication date. */
  // start

  // find h1 in $newArticle, put in obj.title for h1
  $newArticle.find('h1').html(this.title); 

  // find address a in $newArticle, put in obj.author for text
  $newArticle.find('a').html(this.author); 
  // ISSUE: if anything else in article has an link, it will get messed up. 
  // and there is a decent chance that this.body could have links in it. 

  // find address a in $newArticle, change attrb href to obj.authorUrl 
  $newArticle.find('a').attr('href', this.authorUrl); 
  // ISSUE: if anything else in article has an link, it will get messed up. 
  // and there is a decent chance that this.body could have links in it. 

  // find section.article-body in $newArticle, put in obj.body
  $newArticle.find('section.article-body').html(this.body); 

  // find time in $newArticle, put in obj.publishedOn, this will be changed to days go later. 
  $newArticle.find('time').html(this.publishedOn); 

  // REVIEW: Display the date as a relative number of 'days ago'
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newArticle.append('<hr>');
  return $newArticle;
};

rawData.sort(function(a,b) {
  // REVIEW: Take a look at this sort method; This may be the first time we've seen it. Look at the docs and think about how the dates would be sorted if the callback were not included in this method.
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

// DONE: Refactor these for loops using the .forEach() array method.

rawData.forEach(function(e) {
  articles.push(new Article(e));
});

articles.forEach(function(e) {
  $('#articles').append(e.toHtml());
});