var express = require('express');
var router = express.Router();
var db = require('monk')(/*process.env.MONGOLAB_URI || */process.env.ZINE_DB);
var articles = db.get('articles');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'The Zine' });
});

router.get('/articles/new', function (req, res, next) {
  res.render('new', {title: 'The Zine'});
});

router.post('/articles/new', function (req, res, next) {
  articles.insert(req.body);
    res.redirect('/');
});

module.exports = router;
