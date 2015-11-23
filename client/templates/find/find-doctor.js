let Doctor = Meteor.users;

DoctorIndex = new EasySearch.Index({
  collection: Doctor,
  fields: ['profile.FName', 'profile.LName','profile.roles.0'],
  engine: new EasySearch.Minimongo({
  	selector: function (searchObject, options, aggregation) {
  		// console.log(searchObject);
  		// if(!searchObject['profile.FName']){
  		// 	return {_id: 'non_exist'};
  		// }
  		if(!searchObject['profile.LName']){
  			return {_id: 'non_exist'};
  		}
  		if(!searchObject){
  			return {_id: 'non_exist'};
  		}
  		// console.log(options);

  		// let fname = Meteor.users.find({'profile.FName':searchObject['profile.FName']});
  		// let lname = Meteor.users.find({'profile.FName':searchObject['profile.FName']});
  		// let doc = Meteor.users.find({ 'roles.0': 'doctor'});
		

  		// var query = {	 $and : [
	   //      					{ $or : [ fname, lname ] },
	   //      					{ doc }
	   //  					]
    // 				};
    // 	console.log(query);
  		searchObject['profile.roles.0'] = 'doctor';
  		let selector = this.defaultConfiguration().selector(searchObject, options, aggregation);	 
  		 // console.log(searchObject);
  	return selector;
  	}

  })
});

if (Meteor.isClient) {
	Template.FindDoctor.helpers({
  		doctorIndex: () => DoctorIndex // instanceof EasySearch.Index
	});
}
