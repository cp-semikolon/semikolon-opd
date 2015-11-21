_DayTime = new SimpleSchema({
  Day: {
    type: String,
    label: "วัน",
    allowedValues: ['Monday', 'Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
  },
  Time: {
    type: String,
    label: "ช่วงเวลา",
    allowedValues: ['เช้า', 'บ่าย']
  }
});

Schema.Works = new SimpleSchema({
    UserID: {
      type: String,
      label: 'รหัสประจำบุคลากร',
      max: 15
    },
    // A doctor can have many wardround day and times
    dayTime:{
      type: [_DayTime],
      label: 'วันและช่วงเวลาออกตรวจ',
      maxCount: 14,
      unique: true 
    }    
});
// Attach this to WardRound
Model.Wardrounds.attachSchema(Schema.Works);
