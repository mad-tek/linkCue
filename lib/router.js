Router.configure({
	layoutTemplate: 'appBody',
	waitOn: function () {
	 return [
		 Meteor.subscribe('publicCategories'),
		 Meteor.subscribe('privateCategories')
	 ];
	}
});

Router.map(function(){
	this.route('join');
	this.route('signin');
	this.route('welcome');
	this.route('showCategory', {
		path: '/categories/:_id',
		onBeforeAction: function () {
			this.linksHandle = Meteor.subscribe("links", this.params._id);
			this.next();
		},
		data: function () {
			return Categories.findOne(this.params._id);
		},
		action: function() {
			this.render();
		}
	});
	this.route('home', {
		path: '/',
		action: function() {
			Router.go('showCategory', Categories.findOne());
		}
	});
});
