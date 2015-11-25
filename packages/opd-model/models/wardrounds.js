Model.Wardrounds = new Meteor.Collection('wardrounds');

Meteor.methods({
	'Wardrounds.add': function(id,dayTimes){
		let result;
		result=OPD.Model.Wardrounds.upsert({
			UserID: id
		},{
			$set:{
				UserID:id,
				dayTime:dayTimes
			}
		});

  		return result;
	}
});