FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render("MainLayout", {content: "PatientAuth"});
  }
});

FlowRouter.route('/patient/new', {
  action: function() {
    BlazeLayout.render("MainLayout", {content: "NewPatientForm"});
  }
});

FlowRouter.route('/patient/:patientId/appointment/new', {
  action: function() {
    BlazeLayout.render("MainLayout", {content: "MakeAppointment"});
  }
});

FlowRouter.route('/patient/:patientId/appointment/', {
  action: function() {
    BlazeLayout.render("MainLayout", {content: "ManageAppointment"});
  }
});

FlowRouter.route('/patient/', {
  action: function() {
    BlazeLayout.render("DashboardLayout", {content: "PatientAuth"});
  }
});
