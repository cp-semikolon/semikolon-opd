Schema.Department = new SimpleSchema({
    ID: {
      type: String,
      label: 'รหัสประจำแผนก',
      max: 15
    },
    Name: {
      type: String,
      label: 'ชื่อแผนก',
      max: 50
    },
   
});

//Model.Patients.attachSchema(Schema.Patients);