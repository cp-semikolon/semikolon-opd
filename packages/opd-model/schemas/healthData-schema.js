Schema.HealthData = new SimpleSchema({
  // UserID: {
  //   type: String,
  //   label: 'รหัสประจำบุคลากร',
  //   max: 15
  // },
  Weight: {
    type: Number,
    label: 'น้ำหนัก (กก.)',
    max: 300,
    min:1,
    decimal: true
  },
  Height: {
    type: Number,
    label: 'ส่วนสูง (ซม.)',
    max: 200,
    min:1,
    decimal: true
  },
  BodyTemp: {
    type: Number,
    label: 'อุณหภูมิร่างกาย (องศาเซลเซียส)',
    max: 100,
    min:1,
    decimal: true
  },
  HeartRate: {
    type: Number,
    label: 'อัตราการเต้นของหัวใจ (bpm)',
    max: 100,
    min:1
  },
  SystolicBP: {
    type: Number,
    label: 'ความดันสูงสุด (mmHg)',
    max: 200,
    min: 1
  },
  DiastolicBP: {
    type: Number,
    label: 'ความดันต่ำสุด (mmHg)',
    max: 150,
    min:1
  },
  // HN: {
  //   type: String,
  //   label: 'หมายเลข HN',
  //   regEx: /^HN[0-9]{8}$/,
  //   optional: true
  // }

});

Model.HealthData.attachSchema(Schema.HealthData);

// OPD.Model.HealthData.insert({Weight:'1',Height:'1',BodyTemp:'1',HeartRate:'1',SystolicBP:'1',DiastolicBP:'1',Date:new Date('2015-11-11'),patientid:'1',doctorid:'1'})