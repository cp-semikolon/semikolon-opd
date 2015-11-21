Schema.Appointments = new SimpleSchema({
  PatientID: {
    type: String,
    max: 50,
    autoform: {
      type: 'hidden'
    }
  },
  DepartmentID: {
    type: String,
    label: 'แผนก',
    max: 50,
    autoform: {
      type: 'hidden'
    }
  },
  DoctorID: {
    type: String,
    label: 'แพทย์',
    max: 50,
    autoform: {
      type: 'hidden'
    }
  },
  AppDate: {
    type: Date,
    label: 'วันที่ต้องการนัดหมาย',
    autoform: {
      type: "pickadate"
    }
  },
  AppTime: {
    type: String,
    label: "ช่วงเวลา",
    allowedValues: ['เช้า', 'บ่าย']
  },
});

Model.Appointments.attachSchema(Schema.Appointments);