class DashboardLayout extends BlazeComponent{
	onRendered(){
		super.onRendered();
		// Remove style of main page then add style of dashboard
		$('body').removeClass('mainLayout').addClass('dashboardLayout');

		// initialize side nav functionality
		$(".button-collapse").sideNav();
	}
}
DashboardLayout.register('DashboardLayout');