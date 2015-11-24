AccountsTemplates.configure({
  hideSignUpLink: true,
  // homeRoutePath: 'some/where/over/the/rainbow'
  // forbidClientAccountCreation: true,
  onSubmitHook(error, state) {
    if (!error) {
      if (state === "signIn") {
        // Successfully logged in
        let role = Meteor.user().roles[0];
        console.log(role);

        switch(role) {
          case 'doctor':
            FlowRouter.go('/view/dailyAppointment');
            break;

          case 'nurse':
            FlowRouter.go('/find/patient');
            break;
          case 'pharmacist':
            FlowRouter.go('/find/patient');
            break;

          case 'staff':
            FlowRouter.go('/find/patient');
            break;

          default:
            FlowRouter.go('/login');
        }
      }
    } else {
      Alert.error('มีบางอย่างผิดปกติ');
      console.error(error);
    }
  },

  texts: {
      title: {
        signIn: ''
      },
      button: {
        signIn: 'เข้าสู่ระบบ'
      }
  }
});