FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "makeAppointmentForm"});
  }
});

// FlowRouter.route('/:postId', {
//   action: function() {
//     BlazeLayout.render("mainLayout", {content: "blogPost"});
//   }
// });