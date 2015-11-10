OPD = {};

if (Meteor.isClient) {
	Template.registerHelper('OPD', () => OPD);
}
