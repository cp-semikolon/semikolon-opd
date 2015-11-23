class PostponeAppointment extends BlazeComponent {
  onCreated() {
    super.onCreated();
    Session.setDefault('selectedDepartment', '');
  }

  currentAppointment() {
    let Appointment = FlowRouter.getParam('appointmentId');
    return OPD.Model.Appointments.findOne(Appointment);
  }

  patientId() {
    return FlowRouter.getParam('patientId');
  }

  doctors() {
    let doctorList = Meteor.users.find(
      {
        'profile.roles.0': 'doctor',
        'profile.Department': Session.get('selectedDepartment')
      }
    ).fetch();

    return doctorList.map(d => {
      return {
          label: `แพทย์ ${d.profile.FName} ${d.profile.LName}`,
          value: d._id
        };
      }
    );
  }

  events() {
    return super.events().concat({
      'change select[name="DepartmentID"]'(e) {
        Session.set('selectedDepartment', e.target.value);
      }
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

PostponeAppointment.register('PostponeAppointment');