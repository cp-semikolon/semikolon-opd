class DashboardLayout extends BlazeComponent{
	onCreated(){
		  if(!Meteor.user()){
    Session.set('currentRole','patient');
    return;
  }
	  	let role = Meteor.user().roles[0];
  		Session.set('currentRole',role);
	}


	onRendered(){
		super.onRendered();
		// Remove style of main page then add style of dashboard
		$('body').removeClass('mainLayout').addClass('dashboardLayout');

		// initialize side nav functionality
		$(".button-collapse").sideNav();
	}

	isPermitted(permission){
		if(!permission)return true;
		console.log(permission);
		let role = Session.get('currentRole');
		console.log(role);
		for (var i = permission.length - 1; i >= 0; i--) {
			if(role===permission[i]) {console.log('true ka'); return true;}
		}
		console.log('oops');
		return false;
	}
}

Template.DashboardLayout.helpers({
	authenFailed: function(){
		FlowRouter.go('/noPermission');
	}
});

DashboardLayout.register('DashboardLayout');
