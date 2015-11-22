let Patients = OPD.Model.Patients;

PatientsIndex = new EasySearch.Index({
  collection: Patients,
  fields: ['FName', 'LName','SSID','HN'],
  engine: new EasySearch.Minimongo()
});

if (Meteor.isClient) {
	Template.FindPatient.helpers({
  		patientsIndex: () => PatientsIndex // instanceof EasySearch.Index
	});
}