class ViewDispensesList extends BlazeComponent {  
  onCreated() {
    
  }

  onRendered() {
    
  }

  staff() {

  }

  currentData() {
    return OPD.Model.Record.find({DispensesStatus: '0'})
      .map(record => {
        let doctor = Meteor.users.findOne(record.doctorid);
        record.DoctorName = `${doctor.profile.FName} ${doctor.profile.LName}`;
        
        let doctorDeptID = doctor.profile.Department; 
        record.DepartmentName =
          OPD.Model.Departments.findOne(doctorDeptID);
        
        let d = new Date(record.Date);
        record.Date = 
          `${d.getUTCDate()}/${d.getUTCMonth()+1}/${d.getFullYear()}`;

        let patient = OPD.Model.Patients.findOne(record.patientid); 
        record.PatientName = `${patient.FName} ${patient.LName}`;

        record.Dispense = record.Dispense
          .map(dispense => {
            dispense.Yaa = OPD.Model.Medicines.findOne(ID);
          return dispense;
        });
      return record;
    });
  }

  // currentDispensesList(){
  //   return OPD.Model.Record.find({DispensesStatus: '0'})
  //     .map(record => {
  //       let dispense = record.Dispense;

  //       dispense.ID = ID;
  //       dispense.Description = Description;
  //       dispense.Amount = Amount;
  //       dispense.Unit = Unit;

  //       return dispense;
  //   });
  // }

}


ViewDispensesList.register('ViewDispensesList');