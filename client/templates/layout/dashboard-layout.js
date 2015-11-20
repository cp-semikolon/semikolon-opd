class DashboardLayout extends BlazeComponent{
	onRendered(){
		super.onRendered();
		$('body').removeClass('mainLayout').addClass('dashboardLayout');

		// initialize side nav functionality
		$(".button-collapse").sideNav();
	}
}
DashboardLayout.register('DashboardLayout');