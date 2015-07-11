Meteor.publish('publicCategories', function(argument){
  return Categories.find({private: false});
});

Meteor.publish('privateCategories', function(){
  return Categories.filter({userId: this.userId});
});

Meteor.publish('links', function(categoryId){
  check(categoryId, String);
  return Links.find({listId: listId});
});
