class MakeAppointment extends BlazeComponent {
  patientId() {
    return FlowRouter.getParam('patientId');
  }
}

AutoForm.hooks({
  makeAppointment: {
    onSuccess() {
      Alert.success('คุณทำการนัดสำเร็จ');
      // Meteor.call('Appointment.sendConfirmationEmail', result);
      FlowRouter.go('/');
    },

    onError(formType, error) {
      Alert.error(error);
    },
  }
});

MakeAppointment.register('MakeAppointment');