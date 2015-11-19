class AppointmentForm extends BlazeComponent {
  template() {
    return 'AppointmentForm';
  }

  value() {
    return 'cool';
  }
}

AppointmentForm.register('AppointmentForm');