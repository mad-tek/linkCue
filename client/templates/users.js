Meteor.subscribe('users');

Template.users.helpers({
  users: function(){
    return Users.find().fetch();
  },
  numOfUsers: function() {
    return Users.find().fetch().length;
  }
});

Template.users.events({
  "mousedown .delete-user": function(){
     var message = 'Are you sure you want to remove "' + this.username + '"?';
     if(confirm(message)){
       Users.remove(this._id);
       console.log('Deleted ' + this.username);
       return true;
     }else{
       return false;
     }
  }
});
