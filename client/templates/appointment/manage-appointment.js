class ManageAppointment extends BlazeComponent {
  onCreated() {
    super.onCreated();
    // this.state = new ReactiveDict();

    // registerDispatcher(this.state);
  }

  onRendered() {
    super.onRendered();
    $('.tooltipped').tooltip({delay: 50});
  }

}

// // Action dispatcher for this component

// function registerDispatcher(state) {

//   Dispatcher.register(action => {
//       switch( action.type ) {
//         case "PATIENT_MAKE_APPOINTMENT_REQUEST":
//           FlowRouter.go(state);
//           break;

//       }
//     });

// }

ManageAppointment.register('ManageAppointment');