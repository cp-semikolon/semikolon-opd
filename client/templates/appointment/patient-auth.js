// let Patients = OPD.Model.Patients;
let newAppointmentPath = '/appointment/new';

class PatientAuth extends BlazeComponent {
  onCreated() {
    super.onCreated();

    this.state = new ReactiveDict();
    this.state.set('require_otp', false);
    this.state.set('show_patient_auth_form', true);

    this.state.set('firstName', '');
    this.state.set('lastName', '');

    this.state.set('currentPatientId', '');

    registerDispatcher(this.state);
  }

  isRequireOTP() {
    return this.state.get('require_otp');
  }

  isShowPatientAuthForm() {
    return this.state.get('show_patient_auth_form');
  }

  patientAuthFormState() {
    return this.state.get('patientAuthFormType');
  }

  firstName() {
    return this.state.get('firstName');
  }

  lastName() {
    return this.state.get('lastName');
  }

  currentPatientId() {
    return this.state.get('currentPatientId');
  }
}

// Action dispatcher for this component

function registerDispatcher(state) {

  Dispatcher.register(action => {
      switch( action.type ) {
        case "PATIENT_MAKE_APPOINTMENT_REQUEST":
          FlowRouter.go(newAppointmentPath);
          break;

        case "PATIENT_REQUIRE_OTP":
          state.set('require_otp', true);
          state.set('firstName', action.patient.firstName);
          state.set('lastName', action.patient.lastName);
          state.set('currentPatientId', action.patient._id);
          state.set('show_patient_auth_form', false);
          break;

        case "PATIENT_NOT_FOUND":
          console.log("PATIENT_NOT_FOUND");
          break;

        case "PATIENT_OTP_AUTH_SUCCESS":
          console.log('success');
          break;

        case "PATIENT_OTP_AUTH_SUCCESS":
          console.log('fail');
          break;
      }
    });

}

PatientAuth.register('PatientAuth');