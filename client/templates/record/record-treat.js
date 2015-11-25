
// function getyaa(){
//   let x = $('div.something');
//   if(!x[0])  {
//     x = [x];
//   }

//   console.log(x);

//   x.map(d => {
//     console.log('check');
//     console.log(d);
//     return {
//       ID:OPD.Model.DiseaseData.findOne(d.find('.item').data('value')),
//       Description:d.find('textarea.description').val(),
//       Amount:d.find('.amount'),
//       Unit:d.find('.unit')
//     };
//   });

//   console.log(x);

//   return x;
// }

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
        let lastedRecord = OPD.Model.Record.findOne({patientid:patientId})._id;
        if(!lastedRecord){
          lastedRecord='';
        }
        else{
          lastedRecord=lastedRecord._id;
        }
        OPD.Model.Record.upsert(
          {
            _id:lastedRecord
          },
          {
            doctorid:docId,
            Time:'เช้า',
            Med:{
              ICD:OPD.Model.DiseaseData.findOne($('#icd .item').data('value')).ICD,
              Description:$('#textarea1').val()
            },
            // Dispense:getyaa(),
            Dispense:{
              ID:OPD.Model.DiseaseData.findOne($('div.something').find('.item').data('value')),
              Description:$('div.something').find('textarea.description').val(),
              Amount:$('div.something').find('.amount'),
              Unit:$('div.something').find('.unit')
            },
            DispensesStatus:false
          },
          {
            // upsert : true,
            validate: false
          }
        );
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
//   date(){
//     let patientId = FlowRouter.getParam('patientId');
//     let medrecs = OPD.Model.Appointments.find(
//       {PatientID:patientId},
//       {sort: {AppDate: 1}
//     });
    
//      return medrecs.map((medrec)=>{
//       return {
//         label:
//           `${medrec.AppDate.getUTCDate()}` +
//           `/${medrec.AppDate.getUTCMonth()+1}` +
//           `/${medrec.AppDate.getFullYear()}` +
//           `(${medrec.AppTime})`,
//         value:medrec._id
//       };
//      });
// }

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