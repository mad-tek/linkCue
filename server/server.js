Meteor.methods({
	getUrl: function(link, categoryId) {
		var result = Scrape.website(link);
		result.originalLink = link;
		result.categoryId = categoryId;
		return result;
	}
});