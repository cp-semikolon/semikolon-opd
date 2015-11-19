Schema.Disease = new SimpleSchema({
    ICD: {
      type: String,
      label: 'รหัสโรค',
      max: 15
    },
    Name: {
      type: String,
      label: 'ชื่อโรค',
      max: 50
    },
    Description: {
      type: String,
      label: 'คำอธิบาย',
      max: 200
    },
    
});

//Model.Patients.attachSchema(Schema.Patients);
