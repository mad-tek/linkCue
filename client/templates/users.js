Meteor.subscribe('users', function() {
  console.log(Users.find().fetch());
});

Template.users.helpers({
  users: function(){
    return Users.find().fetch();
  }
});
