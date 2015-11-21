Schema.Dispenses = new SimpleSchema({
    UserID: {
      type: String,
      label: "รหัสประจำบุคลากร",
      max: 15,
      optional: true
    },
    HN: {
      type: String,
      abel: 'หมายเลข HN',
      regEx: /^HN[0-9]{8}$/
    },
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
    Date: {
      type: [Date],
      label: "วันที่จ่ายยา"
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
    }
});

//Model.Patients.attachSchema(Schema.Patients);