 Routes = {
  patientAuth: '/',
  login: '/login',
  newPatientForm:'/patient/new',
  makeAppointment: '/patient/:patientId/appointment/new',
  manageAppointment: '/patient/:patientId/appointment',
  postponeAppointment: '/patient/:patientId/appointment/postpone/:appointmentId',
  printAppointmentCard: '/patient/:patientId/appointment/:appointmentId/print',
  recordHealthData: '/record/healthData/:staffId/:patientId',
  recordMedData: '/record/medData/:patientId',
  findPatient: '/find/patient',
  findDoctor: '/find/doctor',
  viewDailyAppointment: '/view/dailyAppointment',
  viewPatientData: '/view/patientData/:patientId',
  viewWardRound: '/view/wardRound/:doctorId',
  viewDeptWardRound: '/view/wardRoundByDept',
  importWardRoundSchedule: '/import/wardRound',
  AuthenticationFailed: '/noPermission',

 isPatternMatched: function (pathPattern, actualPath) {
  let pathPatternRegexpString = pathPattern.replace(/\/:[^/]+/g, '/[^\/]+');
  let pathPatternRegexp = new RegExp(pathPatternRegexpString);
  // console.log(pathPatternRegexp);
  return !!actualPath.match(pathPatternRegexp);
}

  // routeGenRegEx: function(currentPath){
  //   // let re = new RegExp(currentPath);
  //   // let re2 = ""+re;
  //   //     console.log(re);
  //   //  re2 = re2.replace(":patientId", "[^\/]+");
  //   //  re2 = re2.replace(":appointmentId","[^\/]+");
  //   //  re2 = re2.replace("staffId","[^\/]+");
  //   //  re2 = re2.replace(":doctorId","[^\/]+");
  //   //  let re3 = new RegExp(re2);
  //   //     console.log(re3);
  //   // console.log(re2.match('be4 return'));
  //   // return re2;
  // // let pathPatternRegexpString = Routes.postponeAppointment.replace(/\/:[^/]+/g, '/:[^\/]+');
  // // let pathPatternRegexp = new RegExp(pathPatternRegexpString);
  // // console.log(pathPatternRegexp);

  // }

};


