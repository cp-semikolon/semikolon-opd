class RecordMedData extends BlazeComponent {
  onCreate(){
    super.onCreate();
    this.state = new ReactiveDict();
    this.state.set('date',{date:new Date(),Time:''});
  }
  event(){
    return super.event().concat({
      'change #selectdate'(e){
        this.state.set('date',e.target.value);
      }
    });
  }




  recordIndex() { return RecordIndex; } // instanceof EasySearch.Index
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
        value:{date:medrec.date,Time:medrec.Time}
      };
     });
}

}


let RecordData = OPD.Model.Record;


RecordIndex = new EasySearch.Index({
  collection: RecordData,
  fields: ['patientid'],
  engine: new EasySearch.Minimongo({
    sort: () => ['Date'],
  	// selector: function (searchObject, options, aggregation) {
  	// 	console.log(searchObject);

  	// let selector =
   //    this.defaultConfiguration().selector(searchObject, options, aggregation);
      
  	// return selector;
  	// }

  })
});


Template.RecordMedData.helpers({

		
    // medrecord() {
    //   console.log('check');
    //     let patientId = FlowRouter.getParam('patientId');
    //     let temp = MedIndex.search(patientId).fetch();
    //     console.log(temp);
    //     return temp;
    // }
});
