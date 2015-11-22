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
      options() {
        return Model.Departments.find()
          .fetch()
          .map(dept => {
            return {label: dept.Name, value: dept._id};
          });
      }
    }
  },
  DoctorID: {
    type: String,
    label: 'แพทย์',
    max: 50,
    autoform: {
      type: 'hidden'
    },
    optional: true //false later
  },
  AppDate: {
    type: Date,
    label: 'วันที่ต้องการนัดหมาย',
    autoform: {
      type: "pickadate",
      pickadateOptions: {
        min: true,
        max: 365,
        formatSubmit: 'ddd dd//mm/yyyy',
        selectYears: true,
        selectMonths: true
      }
    }
  },
  AppTime: {
    type: String,
    label: "ช่วงเวลา",
    allowedValues: ['เช้า', 'บ่าย'],
    autoform: {
      options: 'allowed'
    }
  },
});

Model.Appointments.attachSchema(Schema.Appointments);
