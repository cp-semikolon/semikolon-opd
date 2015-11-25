// This is fixture, run to seed test data into database

try {
  if (Meteor.isServer) {
    initDepartments();
    
    if(!Meteor.users.findOne()){
    	initUsers();
    }
    initPatients();
    initRecords();
  }

  function initDepartments() {
    let Departments = OPD.Model.Departments;

    let deptList = [
      'แผนกผู้ป่วยฉุกเฉิน',
      'แผนกศัลยกรรมทั่วไป',
      'แผนกศัลยกรรมความงาม',
      'แผนกสูติ-นรีเวชกรรม',
      'แผนกอายุรกรรม',
      'แผนกกุมารเวช'
    ];

    deptList.forEach(deptName => {
      Departments.upsert({Name: deptName},{$setOnInsert:{Name: deptName}});
    });
  }

  function initUsers() {
    let users = [
          {
            FName: "กานต์",
            LName: "นิมมานต์",
            email: "karn.n@semikolon.com",
            roles: ['doctor']
          },
          {
            FName: "ศิวภพ",
            LName: "เบาภาระ",
            email: "siwapob.b@semikolon.com",
            roles: ['doctor']
          },
          {
            FName: "จอมขวัญ", 
            LName: "จิตสะอาด",
            email: "jomkwan.j@semikolon.com",
            roles: ['doctor']
          },
          {
            FName: "เจตจำนง", 
            LName: "มุงมั่น",
            email: "jetjumnong.m@semikolon.com",
            roles: ['doctor']
          },
          {
            FName: "สมจิต", 
            LName: "เกรก",
            email: "somjit.g@semikolon.com",
            roles: ['doctor']
          },
          {
            FName: "สะดวก", 
            LName: "สบาย",
            email: "saduak.s@semikolon.com",
            roles: ['doctor']
          },
          {
            FName: "ยาใจ", 
            LName: "ใยจำ",
            email: "yajai.y@semikolon.com",
            roles: ['doctor']
          },
          {
            FName: "สรวงสุดา",
            LName: "สิทธินาถ",
            email: "suangsuda.s@semikolon.com",
            roles: ['nurse']
          },
          {
            FName: "สมชัย",
            LName: "สมสกุล",
            email: "somchai.s@semikolon.com",
            roles: ['staff']
          },
          {
            FName: "สุพักตร์",
            LName: "วิทยะ",
            email: "supak.w@semikolon.com",
            roles: ['pharmacist']
          }
        ];

    let depts = OPD.Model.Departments.find().fetch();

    users.forEach(user => {
	      let id;

	      if (user.roles[0] === 'doctor') {
	        let randomDeptIndex = Math.floor(Math.random()*depts.length);
	        user.Department = depts[randomDeptIndex]._id;
	      }

	      id = Accounts.createUser({
	        email: user.email,
	        password: "pa55w0rd",
	        profile: { 
	          FName: user.FName,
	          LName: user.LName,
	          Department: user.Department,
	          roles: user.roles
	        },
	      });

	      if (user.roles.length > 0) {
	        // Need _id of existing user record so this call must come 
	        // after `Accounts.createUser` or `Accounts.onCreate`
	        Roles.addUsersToRoles(id, user.roles);
	      }
    });
  }
  function initPatients(){
  	let patientList = [
  		{
  			Title:'นาย',
			FName:'เจ็บ',
			LName:'ป่วย',
			TelNo:'0123456789',
			Email:'jeb.puay@gmail.com',
			Nationality:'ไทย',
			SSID:'00',
			HN:'HN00000000'
  		},
  		{
  			Title:'นางสาว',
			FName:'ไข้',
			LName:'หวัด',
			TelNo:'0123456780',
			Email:'khai.waad@gmail.com',
			Nationality:'ไทย',
			SSID:'01',
			HN:'HN00000001'
  		}
  	];
  	let Patients=OPD.Model.Patients;
  	patientList.forEach(patient=>{
  		Patients.upsert({
  			SSID:patient.SSID  			
  		},{$setOnInsert:
  			{
	  			Title:patient.Title,
				FName:patient.FName,
				LName:patient.LName,
				TelNo:patient.TelNo,
				Email:patient.Email,
				Nationality:patient.Nationality,
				SSID:patient.SSID,
				HN:patient.HN
  			}
  		});
  	});
  }
  function initRecords(){
  	let Patients=OPD.Model.Patients;
  	let Records=OPD.Model.Record;

  	let jebID=Patients.findOne({SSID:'00'})._id;
  	let khaiID=Patients.findOne({SSID:'01'})._id;

  	let doctorID=Meteor.users.findOne({'profile.FName':'สมจิต','profile.LName':'เกรก'})._id;
  	let date1 = new Date(2015,10,15);
  	let date2 = new Date(2015,11,15);
  	let healthData={
  		Weight: 60,
		Height:170,
		BodyTemp:35,
		HeartRate:80,
		SystolicBP:120,
		DiastolicBP:120
  	};
  	let medData={
  		ICD:'12-abc1234',
  		Description:'ปวดหัวตัวร้อนนอนไม่หลับกระสับกระส่าย'
  	};
  	let dispenses=[
  		{
  			ID:'yolo',
  			Description:'กินแล้วหายป่วยเฉียบพลัน',
  			Amount: 20,
  			Unit: 'เม็ด'
  		},
  		{
  			ID:'yolo2',
  			Description:'กินแล้วหายป่วยเฉียบพลัน',
  			Amount: 20,
  			Unit: 'เม็ด'
  		}
  	];
  	let recordList=[
  		{
  			patientid:jebID,
			doctorid:doctorID,
			Date: date1,
			Time:'เช้า',
			Health:healthData,
			Med:medData,
			Dispense:dispenses,
			DispensesStatus:true
		},
		{
			patientid:khaiID,
			doctorid:doctorID,
			Date: date1,
			Time:'เช้า',
			Health:healthData,
			Med:medData,
			Dispense:dispenses,
			DispensesStatus:false
		},
		{
			patientid:jebID,
			doctorid:doctorID,
			Date: date2,
			Time:'บ่าย',
			Health:healthData,
			Med:medData,
			Dispense:dispenses,
			DispensesStatus:false
		}
  	];
  	recordList.forEach(record=>{
  		Records.upsert(record,{$setOnInsert:record});
  	});
  }
}
catch(error) {
	console.log(error);
}