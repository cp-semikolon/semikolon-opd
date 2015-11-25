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

		// console.log(Routes.routeGenRegEx(path.link));
		// console.log(path.link);
		if(role==='doctor'){
			let DoctorID = FlowRouter.getParam('doctorId');			
			temp = [
			{		text:"ดูรายการนัดหมายประจำวัน",
					link:"/view/dailyAppointment"
			},{
					text:"ดูตารางการออกตรวจ",
					link:"/view/wardRound/"+DoctorID
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
			},{
					text:"ดูตารางออกตรวจรายแผนก",
					link:"/view/wardRoundByDept"
			},{
					text:"นำเข้าตารางออกตรวจ",
					link:"/import/wardRound/"
			}];
		}
		else{
			let PatientID = FlowRouter.getParam('patientId');
			temp = [
			{		text:"ดูรายการนัดหมาย",
					link:"/patient/"+PatientID+"/appointment/"
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
				if( Routes.isPatternMatched('postponeAppointment',cur)){
					path.text = "เลื่อนนัด";
				}

				else if( Routes.isPatternMatched('viewPatientData',cur)){
					path.text = "ดูข้อมูลผู้ป่วย";
				}
				else if(Routes.isPatternMatched('recordMedData',cur)){
					path.text = "ดูข้อมูลผู้ป่วย";
				}
				else if(Routes.isPatternMatched('manageAppointment',cur)){
					path.text = "ดูรายการนัดหมาย";
				}
				// ทำนัดยังไม่มี else if(){

				// }
				else if(Routes.isPatternMatched('viewWardRound',cur)){
					path.text = "ดูตารางออกตรวจ";
				}
			}
			
			temp.unshift(path);
			// console.log(temp);
			return temp;



		
	},




  });


Template.printName.helpers({
	isPatient: function(){
			let role = Session.get('currentRole');
			if(role==='patient'){return true;}
			else return false;
	},
	patientName: function(){
		let PatientID = FlowRouter.getParam('patientId');
		let name = OPD.Model.Patients.findOne(PatientID).FName;
		name = name + " " + OPD.Model.Patients.findOne(PatientID).LName;
    	return name;
    }

}
);

Template.DashboardHeader.events({
        'click #logout': function () {
        	let role = Session.get('currentRole');
        	//console.log(role);

            Meteor.logout();
            if(role==="patient"){ 
             	FlowRouter.go('/');
	            $('body').removeClass('dashboardLayout').addClass('MainLayout');
            }
			else {
				FlowRouter.go('/login');
	            $('body').removeClass('dashboardLayout').addClass('loginLayout');
			}
        }
});


  NavHeader.register('NavHeader');
