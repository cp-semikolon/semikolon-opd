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
        this.vanz();
      },
      'click #cancelWardround_m'(e) {
        var doctorId = FlowRouter.getParam('doctorId');
        var date = $(e.target).data('date').split("_");
        var cancelDate = new Date(parseInt(date[0]), parseInt(date[1]), parseInt(date[2])).toDateString();
        console.log("Press cancel morning " + $(e.target).data('date'));
        var cancelDateTimes = {};
        var cancellation = OPD.Model.CancelWardrounds.find({'UserID': doctorId});
        cancellation.forEach(cancel => {
          cancelDateTimes = cancel.dateTimes;
        });
        if (!cancelDateTimes[cancelDate]) {
          cancelDateTimes[cancelDate] = {
            morning: true,
            afternoon: false
          };
        } else {
          cancelDateTimes[cancelDate]['morning'] = true;
        }
        console.log(cancelDateTimes);
        Meteor.call('CancelWardrounds.add', doctorId, cancelDateTimes, function(error, result) {
          if (error) {
            console.log(error);
            Materialize.toast('ล้มเหลว', 2000, 'red lighten-1');
          }
          if (result.insertedId) {
            Materialize.toast('ยกเลิกการออกตรวจสำเร็จ', 2000, 'light-green lighten-1');
          } else if (result.numberAffected > 0){
            Materialize.toast('แก้ไขข้อมูลสำเร็จ', 2000, 'light-green lighten-1');
          }
        });
        this.vanz();
      },
      'click #unCancelWardround_m'(e) {
        var doctorId = FlowRouter.getParam('doctorId');
        var date = $(e.target).data('date').split("_");
        var cancelDate = new Date(parseInt(date[0]), parseInt(date[1]), parseInt(date[2])).toDateString();
        console.log("Press uncancel morning " + $(e.target).data('date'));
        var cancelDateTimes = {};
        var cancellation = OPD.Model.CancelWardrounds.find({'UserID': doctorId});
        cancellation.forEach(cancel => {
          cancelDateTimes = cancel.dateTimes;
        });
        if (!cancelDateTimes[cancelDate]) {
          return;
        }
        console.log(cancelDateTimes[cancelDate]);
        cancelDateTimes[cancelDate]['morning'] = false;
        Meteor.call('CancelWardrounds.add', doctorId, cancelDateTimes, function(error, result) {
          if (error) {
            console.log(error);
            Materialize.toast('ล้มเหลว', 2000, 'red lighten-1');
          }
          if (result.insertedId) {
            Materialize.toast('ยกเลิกการออกตรวจสำเร็จ', 2000, 'light-green lighten-1');
          } else if (result.numberAffected > 0){
            Materialize.toast('แก้ไขข้อมูลสำเร็จ', 2000, 'light-green lighten-1');
          }
        });
        this.vanz();
      },
      'click #cancelWardround_a'(e) {
        var doctorId = FlowRouter.getParam('doctorId');
        var date = $(e.target).data('date').split("_");
        var cancelDate = new Date(parseInt(date[0]), parseInt(date[1]), parseInt(date[2])).toDateString();
        console.log("Press cancel morning " + $(e.target).data('date'));
        var cancelDateTimes = {};
        var cancellation = OPD.Model.CancelWardrounds.find({'UserID': doctorId});
        cancellation.forEach(cancel => {
          cancelDateTimes = cancel.dateTimes;
        });
        if (!cancelDateTimes[cancelDate]) {
          cancelDateTimes[cancelDate] = {
            morning: false,
            afternoon: true
          };
        } else {
          cancelDateTimes[cancelDate]['afternoon'] = true;
        }
        console.log(cancelDateTimes);
        Meteor.call('CancelWardrounds.add', doctorId, cancelDateTimes, function(error, result) {
          if (error) {
            console.log(error);
            Materialize.toast('ล้มเหลว', 2000, 'red lighten-1');
          }
          if (result.insertedId) {
            Materialize.toast('ยกเลิกการออกตรวจสำเร็จ', 2000, 'light-green lighten-1');
          } else if (result.numberAffected > 0){
            Materialize.toast('แก้ไขข้อมูลสำเร็จ', 2000, 'light-green lighten-1');
          }
        });
        this.vanz();
      },
      'click #unCancelWardround_a'(e) {
        var doctorId = FlowRouter.getParam('doctorId');
        var date = $(e.target).data('date').split("_");
        var cancelDate = new Date(parseInt(date[0]), parseInt(date[1]), parseInt(date[2])).toDateString();
        console.log("Press uncancel morning " + $(e.target).data('date'));
        var cancelDateTimes = {};
        var cancellation = OPD.Model.CancelWardrounds.find({'UserID': doctorId});
        cancellation.forEach(cancel => {
          cancelDateTimes = cancel.dateTimes;
        });
        if (!cancelDateTimes[cancelDate]) {
          return;
        }
        console.log(cancelDateTimes[cancelDate]);
        cancelDateTimes[cancelDate]['afternoon'] = false;
        Meteor.call('CancelWardrounds.add', doctorId, cancelDateTimes, function(error, result) {
          if (error) {
            console.log(error);
            Materialize.toast('ล้มเหลว', 2000, 'red lighten-1');
          }
          if (result.insertedId) {
            Materialize.toast('ยกเลิกการออกตรวจสำเร็จ', 2000, 'light-green lighten-1');
          } else if (result.numberAffected > 0){
            Materialize.toast('แก้ไขข้อมูลสำเร็จ', 2000, 'light-green lighten-1');
          }
        });
        this.vanz();
      }
    });
  }

  vanz() {
    Meteor.setTimeout(initializedDynamicUIComponent, 20);
  }

  onRendered() {
    super.onRendered();
    $('select').material_select();
    initializedDynamicUIComponent();
  }

  currentDoctor(){
    let doctor = Meteor.users.findOne(FlowRouter.getParam('doctorId'));
    console.log(doctor);
    doctor.department = OPD.Model.Departments.findOne(doctor.profile.Department).Name;
    return doctor;
  }

  months() {
    var totalMonthShown = 12;
    var monthNames = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var currentMonth = new Date().getMonth();
    var currentYear = new Date().getFullYear();
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
    // let monthNames = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    let DoctorID = FlowRouter.getParam('doctorId');
    var doctor = Meteor.users.findOne(DoctorID);
    // Find doctor's work day
    let works = OPD.Model.Wardrounds.find({'UserID': doctor._id});
    works.forEach(work => {
      console.log(work);
      doctor.workTime = work.dayTime;
    });
    // Find doctor's wardround cancellaiton
    let cancelList = OPD.Model.CancelWardrounds.find({'UserID': doctor._id});
    doctor.cancel = {};
    cancelList.forEach(cancel => {
      doctor.cancel = cancel.dateTimes;
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
      let mor = '', aft = '', cmor = '', caft = '', mmor = '', maft = '', modal = '';
      let cancel = doctor.cancel[currentDate.toDateString()];
      if (!doctor.workTime) break;
      if (doctor.workTime[thisDay].selected === true) {
        modal = currentDate.getFullYear() + "_" + currentMonth + "_" + currentDate.getDate();
        if (doctor.workTime[thisDay].morning === true) {
          if (!cancel || (cancel.morning === false)) {
            mor = 'check';
            cmor = 'blue';
          } else {
            mor = 'close';
            cmor = 'red';
          }
          mmor = modal + '_m';
        }
        if (doctor.workTime[thisDay].afternoon === true) {
          if (!cancel || (cancel.afternoon === false)) {
            aft = 'check';
            caft = 'blue';
          } else {
            aft = 'close';
            caft = 'red';
          }
          maft = modal + '_a';
        }
      }
      console.log(mmor);
      schedules[i] = {
        date: currentDate.toDateString(), 
        morning: mor, 
        afternoon: aft, 
        color_m: cmor, 
        color_a: caft,
        modal_m: mmor,
        modal_a: maft,
        modal: modal
      };
      if (doctor.workTime) {
        schedules[i]['imor'] = doctor.workTime[thisDay].morning && (!cancel || !cancel.morning);
        schedules[i]['jmor'] = doctor.workTime[thisDay].morning && (!!cancel && cancel.morning);
        schedules[i]['iaft'] = doctor.workTime[thisDay].afternoon && (!cancel || !cancel.afternoon);
        schedules[i]['jaft'] = doctor.workTime[thisDay].afternoon && (!!cancel && cancel.afternoon);
      }
      currentDate = new Date(currentDate.getTime() + oneDay);
    }
    return schedules;
  }
}

function initializedDynamicUIComponent() {
  $('.modal-trigger').leanModal({
    // Modal can be dismissed by clicking outside of the modal
    dismissible: true, 
    // opacity: 0.5, // Opacity of modal background
    // in_duration: 300, // Transition in duration
    // out_duration: 200, // Transition out duration
    // height: 100
  });
  $('.tooltipped').tooltip({delay: 50});
}

ViewWardRound.register("ViewWardRound");

