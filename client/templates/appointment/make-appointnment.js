class MakeAppointment extends BlazeComponent {
  thisAppointment() {
    return {
      PatientId: FlowRouter.getParam('patientId')
    };
  }

  patientId() {
    return FlowRouter.getParam('patientId');
  }
}

AutoForm.hooks({
  makeAppointment: {
    // onSuccess: function(formType, result) {
    //   let patientId = result;
    //   FlowRouter.go(`/patient/${patientId}/appointment/new`);
    // },

    // onError: function(formType, error) {
    //   Alert.error(error);
    // },
  }
});

MakeAppointment.register('MakeAppointment');