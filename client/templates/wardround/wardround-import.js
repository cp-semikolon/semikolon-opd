class WardroundImportForm extends BlazeComponent {
	onCreated(){
		super.onCreated();

		Session.set('disable_monday',true);
		Session.set('disable_tuesday',true);
		Session.set('disable_wednesday',true);
		Session.set('disable_thursday',true);
		Session.set('disable_friday',true);
		Session.set('disable_saturday',true);
		Session.set('disable_sunday',true);
	}

}

Template.ImportWardRoundSchedule.events({
	'change .monday input':function(event){
		Session.set('disable_monday',!event.target.checked);
	},
	'change .tuesday input':function(event){
		Session.set('disable_tuesday',!event.target.checked);
	},
	'change .wednesday input':function(event){
		Session.set('disable_wednesday',!event.target.checked);
	},
	'change .thursday input':function(event){
		Session.set('disable_thursday',!event.target.checked);
	},
	'change .friday input':function(event){
		Session.set('disable_friday',!event.target.checked);
	},
	'change .saturday input':function(event){
		Session.set('disable_saturday',!event.target.checked);
	},
	'change .sunday input':function(event){
		Session.set('disable_sunday',!event.target.checked);
	}
});

Template.ImportWardRoundSchedule.helpers({
	disable_monday: function(){
		return Session.get('disable_monday');
	},
	disable_tuesday: function(){
		return Session.get('disable_tuesday');
	},
	disable_wednesday: function(){
		return Session.get('disable_wednesday');
	},
	disable_thursday: function(){
		return Session.get('disable_thursday');
	},
	disable_friday: function(){
		return Session.get('disable_friday');
	},
	disable_saturday: function(){
		return Session.get('disable_saturday');
	},
	disable_sunday: function(){
		return Session.get('disable_sunday');
	}

});

WardroundImportForm.register('ImportWardRoundSchedule');