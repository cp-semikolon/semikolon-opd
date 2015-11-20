FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render("MainLayout", {content: "PatientAuth"});
  }
});

FlowRouter.route('/appointment/new', {
  action: function() {
    BlazeLayout.render("MainLayout", {content: "MakeAppointment"});
  }
});

FlowRouter.route('/patient/', {
  action: function() {
    BlazeLayout.render("DashboardLayout", {content: "PatientAuth"});
  }
});
