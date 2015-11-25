Model.CancelWardrounds = new Meteor.Collection('cancelWardrounds');
Meteor.methods({
	'CancelWardrounds.add': function(id, dateTimes) {
		let result = OPD.Model.CancelWardrounds.upsert({UserID: id}, {
			$set: {
				UserID: id,
				dateTimes: dateTimes
			}
		});
  		return result;
	}
});