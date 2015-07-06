

Template.linkItem.helpers({
	editingItem: function () {
		// ...
	}
});

Template.linkItem.events({
	'keyup input[type=text]': _.throttle(function (event) {
		Links.update(this._id, {$set: {url: event.target.value}});
		console.log(event.target.value);
	}, 300),
	'mousedown .delete-item, click .delete-item': function() {
		Links.remove(this._id);
		Categories.update(this.categoryId, {$inc: {linkNum: -1}});
	}
});