Schema.Record = new SimpleSchema({
    patientid:{
      type: String,
      max: 50
    },
    doctorid:{
      type:String,
      max:50
    },
    Date: {
      type: Date,
      label: "วันที่รักษา"
    },
    Time:{
      type: String,
      max: 50
    },
    Health:{
      type: Schema.HealthData
    },
    Med:{
      type: Schema.MedData
    },
    Dispense:{
      type: [Schema.Dispenses]
    }
});

Model.Record.attachSchema(Schema.Record);