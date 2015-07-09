Router.configure({
	layoutTemplate: 'appBody'
});

Router.map(function(){
	this.route('join');
	this.route('signin');
	this.route('welcome');
	this.route('showCategory', {
		path: '/categories/:_id',
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