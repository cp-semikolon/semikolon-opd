Model.Patients = new Meteor.Collection('patients');

Meteor.methods({
	'Patients.auth'(doc) {
		if(Meteor.isServer) {
			console.log(doc);
		}

		let pattern = {
			ssid: /[0-9]{13}/,
			hn: /[a-zA-Z0-9]{10}/
		};

		let newAppointmentPath = '/appointment/new';

		if( doc.ssidOrHn.match(pattern.hn) && 
			ssidAuth(doc.ssidOrHn, doc.firstName, doc.lastName) ) {

			console.log('it\'s ssid');
			FlowRouter.go(newAppointmentPath);
			return;
		}

		if ( doc.ssidOrHn.match(pattern.ssid) && 
			hnAuth(doc.ssidOrHn, doc.firstName, doc.lastName) ) {
			// for ssid
			console.log('it\'s hn');
			FlowRouter.go(newAppointmentPath);
			return;
		}

		console.log('you\'re fucked up');

	}
});

// private method

function ssidAuth(ssid, firstName, lastName) {
	let matchedPateint = Model.Patients.find({ssid, firstName, lastName}).fetch();
	if( matchedPateint !== 0) {
		return true;
	}
	return false;
}

function hnAuth(hn, firstName, lastName) {
	let matchedPateint = Model.Patients.find({hn, firstName, lastName}).fetch();
	if( matchedPateint !== 0) {
		return true;
	}
	return false;
}