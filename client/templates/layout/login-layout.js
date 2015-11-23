class LoginLayout extends BlazeComponent{
	onRendered(){
		super.onRendered();
		// Add style for main page
		$('body').addClass('loginLayout');
	}
}

LoginLayout.register('LoginLayout');
