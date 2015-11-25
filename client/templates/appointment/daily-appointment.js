class ViewDailyAppointment extends BlazeComponent {
  onCreated() {
    super.onCreated();
    this.state = new ReactiveDict();

    this.state.set('appointmentDate', new Date());
  }

  isDoctor() {
    return Meteor.user().profile.roles[0] === 'doctor';
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
    initializedDynamicUIComponent();
  }

  currentDateAppointments() {
    let appointmentDate = this.state.get('appointmentDate');
    return OPD.Model.Appointments.find({AppDate: appointmentDate})
      .map(appointment => {

        let department =
          OPD.Model.Departments.findOne(appointment.DepartmentID);
        let doctor = Meteor.users.findOne(appointment.DoctorID);
        let patient = OPD.Model.Patients.findOne(appointment.PatientID);
        let d = new Date(appointment.AppDate);

        appointment.Date = 
          `${d.getUTCDate()}/${d.getUTCMonth()+1}/${d.getFullYear()}`;

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
        this.vanz();
      }
    });
  }

  vanz(){
    Meteor.setTimeout(initializedDynamicUIComponent,20);
  }
}

function initializedDynamicUIComponent(){
  $('.modal-trigger').leanModal({
    // Modal can be dismissed by clicking outside of the modal
    dismissible: true, 
    // opacity: 0.5, // Opacity of modal background
    // in_duration: 300, // Transition in duration
    // out_duration: 200, // Transition out duration
    // height: 100
  });
  $('.tooltipped').tooltip({delay: 50});
}


ViewDailyAppointment.register('ViewDailyAppointment');
