class ViewDispensesList extends BlazeComponent {  
  onCreated() {
    
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

  }

  currentData() {
    return OPD.Model.Record.find({DispensesStatus: false})
      .map(record => {
        let doctor = Meteor.users.findOne(record.doctorid);
        record.DoctorName = `${doctor.profile.FName} ${doctor.profile.LName}`;
        
        let doctorDeptID = doctor.profile.Department; 
        let Department =
          OPD.Model.Departments.findOne(doctorDeptID);
        record.DepartmentName = Department.Name;  
        
        let d = new Date(record.Date);
        record.Date = 
          `${d.getUTCDate()}/${d.getUTCMonth()+1}/${d.getFullYear()}`;

        let patient = OPD.Model.Patients.findOne(record.patientid); 
        record.PatientName = `${patient.Title}${patient.FName} ${patient.LName}`;

        record.Dispense = record.Dispense
          .map(dispense => {
            Yaa = OPD.Model.MedicineData.findOne(dispense.ID);
            if(Yaa) dispense.YaaName = Yaa.Name;
          return dispense;
        });
      return record;
    });
  }

  events() {
    return super.events().concat({
      "click .update-status": function () {
        // Set the checked property to the opposite of its current value
        OPD.Model.Record.update(this._id, {
          $set: {DispensesStatus: true}
        });
      }
    }); 
  }


}


ViewDispensesList.register('ViewDispensesList');