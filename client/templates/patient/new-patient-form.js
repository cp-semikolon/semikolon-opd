class NewPatientForm extends BlazeComponent {
  currentPatient() {
    return {
      FName: Session.get('FName'),
      LName: Session.get('LName'),
      SSID: Session.get('SSID')
    };
  }
}

AutoForm.hooks({
  newPatientForm: {
    onSuccess: function(formType, result) {
      let patientId = result;
      FlowRouter.go(`/patient/${patientId}/appointment/new`);
    },

    onError: function(formType, error) {
      Alert.error(error);
    },
  }
});

NewPatientForm.register('NewPatientForm');