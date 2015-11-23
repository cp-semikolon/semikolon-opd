let Doctor = Meteor.users;

DoctorIndex = new EasySearch.Index({
  collection: Doctor,
  fields: ['profile.FName', 'profile.LName','profile.roles.0'],
  engine: new EasySearch.Minimongo({
  	selector: function (searchObject, options, aggregation) {

  		if(!searchObject['profile.LName']){
  			searchObject['profile.LName']='------';
  		}
  		if(!searchObject['profile.FName']){
  			searchObject['profile.FName']='------';
  		}


  		searchObject = {	 $and : [
	        					{ $or : [ {'profile.FName':searchObject['profile.FName']}, 
	        							{'profile.LName':searchObject['profile.LName']}]},
	        					{ 'profile.roles.0': 'doctor'}
	    					]
    				};
    	console.log(searchObject);

  	return searchObject;
  	}

  })
});

if (Meteor.isClient) {
	Template.FindDoctor.helpers({
  		doctorIndex: () => DoctorIndex, // instanceof EasySearch.Index
  		DepartmentMap : function(departmentID){
  			return OPD.Model.Departments.findOne(departmentID).Name;
  			// return departmentID
  		}
	});

}
