/* globals Model */ 

Model.Appointments = new Meteor.Collection('appointments');

Meteor.methods({
  'Appointments.delete': function (AppId) {
    var App = Appointments.findOne(AppId);
    Appointments.remove(AppId);
  }
});