Schema.RecordHealth = new SimpleSchema({
  UserID: {
    type: String,
    label: 'รหัสประจำบุคลากร',
    max: 15
  },
  Weight: {
    type: double,
    label: 'น้ำหนัก',
    max: 10
  },
  Height: {
    type: double,
    label: 'ส่วนสูง',
    max: 10
  },
  BodyTemp: {
    type: double,
    label: 'อุณหภูมิร่างกาย',
    max: 10
  },
  HeartRate: {
    type: int,
    label: 'อัตราการเต้นของหัวใจ',
    max: 10;
  },
  SystolicBP: {
    type: int,
    label: 'ความดันสูงสุด',
    max: 10
  },
  DiastolicBP: {
    type: int,
    label: 'ความดันต่ำสุด',
    max: 10
  },
  HN: {
    type: String,
    label: 'หมายเลข HN',
    regEx: /^HN[0-9]{8}$/,
    optional: true
  }
});

//Model.Patients.attachSchema(Schema.Patients);