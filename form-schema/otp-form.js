OPD.Schema.OTPForm = new SimpleSchema({
    otp: {
      type: String,
      label: 'one-time-password',
      max: 4,
      autoform: {
        type: 'password'
      }
    }
});