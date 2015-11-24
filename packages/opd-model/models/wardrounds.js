Model.Wardrounds = new Meteor.Collection('wardrounds');

Meteor.methods({
	'Wardrounds.add': function(id,dayTimes){
		let result = OPD.Model.Wardrounds.insert({
			UserID: id,
			dayTime:dayTimes
		});
  		return result;
	}
});