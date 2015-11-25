class ViewPatientData extends BlazeComponent{
  onCreated(){
    super.onCreated();
    this.state = new ReactiveDict();
    this.state.set('id','');
  }
  onRendered(){
    super.onRendered();
    $('select').material_select();
  }
  events(){
    return super.events().concat({
      'change #selectdate'(e){
        this.state.set('id',e.target.value);
      }
    });
  }
  getRole(role){
    currentRole=Session.get('currentRole');
    return currentRole===role;
  }
  getrecord(){
    let id = this.state.get('id');
    return OPD.Model.Record.findOne(id);
  }
  getdisease(icd){
    if(!OPD.Model.DiseaseData.findOne({ICD:icd})){
      return 'ไม่พบ'
    }
    return OPD.Model.DiseaseData.findOne({ICD:icd}).Name;
  }
  getmedicine(id){
    if(!OPD.Model.MedicineData.findOne({ID:id})){
      return 'ไม่พบ'
    }
    return OPD.Model.MedicineData.findOne({ID:id}).Name;
  }
  date(){
    let patientId = FlowRouter.getParam('patientId');
    let medrecs = OPD.Model.Record.find(
      {patientid:patientId},
      {sort: {Date: 1}
    });
    
     return medrecs.map((medrec)=>{
      return {
        label:
          `${medrec.Date.getUTCDate()}` +
          `/${medrec.Date.getUTCMonth()+1}` +
          `/${medrec.Date.getFullYear()}` +
          `(${medrec.Time})`,
        value:medrec._id
      };
     });
  }
}

ViewPatientData.register('ViewPatientData');

