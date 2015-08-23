var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var db = req.db;
	db.collection('outfitcollection').find().toArray(function(err, result) {
		res.render('Core_elements_sampler', {title: "StylePoints", outfits: result});
	});
});

/* GET home page. */
router.get('/outfits', function(req, res, next) {
	var db = req.db;
	db.collection('outfitcollection').find().toArray(function(err, result) {
		for(i in result) {
			var outfitId = result[i].outfitId;
			result[i].items = outfitId.split(':');
		}
		res.send(result);
		res.end();
	});
});

/* POST home page. */
router.post('/submit', function(req, res, next) {
	var db = req.db;
	var outfitId = req.body.outfitId;
	var userid = req.body.userid;
	var submitter = req.body.submitter;
	db.collection('outfitcollection').find({outfitId : outfitId}).toArray(function(err, result) {
		if(typeof result[0] == 'undefined') {
			db.collection('outfitcollection').insert({userid: userid, outfitId: outfitId, submitter: submitter, style_points: 0, saved: false, submission_time: new Date()}, function(err, result) {
				/*db.collection('outfitcollection').find().toArray(function(err, result) {
					res.render('Core_elements_sampler', { outfits: result });
				});*/
				res.end();
			});
		}
		else {
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
	db.collection('outfitcollection').update({outfitId: outfitId}, {$set: {saved: true}}, function(err, result) {
		db.collection('usercollection').update({userid: parseInt(submitter)}, {$inc: {style_cred: 1}}, function(err, result) {
			res.end();
		});
	});
});

/* POST home page. */
router.post('/delete', function(req, res, next) {
	var db = req.db;
	var outfitId = req.body.outfitId;
	db.collection('outfitcollection').remove({outfitId: outfitId}, function(err, result) {
		res.end();
	});
});

router.post('/style', function(req, res, next) {
	var db = req.db;
	var outfitId = req.body.outfitId;
	db.collection('outfitcollection').update({outfitId: outfitId}, {$inc: {style_points: 1}}, function(err, result) {
		res.end();
	});
});

router.post('/wardrobe', function(req, res, next) {
	var db = req.db;
	var wardrobeuserid = req.body.wardrobeuserid;
	var wardrobe = req.body.wardrobe;
	var category = req.body.category;
	console.log(category);
	switch(category) {
		case 'Outerwear':
			db.collection('usercollection').update({userid: parseInt(wardrobeuserid)}, {$push: {outerwear: wardrobe}}, function(err, result) {
				res.end();
			});
			break;
		case 'Tops':
			db.collection('usercollection').update({userid: parseInt(wardrobeuserid)}, {$push: {tops: wardrobe}}, function(err, result) {
				res.end();
			});
			break;
		case 'Bottoms':
			db.collection('usercollection').update({userid: parseInt(wardrobeuserid)}, {$push: {bottoms: wardrobe}}, function(err, result) {
				res.end();
			});
			break;
		case 'Footwear':
			db.collection('usercollection').update({userid: parseInt(wardrobeuserid)}, {$push: {footwear: wardrobe}}, function(err, result) {
				res.end();
			});
			break;
	}
});

module.exports = router;
