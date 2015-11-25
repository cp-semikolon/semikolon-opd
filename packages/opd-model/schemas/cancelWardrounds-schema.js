Schema.CancelWardrounds = new SimpleSchema({
    // which doctor 
    UserID: {
      type: String,
      label: 'รหัสประจำบุคลากร',
      unique: true
    },
    // A doctor can have many wardround day and times
    dateTime:{
      type: Object,
      label:'วันที่และช่วงเวลา',
      blackbox: true
    }    
});
// Attach this to WardRound
Model.CancelWardrounds.attachSchema(Schema.CancelWardrounds);
