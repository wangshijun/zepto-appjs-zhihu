var express = require('express');
var request = require('request');
var app = new express();

app.use(express.static('public'));

app.get('/', function (req, res, next) {
    res.json(req.headers);
});

var apiBaseUrl = 'http://news-at.zhihu.com';
app.get(/^\/api\/.+$/, function (req, res, next) {
	console.log('proxy: { %s => %s }', req.url, apiBaseUrl + req.url);
	request.get(apiBaseUrl + req.url, function (err, response, body) {
		if (err) {
			console.log('proxy err:', err);
			res.json({});
		} else {
			res.send(body);
		}
	});
});

app.listen(3000, function () {
    console.log('app.js + zepto app ready at port 3000');
});

module.exports = app;

