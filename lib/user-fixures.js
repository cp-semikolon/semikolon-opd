Meteor.startup(() => {
  if (Meteor.isServer) {
    Meteor.users.remove({});
    initUsers();
  }
});

function initUsers() {
  let users = [
        {
          name:"ศ.ดร.กานต์ นิมมานต์",
          email:"karn.n@semikolon.com",
          roles:['doctor']
        },
        {
          name:"ดร.ศิวภพ เบาภาระ",
          email:"siwapob.b@semikolon.com",
          roles:['doctor']
        },
        {
          name:"รศ.ดร.จอมขวัญ จิตสะอาด",
          email:"jomkwan.j@semikolon.com",
          roles:['doctor']
        },
        {
          name:"สรวงสุดา สิทธินาถ",
          email:"suangsuda.s@semikolon.com",
          roles:['nurse']
        },
        {
          name:"สมชัย สมสกุล",
          email:"somchai.s@semikolon.com",
          roles:['staff']
        },
        {
          name:"สุพักตร์ วิทยะ",
          email:"supak.w@semikolon.com",
          roles:['pharmacist']
        }
      ];

  users.forEach(user => {
    let id;

    id = Accounts.createUser({
      email: user.email,
      password: "pa55w0rd",
      profile: { name: user.name }
    });

    if (user.roles.length > 0) {
      // Need _id of existing user record so this call must come 
      // after `Accounts.createUser` or `Accounts.onCreate`
      Roles.addUsersToRoles(id, user.roles);
    }
  });
}