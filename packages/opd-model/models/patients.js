/* globals Model, OTP */ 

let Patients = Model.Patients = new Meteor.Collection('patients');

Meteor.methods({
	'Patients.auth'(doc) {
		let idType = getIdType(doc.ssidOrHn);

		let patientSelector = { 
			[idType]: doc.ssidOrHn,
			FName: doc.firstName,
			LName: doc.lastName
		};

		let matchedPatient = Patients.find(patientSelector).fetch();
		let isPatientExists = matchedPatient.length > 0;

		if ( doc.action === 'make' ) {
			makeAppointment(isPatientExists, matchedPatient, patientSelector);
		}

		if ( doc.action === 'manage' ) {
			manageAppointment(isPatientExists, matchedPatient);
		}

	},

	'Patients.otpAuth'(doc) {
		let otp = doc.otp;
		let patientId = doc.patientId;

		if ( OTP[patientId] === otp && OTP[patientId] ) {
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
		return 'SSID';
	}

	if (hasHN) {
		return 'HN';
	}

	return null;
}

function makeAppointment(isPatientExists, matchedPatient, patientSelector) {
	let newPatient = {};

	if(!isPatientExists) {
		// insert new patient
		newPatient = Patients.insert(patientSelector);
	}

	let payload = {
		patientId: isPatientExists ? matchedPatient[0]._id : newPatient
	};

	Dispatcher.dispatch('PATIENT_MAKE_APPOINTMENT_REQUEST', payload);
}

function manageAppointment(isPatientExists, matchedPatient) {
	if(isPatientExists) {
		let otp = generateOtp();
		let otpTimeout = 5*60*1000; // 5 minutes timeout

		OTP[matchedPatient[0]._id] = otp;


		// Meteor.setTimeout(() => 
		// 	delete OTP[matchedPatient[0]._id], otpTimeout);

		// this.unblock();

		if ( Meteor.isServer) {
			Email.send({
				to: matchedPatient.Email,
				from: 'noreply@semikolon',
				subject: 'one-time-password สำหรับทจัดการการนัด',
				text: `one-time-password ของคุณคือ ${otp}`
			});
		}

		Dispatcher.dispatch('PATIENT_REQUIRE_OTP', { patient: matchedPatient[0] });
		return;
	}

	Dispatcher.dispatch('PATIENT_NOT_FOUND');
}

function generateOtp() {
	let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 
								 'abcdefghijklmnopqrstuvwxyz0123456789';

	let randomBoundary = possible.length;
	let randomIndex = () => Math.abs(Math.ceil(Math.random()*randomBoundary-1));

	let otp = ['', '', '', ''].map(() => possible[randomIndex()]).join('');

	return otp;
}