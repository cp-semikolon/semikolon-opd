// let Patients = OPD.Model.Patients;
let newAppointmentPath = '/appointment/new';

class PatientAuth extends BlazeComponent {
  onCreated() {
    super.onCreated();

    this.state = new ReactiveDict();
    this.state.set('require_otp', false);
    this.state.set('show_patient_auth_form', true);

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
          this.state.set('patientAuthFormType', 'disabled');
          break;
      }
    });

}

PatientAuth.register('PatientAuth');