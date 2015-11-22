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
            FlowRouter.go('/');
            break;

          case 'nurse':
            FlowRouter.go('/');
            break;
          case 'pharmacist':
            FlowRouter.go('/');
            break;

          case 'staff':
            FlowRouter.go('/');
            break;

          default:
            FlowRouter.go('/');
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