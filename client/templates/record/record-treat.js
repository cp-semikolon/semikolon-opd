class RecordMedData extends BlazeComponent {
  onCreated(){
    super.onCreated();
    this.state = new ReactiveDict();
    this.state.set('id','');
  }
  onRendered(){
    super.onRendered();
    $('#selectdate').material_select();
  }
  events(){
    return super.events().concat({
      'change #selectdate'(e){
        this.state.set('id',e.target.value);
      },
      'click #submit'(e){
        let patientId = FlowRouter.getParam('patientId');
        let docId = FlowRouter.getParam('docId');
        OPD.Model.Record.insert({
          patientid:patientId,
          doctorid:docId,
          Date:new Date(),
          Time:'เช้า',
          Med:{
            ICD:$('#icd input').val(),
            Description:$('#textarea1 textarea').target.value
          }


        });
      }
    });
  }

  arraymedicine(){
    
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

  patient(){
    let patientId = FlowRouter.getParam('patientId');
    return OPD.Model.Patients.findOne(patientId);
  }

  diseaseIndex(){
    return DiseaseIndex;
  }
  medicineIndex(){
    return MedicineIndex;
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


let DiseaseData=OPD.Model.DiseaseData;

DiseaseIndex = new EasySearch.Index({
  collection: DiseaseData,
  fields: ['ICD'],
  engine: new EasySearch.Minimongo({
  })
});

RecordMedData.register('RecordMedData');

let MedicineData=OPD.Model.MedicineData;

MedicineIndex=new EasySearch.Index({
  collection: MedicineData,
  fields: ['Name'],
  engine: new EasySearch.Minimongo({
  })
});