Schema.Works = new SimpleSchema({
    UserID: {
      type: String,
      label: 'รหัสประจำบุคลากร',
      unique: true
    },
    // A doctor can have many wardround day and times
    dayTime:{
      type: Object,
      label:'วันและช่วงเวลา',
      blackbox:true
    }    
});
// Attach this to WardRound
Model.Wardrounds.attachSchema(Schema.Works);
