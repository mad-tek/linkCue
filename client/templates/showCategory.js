var editingKey = 'editingCategory';
Session.setDefault(editingKey, false);
Session.set("error", "");

Template.showCategory.helpers({
	errorMessage: function() {
		return Session.get("error");
	},
	editing: function() {
		return Session.get(editingKey);
	},
	links: function (categoryId) {
		return Links.find({categoryId: categoryId}, {sort: {createdAt : -1}});
	}
});

var editingCategory = function(category, template) {
	Session.set(editingKey, true);
	Tracker.flush();
	template.$('.edit-form input[type=text]').focus();
};
var saveCategory = function(category, template) {
	Session.set(editingKey, false);
	Categories.update(category._id, {$set: {name: template.$('[name=name]').val()}});
};
var deleteCategory = function (category) {
	var message = "Are you sure you want to delete " + category.name + "?";
	if (confirm(message)){
		Categories.find({categoryId: category._id}).forEach(function(link){
			Links.remove(link._id);
		});
		Categories.remove(category._id);
		Router.go('home');
		return true;
	}else{
		return false;
	}
};

var newLink = function(thisId, urlInput) {
	var validURL = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
	if(validURL.test(urlInput.val())){
		//before writing new link to database, scrape for title, description and favicon
		Meteor.call('getUrl', urlInput.val(), thisId, function(error, result) {
			Links.insert({
				categoryId: result.categoryId,
				url: result.originalLink,
				title: result.title,
				description: result.description,
				favicon: result.favicon,
				checked: false,
				createdAt: new Date()
			});
			Categories.update(result.categoryId, {$inc: {linkNum: 1}});
			console.log("Inserted: " + result.title);
			console.log("errors: " + error);
		});
		urlInput.val('');
		Session.set("error", "");
	}else{
		Session.set("error", "Need valid url");
		console.log('Need valid url');
		return;
	};
};

Template.showCategory.events({
	'click .edit-cancel': function() {
		Session.set(editingKey, false);
	},
	'blur input[type=text]': function(event, template) {
		if(Session.get(editingKey))
			saveCategory(this, template);
	},
	'submit .edit-form': function(event, template) {
		event.preventDefault();
		saveCategory(this, template);
	},
	'mousedown .edit-cancel, click .edit-cancel': function(event) {
		event.preventDefault();
		Session.set(editingKey, false);
	},
	'change .edit-category': function(event, template) {
		if($(event.target)/val() === 'edit'){
			editingCategory(this, template);
		}else if($(event.target).val() === 'delete'){
			deleteCategory(this, template);
		}
		event.target.selectedIndex = 0;
	},
	'click .edit-category': function(event, template) {
		editingCategory(this, template);
	},
	'keydown input[type=text]': function (event) {
		//esc
		if(27 === event.which){
			event.preventDefault();
			$(event.target).blur();
		}
	},
	'submit .new-link': function (event) {
		event.preventDefault();
		var $input = $(event.target).find('[type=text]');
		newLink(this._id, $input);
	}
});