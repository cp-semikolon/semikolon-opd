Schema.MedData = new SimpleSchema({
    // UserID: {
    //   type: String,
    //   label: 'รหัสประจำบุคลากร',
    //   max: 15
    // },
    ICD: {
      type: String,
      label: 'รหัสโรค',
      max: 15
    },
    // HN: {
    //   type: String,
    //   label: 'หมายเลข HN',
    //   regEx: /^HN[0-9]{8}$/
    // },
    Description: {
      type: String,
      label: 'คำอธิบาย',
      max: 500
    }, 

    
    
});

Model.MedData.attachSchema(Schema.MedData);