// let Patients = OPD.Model.Patients;
let newAppointmentPath = (patientId) => `/patient/${patientId}/appointment/new`;
let manageAppointmentPath = (patientId) => `/patient/${patientId}/appointment/`;
let newPatientPath = '/patient/new';

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
        case "PATIENT_CREATE_NEW":
          Session.set('FName', action.patient.FName);
          Session.set('LName', action.patient.LName);
          Session.set('SSID', action.patient.SSID);
          FlowRouter.go(newPatientPath);
          break;

        case "PATIENT_MAKE_APPOINTMENT_REQUEST":
          FlowRouter.go(newAppointmentPath(action.patientId));
          break;

        case "PATIENT_REQUIRE_OTP":
          state.set('require_otp', true);
          state.set('firstName', action.patient.FName);
          state.set('lastName', action.patient.LName);
          state.set('currentPatientId', action.patient._id);
          state.set('show_patient_auth_form', false);
          break;

        case "PATIENT_OTP_AUTH_SUCCESS":
          Alert.success();
          FlowRouter.go(manageAppointmentPath(action.patientId));
          break;

        case "PATIENT_OTP_AUTH_FAIL":
          Alert.error('one-time-password ไม่ถูกต้อง');
          break;
      }
    });

}

PatientAuth.register('PatientAuth');