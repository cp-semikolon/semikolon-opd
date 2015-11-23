Schema.HealthData = new SimpleSchema({
  // UserID: {
  //   type: String,
  //   label: 'รหัสประจำบุคลากร',
  //   max: 15
  // },
  Weight: {
    type: Number,
    label: 'น้ำหนัก',
    max: 10,
    decimal: true
  },
  Height: {
    type: Number,
    label: 'ส่วนสูง',
    max: 10,
    decimal: true
  },
  BodyTemp: {
    type: Number,
    label: 'อุณหภูมิร่างกาย',
    max: 10,
    decimal: true
  },
  HeartRate: {
    type: Number,
    label: 'อัตราการเต้นของหัวใจ',
    max: 10
  },
  SystolicBP: {
    type: Number,
    label: 'ความดันสูงสุด',
    max: 10
  },
  DiastolicBP: {
    type: Number,
    label: 'ความดันต่ำสุด',
    max: 10
  },
  // HN: {
  //   type: String,
  //   label: 'หมายเลข HN',
  //   regEx: /^HN[0-9]{8}$/,
  //   optional: true
  // }
    patientid:{
      type: String,
      max: 50
    },
    doctorid:{
      type:String,
      max:50
    }
});

Model.HealthData.attachSchema(Schema.HealthData);