class ViewPatientData extends BlazeComponent{
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
  getRole(){
    return Session.get('currentRole');
  }
  getrecord(){
    let id = this.state.get('id');
    return OPD.Model.Record.findOne(id);
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

