let Patients = OPD.Model.Patients;

class PatientAuth extends BlazeComponent {
	onCreated() {
		super.onCreated();
	}

	patients() {
		return Patients.find();
	}
}

PatientAuth.register('PatientAuth');