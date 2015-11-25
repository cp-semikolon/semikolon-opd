class ViewDispensesList extends BlazeComponent {  
  onCreated() {
    
  }

  onRendered() {
    
  }

  staff() {

  }

  currentDispemsesList() {

  }

  currentDispense(){
    let PatientID = FlowRouter.getParam('patientId');
    return OPD.Model.Patients.findOne(PatientID);
  }

}


ViewDispensesList.register('ViewDispensesList');