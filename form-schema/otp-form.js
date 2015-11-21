OPD.Schema.OTPForm = new SimpleSchema({
    patientId: {
      type: String,
      autoform: {
        type: 'hidden'
      }
    },
    otp: {
      type: String,
      label: 'one-time-password',
      max: 4,
      autoform: {
        type: 'password'
      }
    }
});