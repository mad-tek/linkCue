Meteor.methods({
	getUrl: function(link) {
		var result = Scrape.website(link);
		return result;
	}
});