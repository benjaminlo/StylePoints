var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var db = req.db;
	db.collection('outfitcollection').find().toArray(function(err, result) {
		res.render('index', { outfits: result });
	});
});

/* POST home page. */
router.post('/submit', function(req, res, next) {
	var db = req.db;
	var outfitId = req.body.data;
	var userid = req.body.userid;
	var submitter = req.body.submitter;
	db.collection('outfitcollection').find({outfitId : outfitId}).toArray(function(err, result) {
		console.log(result[0]);
		if(typeof result[0] == 'undefined') {
			console.log("can't find: " + outfitId);
			db.collection('outfitcollection').insert({userid: userid, outfitId: outfitId, submitter: submitter, style_points: 0, saved: false}, function(err, result) {
				res.end();
			});
		}
		else {
			console.log("found: " + outfitId);
			db.collection('outfitcollection').update({outfitId: outfitId}, {$inc: {style_points: 1}}, function(err, result) {
				res.end();
			});
		}
	});
});

/* POST home page. */
router.post('/save', function(req, res, next) {
	var db = req.db;
	var outfitId = req.body.outfitId;
	var submitter = req.body.submitter;
	console.log("submitter: " + submitter);
	db.collection('outfitcollection').update({outfitId: outfitId}, {$set: {saved: true}}, function(err, result) {
		db.collection('usercollection').update({userid: parseInt(submitter)}, {$inc: {style_cred: 1}}, function(err, result) {
			console.log("err: " + err);
			console.log("result: " + result);
			res.end();
		});
	});
});

/* POST home page. */
router.post('/delete', function(req, res, next) {
	var db = req.db;
	var outfitId = req.body.outfitId;
	console.log(outfitId);
	db.collection('outfitcollection').remove({outfitId: outfitId}, function(err, result) {
		res.end();
	});
});

module.exports = router;
