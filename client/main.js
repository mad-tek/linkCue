//will set these on render:
var hideSignin_key = 'showSignin';
Session.setDefault(hideSignin_key, true);
var hideJoin_key = 'showJoin';
Session.setDefault(hideJoin_key, true);
var user_key = 'userMenu';
Session.setDefault(user_key, false);

//
Template.appBody.onRendered(function() {
	Session.setDefault(hideJoin_key, true);
});

Template.appBody.helpers({
	username: function () {
		var usern = Meteor.user().username;
		return usern;
	},
	userMenu: function () {
		return Session.get(user_key);
	},
	showSignin: function() {
		return Session.get(hideSignin_key) && 'no-show';
	},
	showJoin: function() {
		return Session.get(hideJoin_key) && 'no-show';
	},
	thisArray: function () {
		console.log(this);
		return [this];
	},
	publicCategories: function () {
		return Categories.find({private: false});
	},
	privateCategories: function () {
		return Categories.find({private: true});
	}
});

Template.appBody.events({
	'click #signinLink': function(event, template) {
		event.preventDefault();
		if(!Session.get(hideJoin_key)){
			Session.set(hideJoin_key, true);
		}
		Session.set(hideSignin_key, ! Session.get(hideSignin_key));
	},
	'click #joinLink': function(event, template) {
		event.preventDefault();
		if(!Session.get(hideSignin_key)){
			Session.set(hideSignin_key, true);
		}
		Session.set(hideJoin_key, ! Session.get(hideJoin_key));

	},
	'click #signin-close': function() {
		Session.set(hideSignin_key, true);
	},
	'click #join-close': function() {
		Session.set(hideJoin_key, true);
	},
	'click #username': function (event) {
		event.preventDefault();
		Router.go('home');
	},
	'click #logout': function (event) {
		event.preventDefault();
		Meteor.logout();
		Router.go('showCategory', Categories.findOne({private: false}));
	},
	'click .new-category': function () {
		var category = {
			name: Categories.defaultName(),
			linkNum: 0,
			userId: Meteor.userId(),
			private: true
		};
		category._id = Categories.insert(category);
		console.log('inserting ' + category.name + ' ' + category._id + '. By ' + Meteor.userId() + ': ' + Meteor.user().username);
		Router.go('showCategory', {_id: category._id});
	},
	'click .delete-category': function () {
		var currId = this._id
		var message = "Are you sure you want to delete " + this.name + "?";
		if(confirm(message)){
			console.log('deleting ' + this.name + ": " + currId);
			Categories.find({categoryId: currId}).forEach(function(link){
				Links.remove(link._id);
			});
			Categories.remove(currId);
			Router.go('home');
			return true;
		}else{
			return false;
		}
	}
});
