OPD.Schema.PatientAuthForm = new SimpleSchema({
    ssidOrHn: {
      type: String,
      label: 'รหัสบัตรประชาชน หรือ รหัสผู้ป่วย',
      max: 15
    },
    firstName: {
      type: String,
      label: 'ชื่อ',
      max: 200
    },
    lastName: {
      type: String,
      label: 'นามสกุล',
      max: 200
    },
    action: {
      type: String,
      label: 'ต้องการ',
      allowedValues: ['make', 'manage'],
      autoform: {
          skipLabel: true,
          options: {
            'make': 'ทำการนัด',
            'manage': 'จัดการนัด'
          },
      }
    }
});