class ViewDeptWardRound extends BlazeComponent {
  onCreated() {
    super.onCreated();
    this.state = new ReactiveDict();
    this.state.set('departmentID', "NONE");
    var d = new Date();
    this.state.set('year', d.getFullYear());
    this.state.set('month', d.getMonth());
    // registerDispatcher(this.state);
  }

  onRendered() {
    super.onRendered();
    $('select').material_select();
  }

  events() {
    return super.events().concat({
      'change #selectDepartment'(e) {
        this.state.set('departmentID', $(e.target).val());
      },
      'change #selectMonth'(e) {
        var ym = $(e.target).val().split(",");
        this.state.set('year', parseInt(ym[0]));
        this.state.set('month', parseInt(ym[1]));
      }
    });
  }

  departments() {
    return OPD.Model.Departments.find();
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

  selectedDepartment() {
    var department = OPD.Model.Departments.findOne(this.state.get('departmentID'));
    if (!department) return "";
    return department.Name;
  }

  selectedMonthYear() {
    var monthNames = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
    return monthNames[this.state.get('month')] + " " + this.state.get('year');
  }

  wardroundDate() {
    if (this.state.get('departmentID') === "NONE") return [];

    let days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    var doctors = Meteor.users.find({'profile.Department': this.state.get('departmentID')})
      .map(doctor => {
        // Find doctor's work day
        let works = OPD.Model.Wardrounds.find({'UserID': doctor._id});
        works.forEach(work => {
          doctor.workTime = work.dayTime;
        });
        // Find doctor's wardround cancellaiton
        let cancelList = OPD.Model.CancelWardrounds.find({'UserID': doctor._id});
        doctor.cancel = {};
        cancelList.forEach(cancel => {
          doctor.cancel = cancel.dateTimes;
        });
        return doctor;
      });
    // return doctors;
    
    var currentDate = new Date();
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    var selectedMonth = new Date(this.state.get('year'), this.state.get('month'), 1);
    if (currentDate < selectedMonth) {
      currentDate = selectedMonth;
    }
    var currentMonth = currentDate.getMonth();
    var oneDay = 24 * 60 * 60 * 1000;
    var schedules = [];
    for (var i = 0; currentDate.getMonth() === currentMonth; i++) {
      let thisDay = days[currentDate.getDay()];
      let iM = 0, iA = 0;
      let mor = [];
      let aft = [];
      doctors.forEach(doctor => {
        if (!doctor.workTime) return;
        if (doctor.workTime[thisDay].selected === true) {
          let cancel = doctor.cancel[currentDate.toDateString()];
          if (doctor.workTime[thisDay].morning === true && (!cancel || (cancel.morning === false))) {
            mor[iM] = {index: (iM+1), FName: doctor.profile.FName, LName: doctor.profile.LName};
            iM++;
          }
          if (doctor.workTime[thisDay].afternoon === true && (!cancel || (cancel.afternoon === false))) {
            aft[iA] = {index: (iA+1), FName: doctor.profile.FName, LName: doctor.profile.LName};
            iA++;
          }
        }
      })
      schedules[i] = {date: currentDate.toDateString(), morning: mor, afternoon: aft};
      currentDate = new Date(currentDate.getTime() + oneDay);
    }
    return schedules;
  }
}

ViewDeptWardRound.register("ViewDeptWardRound");