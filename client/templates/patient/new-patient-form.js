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
}

NewPatientForm.register('NewPatientForm');