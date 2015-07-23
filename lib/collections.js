Categories = new Mongo.Collection('categories');

Categories.defaultName = function() {
	var nextLetter = 'A';
	var nextName = 'Category ' + nextLetter;
	while (Categories.findOne({name: nextName})) {
		nextLetter = String.fromCharCode(nextLetter.charCodeAt(0) + 1);
		nextName = 'Category ' + nextLetter;
	}
	return nextName;
};
Links = new Mongo.Collection('links');

Users = Meteor.users;
