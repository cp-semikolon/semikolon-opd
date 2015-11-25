AutoForm.hooks({
  recordHealthData: {
    before: {
      method: function(doc) {
        // Potentially alter the doc
        let patientid=FlowRouter.getParam('patientId');
        return doc;
      }
  },
    onSuccess: function(formType, result) {
      let patientId = result;
      Materialize.toast('เพิ่มข้อมูลสำเร็จ', 2000,'light-green lighten-1');
    },

    onError: function(formType, error) {
     Materialize.toast('ล้มเหลว', 2000,'red lighten-1');
      //Alert.error(error);
    },
  }
});