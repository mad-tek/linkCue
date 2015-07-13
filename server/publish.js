Meteor.publish('publicCategories', function(argument){
  return Categories.find({private: false});
});

Meteor.publish('privateCategories', function(){
  return Categories.find({userId: this.userId});
});

Meteor.publish('links', function(categoryId){
  return Links.find({categoryId: categoryId});
});
