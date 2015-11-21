Schema.Appointments = new SimpleSchema({
  SSID: {
    type: String,
    label: 'หมายเลขประจำตัวประชาชน',
    max: 50
  },
  PassportNo: {
    type: String,
    label: 'หมายเลขหนังสือเดินทาง',
    max: 50
  },
  HN: {
    type: String,
    label: 'หมายเลข HN',
    regEx: /^HN[0-9]{8}$/
  },
  DepartmentID: {
    type: String,
    label: 'แผนก',
    max: 50
  },
  UserID: {
    type: String,
    label: 'แพทย์',
    max: 50
  },
  AppDate: {
    type: Date,
    label: 'วันที่ต้องการนัดหมาย'
  },
  AppTime: {
    type: String,
    label: "ช่วงเวลา",
    allowedValues: ['เช้า', 'บ่าย']
  },
});

Model.Appointments.attachSchema(Schema.Appointments);