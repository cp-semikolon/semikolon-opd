// try {
//   if (Meteor.isServer) {
//     initDepartments();
//     initUsers();
//   }

//   function initDepartments() {
//     let Departments = OPD.Model.Departments;

//     let deptList = [
//       'แผนกผู้ป่วยฉุกเฉิน',
//       'แผนกศัลยกรรมทั่วไป',
//       'แผนกศัลยกรรมความงาม',
//       'แผนกสูติ-นรีเวชกรรม',
//       'แผนกอายุรกรรม',
//       'แผนกกุมารเวช'
//     ];

//     Departments.remove({});

//     deptList.forEach(deptName => {
//       Departments.insert({Name: deptName});
//     });
//   }

//   function initUsers() {
//     Meteor.users.remove({});
//     let users = [
//           {
//             FName: "กานต์",
//             LName: "นิมมานต์",
//             email: "karn.n@semikolon.com",
//             roles: ['doctor']
//           },
//           {
//             FName: "ศิวภพ",
//             LName: "เบาภาระ",
//             email: "siwapob.b@semikolon.com",
//             roles: ['doctor']
//           },
//           {
//             FName: "จอมขวัญ", 
//             LName: "จิตสะอาด",
//             email: "jomkwan.j@semikolon.com",
//             roles: ['doctor']
//           },
//           {
//             FName: "เจตจำนง", 
//             LName: "มุงมั่น",
//             email: "jetjumnong.m@semikolon.com",
//             roles: ['doctor']
//           },
//           {
//             FName: "สมจิต", 
//             LName: "เกรก",
//             email: "somjit.g@semikolon.com",
//             roles: ['doctor']
//           },
//           {
//             FName: "สะดวก", 
//             LName: "สบาย",
//             email: "saduak.s@semikolon.com",
//             roles: ['doctor']
//           },
//           {
//             FName: "ยาใจ", 
//             LName: "ใยจำ",
//             email: "yajai.y@semikolon.com",
//             roles: ['doctor']
//           },
//           {
//             FName: "สรวงสุดา",
//             LName: "สิทธินาถ",
//             email: "suangsuda.s@semikolon.com",
//             roles: ['nurse']
//           },
//           {
//             FName: "สมชัย",
//             LName: "สมสกุล",
//             email: "somchai.s@semikolon.com",
//             roles: ['staff']
//           },
//           {
//             FName: "สุพักตร์",
//             LName: "วิทยะ",
//             email: "supak.w@semikolon.com",
//             roles: ['pharmacist']
//           }
//         ];

//     let depts = OPD.Model.Departments.find().fetch();

//     users.forEach(user => {
//       let id;

//       if (user.roles[0] === 'doctor') {
//         let randomDeptIndex = Math.floor(Math.random()*depts.length);
//         user.Department = depts[randomDeptIndex]._id;
//       }

//       id = Accounts.createUser({
//         email: user.email,
//         password: "pa55w0rd",
//         profile: { 
//           FName: user.FName,
//           LName: user.LName,
//           Department: user.Department,
//           roles: user.roles
//         },
//       });

//       if (user.roles.length > 0) {
//         // Need _id of existing user record so this call must come 
//         // after `Accounts.createUser` or `Accounts.onCreate`
//         Roles.addUsersToRoles(id, user.roles);
//       }
//     });
//   }
// }
// catch(error) {}