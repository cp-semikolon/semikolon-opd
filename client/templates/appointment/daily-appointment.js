class ViewDailyAppointment extends BlazeComponent {
  onCreated() {
    super.onCreated();
    this.state = new ReactiveDict();

    this.state.set('appointmentDate', new Date());
  }

  onRendered() {
    super.onRendered();
    // document ready
    let date = new Date();
    let today = [date.getFullYear(), date.getMonth(), date.getDate()];
    $('#appointment-date').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 25, // Creates a dropdown of 15 years to control year
      onStart() {
          this.set( 'select', today );
      }
    });

    this.state.set('appointmentDate', new Date(...today));

    $('.modal-trigger').leanModal({
      // Modal can be dismissed by clicking outside of the modal
      dismissible: true, 
      opacity: 0.5, // Opacity of modal background
      in_duration: 300, // Transition in duration
      out_duration: 200, // Transition out duration
      height: 100
    });
  }

  currentDateAppointments() {
    let appointmentDate = this.state.get('appointmentDate');
    return OPD.Model.Appointments.find({AppDate: appointmentDate})
      .map(appointment => {

        let department =
          OPD.Model.Departments.findOne(appointment.DepartmentID);
        let doctor = Meteor.users.findOne(appointment.DoctorID);
        let patient = OPD.Model.Patients.findOne(appointment.PatientID);

        appointment.DoctorName = 
          `${doctor.profile.FName} ${doctor.profile.LName}`;

        appointment.DepartmentName = department.Name;

        appointment.PatientName = `${patient.FName} ${patient.LName}`;

        return appointment;
    });
  }

  events() {
    return super.events().concat({
      'change input#appointment-date'(e) {
        this.state.set('appointmentDate', new Date(e.target.value));
      }
    });
  }
}

ViewDailyAppointment.register('ViewDailyAppointment');
