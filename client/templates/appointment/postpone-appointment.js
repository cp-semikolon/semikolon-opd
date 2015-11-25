class PostponeAppointment extends BlazeComponent {
  onCreated() {
    super.onCreated();
    Session.setDefault('selectedDepartment', ''); 
  }

  currentAppointment() {
    let Appointment = FlowRouter.getParam('appointmentId');
    let currentAppointmentValue = OPD.Model.Appointments.findOne(Appointment);

    Session.set('selectedDepartment', currentAppointmentValue.DepartmentID);
    return currentAppointmentValue;
  }

  patientId() {
    return FlowRouter.getParam('patientId');
  }

  doctors() {
    return Meteor.users.find(
      {
        'profile.roles.0': 'doctor',
        'profile.Department': Session.get('selectedDepartment')
      }
    ).map(d => {
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

AutoForm.hooks({
  postponeAppointment: {
    onSuccess() {
      let patientId = FlowRouter.getParam('patientId');
      let isStaff = Meteor.user().profile.roles[0] === 'staff';

      Alert.success('คุณทำการเลื่อนนัดสำเร็จ');
      // Meteor.call('Appointment.sendConfirmationEmail', result);
      if (isStaff) {
        FlowRouter.go('/view/dailyAppointment');
      } else {
        FlowRouter.go(`/patient/${patientId}/appointment/`);
      }
      
    },

    onError(formType, error) {
      Alert.error(error);
    },
  }
});


PostponeAppointment.register('PostponeAppointment');