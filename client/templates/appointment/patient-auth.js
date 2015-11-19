// let Patients = OPD.Model.Patients;
let newAppointmentPath = '/appointment/new';

class PatientAuth extends BlazeComponent {

}

// Action dispatcher for the template

Dispatcher.register(action => {
  switch( action.type ) {
    case "PATIENT_MAKE_APPOINTMENT_REQUEST":
      FlowRouter.go(newAppointmentPath);
      break;

    case "PATIENT_AUTHENTICATION_FAIL":
      console.log('fail');
      break;
  }
});

PatientAuth.register('PatientAuth');