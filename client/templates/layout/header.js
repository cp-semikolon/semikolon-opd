

class NavHeader extends BlazeComponent {
	onCreated() {
    super.onCreated();
  }
}


Template.NavHeader.helpers({
	menu: function (){
//		console.log(FlowRouter.current().path);
		


		let role = Meteor.user().roles[0];

		if(role==='doctor'){
		return [
		{		text:"ดูรายการนัดหมายประจำวัน",
				link:"/view/dailyAppointment/:date"
		},{
				text:"ดูตารางการออกตรวจ",
				link:"/view/wardRound/:doctorId"
		}];
		}
		else if(role==='nurse'){
		return [
		{		text:"ค้นหาผู้ป่วย",
				link:"/find/patient"
		}];
		}
		else if(role==='pharmacist'){
		return [
		{		text:"ค้นหาผู้ป่วย",
				link:"/find/patient"
		}];
		}
		else if(role==='staff'){
		return [
		{		text:"ดูรายการนัดหมายประจำวัน",
				link:"/view/dailyAppointment/:date"
		},{
				text:"ค้นหาผู้ป่วย",
				link:"/find/patient"
		},{
				text:"ค้นหาแพทย์",
				link:"/find/doctor"
		},{
				text:"ดูตารางการออกตรวจ",
				link:"/view/wardRound/:doctorId"
		},{
				text:"ดูตารางออกตรวจรายแผนก",
				link:"/view/wardRound/:deptId"
		},{
				text:"นำเข้าตารางออกตรวจ",
				link:"/import/wardRound/:doctorId"
		}];
		}
		else{
						console.log('ywhy');
		
		return [
		{		text:"ดูรายการนัดหมาย",
				link:"/patient/:patientId/appointment/"
		},{
				text:"ทำนัด",
				link:"/patient/:patientId/appointment/"
		}];
		}
	},

	isPatient: function(){
					
		try {
			let role = Meteor.user().roles[0];
		}
		catch(err) {
		 	return true;
		}

			if(role==='doctor'){return false;}
			else if(role==='nurse'){return false;}
			else if(role==='pharmacist'){return false;}
			else if(role==='staff'){return false;}
			else{return true;} 

			
	},
  });

Template.DashboardHeader.events({
        'click #logout': function () {
            Meteor.logout();
            FlowRouter.go('/login');
            $('body').removeClass('dashboardLayout').addClass('loginLayout');
        }
});


  NavHeader.register('NavHeader');
