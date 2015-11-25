/* globals Model */ 
Model.Record = new Meteor.Collection('record');

Meteor.methods({
	'Record.addHealthData': function(doc){
		let patientid=doc.patientid;
		delete doc.patientid;		
		let today=new Date();
		let result;
		result=OPD.Model.Record.insert(
			{
				patientid:patientid,
				Date: today,
				Health:doc
			}
		);

  		return result;
	}
});