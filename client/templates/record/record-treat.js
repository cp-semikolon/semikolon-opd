/*global MedIndex: true */

let MedData = OPD.Model.MedData;
let HealthData = OPD.Model.HealthData;
let DispenseData = OPD.Model.DispenseData;

MedIndex = new EasySearch.Index({
  collection: [MedData,HealthData,DispenseData],
  fields: ['patientid'],
  engine: new EasySearch.Minimongo({
    sort: () => ['Date'],
  	selector: function (searchObject, options, aggregation) {
  		console.log(searchObject);

  	let selector =
      this.defaultConfiguration().selector(searchObject, options, aggregation);
      
  	return selector;
  	}

  })
});

if (Meteor.isClient) {
	Template.RecordMedData.helpers({
  		medIndex() { return MedIndex; }, // instanceof EasySearch.Index
      medrecord() {
          let patientId = FlowRouter.getParam(patientId);
          let temp = MedIndex.search(patientId).fetch();
          return temp;
      }
	});
}