
Meteor.startup(function () {
ApplicationController = RouteController.extend({
    layoutTemplate: 'ApplicationLayout',

    onBeforeAction: function () {
      console.log('app before hook!');
      this.next();
    },

    action: function () {
      console.log('this should be overridden!');
    }
  });
}); 