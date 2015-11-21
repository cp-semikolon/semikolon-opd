/* global Materialize */

Alert = {
  error(message='error') {
    Materialize.toast(message, 4000, 'red');
  },

  success(message='success') {
    Materialize.toast(message, 4000, 'light-green');
  }
};