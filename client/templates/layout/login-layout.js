class LoginLayout extends BlazeComponent{
	onRendered(){
		super.onRendered();
		// Add style for main page
		$('body').removeClass().addClass('loginLayout');

	}
}

LoginLayout.register('LoginLayout');

