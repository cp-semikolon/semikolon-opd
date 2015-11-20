/* globals Model */ 

let Patients = Model.Patients = new Meteor.Collection('patients');

Meteor.methods({
	'Patients.auth'(doc) {
		let idType = getIdType(doc.ssidOrHn);

		let patientSelector = { 
			[idType]: doc.ssidOrHn,
			firstName: doc.firstName,
			lastName: doc.lastName
		};

		let matchedPateint = Patients.find(patientSelector).fetch();
		let isPatientExists = matchedPateint.length > 0;

		if ( doc.action === 'make' ) {
			makeAppointment(isPatientExists, matchedPateint, patientSelector);
		}

		if ( doc.action === 'manage' ) {
			manageAppointment(isPatientExists, matchedPateint);
		}

	},

	'Patients.otpAuth'(doc) {
		let otp = doc.otp;

		if (otp === '1234') {
			Dispatcher.dispatch('PATIENT_OTP_AUTH_SUCCESS');
			return;
		}
		Dispatcher.dispatch('PATIENT_OTP_AUTH_FAIL');
	}

});

// private method

function getIdType(id) {
	let pattern = {
		ssid: /[0-9]{13}/,
		hn: /[a-zA-Z0-9]{10}/
	};

	let hasHN = id.match(pattern.hn);
	let hasSSID = id.match(pattern.ssid);

	if (hasSSID) {
		return 'ssid';
	}

	if (hasHN) {
		return 'hn';
	}

	return null;
}

function makeAppointment(isPatientExists, matchedPateint, patientSelector) {
	let newPatient = {};

	if(!isPatientExists) {
		// insert new patient
		newPatient = Patients.insert(patientSelector);
	}

	let payload = {
		patientId: isPatientExists ? matchedPateint[0]._id : newPatient
	};

	Dispatcher.dispatch('PATIENT_MAKE_APPOINTMENT_REQUEST', payload);
}

function manageAppointment(isPatientExists, matchedPateint) {
	if(isPatientExists) {
		Dispatcher.dispatch('PATIENT_REQUIRE_OTP', { patient: matchedPateint[0] });
	}

	Dispatcher.dispatch('PATIENT_NOT_FOUND');
}