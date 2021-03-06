class ManageAppointment extends BlazeComponent {
  onCreated() {
    super.onCreated();
    // this.state = new ReactiveDict();

    // registerDispatcher(this.state);
  }

  onRendered() {
    super.onRendered();
    $('.tooltipped').tooltip({delay: 50});
    $('.modal-trigger').leanModal({
      // Modal can be dismissed by clicking outside of the modal
      dismissible: true, 
      opacity: 0.5, // Opacity of modal background
      in_duration: 300, // Transition in duration
      out_duration: 200, // Transition out duration
      height: 100
    });
  }

  staff() {
    if( Meteor.user() ) {
      return  '/staff';
    }
    return '';
  }

  currentPatientAppointments() {
    let PatientID = FlowRouter.getParam('patientId');
    let result =  OPD.Model.Appointments.find({PatientID})
      .map(appointment => {

        let department =
          OPD.Model.Departments.findOne(appointment.DepartmentID);
        let doctor = Meteor.users.findOne(appointment.DoctorID);
        let d = new Date(appointment.AppDate);

        appointment.Date = 
          `${d.getUTCDate()}/${d.getUTCMonth()+1}/${d.getFullYear()}`;

        appointment.DoctorName = 
          `${doctor.profile.FName} ${doctor.profile.LName}`;

        appointment.DepartmentName = department.Name;

        return appointment;
    });
    // console.log('res', result);
    return result;
  }

  currentPatient(){
    let PatientID = FlowRouter.getParam('patientId');
    return OPD.Model.Patients.findOne(PatientID);
  }

  // onError() {
  //   return function (error) { alert("BOO!"); console.log(error); };
  // }
  // onSuccess() {
  //   let patientId = FlowRouter.getParam('patientId');
  //   Alert.success('คุณทำการยกเลิกนัดสำเร็จ');
  //   FlowRouter.go(`/patient/${patientId}/appointment/`);
  // }



}

// // Action dispatcher for this component

// function registerDispatcher(state) {

//   Dispatcher.register(action => {
//       switch( action.type ) {
//         case "PATIENT_MAKE_APPOINTMENT_REQUEST":
//           FlowRouter.go(state);
//           break;

//       }
//     });

// }

ManageAppointment.register('ManageAppointment');