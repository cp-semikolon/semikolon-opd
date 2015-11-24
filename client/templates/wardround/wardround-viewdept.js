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

  wardroundDate() {
    var doctors = Meteor.users.find({'profile.Department': this.state.get('departmentID')})
      .map(doctor => {
        let work = OPD.Model.Wardrounds.findOne(doctor._id);
        console.log(work);
        doctor.workTime = work.dayTime;
        return doctor;
      });
    return doctors;
    var works = OPD.Model.Wardrounds.find()
    var currentDate = new Date();
    var oneDay = 24 * 60 * 60 * 1000;
    var showDays = 100;
    var schedules = [];
    for (var i = 0; i < showDays; i++) {
      var morning = 
      schedules[i] = {date: currentDate.toDateString()};
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