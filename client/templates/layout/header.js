

class NavHeader extends BlazeComponent {
	onCreated() {
    super.onCreated();
  }
}



Template.NavHeader.helpers({

	menu: function (){
		_dep.depend();

//		console.log(FlowRouter.current().path);
		let role = Session.get('currentRole');
		let temp = [];
		let path = {
						link: FlowRouter.current().path,
						text: ""
					};
		console.log(path.link);
		if(role==='doctor'){
			temp = [
			{		text:"ดูรายการนัดหมายประจำวัน",
					link:"/view/dailyAppointment/:date"
			},{
					text:"ดูตารางการออกตรวจ",
					link:"/view/wardRound/:doctorId"
			}];
		}
		else if(role==='nurse'){
			temp = [
			{		text:"ค้นหาผู้ป่วย",
					link:"/find/patient"
			}];
		}
		else if(role==='pharmacist'){
			temp = [
			{		text:"ค้นหาผู้ป่วย",
					link:"/find/patient"
			}];
		}
		else if(role==='staff'){
			temp = [
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
					link:"/import/wardRound/"
			}];
		}
		else{

			temp = [
			{		text:"ดูรายการนัดหมาย",
					link:"/patient/:patientId/appointment/"
			}];
		}

			//find if current path is already in temp 
			for (var i = temp.length - 1; i >= 0; i--) {
				if(path.link===temp[i].link){
					path.text = temp[i].text;
					temp.splice(i,1);
					break;
				}
			}
			if(path.text===""){
				let cur = path.link;
				if(cur==='/patient/:patientId/appointment/postpone/:appointmentId'){
					path.text = "เลื่อนนัด";
				}

				else if(cur==='/patient/:patientId/appointment/postpone/:appointmentId'){
					path.text = "ดูข้อมูลผู้ป่วย";
				}
				else if(cur==='/record/medData/:docId/:patientId/:date'){
					path.text = "ดูข้อมูลผู้ป่วย";
				}
				else if(cur==='/patient/:patientId/appointment/'){
					path.text = "ดูรายการนัดหมาย";
				}
				// ทำนัดยังไม่มี else if(){

				// }
				else if(cur==='/view/wardRound/:doctorId'){
					path.text = "ดูตารางออกตรวจ";
				}
			}
			
			temp.unshift(path);
			console.log(temp);
			return temp;



		
	},

	isPatient: function(){
		_dep.depend();
			let role = Session.get('currentRole');
			if(role==='patient'){return true;}
			else return false;
	}
  });






Template.DashboardHeader.events({
        'click #logout': function () {
            Meteor.logout();
            FlowRouter.go('/login');
            $('body').removeClass('dashboardLayout').addClass('loginLayout');
        }




});


  NavHeader.register('NavHeader');
