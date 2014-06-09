var request = require('request'),
	cheerio = require('cheerio'),
	cookieJar = request.jar(),
	fs = require('fs'),
	_ = require('lodash'),
	async = require('async'),
	range = _.range(1,5);

	request = request.defaults({jar: cookieJar});

var searchUrl = 'https://secure.sos.state.or.us/orestar/GotoSearchByName.do',
	postUrl = 'https://secure.sos.state.or.us/orestar/CommitteeSearchFirstPage.do',
	exportUrl = 'https://secure.sos.state.or.us/orestar/XcelSooSearch';
	
async.eachSeries(range, function(searchId, cb) {

	var searchOptions = getSearchOptions(searchId);

	request(searchUrl, function() {
		request.post(postUrl,{form: searchOptions}, function(err, resp, body) {
			var stream = fs.createWriteStream('./' + searchId + '.xls');
			request(exportUrl).pipe(stream);
			stream.on('close', function() {
				cb(null, true)
			})
		})
	});

}, function() {
	//done
})



function getSearchOptions(searchId) {
	return {
		buttonName: '',
		page:1,
		committeeName:'',
		committeeNameMultiboxText:'contains',
		committeeId:searchId,
		firstName:'',
		firstNameMultiboxText:'contains',
		lastName:'',
		lastNameMultiboxText:'contains',
		submit:'Submit',
		discontinuedSOO:'false',
		approvedSOO:'true',
		pendingApprovalSOO:'false',
		insufficientSOO:'false',
		resolvedSOO:'false',
		rejectedSOO:'false'
	};

}

