class MainLayout extends BlazeComponent{
	onRendered(){
		super.onRendered();
		$('body').addClass('mainLayout');
	}
}

MainLayout.register('MainLayout');