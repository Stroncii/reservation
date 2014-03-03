
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.render('index', { Title: 'ejs' });
};

exports.post = function(req, res) {
    console.log('123r');
};