Schema.Woks = new SimpleSchema({
    UserID: {
      type: String,
      label: 'รหัสยา',
      max: 15
    },
    Time: {
      type: String,
      label: "ช่วงเวลา",
      allowedValues: ['เช้า', 'บ่าย']
    },
    Day: {
      type: String,
      label: "วัน",
      allowedValues: ['Monday', 'Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
    }, 
});

//Model.Patients.attachSchema(Schema.Patients);