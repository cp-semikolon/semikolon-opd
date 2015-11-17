Schema.Patients = new SimpleSchema({
    ssidOrHn: {
      type: String,
      label: "รหัสบัตรประชาชน หรือ รหัสผู้ป่วย",
      max: 15
    },
    ssid: {
      type: String,
      label: "รหัสบัตรประชาชน",
      max: 13,
      optional: true
    },
    hn: {
      type: String,
      label: "hn",
      max: 13,
      optional: true
    },
    firstName: {
      type: String,
      label: "ชื่อ",
      max: 200
    },
    lastName: {
      type: String,
      label: "นามสกุล",
      max: 200
    }
});

Model.Patients.attachSchema(Schema.Patients);