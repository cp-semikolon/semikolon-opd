class NewPatientForm extends BlazeComponent {
  FName() {
    return Session.get('FName');
  }

  LName() {
    return Session.get('LName');
  }

  SSID() {
    return Session.get('SSID');
  }

  currentPatient() {
    return {
      FName: Session.get('FName'),
      LName: Session.get('LName'),
      SSID: Session.get('SSID')
    };
  }
}

NewPatientForm.register('NewPatientForm');