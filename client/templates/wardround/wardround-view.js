class ViewWardRound extends BlazeComponent {

onCreated() {
    super.onCreated();
    this.state = new ReactiveDict();
    var d = new Date();
    this.state.set('year', d.getFullYear());
    this.state.set('month', d.getMonth());
    //this.state.set('departmentID', "NONE");
    // registerDispatcher(this.state);
  }

  events() {
    return super.events().concat({
      'change #selectMonth'(e) {
        var ym = $(e.target).val().split(",");
        this.state.set('year', parseInt(ym[0]));
        this.state.set('month', parseInt(ym[1]));
      }
    });
  }

   onRendered() {
    super.onRendered();
    $('select').material_select();
  }

  currentDoctor(){
    let DoctorID = FlowRouter.getParam('doctorId');
    return Meteor.users.findOne(DoctorID);
  }


  months() {
    var totalMonthShown = 12;
    var currentMonth = new Date().getMonth();
    var currentYear = new Date().getFullYear();
    var monthNames = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var Months = [];
    for (var i = 0; i < totalMonthShown; i++) {
      var sel = (i === 0? 'selected': '');
      var id = (currentYear + "," + currentMonth);
      Months[i] = {Name: (monthNames[currentMonth] + " " + currentYear), selected: sel, ID: id};
      currentMonth++;
      if (currentMonth >= 12) {
        currentMonth = 0;
        currentYear++;
      }
    }
    return Months;
  }
  wardroundDate() {
    let days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    let DoctorID = FlowRouter.getParam('doctorId');
    var doctor = Meteor.users.findOne(DoctorID)
    console.log(doctor.profile.FName + doctor._id);
    let works = OPD.Model.Wardrounds.find({'UserID': doctor._id});
    works.forEach(work => {
      console.log(work);
      doctor.workTime = work.dayTime;
    });
    
    var currentDate = new Date();
    var selectedMonth = new Date(this.state.get('year'), this.state.get('month'), 1);
    if (currentDate.getTime() < selectedMonth.getTime()) {
      currentDate = selectedMonth;
    }
    var currentMonth = currentDate.getMonth();
    var oneDay = 24 * 60 * 60 * 1000;
    var schedules = [];
    for (var i = 0; currentDate.getMonth() === currentMonth; i++) {
      let thisDay = days[currentDate.getDay()];
      let mor = '';
      let aft = '';
      let dmor = '';
      let daft = '';
        if (!doctor.workTime) return;
        if (doctor.workTime[thisDay].selected === true) {
          if (doctor.workTime[thisDay].morning === true) {
            mor = 'check';
            dmor = 'delete';
          }
          if (doctor.workTime[thisDay].afternoon === true) {
            aft = 'check';
            daft = 'delete';
          }
        }
      schedules[i] = {date: currentDate.toDateString(), morning: mor, afternoon: aft, deletemor: dmor, deleteaft: daft};
      console.log(schedules[i]["morning"]);
      currentDate = new Date(currentDate.getTime() + oneDay);
    }
    return schedules;
  }
}

ViewWardRound.register("ViewWardRound");