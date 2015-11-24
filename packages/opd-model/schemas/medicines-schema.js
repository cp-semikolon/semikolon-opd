Schema.Medicines = new SimpleSchema({
    ID: {
      type: String,
      label: 'รหัสยา',
      max: 15
    },
    Name: {
      type: String,
      label: 'ชื่อยา',
      max: 50
    },
    Description: {
      type: String,
      label: 'คำอธิบาย',
      max: 200
    }, 
});

Model.MedicineData.attachSchema(Schema.Medicines);