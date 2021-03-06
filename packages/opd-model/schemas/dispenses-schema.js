Schema.DispenseData = new SimpleSchema({
    // UserID: {
    //   type: String,
    //   label: "รหัสประจำบุคลากร",
    //   max: 15,
    //   optional: true
    // },
    // HN: {
    //   type: String,
    //   abel: 'หมายเลข HN',
    //   regEx: /^HN[0-9]{8}$/
    // },
    ID: {
      type: String,
      label: "รหัสยา",
      max: 15
    },
    Description: {
      type: String,
      label: "คำอธิบาย",
      max: 200
    },
    
    Amount: {
      type: Number,
      label: "จำนวน",
      max: 50
    },
    Unit: {
      type: String,
      label: "หน่วย",
      //allowedValues: ['Staff', 'Doctor','Nurse','Pharmacist'] *** มีอะไรบ้างวะเม็ด แผง ขวด ?
    },

});

Model.DispenseData.attachSchema(Schema.DispenseData);

// OPD.Model.DispenseData.insert({ID:'1',Description:'1',Date:new Date('2015-11-11'),Amount:'1',Unit:'1',patientid:'1',doctorid:'1'})