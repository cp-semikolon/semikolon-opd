class ManageAppointment extends BlazeComponent {
  onCreated() {
    super.onCreated();
    // this.state = new ReactiveDict();

    // registerDispatcher(this.state);
  }

  onRendered() {
    super.onRendered();
    $('.tooltipped').tooltip({delay: 50});
    $('.modal-trigger').leanModal();
  }

  currentPatientAppointments() {
    let PatientID = FlowRouter.getParam('patientId');
    return OPD.Model.Appointments.find({PatientID})
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
  }

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