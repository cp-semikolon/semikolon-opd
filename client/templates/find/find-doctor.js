let Doctor = OPD.Model.Myusers;

DoctorIndex = new EasySearch.Index({
  collection: Doctor,
  fields: ['FName', 'LName','UserID'],
  engine: new EasySearch.Minimongo()
});

if (Meteor.isClient) {
	Template.FindDoctor.helpers({
  		doctorIndex: () => DoctorIndex // instanceof EasySearch.Index
	});
}
