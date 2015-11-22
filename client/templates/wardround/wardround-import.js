let days=['monday','tuesday','wednesday','thursday','friday','saturday','sunday'];

class WardroundImportForm extends BlazeComponent {
	onCreated(){
		super.onCreated();
		let i;
		for(i in days){
			// For cheked values
			Session.set(days[i],false);
			Session.set(days[i]+'Morning',false);
			Session.set(days[i]+'Afternoon',false);
			// For disabling checkboxes
			Session.set('disable_'+days[i],true);
		}
	}

}

Template.ImportWardRoundSchedule.events({
	'change .day-of-week input':function(event){
		let id =event.target.id;
		let checked=event.target.checked;
		Session.set(id,checked);
		if(!checked){
			Session.set(id+'Morning',false);
			Session.set(id+'Afternoon',false);
		}
		Session.set('disable_'+id,!checked);		
	},
	'change .time input':function(event){
		let id =event.target.id;
		let checked=event.target.checked;
		Session.set(id,checked);
	},
	'submit .new-wardround':function(event){
		event.preventDefault();
		let i;
		for(i in days){
			if(Session.get(days[i])===true){
				console.log(days[i]);
				console.log(days[i]+'Morning :',Session.get(days[i]+'Morning'));
				console.log(days[i]+'Afternoon :',Session.get(days[i]+'Afternoon'));
			}
		}

	}
});



Template.ImportWardRoundSchedule.helpers({
	disable: function(day){
		return Session.get('disable_'+day);
	},
	check: function(day){
		return Session.get(day);
	},
	checkTime: function(day, time){
		return Session.get(day+time);
	},
	days: function(){
		return days;
	},
	day:function(day){
		// Returns thai language of days of week
		switch(day){
			case 'monday': return 'จันทร์';
			case 'tuesday': return 'อังคาร';
			case 'wednesday': return 'พุธ';
			case 'thursday': return 'พฤหัส';
			case 'friday': return 'ศุกร์';
			case 'saturday': return 'เสาร์';
			case 'sunday': return 'อาทิตย์';
		}
	}

});

WardroundImportForm.register('ImportWardRoundSchedule');