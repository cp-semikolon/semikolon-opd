class MainLayout extends BlazeComponent{
	onRendered(){
		super.onRendered();
		// Add style for main page
		$('body').addClass('mainLayout');
	}
}

MainLayout.register('MainLayout');

