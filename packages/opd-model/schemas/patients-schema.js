Schema.Patients = new SimpleSchema({
    Title: {
      type: String,
      label: 'คำนำหน้า',
      allowedValues: ['นาย', 'นาง', 'นางสาว'],
      autoform: {
        firstOption: '-- กรุณาเลือก --',
        options: 'allowed'
      }
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
      label: 'หมายเลขโทรศัพท์ (ตัวเลขเท่านั้น)',
      regEx: /[0-9]/,
      min: 9,
      max: 10
    },
    Email: {
      type: String,
      label: 'อีเมล',
      regEx: SimpleSchema.RegEx.Email
    },
    Nationality: {
      type: String,
      label: 'สัญชาติ',
      allowedValues: countries,
      autoform: {
        value: 'ไทย',
        options: 'allowed'
      },
      max: 50
    },
    SSID: {
      type: String,
      label: 'เลขประจำตัวประชาชน',
      max: 50
    },
    HN: {
      type: String,
      label: 'หมายเลข HN',
      regEx: /^HN[0-9]{8}$/,
      optional: true
    }
});

Model.Patients.attachSchema(Schema.Patients);