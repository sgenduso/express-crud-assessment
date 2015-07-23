var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI || process.env.ZINE_DB);
var articles = db.get('articles');

router.get('/', function(req, res, next) {
  articles.find({}, function (err, articles) {
    res.render('index', {title: 'The Zine', articles: articles});
  });
});

router.get('/articles/new', function (req, res, next) {
  res.render('new', {title: 'The Zine'});
});

router.post('/articles/new', function (req, res, next) {
  articles.insert(req.body);
    res.redirect('/');
});

router.get('/articles/:id', function (req, res, next) {
  articles.findOne({_id: req.params.id}, function (err, article) {
    res.render('show', {title: 'The Zine', article: article});
  });
});

router.get('/articles/:id/edit', function (req, res, next) {
  articles.findOne({_id: req.params.id}, function (err, article) {
    res.render('edit', {title: 'The Zine', article: article});
  });
});

router.post('/articles/:id/edit', function (req, res, next) {
  articles.update({_id: req.params.id}, req.body, function (err, article) {
    res.redirect('/');
  });
});

router.post('/articles/:id/delete', function (req, res, next) {
  articles.remove({_id: req.params.id}, function (err, article) {
    res.redirect('/');
  });
});


module.exports = router;
