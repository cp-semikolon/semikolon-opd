Schema.CancelWardrounds = new SimpleSchema({
    // Doctor 
    UserID: {
      type: String,
      label: 'รหัสประจำบุคลากร',
      unique: true
    },
    // Cancellation list
    dateTimes: {
      type: Object,
      label:'วันที่และช่วงเวลา',
      blackbox: true
    }
    // dateTimes = {
    //   let d = new Date();
    //   d.toDateString(): {morning: true, afternoon: false},  
    //   'Fri Nov 27 2015': {morning: true, afternoon: true},
    //   'Sat Nov 28 2015': {morning: false, afternoon: false},
    // } [true = cancel, false = not cancel]
});
// Attach this to CancelWardrounds
Model.CancelWardrounds.attachSchema(Schema.CancelWardrounds);
