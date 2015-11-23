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

//จัดการนัด(มีดูตารางการนัด + console ให้เลื่อนนัด + ยกเลิกนัดได้ทันที)
FlowRouter.route('/patient/:patientId/appointment/', {
  action: function() {
    BlazeLayout.render("DashboardLayout", {content: "ManageAppointment"});
  }
});

//เลื่อนนัด
FlowRouter.route('/patient/:patientId/appointment/posepone/:appointmentId', {
  action: function() {
    BlazeLayout.render("MainLayout", {content: "PoseponeAppointment"});
  }
});

//ออกบัตรนัด
FlowRouter.route('/patient/:patientId/appointment/:appointmentId/print', {
  action: function() {
    BlazeLayout.render("DashboardLayout", {content: "PrintAppointmentCard"});
  }
});


//บันทึกการตรวจสุขภาพเบื้องต้น
FlowRouter.route('/record/healthData/:staffId/:patientId/:date', {
  action: function() {
    BlazeLayout.render("DashboardLayout", {content: "RecordHealthData"});
  }
});

//บันทึกการตรวจของหมอ
FlowRouter.route('/record/medData/:docId/:patientId/:date', {
  action: function() {
    BlazeLayout.render("DashboardLayout", {content: "RecordMedData"});
  }
});

//ค้นหาผู้ป่วย
FlowRouter.route('/find/patient', {
  action: function() {
    BlazeLayout.render("DashboardLayout", {content: "FindPatient"});
  }
});

//ค้นหาแพทย์
FlowRouter.route('/find/doctor', {
  action: function() {
    BlazeLayout.render("DashboardLayout", {content: "FindDoctor"});
  }
});

//ดูตารางนัดหมายประจำวัน //เจ้าหน้าที่
FlowRouter.route('/view/dailyAppointment/:date', {
  action: function() {
    BlazeLayout.render("DashboardLayout", {content: "ViewDailyAppointment"});
  }
});

//ดูข้อมูลผู้ป่วย //จนท หมอ เภสัข ต่างกัน
FlowRouter.route('/view/patientData/:patientId', {
  action: function() {
    BlazeLayout.render("DashboardLayout", {content: "ViewPatientData"});
  }
});

//ดูตารางออกตรวจ
FlowRouter.route('/view/wardRound/:doctorId', {
  action: function() {
    BlazeLayout.render("DashboardLayout", {content: "ViewWardRound"});
  }
});

//ดูตารางออกตรวจรายแผนก
FlowRouter.route('/view/wardRound/:deptId', {
  action: function() {
    BlazeLayout.render("DashboardLayout", {content: "ViewDeptWardRound"});
  }
});

//นำเข้าตารางออกตรวจ
FlowRouter.route('/import/wardRound', {
  action: function() {
    BlazeLayout.render("DashboardLayout", {content: "ImportWardRoundSchedule"});
  }
});










