var ERRORS_KEYS = 'joinErrors';

Template.signin.onCreated(function () {
  Session.set(ERRORS_KEYS, {});
})

Template.signin.helpers({
  errorMessages: function(){
     return _.values(Session.get(ERRORS_KEYS));
  },
  errorClass: function(){
     return Session.get(ERRORS_KEYS)[key] && error;
  }
});

Template.name.events({
  "submit": function(event, template){
     event.preventDefault();
     var email = template.$('[name=email]').val();
     var password = template.$('[name=password]').val();
     var errors = {};
     if(!email){
       errors.email = 'Email is required';
     }
     if(!password){
       errors.password = 'Password is required';
     }
     Session.set(ERRORS_KEYS, errors);
     if(_.keys(errors).length){
       return;
     }
     Meteor.loginWithPassword(email, password, function(error){
        if(error){
          return Session.set(ERRORS_KEYS, {'none': error.reason});
        }
        Router.go('home');
     });
  }
});
