let Patients = OPD.Model.Patients;

PatientsIndex = new EasySearch.Index({
  collection: Patients,
  fields: ['FName', 'LName','SSID','HN'],
  engine: new EasySearch.Minimongo({
  	selector: function (searchObject, options, aggregation) {
  		// console.log(searchObject);
  		if(!searchObject['LName']){
  			searchObject['LName']='------';
  		}
  		if(!searchObject['FName']){
  			searchObject['FName']='------';
  		}
  		if(!searchObject['SSID']){
  			searchObject['SSID']='------';
  		}
  		if(!searchObject['HN']){
  			searchObject['HN']='------';
  		}

  		let selector = this.defaultConfiguration().selector(searchObject, options, aggregation);	 
  	return selector;
  	}

  })
});

if (Meteor.isClient) {
	Template.FindPatient.helpers({
  		patientsIndex: () => PatientsIndex // instanceof EasySearch.Index
  
	});


  Template.manipulateButton.helpers({
      isStaff: function(){
        let role = Session.get('currentRole');
        console.log('You found me');
        if(role==='staff'){return true;}
        else return false;
      }
  });

}