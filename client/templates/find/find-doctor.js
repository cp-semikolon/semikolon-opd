let Doctor = Meteor.users;

DoctorIndex = new EasySearch.Index({
  collection: Doctor,
  fields: ['profile.FName', 'profile.LName'],
  engine: new EasySearch.Minimongo()
});

if (Meteor.isClient) {
	Template.FindDoctor.helpers({
  		doctorIndex: () => DoctorIndex // instanceof EasySearch.Index
	});
}
