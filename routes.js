// authentication section

Authentication = {
  patientOTP(context) {
    let patientId = context.context.params.patientId;

    if (patientId === Meteor.userId() && !Meteor.user()) {
      return;
    } else if( Meteor.user() ){
      // some auth function
      console.log('there is a user');
    } else {
      FlowRouter.go('/noPermission');
    }
  }
};

//

// routing section

FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render("MainLayout", {content: "PatientAuth"});
  }
});

FlowRouter.route('/login', {
  action: function() {
    BlazeLayout.render("LoginLayout", {content: "Login"});
  }
});
//
FlowRouter.route('/patient/', {
  action: function() {
    BlazeLayout.render("DashboardLayout", {content: "PatientAuth"});
  }
});

//กรอกข้อมูลผู้ป่วยใหม่
FlowRouter.route('/patient/new', {
  action: function() {
    BlazeLayout.render("MainLayout", {content: "NewPatientForm"});
  }
});

//ทำการนัดหมาย
FlowRouter.route('/patient/:patientId/appointment/new', {
  action: function() {
    BlazeLayout.render("MainLayout", {content: "MakeAppointment"});
  }
});

//ทำการนัดหมาย
FlowRouter.route('/staff/patient/:patientId/appointment/new', {
  action: function() {
    BlazeLayout.render("DashboardLayout", {content: "MakeAppointmentStaff"});
  }
});

//จัดการนัด(มีดูตารางการนัด + console ให้เลื่อนนัด + ยกเลิกนัดได้ทันที)
FlowRouter.route('/patient/:patientId/appointment/', {
  triggersEnter: [Authentication.patientOTP],
  action: function() {
    BlazeLayout.render("DashboardLayout", {content: "ManageAppointment",
      permission:['staff','patient']
    });
  }
});

//เลื่อนนัด
FlowRouter.route('/patient/:patientId/appointment/postpone/:appointmentId', {
  triggersEnter: [Authentication.patientOTP],
  action: function() {
    BlazeLayout.render("MainLayout", {content: "PostponeAppointment",
        permission:['staff','patient']      
  });
  }
});

//ออกบัตรนัด
FlowRouter.route('/patient/:patientId/appointment/:appointmentId/print', {
  action: function() {
    BlazeLayout.render("DashboardLayout", {content: "PrintAppointmentCard",
       permission:['staff'] 
  });
  }
});


//บันทึกการตรวจสุขภาพเบื้องต้น
FlowRouter.route('/record/healthData/:staffId/:patientId', {
  action: function() {
    BlazeLayout.render("DashboardLayout", {content: "RecordHealthData",
       permission:['nurse','pharmacist'] 
  });
  }
});

//บันทึกการตรวจของหมอ
  FlowRouter.route('/record/medData/:patientId/', {

// FlowRouter.route('/record/medData/:docId/:patientId', {

  action: function() {
    BlazeLayout.render("DashboardLayout", {
      content: "RecordMedData",
       permission:['doctor'] 
    });
  }
});

//ค้นหาผู้ป่วย
FlowRouter.route('/find/patient', {
  action: function() {
    BlazeLayout.render("DashboardLayout", {
      content: "FindPatient",
       permission:['staff','nurse','pharmacist'] 
    });
  }
});

//ค้นหาแพทย์
FlowRouter.route('/find/doctor', {
  action: function() {
    BlazeLayout.render("DashboardLayout", {
      content: "FindDoctor",
      permission:['staff']       
    });
  }
});

//ดูตารางนัดหมายประจำวัน //เจ้าหน้าที่
FlowRouter.route('/view/dailyAppointment', {
  action: function() {
    BlazeLayout.render("DashboardLayout", {
      content: "ViewDailyAppointment",
     permission:['staff','doctor']       
    });
  }
});

//ดูข้อมูลผู้ป่วย //จนท หมอ เภสัข ต่างกัน
FlowRouter.route('/view/patientData/:patientId', {
  action: function() {
    BlazeLayout.render("DashboardLayout", {
      content: "ViewPatientData",
      permission:['nurse','pharmacist']       
    });
  }
});

//ดูตารางออกตรวจ
FlowRouter.route('/view/wardRound/:doctorId', {
  action: function() {
    BlazeLayout.render("DashboardLayout", {
      content: "ViewWardRound",
      permission:['staff','doctor']       
    }
    );
  }
});

//ดูตารางออกตรวจรายแผนก
FlowRouter.route('/view/wardRoundByDept', {
  action: function() {
    BlazeLayout.render("DashboardLayout", 
      {content: "ViewDeptWardRound",
       permission:['staff']       
      }
      );
  }
});

//นำเข้าตารางออกตรวจ
FlowRouter.route('/import/wardRound', {
  action: function() {
    BlazeLayout.render(
      "DashboardLayout",
      {content: "ImportWardRoundSchedule",
       permission:['staff'] 
      }
      );
  }
});

FlowRouter.route('/noPermission', {
  action: function() {
    BlazeLayout.render("DashboardLayout", {content: "AuthenticationFailed"});
  }
});


// global triggers

_dep = new Deps.Dependency();

FlowRouter.triggers.enter(function() {
  _dep.changed();
   
  if(!Meteor.user()){
    Session.set('currentRole','patient');
    return;
  }
  let role = Meteor.user().roles[0];

  Session.set('currentRole',role);
 });




