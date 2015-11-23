let Patients = OPD.Model.Patients;

PatientsIndex = new EasySearch.Index({
  collection: Patients,
  fields: ['FName', 'LName','SSID','HN'],
  engine: new EasySearch.Minimongo({
  	selector: function (searchObject, options, aggregation) {
  		console.log(searchObject);
  		if(searchObject['FName']===''){
  			return {_id: 'non_exist'};
  		}
  		if(searchObject['LName']===''){
  			return {_id: 'non_exist'};
  		}
  		if(searchObject['SSID']===''){
  			return {_id: 'non_exist'};
  		}
  		if(searchObject['HN']===''){
  			return {_id: 'non_exist'};
  		}
  		searchObject['profile.roles.0'] = 'doctor';
  		let selector = this.defaultConfiguration().selector(searchObject, options, aggregation);	 
  		 console.log(searchObject);
  	return selector;
  	}

  })
});

if (Meteor.isClient) {
	Template.FindPatient.helpers({
  		patientsIndex: () => PatientsIndex // instanceof EasySearch.Index
	});
}