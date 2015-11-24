let days=['monday','tuesday','wednesday','thursday','friday','saturday','sunday'];

class WardroundImportForm extends BlazeComponent {
	onCreated(){
		super.onCreated();

		this.state=new ReactiveDict();

		let dayTime={};
		days.forEach((day)=>{
			dayTime[day]={
				selected:false,
				morning:false,
				afternoon:false
			};
		});
		this.state.set('dayTime',dayTime);

		this.state.set('departmentID','');
		this.state.set('doctorID','');


	}
	onRendered(){
		super.onRendered();
		// Make select funcitonality
		$('select').material_select();
	}

	events(){
		return super.events().concat({
			'change .deptSelect':function(event){
				let departmentID=event.target.value;
				let oldID=this.state.get('departmentID');

				if(departmentID!==oldID){
					this.state.set('departmentID',departmentID);
				}	
			},
			'change .doctSelect':function(event){
				let doctorID=event.target.value;
				let oldID=this.state.get('doctorID');
				if(doctorID!==oldID){
					this.state.set('doctorID',doctorID);
				}
			},
			'change .day-of-week input':function(event){
				let day =event.target.id;
				let checked=event.target.checked;
				// Get current dayTime state
				let dayTime=this.state.get('dayTime');
				// Edited selected day
				dayTime[day].selected = checked;
				// If that day is unchecked, uncheck all time
				if(!checked){
					dayTime[day].morning=false;
					dayTime[day].afternoon=false;
				}
				this.state.set('dayTime',dayTime);
			},
			'change .time input':function(event){
				let day=event.target.getAttribute('day');
				let time=event.target.getAttribute('time');
				let checked=event.target.checked;

				let dayTime=this.state.get('dayTime');
				dayTime[day][time]=checked;

				this.state.set('dayTime',dayTime);
			},
			'submit .new-wardround':function(event){
				event.preventDefault();
				let doctorID=this.state.get('doctorID');
				let dayTime=this.state.get('dayTime');
				OPD.Model.Wardrounds.insert({
					UserID: doctorID,
					dayTime: dayTime
				});
				//Meteor.call('addWardround',doctorId,dayTimes);
			}
		});
	}
	disable(day){
		let dayTime = this.state.get('dayTime');
		return !dayTime[day].selected;
	}
	check(day){
		let dayTime = this.state.get('dayTime');
		return dayTime[day].selected;
	}
	checkTime(day, time){
		let dayTime = this.state.get('dayTime');
		return dayTime[day][time];
	}
	days(){
		return days;
	}
	day(day){
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
	departments(){					
		return	OPD.Model.Departments.find({}).fetch();
	}
	doctors(){
		let departmentID=this.state.get('departmentID');
		return Meteor.users.find({'profile.Department':departmentID}).fetch();
	}
	vanz(){
		Meteor.setTimeout(function(){
        	$('select').material_select()
    	}, 20);
	}
}


Meteor.methods({
	'addWardround': function(id,dayTimes){
		OPD.Model.Wardrounds.insert({
			UserID: id,
			dayTime:dayTimes
		});
	}
});

WardroundImportForm.register('ImportWardRoundSchedule');