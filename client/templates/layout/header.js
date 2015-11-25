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
						text: "",
						ifActive: false
					};

		// console.log(Routes.routeGenRegEx(path.link));
		// console.log(path.link);
		if(role==='doctor'){
			let DoctorID = Meteor.userId();			
			temp = [
			{		text:"ดูรายการนัดหมายประจำวัน",
					link:"/view/dailyAppointment",
					ifActive: false
			},{
					text:"ดูตารางการออกตรวจ",
					link:"/view/wardRound/"+DoctorID,
					ifActive: false
			}];
		}
		else if(role==='nurse'){
			temp = [
			{		text:"ค้นหาผู้ป่วย",
					link:"/find/patient",
					ifActive: false
			}];
		}
		else if(role==='pharmacist'){
			temp = [
			{		text:"ค้นหาผู้ป่วย",
					link:"/find/patient",
					ifActive: false
			}];
		}
		else if(role==='staff'){
			temp = [
			{		text:"ดูรายการนัดหมายประจำวัน",
					link:"/view/dailyAppointment",
					ifActive: false
			},{
					text:"ค้นหาผู้ป่วย",
					link:"/find/patient",
					ifActive: false
			},{
					text:"ค้นหาแพทย์",
					link:"/find/doctor",
					ifActive: false
			},{
					text:"ดูตารางออกตรวจรายแผนก",
					link:"/view/wardRoundByDept",
					ifActive: false
			},{
					text:"นำเข้าตารางออกตรวจ",
					link:"/import/wardRound/",
					ifActive: false
			}];
		}
		else{
			let PatientID = FlowRouter.getParam('patientId');
			temp = [
			{		text:"ดูรายการนัดหมาย",
					link:"/patient/"+PatientID+"/appointment/",
					ifActive: false

			}];
		}

			//Defien Path Text

			//find if current path is already in temp 
			for (var i = temp.length - 1; i >= 0; i--) {
				if(path.link===temp[i].link){
					path.text = temp[i].text;
					temp[i].ifActive = true;
					// temp.splice(i,1);
					break;
				}
			}
			// if(path.text===""){
			// 	let cur = path.link;
			// 	if( Routes.isPatternMatched('postponeAppointment',cur)){
			// 		path.text = "เลื่อนนัด";
			// 	}

			// 	else if( Routes.isPatternMatched('viewPatientData',cur)){
			// 		path.text = "ดูข้อมูลผู้ป่วย";
			// 	}
			// 	else if(Routes.isPatternMatched('recordMedData',cur)){
			// 		path.text = "ดูข้อมูลผู้ป่วย";
			// 	}
			// 	else if(Routes.isPatternMatched('manageAppointment',cur)){
			// 		path.text = "ดูรายการนัดหมาย";
			// 	}
			// 	// ทำนัดยังไม่มี else if(){

			// 	// }
			// 	else if(Routes.isPatternMatched('viewWardRound',cur)){
			// 		path.text = "ดูตารางออกตรวจ";
			// 	}
			// }
			
			// temp.unshift(path);
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

Template.Breadcrumb.helpers({
breadPath: function () {
		_dep.depend();
//		console.log(FlowRouter.current().path);
		let role = Session.get('currentRole');
		let temp = [];
		let cur = 	FlowRouter.current().path;

		cur = cur.replace('/staff/','/');
				console.log(cur);
		if( Routes.isPatternMatched(Routes.postponeAppointment,cur)){

			let PatientID = FlowRouter.getParam('patientId');

			temp = [{text:"ดูรายการนัดหมาย", link:"/patient/"+PatientID+"/appointment/"},
					{text:"เลื่อนนัด",link: cur}];

			if(role==='staff')temp.unshift({text:"ค้นหาผู้ป่วย",link:"/find/patient"});

			return temp;
		}
		else if( Routes.isPatternMatched(Routes.makeAppointment,cur)){
			let PatientID = FlowRouter.getParam('patientId');

			temp = [{text:"ดูรายการนัดหมาย", link:"/patient/"+PatientID+"/appointment/"},
					{text:"ทำนัด",link: cur}];

			if(role==='staff')temp.unshift({text:"ค้นหาผู้ป่วย",link:"/find/patient"});

			return temp;
		}


		else if( Routes.isPatternMatched(Routes.viewPatientData,cur)){
			return [{text:"ค้นหาผู้ป่วย",link:"/find/patient"},
					{text: "ดูข้อมูลผู้ป่วย", link: cur}
			];

		}
		else if(Routes.isPatternMatched(Routes.recordMedData,cur)){
			let PatientID = FlowRouter.getParam('patientId');

			return [{text:"ดูรายการนัดหมาย", link:"/patient/"+PatientID+"/appointment/"},
					{text:"บันทึกการรักษา",link: cur}];

		}
		else if(Routes.isPatternMatched(Routes.manageAppointment,cur)){
			temp = [{text: "ดูรายการนัดหมาย", link: cur}];
			if(role==='staff')temp.unshift({text:"ค้นหาผู้ป่วย",link:"/find/patient"});
			return temp;
		}

		else if(Routes.isPatternMatched(Routes.viewWardRound,cur)){
			if(role!=='doctor')
			return [{text:"ค้นหาผู้ป่วย",link:"/find/doctor"},
					{text: "ดูตารางออกตรวจ", link: cur}
			];
		}
		else{ return [{}];}

		
		
	}
});



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
