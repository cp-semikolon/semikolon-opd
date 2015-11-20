class PatientAuth extends BlazeComponent {
  onCreated() {
    super.onCreated();

    this.state = new ReactiveDict();

    registerDispatcher(this.state);
  }

}

// Action dispatcher for this component

function registerDispatcher(state) {

  Dispatcher.register(action => {
      switch( action.type ) {
        case "PATIENT_MAKE_APPOINTMENT_REQUEST":
          FlowRouter.go(state);
          break;

      }
    });

}

PatientAuth.register('PatientAuth');