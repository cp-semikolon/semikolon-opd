Model.Wardrounds = new Meteor.Collection('wardrounds');

Meteor.methods({
	'Wardrounds.add': function(id,dayTimes){
		OPD.Model.Wardrounds.insert({
			UserID: id,
			dayTime:dayTimes
		});
	}
});