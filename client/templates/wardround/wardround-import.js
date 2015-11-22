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
	'change input':function(event){
		let id =event.target.id;
		let checked=event.target.checked;
		Session.set('disable_'+id,!checked);
		if(!checked){
			$('#'+id+'_morning').attr('checked',false);
			$('#'+id+'_afternoon').attr('checked',false);
		}
	}
});

let days=['monday','tuesday','wednesday','thursday','friday','saturday','sunday'];

Template.ImportWardRoundSchedule.helpers({
	disable: function(day){
		switch(day){
			case 'monday': return Session.get('disable_monday');
			case 'tuesday': return Session.get('disable_tuesday');
			case 'wednesday': return Session.get('disable_wednesday');
			case 'thursday': return Session.get('disable_thursday');
			case 'friday': return Session.get('disable_friday');
			case 'saturday': return Session.get('disable_saturday');
			case 'sunday': return Session.get('disable_sunday');
		}
	},
	days: function(){
		return days;
	},
	day:function(day){
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