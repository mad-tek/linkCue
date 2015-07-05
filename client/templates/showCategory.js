Template.showCategory.helpers({
	links: function (categoryId) {
		return Links.find({categoryId: categoryId}, {sort: {createdAt : -1}});
	}
});

Template.showCategory.events({
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
		if(! $input.val())
			return;
		Links.insert({
			categoryId: this._id,
			url: $input.val(),
			checked: false,
			createdAt: new Date()
		});
		Categories.update(this._id, {$inc: {linkNum: 1}});
		console.log('inserted ' + $input.val());
		$input.val('');
	}
});