class RecordMedData extends BlazeComponent {
  onCreate(){
    super.onCreate();
    this.state = new ReactiveDict();
    this.state.set('id','');
  }
  event(){
    return super.event().concat({
      'change #selectdate'(e){
        this.state.set('id',e.target.value);
      }
    });
  }

  getrecord(){
    let id = this.state.get('id');
    return OPD.Model.Record.findOne(id);
  }

  getdisease(icd){
    return OPD.Model.diseaseData.findOne({ICD:icd}).Name;
  }

  getmedicine(id){
    return OPD.Model.medicineData.findOne({ID:id}).Name;
  }

  patient(){
    let patientId = FlowRouter.getParam('patientId');
    return OPD.Model.Patients.findOne(patientId);
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


let RecordData = OPD.Model.Record;


RecordIndex = new EasySearch.Index({
  collection: RecordData,
  fields: ['patientid','Date','Time'],
  engine: new EasySearch.Minimongo({

  })
});



