class MakeAppointment extends BlazeComponent {
  onCreated() {
    super.onCreated();
    Session.setDefault('selectedDepartment', '');
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

AutoForm.hooks({
  makeAppointment: {
    onSuccess() {
      Alert.success('คุณทำการนัดสำเร็จ');
      // Meteor.call('Appointment.sendConfirmationEmail', result);
      FlowRouter.go('/');
    },

    onError(formType, error) {
      Alert.error(error);
    },
  }
});

MakeAppointment.register('MakeAppointment');