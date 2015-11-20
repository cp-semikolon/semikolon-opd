Schema.Patients = new SimpleSchema({
    Title: {
      type: String,
      label: 'คำนำหน้า',
      max: 15
    },
    FName: {
      type: String,
      label: 'ชื่อ',
      max: 50
    },
    LName: {
      type: String,
      label: 'นามสกุล',
      max: 50
    },
    TelNo: {
      type: String,
      label: 'หมายเลขโทรศัพท์',
      min: 9,
      max: 10
    },
    Nationality: {
      type: String,
      label: 'สํญชาติ',
      max: 50
    },
    SSID: {
      type: String,
      label: 'หมายเลขประจำตัวประชาชน',
      max: 50
    },
    Existing: {
      type: Boolean,
      label: 'มี HN หรือไม่',
    },
    HN: {
      type: String,
      label: 'หมายเลข HN',
      regEx: /HN[0-9]{8}/
    }
});

Model.Patients.attachSchema(Schema.Patients);