
function getyaa(){
  return $('#something div').map($d => {
    return {
      ID:OPD.Model.DiseaseData.findOne($d.find('input').data('value')),
      Description:$d.find('textarea.description').val(),
      Amount:$d.find('amount'),
      Unit:$d.find('unit')
    };
  });
}

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
            ICD:OPD.Model.DiseaseData.findOne($('#icd .item').data('value')).ICD,
            Description:$('#textarea1').val()
          },
          Dispense:getyaa(),
          DispensesStatus:false
        });
      }
    });
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
    let medrecs = OPD.Model.Appointments.find(
      {PatientID:patientId},
      {sort: {AppDate: 1}
    });
    
     return medrecs.map((medrec)=>{
      return {
        label:
          `${medrec.AppDate.getUTCDate()}` +
          `/${medrec.AppDate.getUTCMonth()+1}` +
          `/${medrec.AppDate.getFullYear()}` +
          `(${medrec.AppTime})`,
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