var request = require('request'),
	cheerio = require('cheerio'),
	cookieJar = request.jar(),
	fs = require('fs'),
    argv = require('minimist')(process.argv.slice(2)),
    searchId = argv['_'][0]

	request = request.defaults({jar: cookieJar});

var searchUrl = 'https://secure.sos.state.or.us/orestar/GotoSearchByName.do',
	postUrl = 'https://secure.sos.state.or.us/orestar/CommitteeSearchFirstPage.do',
	exportUrl = 'https://secure.sos.state.or.us/orestar/XcelSooSearch';
	

	var searchOptions = getSearchOptions(searchId);

	request(searchUrl, function() {
		request.post(postUrl,{form: searchOptions}, function(err, resp, body) {
			var stream = fs.createWriteStream('./' + searchId + '.xls');
			request(exportUrl).pipe(stream);
		})
	});



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

