Schema.Myusers = new SimpleSchema({
    UserID: {
      type: String,
      label: 'รหัสประจำบุคลากร',
      max: 15
    },
    UPassword: {
      type: String,
      label: 'รหัสผ่าน',
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
    Email: {
      type: String,
      label: 'e-mail',
      regEx: SimpleSchema.RegEx.Email,
      max: 50
    },
    Type: {
      type: String,
      label: 'ประเภทผู้ใช้งาน',
      allowedValues: ['Staff', 'Doctor','Nurse','Pharmacist']
    },
    ID:{
      type: String,
      label: 'รหัสประจำแผนก',
      max: 15
    }
});

Model.Myusers.attachSchema(Schema.Myusers);