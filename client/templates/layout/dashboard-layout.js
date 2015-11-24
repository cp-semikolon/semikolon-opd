class DashboardLayout extends BlazeComponent{
	onRendered(){
		super.onRendered();
		// Remove style of main page then add style of dashboard
		$('body').removeClass('mainLayout').addClass('dashboardLayout');

		// initialize side nav functionality
		$(".button-collapse").sideNav();

	}

	isPermitted(permission){

		let role = Session.get('currentRole');
		for (var i = permission.length - 1; i >= 0; i--) {
			if(role===permission[i]) return true;
		}
		return false;
	}
}

Template.DashboardLayout.helpers({
	authenFailed: function(){
		FlowRouter.go('/noPermission');
	}
});

DashboardLayout.register('DashboardLayout');
