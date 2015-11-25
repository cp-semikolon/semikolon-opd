Schema.Record = new SimpleSchema({
    patientid:{
      type: String,
      max: 50,
      optional:true
    },
    doctorid:{
      type:String,
      max:50,
      optional:true
    },
    Date: {
      type: Date,
      label: "วันที่รักษา",
      optional:true
    },
    Time:{
      type: String,
      label:"ช่วงเวลา",
      max: 50,
      optional:true
    },
    Health:{
      type: Schema.HealthData,
      optional:true
    },
    Med:{
      type: Schema.MedData,
      optional:true
    },
    Dispense:{
      type: [Schema.Dispenses],
      optional:true
    },
    DispensesStatus:{
      type: Boolean,
      label: "สถานะจ่ายยา",
      optional:true
    }
});

Model.Record.attachSchema(Schema.Record);