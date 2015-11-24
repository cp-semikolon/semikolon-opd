

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
		// console.log(path.link);
		if(role==='doctor'){
			temp = [
			{		text:"ดูรายการนัดหมายประจำวัน",
					link:"/view/dailyAppointment"
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
					link:"/view/dailyAppointment"
			},{
					text:"ค้นหาผู้ป่วย",
					link:"/find/patient"
			},{
					text:"ค้นหาแพทย์",
					link:"/find/doctor"
			},
			{
					text:"ดูตารางการออกตรวจ",
					link:"/view/wardRound/:doctorId"
			}
			,{
					text:"ดูตารางออกตรวจรายแผนก",
<<<<<<< HEAD
					link:"/view/wardRound/department/:deptId"
=======
					link:"/view/wardRound/department/"
>>>>>>> fa16d99d9774e197feaf843aebbb1955965b764c
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
				else if(cur==='/record/medData/:docId/:patientId'){
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
			// console.log(temp);
			return temp;



		
	},

	isPatient: function(){
		_dep.depend();
			let role = Session.get('currentRole');
			if(role==='patient'){return true;}
			else return false;
	}


	
  });




Template.printName.helpers({

	patientName: function(){
		let PatientID = FlowRouter.getParam('patientId');
		console.log(OPD.Model.Patient.find({PatientID}));
		console.log('Name');
    	return 'name';
    }

}
);

Template.DashboardHeader.events({
        'click #logout': function () {
        	let role = Session.get('currentRole');
        	//console.log(role);

            Meteor.logout();
            if(role==="patient"){ 
            	console.log(role);
            	FlowRouter.go('/');
	            $('body').removeClass('dashboardLayout').addClass('MainLayout');
            }
			else {
				console.log('fuck'); 
				FlowRouter.go('/login');
	            $('body').removeClass('dashboardLayout').addClass('loginLayout');
			}
        }
});


  NavHeader.register('NavHeader');
