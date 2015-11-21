/* jshint esnext: true */

Model.Departments = new Meteor.Collection('departments');

// seed

if (Meteor.isServer) {
  Meteor.startup(() => {
    let Departments = Model.Departments;

    let deptList = [
      'แผนกผู้ป่วยฉุกเฉิน',
      'แผนกศัลยกรรมทั่วไป',
      'แผนกศัลยกรรมความงาม',
      'แผนกสูติ-นรีเวชกรรม',
      'แผนกอายุรกรรม',
      'แผนกกุมารเวช'
    ];

    Departments.remove({});
    deptList.forEach(deptName => {
      Departments.insert({Name: deptName});
    });   
  });
}