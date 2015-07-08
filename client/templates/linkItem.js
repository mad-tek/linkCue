
Template.linkItem.events({
	'keyup input[type=text]': _.throttle(function (event) {
		Links.update(this._id, {$set: {description: event.target.value}});
		console.log(event.target.value);
	}, 300),
	'mousedown .delete-item, click .delete-item': function() {
		var message = 'Are you sure you want to remove "' + this.title + '"?';
		if(confirm(message)){
			Links.remove(this._id);
			Categories.update(this.categoryId, {$inc: {linkNum: -1}});
			return true;
		}else{
			return false;
		}
	}
});