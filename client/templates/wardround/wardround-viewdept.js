class ViewDeptWardRound extends BlazeComponent {
  onCreated() {
    super.onCreated();
    this.state = new ReactiveDict();
     this.state.set('departmentID', "NONE");
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
      }
    });
  }

  departments() {
    return OPD.Model.Departments.find();
  }

  selectedDepartment() {
    return OPD.Model.Departments.findOne(this.state.get('departmentID')).Name;
  }

  wardroundDate() {
    let days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    var doctors = Meteor.users.find({'profile.Department': this.state.get('departmentID')})
      .map(doctor => {
        console.log(doctor.profile.FName + doctor._id);
        let works = OPD.Model.Wardrounds.find({'UserID': doctor._id});
        works.forEach(work => {
          console.log(work);
          doctor.workTime = work.dayTime;
        });
        if (!doctor.workTime) {
          doctor.workTime = {};
          for (var i in days) {
            doctor.workTime[days[i]] = {selected: false, morning: false, afternoon: false};
          }
        }
        return doctor;
      });
    // return doctors;
    var works = OPD.Model.Wardrounds.find()
    var currentDate = new Date();
    var oneDay = 24 * 60 * 60 * 1000;
    var showDays = 10;
    var schedules = [];
    for (var i = 0; i < showDays; i++) {
      let thisDay = days[currentDate.getDay()];
      let iM = 0, iA = 0;
      let mor = [];
      let aft = [];
      doctors.forEach(doctor => {
        if (doctor.workTime[thisDay].selected === true) {
          if (doctor.workTime[thisDay].morning === true) {
            mor[iM] = {index: (iM+1), FName: doctor.profile.FName, LName: doctor.profile.LName};
            iM++;
          }
          if (doctor.workTime[thisDay].afternoon === true) {
            aft[iA] = {index: (iA+1), FName: doctor.profile.FName, LName: doctor.profile.LName};
            iA++;
          }
        }
      })
      schedules[i] = {date: currentDate.toDateString(), morning: mor, afternoon: aft};
      // console.log(schedules[i]["morning"]);
      currentDate = new Date(currentDate.getTime() + oneDay);
    }
    return schedules;
  }
}

ViewDeptWardRound.register("ViewDeptWardRound");


/*

dayTime['monday'] = {
  selected: false,
  morning: false,
  afternoon: false
}
/*
let Departments = OPD.Model.Departments;

DepartmentsIndex = new EasySearch.Index({
  engine: new EasySearch.MongoDB({
    // sort: function () {
    //   return { score: -1 };
    // },
    selector: function (searchObject, options, aggregation) {
      let selector = this.defaultConfiguration().selector(searchObject, options, aggregation),
        departmentFilter = options.search.props.departmentFilter;

      if (_.isString(departmentFilter) && !_.isEmpty(departmentFilter)) {
        selector._id = departmentFilter;
      }

      return selector;
    }
  }),
  collection: Departments,
  fields: [],
  // defaultSearchOptions: {
  //   limit: 8
  // },
  // permission: () => {
  //   //console.log(Meteor.userId());

  //   return true;
  // }
});
Template.ViewDeptWardRound.helpers({
  // inputAttributes: function () {
  //   return { 'class': 'easy-search-input', 'placeholder': 'Start searching...' };
  // },
  index: function () {
    return DepartmentsIndex;
  },

});
Template.ViewDeptWardRound.events({
  'change .filterDepartment.DepartmentID': function (e) {
    DepartmentsIndex.getComponentMethods()
      .addProps('departmentFilter', $(e.target).val())
    ;
  }
});
Template.ViewDeptWardRound.onRendered(function() {
  //initialize select form
  $('select').material_select();
  //$('select').material_select('destroy');
});

*/