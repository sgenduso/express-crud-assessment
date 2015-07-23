var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI || process.env.ZINE_DB);
var articles = db.get('articles');
var validate = require('../lib/validate.js');

router.get('/', function(req, res, next) {
  articles.find({}, function (err, articles) {
    res.render('index', {title: 'The Zine', articles: articles.reverse()});
  });
});

router.get('/articles/new', function (req, res, next) {
  res.render('new');
});

router.post('/articles/new', function (req, res, next) {
  var title = req.body.title;
  var url = req.body.url;
  var bkrdColor = req.body.bkrd_color;
  var excerpt = req.body.excerpt;
  var body = req.body.body;
  var errors = validate.formValidate(title, excerpt, body);
  if (errors.length!==0) {
    errors.push('Please correct the errors below:');
    res.render('new', {title: title, url: url, bkrd_color: bkrdColor, excerpt: excerpt, body: body, errors: errors.reverse()});
  } else {
  articles.insert(req.body);
    res.redirect('/');
  }
});

router.get('/articles/:id', function (req, res, next) {
  articles.findOne({_id: req.params.id}, function (err, article) {
    article.body = article.body.split('\n');
    res.render('show', {article: article});
  });
});

router.get('/articles/:id/edit', function (req, res, next) {
  articles.findOne({_id: req.params.id}, function (err, article) {
    res.render('edit', {article: article});
  });
});

router.post('/articles/:id/edit', function (req, res, next) {
  articles.findOne({_id: req.params.id}, function (err, article) {
  var title = req.body.title;
  var excerpt = req.body.excerpt;
  var body = req.body.body;
  var errors = validate.formValidate(title, excerpt, body);
  if (errors.length!==0) {
    errors.push('Please correct the errors below:');
    res.render('edit', {article:article, errors: errors.reverse()});
  } else {
    articles.update({_id: req.params.id}, req.body, function (err, article) {
      res.redirect('/');
    });
  }
});
});

router.post('/articles/:id/delete', function (req, res, next) {
  articles.remove({_id: req.params.id}, function (err, article) {
    res.redirect('/');
  });
});


module.exports = router;
