Deps.autorun(function() {
  Meteor.subscribe('Users')
});

Template.users.helpers({
  users: function(){
    return Users.find();
  }
});
