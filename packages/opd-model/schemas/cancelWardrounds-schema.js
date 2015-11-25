Schema.CancelWardrounds = new SimpleSchema({
    // Doctor 
    UserID: {
      type: String,
      label: 'รหัสประจำบุคลากร'
    },
    // Cancellation list
    dateTime:{
      type: Object,
      label:'วันที่และช่วงเวลา',
      blackbox: true
    }
    // {
    //   Date: date,
    //   morning: true,
    //   afternoon: false
    // }
});
// Attach this to CancelWardrounds
Model.CancelWardrounds.attachSchema(Schema.CancelWardrounds);
